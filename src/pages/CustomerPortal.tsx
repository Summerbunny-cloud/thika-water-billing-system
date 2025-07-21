import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Droplets,
  CreditCard,
  FileText,
  MessageSquare,
  TrendingUp,
  Calendar,
  User,
  Download,
  AlertTriangle,
  CheckCircle2,
  Smartphone,
  Building
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Label,
} from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock customer data (assuming logged-in customer)
const customerData = {
  id: "W2001",
  name: "John Kamau",
  phone: "+254712345678",
  email: "john.kamau@email.com",
  address: "Plot 45, Thika Town",
  meterNumber: "TW2001",
  status: "Active",
  connectionDate: "2022-01-15",
  currentReading: 145.5,
  previousReading: 140.2,
  monthlyConsumption: 5.3,
  outstandingBalance: 2450.00
};

// Mock usage history
const usageHistory = [
  { month: "Jan", consumption: 4.2, cost: 380.50 },
  { month: "Feb", consumption: 3.8, cost: 340.20 },
  { month: "Mar", consumption: 5.1, cost: 465.80 },
  { month: "Apr", consumption: 4.9, cost: 445.30 },
  { month: "May", consumption: 5.5, cost: 498.20 },
  { month: "Jun", consumption: 4.7, cost: 425.60 },
  { month: "Jul", consumption: 5.3, cost: 511.73 },
];

// Mock bills
const recentBills = [
  {
    id: "B2024070001",
    period: "July 2024",
    amount: 511.73,
    dueDate: "2024-08-15",
    status: "Unpaid"
  },
  {
    id: "B2024060001", 
    period: "June 2024",
    amount: 425.60,
    dueDate: "2024-07-15",
    status: "Paid"
  },
  {
    id: "B2024050001",
    period: "May 2024", 
    amount: 498.20,
    dueDate: "2024-06-15",
    status: "Paid"
  }
];

// Mock complaints
const myComplaints = [
  {
    id: "C2024070001",
    subject: "Low Water Pressure",
    status: "In Progress",
    date: "2024-07-26",
    priority: "High"
  },
  {
    id: "C2024060001",
    subject: "Billing Query",
    status: "Resolved", 
    date: "2024-06-15",
    priority: "Medium"
  }
];

const CustomerPortal = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Droplets className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Thika Water Portal</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {customerData.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-success/10 text-success border-success">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                {customerData.status}
              </Badge>
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Account Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current Reading</p>
                  <p className="text-2xl font-bold text-primary">{customerData.currentReading} m³</p>
                  <p className="text-xs text-muted-foreground">Meter: {customerData.meterNumber}</p>
                </div>
                <Droplets className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold text-foreground">{customerData.monthlyConsumption} m³</p>
                  <p className="text-xs text-success">+0.6 from last month</p>
                </div>
                <TrendingUp className="h-8 w-8 text-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Outstanding Balance</p>
                  <p className="text-2xl font-bold text-destructive">KSh {customerData.outstandingBalance.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">Due Aug 15</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Account Status</p>
                  <p className="text-lg font-bold text-success">Active</p>
                  <p className="text-xs text-muted-foreground">Since Jan 2022</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="h-16 flex-col gap-2">
                    <CreditCard className="h-6 w-6" />
                    Pay Bill
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Pay Your Bill</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Outstanding Amount</p>
                      <p className="text-2xl font-bold">KSh {customerData.outstandingBalance.toFixed(2)}</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Payment Method</Label>
                      <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mpesa">
                            <div className="flex items-center gap-2">
                              <Smartphone className="h-4 w-4" />
                              M-Pesa
                            </div>
                          </SelectItem>
                          <SelectItem value="bank">
                            <div className="flex items-center gap-2">
                              <Building className="h-4 w-4" />
                              Bank Transfer
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full">Proceed to Payment</Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Button variant="outline" className="h-16 flex-col gap-2">
                <FileText className="h-6 w-6" />
                View Bills
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="h-16 flex-col gap-2">
                    <MessageSquare className="h-6 w-6" />
                    Report Issue
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Report an Issue</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Issue Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select issue type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pressure">Low Water Pressure</SelectItem>
                          <SelectItem value="supply">No Water Supply</SelectItem>
                          <SelectItem value="quality">Water Quality</SelectItem>
                          <SelectItem value="billing">Billing Issue</SelectItem>
                          <SelectItem value="emergency">Emergency</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea placeholder="Describe the issue in detail..." rows={4} />
                    </div>
                    <Button className="w-full">Submit Complaint</Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Button variant="outline" className="h-16 flex-col gap-2">
                <Download className="h-6 w-6" />
                Download Receipt
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Usage Trend and Recent Bills */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Usage Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Water Usage Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={usageHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} m³`, "Consumption"]} />
                  <Line 
                    type="monotone" 
                    dataKey="consumption" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Bills */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Recent Bills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBills.map((bill) => (
                  <div key={bill.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{bill.period}</p>
                      <p className="text-sm text-muted-foreground">Due: {new Date(bill.dueDate).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">KSh {bill.amount.toFixed(2)}</p>
                      <Badge variant={bill.status === "Paid" ? "success" : "destructive" as any}>
                        {bill.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* My Complaints */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              My Complaints
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Complaint ID</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myComplaints.map((complaint) => (
                  <TableRow key={complaint.id}>
                    <TableCell className="font-medium">{complaint.id}</TableCell>
                    <TableCell>{complaint.subject}</TableCell>
                    <TableCell>{new Date(complaint.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={complaint.priority === "High" ? "destructive" : "warning" as any}>
                        {complaint.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={complaint.status === "Resolved" ? "success" : "warning" as any}>
                        {complaint.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerPortal;