import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Send,
  Download,
  FileText,
  DollarSign,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Clock
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

// Mock bills data
const bills = [
  {
    id: "B2024070001",
    customerId: "W2001",
    customerName: "John Kamau",
    meterNumber: "TW2001",
    billingPeriod: "July 2024",
    consumption: 5.3,
    rate: 45.50,
    waterCharges: 241.15,
    sewerageCharges: 120.58,
    serviceCharge: 150.00,
    totalAmount: 511.73,
    dueDate: "2024-08-15",
    status: "Sent",
    issueDate: "2024-07-30"
  },
  {
    id: "B2024070002",
    customerId: "W2002",
    customerName: "Mary Wanjiku", 
    meterNumber: "TW2002",
    billingPeriod: "July 2024",
    consumption: 4.1,
    rate: 45.50,
    waterCharges: 186.55,
    sewerageCharges: 93.28,
    serviceCharge: 150.00,
    totalAmount: 429.83,
    dueDate: "2024-08-15",
    status: "Paid",
    issueDate: "2024-07-30"
  },
  {
    id: "B2024070003",
    customerId: "W2003",
    customerName: "Peter Mwangi",
    meterNumber: "TW2003", 
    billingPeriod: "July 2024",
    consumption: 4.3,
    rate: 45.50,
    waterCharges: 195.65,
    sewerageCharges: 97.83,
    serviceCharge: 150.00,
    totalAmount: 443.48,
    dueDate: "2024-08-15",
    status: "Overdue",
    issueDate: "2024-07-30"
  },
  {
    id: "B2024070004",
    customerId: "W2004",
    customerName: "Grace Njeri",
    meterNumber: "TW2004",
    billingPeriod: "July 2024", 
    consumption: 4.4,
    rate: 45.50,
    waterCharges: 200.20,
    sewerageCharges: 100.10,
    serviceCharge: 150.00,
    totalAmount: 450.30,
    dueDate: "2024-08-15",
    status: "Pending",
    issueDate: "2024-07-30"
  },
  {
    id: "B2024070005",
    customerId: "W2005",
    customerName: "James Kariuki",
    meterNumber: "TW2005",
    billingPeriod: "July 2024",
    consumption: 3.7,
    rate: 45.50,
    waterCharges: 168.35,
    sewerageCharges: 84.18,
    serviceCharge: 150.00,
    totalAmount: 402.53,
    dueDate: "2024-08-15",
    status: "Sent",
    issueDate: "2024-07-30"
  }
];

const Bills = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredBills = bills.filter(bill => {
    const matchesSearch = bill.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.customerId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || bill.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid": return "success";
      case "sent": return "primary";
      case "pending": return "warning";
      case "overdue": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid": return CheckCircle2;
      case "sent": return Send;
      case "pending": return Clock;
      case "overdue": return AlertCircle;
      default: return FileText;
    }
  };

  const totalRevenue = bills.reduce((sum, bill) => sum + bill.totalAmount, 0);
  const paidBills = bills.filter(bill => bill.status === "Paid");
  const overdueBills = bills.filter(bill => bill.status === "Overdue");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Bills</h1>
          <p className="text-muted-foreground">Manage water service billing</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Send className="h-4 w-4 mr-2" />
            Send Bills
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Generate Bill
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-primary">KSh {(totalRevenue / 1000).toFixed(1)}K</p>
                <p className="text-sm text-muted-foreground">Total Billed</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-success">{paidBills.length}</p>
                <p className="text-sm text-muted-foreground">Paid Bills</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-destructive">{overdueBills.length}</p>
                <p className="text-sm text-muted-foreground">Overdue</p>
              </div>
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">KSh 45.50</p>
                <p className="text-sm text-muted-foreground">Rate per m³</p>
              </div>
              <FileText className="h-8 w-8 text-foreground" />
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
                placeholder="Search by customer name, bill ID, or customer ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bills Table */}
      <Card>
        <CardHeader>
          <CardTitle>Bills - July 2024</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bill ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Consumption</TableHead>
                  <TableHead>Water Charges</TableHead>
                  <TableHead>Sewerage</TableHead>
                  <TableHead>Service Fee</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBills.map((bill) => {
                  const StatusIcon = getStatusIcon(bill.status);
                  const isOverdue = new Date(bill.dueDate) < new Date() && bill.status !== "Paid";
                  
                  return (
                    <TableRow key={bill.id}>
                      <TableCell className="font-medium">{bill.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{bill.customerName}</p>
                          <p className="text-sm text-muted-foreground">{bill.customerId}</p>
                        </div>
                      </TableCell>
                      <TableCell>{bill.billingPeriod}</TableCell>
                      <TableCell>{bill.consumption} m³</TableCell>
                      <TableCell>KSh {bill.waterCharges.toFixed(2)}</TableCell>
                      <TableCell>KSh {bill.sewerageCharges.toFixed(2)}</TableCell>
                      <TableCell>KSh {bill.serviceCharge.toFixed(2)}</TableCell>
                      <TableCell className="font-medium">
                        KSh {bill.totalAmount.toFixed(2)}
                      </TableCell>
                      <TableCell className={isOverdue ? "text-destructive" : ""}>
                        {new Date(bill.dueDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(bill.status) as any} className="flex items-center gap-1 w-fit">
                          <StatusIcon className="h-3 w-3" />
                          {bill.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Send className="h-4 w-4" />
                          </Button>
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

export default Bills;