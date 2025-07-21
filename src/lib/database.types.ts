export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      customers: {
        Row: {
          id: string
          name: string
          phone: string
          email: string
          address: string
          meter_number: string
          status: 'Active' | 'Inactive' | 'Suspended'
          connection_date: string
          last_reading: number
          outstanding_amount: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          phone: string
          email: string
          address: string
          meter_number: string
          status?: 'Active' | 'Inactive' | 'Suspended'
          connection_date: string
          last_reading?: number
          outstanding_amount?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          phone?: string
          email?: string
          address?: string
          meter_number?: string
          status?: 'Active' | 'Inactive' | 'Suspended'
          connection_date?: string
          last_reading?: number
          outstanding_amount?: number
          created_at?: string
          updated_at?: string
        }
      }
      meter_readings: {
        Row: {
          id: string
          customer_id: string
          meter_number: string
          previous_reading: number
          current_reading: number
          consumption: number
          reading_date: string
          status: 'Confirmed' | 'Pending' | 'Anomaly'
          reader: string
          location: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          meter_number: string
          previous_reading: number
          current_reading: number
          consumption: number
          reading_date: string
          status?: 'Confirmed' | 'Pending' | 'Anomaly'
          reader: string
          location: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          customer_id?: string
          meter_number?: string
          previous_reading?: number
          current_reading?: number
          consumption?: number
          reading_date?: string
          status?: 'Confirmed' | 'Pending' | 'Anomaly'
          reader?: string
          location?: string
          created_at?: string
          updated_at?: string
        }
      }
      bills: {
        Row: {
          id: string
          customer_id: string
          meter_number: string
          billing_period: string
          consumption: number
          rate: number
          water_charges: number
          sewerage_charges: number
          service_charge: number
          total_amount: number
          due_date: string
          status: 'Pending' | 'Sent' | 'Paid' | 'Overdue'
          issue_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          meter_number: string
          billing_period: string
          consumption: number
          rate: number
          water_charges: number
          sewerage_charges: number
          service_charge: number
          total_amount: number
          due_date: string
          status?: 'Pending' | 'Sent' | 'Paid' | 'Overdue'
          issue_date: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          customer_id?: string
          meter_number?: string
          billing_period?: string
          consumption?: number
          rate?: number
          water_charges?: number
          sewerage_charges?: number
          service_charge?: number
          total_amount?: number
          due_date?: string
          status?: 'Pending' | 'Sent' | 'Paid' | 'Overdue'
          issue_date?: string
          created_at?: string
          updated_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          customer_id: string
          bill_id: string
          amount: number
          payment_method: 'M-Pesa' | 'Bank Transfer' | 'Cash' | 'Card'
          transaction_ref: string
          payment_date: string
          status: 'Completed' | 'Pending' | 'Failed'
          phone_number: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          bill_id: string
          amount: number
          payment_method: 'M-Pesa' | 'Bank Transfer' | 'Cash' | 'Card'
          transaction_ref: string
          payment_date: string
          status?: 'Completed' | 'Pending' | 'Failed'
          phone_number?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          customer_id?: string
          bill_id?: string
          amount?: number
          payment_method?: 'M-Pesa' | 'Bank Transfer' | 'Cash' | 'Card'
          transaction_ref?: string
          payment_date?: string
          status?: 'Completed' | 'Pending' | 'Failed'
          phone_number?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      complaints: {
        Row: {
          id: string
          customer_id: string
          title: string
          description: string
          category: 'Water Quality' | 'No Water' | 'Low Pressure' | 'Billing' | 'Meter' | 'Other'
          priority: 'Low' | 'Medium' | 'High' | 'Critical'
          status: 'Open' | 'In Progress' | 'Resolved' | 'Closed'
          assigned_to: string | null
          resolution: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          title: string
          description: string
          category: 'Water Quality' | 'No Water' | 'Low Pressure' | 'Billing' | 'Meter' | 'Other'
          priority?: 'Low' | 'Medium' | 'High' | 'Critical'
          status?: 'Open' | 'In Progress' | 'Resolved' | 'Closed'
          assigned_to?: string | null
          resolution?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          customer_id?: string
          title?: string
          description?: string
          category?: 'Water Quality' | 'No Water' | 'Low Pressure' | 'Billing' | 'Meter' | 'Other'
          priority?: 'Low' | 'Medium' | 'High' | 'Critical'
          status?: 'Open' | 'In Progress' | 'Resolved' | 'Closed'
          assigned_to?: string | null
          resolution?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          email: string
          role: 'admin' | 'staff' | 'customer'
          customer_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          role?: 'admin' | 'staff' | 'customer'
          customer_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'admin' | 'staff' | 'customer'
          customer_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}