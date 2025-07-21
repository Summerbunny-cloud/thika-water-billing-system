import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Database } from '@/lib/database.types'
import { useToast } from '@/hooks/use-toast'

type Bill = Database['public']['Tables']['bills']['Row'] & {
  customer: { id: string; name: string } | null
}
type BillInsert = Database['public']['Tables']['bills']['Insert']
type BillUpdate = Database['public']['Tables']['bills']['Update']

export const useBills = () => {
  const [bills, setBills] = useState<Bill[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  // Fetch all bills with customer data
  const fetchBills = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('bills')
        .select(`
          *,
          customer:customers!bills_customer_id_fkey (
            id,
            name
          )
        `)
        .order('issue_date', { ascending: false })

      if (error) throw error
      setBills(data || [])
    } catch (err: any) {
      setError(err.message)
      toast({
        title: "Error",
        description: "Failed to fetch bills",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Generate bill
  const generateBill = async (billData: Omit<BillInsert, 'total_amount'>) => {
    try {
      // Calculate total amount
      const totalAmount = billData.water_charges + billData.sewerage_charges + billData.service_charge

      const { data, error } = await supabase
        .from('bills')
        .insert({ ...billData, total_amount: totalAmount })
        .select(`
          *,
          customer:customers!bills_customer_id_fkey (
            id,
            name
          )
        `)
        .single()

      if (error) throw error
      
      setBills(prev => [data, ...prev])
      
      // Update customer's outstanding amount
      await supabase
        .from('customers')
        .update({ outstanding_amount: totalAmount })
        .eq('id', billData.customer_id)

      toast({
        title: "Success",
        description: "Bill generated successfully",
      })
      return { data, error: null }
    } catch (err: any) {
      toast({
        title: "Error",
        description: "Failed to generate bill",
        variant: "destructive",
      })
      return { data: null, error: err.message }
    }
  }

  // Update bill
  const updateBill = async (id: string, updates: BillUpdate) => {
    try {
      // Recalculate total if charges changed
      if (updates.water_charges !== undefined || 
          updates.sewerage_charges !== undefined || 
          updates.service_charge !== undefined) {
        const bill = bills.find(b => b.id === id)
        if (bill) {
          const waterCharges = updates.water_charges ?? bill.water_charges
          const sewerageCharges = updates.sewerage_charges ?? bill.sewerage_charges
          const serviceCharge = updates.service_charge ?? bill.service_charge
          updates.total_amount = waterCharges + sewerageCharges + serviceCharge
        }
      }

      const { data, error } = await supabase
        .from('bills')
        .update(updates)
        .eq('id', id)
        .select(`
          *,
          customer:customers!bills_customer_id_fkey (
            id,
            name
          )
        `)
        .single()

      if (error) throw error
      
      setBills(prev => prev.map(bill => 
        bill.id === id ? data : bill
      ))
      toast({
        title: "Success",
        description: "Bill updated successfully",
      })
      return { data, error: null }
    } catch (err: any) {
      toast({
        title: "Error",
        description: "Failed to update bill",
        variant: "destructive",
      })
      return { data: null, error: err.message }
    }
  }

  // Delete bill
  const deleteBill = async (id: string) => {
    try {
      const { error } = await supabase
        .from('bills')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      setBills(prev => prev.filter(bill => bill.id !== id))
      toast({
        title: "Success",
        description: "Bill deleted successfully",
      })
      return { error: null }
    } catch (err: any) {
      toast({
        title: "Error",
        description: "Failed to delete bill",
        variant: "destructive",
      })
      return { error: err.message }
    }
  }

  // Get bill stats
  const getBillStats = () => {
    const totalRevenue = bills.reduce((sum, bill) => sum + bill.total_amount, 0)
    const paidBills = bills.filter(b => b.status === 'Paid').length
    const overdueBills = bills.filter(b => {
      const dueDate = new Date(b.due_date)
      const today = new Date()
      return dueDate < today && b.status !== 'Paid'
    }).length
    const currentRate = 45.50 // KSh per m³

    return { totalRevenue, paidBills, overdueBills, currentRate }
  }

  useEffect(() => {
    fetchBills()
  }, [])

  return {
    bills,
    loading,
    error,
    generateBill,
    updateBill,
    deleteBill,
    refetch: fetchBills,
    stats: getBillStats(),
  }
}