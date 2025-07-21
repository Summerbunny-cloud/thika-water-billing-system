import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Database } from '@/lib/database.types'
import { useToast } from '@/hooks/use-toast'

type Customer = Database['public']['Tables']['customers']['Row']
type CustomerInsert = Database['public']['Tables']['customers']['Insert']
type CustomerUpdate = Database['public']['Tables']['customers']['Update']

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  // Fetch all customers
  const fetchCustomers = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setCustomers(data || [])
    } catch (err: any) {
      setError(err.message)
      toast({
        title: "Error",
        description: "Failed to fetch customers",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Add new customer
  const addCustomer = async (customer: CustomerInsert) => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .insert(customer)
        .select()
        .single()

      if (error) throw error
      
      setCustomers(prev => [data, ...prev])
      toast({
        title: "Success",
        description: "Customer added successfully",
      })
      return { data, error: null }
    } catch (err: any) {
      toast({
        title: "Error",
        description: "Failed to add customer",
        variant: "destructive",
      })
      return { data: null, error: err.message }
    }
  }

  // Update customer
  const updateCustomer = async (id: string, updates: CustomerUpdate) => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      
      setCustomers(prev => prev.map(customer => 
        customer.id === id ? data : customer
      ))
      toast({
        title: "Success",
        description: "Customer updated successfully",
      })
      return { data, error: null }
    } catch (err: any) {
      toast({
        title: "Error",
        description: "Failed to update customer",
        variant: "destructive",
      })
      return { data: null, error: err.message }
    }
  }

  // Delete customer
  const deleteCustomer = async (id: string) => {
    try {
      const { error } = await supabase
        .from('customers')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      setCustomers(prev => prev.filter(customer => customer.id !== id))
      toast({
        title: "Success",
        description: "Customer deleted successfully",
      })
      return { error: null }
    } catch (err: any) {
      toast({
        title: "Error",
        description: "Failed to delete customer",
        variant: "destructive",
      })
      return { error: err.message }
    }
  }

  // Get customer stats
  const getCustomerStats = () => {
    const active = customers.filter(c => c.status === 'Active').length
    const inactive = customers.filter(c => c.status === 'Inactive').length
    const suspended = customers.filter(c => c.status === 'Suspended').length
    const total = customers.length

    return { active, inactive, suspended, total }
  }

  useEffect(() => {
    fetchCustomers()
  }, [])

  return {
    customers,
    loading,
    error,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    refetch: fetchCustomers,
    stats: getCustomerStats(),
  }
}