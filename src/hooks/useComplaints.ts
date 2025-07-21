import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Database } from '@/lib/database.types'
import { useToast } from '@/hooks/use-toast'

type Complaint = Database['public']['Tables']['complaints']['Row'] & {
  customer: { id: string; name: string; phone: string } | null
}
type ComplaintInsert = Database['public']['Tables']['complaints']['Insert']
type ComplaintUpdate = Database['public']['Tables']['complaints']['Update']

export const useComplaints = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  // Fetch all complaints with customer data
  const fetchComplaints = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('complaints')
        .select(`
          *,
          customer:customers!complaints_customer_id_fkey (
            id,
            name,
            phone
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setComplaints(data || [])
    } catch (err: any) {
      setError(err.message)
      toast({
        title: "Error",
        description: "Failed to fetch complaints",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Add new complaint
  const addComplaint = async (complaint: ComplaintInsert) => {
    try {
      const { data, error } = await supabase
        .from('complaints')
        .insert(complaint)
        .select(`
          *,
          customer:customers!complaints_customer_id_fkey (
            id,
            name,
            phone
          )
        `)
        .single()

      if (error) throw error
      
      setComplaints(prev => [data, ...prev])
      toast({
        title: "Success",
        description: "Complaint submitted successfully",
      })
      return { data, error: null }
    } catch (err: any) {
      toast({
        title: "Error",
        description: "Failed to submit complaint",
        variant: "destructive",
      })
      return { data: null, error: err.message }
    }
  }

  // Update complaint
  const updateComplaint = async (id: string, updates: ComplaintUpdate) => {
    try {
      const { data, error } = await supabase
        .from('complaints')
        .update(updates)
        .eq('id', id)
        .select(`
          *,
          customer:customers!complaints_customer_id_fkey (
            id,
            name,
            phone
          )
        `)
        .single()

      if (error) throw error
      
      setComplaints(prev => prev.map(complaint => 
        complaint.id === id ? data : complaint
      ))
      toast({
        title: "Success",
        description: "Complaint updated successfully",
      })
      return { data, error: null }
    } catch (err: any) {
      toast({
        title: "Error",
        description: "Failed to update complaint",
        variant: "destructive",
      })
      return { data: null, error: err.message }
    }
  }

  // Delete complaint
  const deleteComplaint = async (id: string) => {
    try {
      const { error } = await supabase
        .from('complaints')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      setComplaints(prev => prev.filter(complaint => complaint.id !== id))
      toast({
        title: "Success",
        description: "Complaint deleted successfully",
      })
      return { error: null }
    } catch (err: any) {
      toast({
        title: "Error",
        description: "Failed to delete complaint",
        variant: "destructive",
      })
      return { error: err.message }
    }
  }

  // Get complaint stats
  const getComplaintStats = () => {
    const open = complaints.filter(c => c.status === 'Open').length
    const inProgress = complaints.filter(c => c.status === 'In Progress').length
    const resolved = complaints.filter(c => c.status === 'Resolved').length
    const closed = complaints.filter(c => c.status === 'Closed').length
    
    const critical = complaints.filter(c => c.priority === 'Critical').length
    const high = complaints.filter(c => c.priority === 'High').length

    // Calculate resolution time for resolved complaints
    const resolvedComplaints = complaints.filter(c => c.status === 'Resolved' || c.status === 'Closed')
    const avgResolutionTime = resolvedComplaints.length > 0
      ? resolvedComplaints.reduce((sum, c) => {
          const created = new Date(c.created_at)
          const updated = new Date(c.updated_at)
          const diffHours = (updated.getTime() - created.getTime()) / (1000 * 60 * 60)
          return sum + diffHours
        }, 0) / resolvedComplaints.length
      : 0

    return { open, inProgress, resolved, closed, critical, high, avgResolutionTime }
  }

  useEffect(() => {
    fetchComplaints()
  }, [])

  return {
    complaints,
    loading,
    error,
    addComplaint,
    updateComplaint,
    deleteComplaint,
    refetch: fetchComplaints,
    stats: getComplaintStats(),
  }
}