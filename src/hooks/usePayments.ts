import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Database } from '@/lib/database.types'
import { useToast } from '@/hooks/use-toast'

type Payment = Database['public']['Tables']['payments']['Row'] & {
  customer: { id: string; name: string } | null
  bill: { id: string; total_amount: number } | null
}
type PaymentInsert = Database['public']['Tables']['payments']['Insert']
type PaymentUpdate = Database['public']['Tables']['payments']['Update']

export const usePayments = () => {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  // Fetch all payments with customer and bill data
  const fetchPayments = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('payments')
        .select(`
          *,
          customer:customers!payments_customer_id_fkey (
            id,
            name
          ),
          bill:bills!payments_bill_id_fkey (
            id,
            total_amount
          )
        `)
        .order('payment_date', { ascending: false })

      if (error) throw error
      setPayments(data || [])
    } catch (err: any) {
      setError(err.message)
      toast({
        title: "Error",
        description: "Failed to fetch payments",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Record new payment
  const recordPayment = async (payment: PaymentInsert) => {
    try {
      const { data, error } = await supabase
        .from('payments')
        .insert(payment)
        .select(`
          *,
          customer:customers!payments_customer_id_fkey (
            id,
            name
          ),
          bill:bills!payments_bill_id_fkey (
            id,
            total_amount
          )
        `)
        .single()

      if (error) throw error
      
      setPayments(prev => [data, ...prev])

      // If payment is completed, update bill status and customer outstanding
      if (payment.status === 'Completed') {
        await supabase
          .from('bills')
          .update({ status: 'Paid' })
          .eq('id', payment.bill_id)

        // Update customer outstanding amount
        const { data: customerData } = await supabase
          .from('customers')
          .select('outstanding_amount')
          .eq('id', payment.customer_id)
          .single()

        if (customerData) {
          const newOutstanding = Math.max(0, customerData.outstanding_amount - payment.amount)
          await supabase
            .from('customers')
            .update({ outstanding_amount: newOutstanding })
            .eq('id', payment.customer_id)
        }
      }

      toast({
        title: "Success",
        description: "Payment recorded successfully",
      })
      return { data, error: null }
    } catch (err: any) {
      toast({
        title: "Error",
        description: "Failed to record payment",
        variant: "destructive",
      })
      return { data: null, error: err.message }
    }
  }

  // Update payment
  const updatePayment = async (id: string, updates: PaymentUpdate) => {
    try {
      const { data, error } = await supabase
        .from('payments')
        .update(updates)
        .eq('id', id)
        .select(`
          *,
          customer:customers!payments_customer_id_fkey (
            id,
            name
          ),
          bill:bills!payments_bill_id_fkey (
            id,
            total_amount
          )
        `)
        .single()

      if (error) throw error
      
      setPayments(prev => prev.map(payment => 
        payment.id === id ? data : payment
      ))

      // Handle status changes
      if (updates.status === 'Completed') {
        const payment = payments.find(p => p.id === id)
        if (payment) {
          await supabase
            .from('bills')
            .update({ status: 'Paid' })
            .eq('id', payment.bill_id)
        }
      }

      toast({
        title: "Success",
        description: "Payment updated successfully",
      })
      return { data, error: null }
    } catch (err: any) {
      toast({
        title: "Error",
        description: "Failed to update payment",
        variant: "destructive",
      })
      return { data: null, error: err.message }
    }
  }

  // Delete payment
  const deletePayment = async (id: string) => {
    try {
      const { error } = await supabase
        .from('payments')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      setPayments(prev => prev.filter(payment => payment.id !== id))
      toast({
        title: "Success",
        description: "Payment deleted successfully",
      })
      return { error: null }
    } catch (err: any) {
      toast({
        title: "Error",
        description: "Failed to delete payment",
        variant: "destructive",
      })
      return { error: err.message }
    }
  }

  // Get payment stats
  const getPaymentStats = () => {
    const totalCollected = payments
      .filter(p => p.status === 'Completed')
      .reduce((sum, p) => sum + p.amount, 0)
    
    const completedPayments = payments.filter(p => p.status === 'Completed').length
    const pendingPayments = payments.filter(p => p.status === 'Pending').length
    
    const mpesaPayments = payments.filter(p => p.payment_method === 'M-Pesa').length
    const mpesaUsage = payments.length > 0 ? (mpesaPayments / payments.length) * 100 : 0

    return { totalCollected, completedPayments, pendingPayments, mpesaUsage }
  }

  useEffect(() => {
    fetchPayments()
  }, [])

  return {
    payments,
    loading,
    error,
    recordPayment,
    updatePayment,
    deletePayment,
    refetch: fetchPayments,
    stats: getPaymentStats(),
  }
}