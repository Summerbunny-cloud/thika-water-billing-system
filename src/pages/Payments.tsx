import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  CreditCard,
  Smartphone,
  Building,
  Download,
  CheckCircle2,
  Clock,
  X,
  DollarSign,
  TrendingUp
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock payments data
const payments = [
  {
    id: "P2024070001",
    customerId: "W2001",
    customerName: "John Kamau",
    billId: "B2024070001",
    amount: 511.73,
    paymentMethod: "M-Pesa",
    transactionRef: "PH67KL89M",
    paymentDate: "2024-07-28 14:30",
    status: "Completed",
    phoneNumber: "+254712345678"
  },
  {
    id: "P2024070002", 
    customerId: "W2002",
    customerName: "Mary Wanjiku",
    billId: "B2024070002",
    amount: 429.83,
    paymentMethod: "Bank Transfer",
    transactionRef: "BT789456123",
    paymentDate: "2024-07-27 10:15",
    status: "Completed",
    phoneNumber: "+254723456789"
  },
  {
    id: "P2024070003",
    customerId: "W2004",
    customerName: "Grace Njeri",
    billId: "B2024070004",
    amount: 450.30,
    paymentMethod: "Cash",
    transactionRef: "CSH2024001",
    paymentDate: "2024-07-26 09:45",
    status: "Completed",
    phoneNumber: "+254745678901"
  },
  {
    id: "P2024070004",
    customerId: "W2001",
    customerName: "John Kamau", 
    billId: "B2024060001",
    amount: 487.20,
    paymentMethod: "M-Pesa",
    transactionRef: "PH23FG45H",
    paymentDate: "2024-07-25 16:20",
    status: "Completed",
    phoneNumber: "+254712345678"
  },
  {
    id: "P2024070005",
    customerId: "W2003",
    customerName: "Peter Mwangi",
    billId: "B2024070003",
    amount: 200.00,
    paymentMethod: "M-Pesa",
    transactionRef: "PH89JK12L",
    paymentDate: "2024-07-24 11:30",
    status: "Pending",
    phoneNumber: "+254734567890"
  }
];

const Payments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [methodFilter, setMethodFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.transactionRef.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMethod = methodFilter === "all" || payment.paymentMethod.toLowerCase().includes(methodFilter.toLowerCase());
    const matchesStatus = statusFilter === "all" || payment.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesMethod && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed": return "success";
      case "pending": return "warning";
      case "failed": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed": return CheckCircle2;
      case "pending": return Clock;
      case "failed": return X;
      default: return CreditCard;
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case "m-pesa": return Smartphone;
      case "bank transfer": return Building;
      case "cash": return DollarSign;
      default: return CreditCard;
    }
  };

  const totalPayments = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const completedPayments = filteredPayments.filter(p => p.status === "Completed");
  const pendingPayments = filteredPayments.filter(p => p.status === "Pending");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payments</h1>
          <p className="text-muted-foreground">Track and manage customer payments</p>
        </div>
        <Button>
          <CreditCard className="h-4 w-4 mr-2" />
          Record Payment
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-success">KSh {(totalPayments / 1000).toFixed(1)}K</p>
                <p className="text-sm text-muted-foreground">Total Collected</p>
              </div>
              <DollarSign className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-primary">{completedPayments.length}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-warning">{pendingPayments.length}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-primary">67%</p>
                <p className="text-sm text-muted-foreground">M-Pesa Usage</p>
              </div>
              <Smartphone className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by customer name, payment ID, or transaction reference..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={methodFilter} onValueChange={setMethodFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="m-pesa">M-Pesa</SelectItem>
                <SelectItem value="bank">Bank Transfer</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History - July 2024</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Bill ID</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Transaction Ref</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => {
                  const StatusIcon = getStatusIcon(payment.status);
                  const MethodIcon = getMethodIcon(payment.paymentMethod);
                  
                  return (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{payment.customerName}</p>
                          <p className="text-sm text-muted-foreground">{payment.customerId}</p>
                        </div>
                      </TableCell>
                      <TableCell>{payment.billId}</TableCell>
                      <TableCell className="font-medium">
                        KSh {payment.amount.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MethodIcon className="h-4 w-4 text-muted-foreground" />
                          {payment.paymentMethod}
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {payment.transactionRef}
                      </TableCell>
                      <TableCell>
                        {new Date(payment.paymentDate).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(payment.status) as any} className="flex items-center gap-1 w-fit">
                          <StatusIcon className="h-3 w-3" />
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost">
                            <Download className="h-4 w-4" />
                          </Button>
                          {payment.status === "Pending" && (
                            <Button size="sm" variant="ghost">
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payments;