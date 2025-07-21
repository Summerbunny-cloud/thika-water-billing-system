import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Database } from '@/lib/database.types'
import { useToast } from '@/hooks/use-toast'

type MeterReading = Database['public']['Tables']['meter_readings']['Row'] & {
  customer: { id: string; name: string } | null
}
type MeterReadingInsert = Database['public']['Tables']['meter_readings']['Insert']
type MeterReadingUpdate = Database['public']['Tables']['meter_readings']['Update']

export const useMeterReadings = () => {
  const [readings, setReadings] = useState<MeterReading[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  // Fetch all meter readings with customer data
  const fetchReadings = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('meter_readings')
        .select(`
          *,
          customer:customers!meter_readings_customer_id_fkey (
            id,
            name
          )
        `)
        .order('reading_date', { ascending: false })

      if (error) throw error
      setReadings(data || [])
    } catch (err: any) {
      setError(err.message)
      toast({
        title: "Error",
        description: "Failed to fetch meter readings",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Add new meter reading
  const addReading = async (reading: MeterReadingInsert) => {
    try {
      // Calculate consumption
      const consumption = reading.current_reading - reading.previous_reading

      const { data, error } = await supabase
        .from('meter_readings')
        .insert({ ...reading, consumption })
        .select(`
          *,
          customer:customers!meter_readings_customer_id_fkey (
            id,
            name
          )
        `)
        .single()

      if (error) throw error
      
      setReadings(prev => [data, ...prev])
      
      // Update customer's last reading
      await supabase
        .from('customers')
        .update({ last_reading: reading.current_reading })
        .eq('id', reading.customer_id)

      toast({
        title: "Success",
        description: "Meter reading added successfully",
      })
      return { data, error: null }
    } catch (err: any) {
      toast({
        title: "Error",
        description: "Failed to add meter reading",
        variant: "destructive",
      })
      return { data: null, error: err.message }
    }
  }

  // Update meter reading
  const updateReading = async (id: string, updates: MeterReadingUpdate) => {
    try {
      // Recalculate consumption if readings changed
      if (updates.current_reading !== undefined || updates.previous_reading !== undefined) {
        const reading = readings.find(r => r.id === id)
        if (reading) {
          const currentReading = updates.current_reading ?? reading.current_reading
          const previousReading = updates.previous_reading ?? reading.previous_reading
          updates.consumption = currentReading - previousReading
        }
      }

      const { data, error } = await supabase
        .from('meter_readings')
        .update(updates)
        .eq('id', id)
        .select(`
          *,
          customer:customers!meter_readings_customer_id_fkey (
            id,
            name
          )
        `)
        .single()

      if (error) throw error
      
      setReadings(prev => prev.map(reading => 
        reading.id === id ? data : reading
      ))
      toast({
        title: "Success",
        description: "Meter reading updated successfully",
      })
      return { data, error: null }
    } catch (err: any) {
      toast({
        title: "Error",
        description: "Failed to update meter reading",
        variant: "destructive",
      })
      return { data: null, error: err.message }
    }
  }

  // Delete meter reading
  const deleteReading = async (id: string) => {
    try {
      const { error } = await supabase
        .from('meter_readings')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      setReadings(prev => prev.filter(reading => reading.id !== id))
      toast({
        title: "Success",
        description: "Meter reading deleted successfully",
      })
      return { error: null }
    } catch (err: any) {
      toast({
        title: "Error",
        description: "Failed to delete meter reading",
        variant: "destructive",
      })
      return { error: err.message }
    }
  }

  // Get reading stats
  const getReadingStats = () => {
    const confirmed = readings.filter(r => r.status === 'Confirmed').length
    const pending = readings.filter(r => r.status === 'Pending').length
    const anomalies = readings.filter(r => r.status === 'Anomaly').length
    const avgConsumption = readings.length > 0 
      ? readings.reduce((sum, r) => sum + r.consumption, 0) / readings.length 
      : 0

    return { confirmed, pending, anomalies, avgConsumption }
  }

  useEffect(() => {
    fetchReadings()
  }, [])

  return {
    readings,
    loading,
    error,
    addReading,
    updateReading,
    deleteReading,
    refetch: fetchReadings,
    stats: getReadingStats(),
  }
}