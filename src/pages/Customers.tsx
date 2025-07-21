import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Trash2,
  Filter,
  Download,
  MapPin,
  Phone,
  Mail,
  Calendar
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

// Mock customer data
const customers = [
  {
    id: "W2001",
    name: "John Kamau",
    phone: "+254 712 345 678",
    email: "john.kamau@email.com",
    address: "Plot 45, Thika Town",
    meterNumber: "TW2001",
    status: "Active",
    connectionDate: "2022-01-15",
    lastReading: "145.5 m³",
    outstanding: "KSh 2,450"
  },
  {
    id: "W2002", 
    name: "Mary Wanjiku",
    phone: "+254 723 456 789",
    email: "mary.wanjiku@email.com",
    address: "House 12B, Landless Estate",
    meterNumber: "TW2002",
    status: "Active",
    connectionDate: "2021-08-22",
    lastReading: "89.2 m³",
    outstanding: "KSh 0"
  },
  {
    id: "W2003",
    name: "Peter Mwangi",
    phone: "+254 734 567 890",
    email: "peter.mwangi@email.com", 
    address: "Kenyatta Road, Plot 7",
    meterNumber: "TW2003",
    status: "Suspended",
    connectionDate: "2020-03-10",
    lastReading: "203.1 m³",
    outstanding: "KSh 8,920"
  },
  {
    id: "W2004",
    name: "Grace Njeri",
    phone: "+254 745 678 901",
    email: "grace.njeri@email.com",
    address: "Blue Post Area, House 24",
    meterNumber: "TW2004", 
    status: "Active",
    connectionDate: "2023-02-18",
    lastReading: "56.8 m³",
    outstanding: "KSh 1,200"
  },
  {
    id: "W2005",
    name: "James Kariuki",
    phone: "+254 756 789 012",
    email: "james.kariuki@email.com",
    address: "Makongeni Estate, Block C",
    meterNumber: "TW2005",
    status: "Inactive", 
    connectionDate: "2019-11-05",
    lastReading: "178.9 m³",
    outstanding: "KSh 4,680"
  }
];

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm) ||
                         customer.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || customer.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active": return "success";
      case "suspended": return "destructive";
      case "inactive": return "warning";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Customers</h1>
          <p className="text-muted-foreground">Manage water service customers</p>
        </div>
        <Button className="sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, phone, or customer ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-success">8,453</p>
              <p className="text-sm text-muted-foreground">Active</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">1,247</p>
              <p className="text-sm text-muted-foreground">Inactive</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-destructive">234</p>
              <p className="text-sm text-muted-foreground">Suspended</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">9,934</p>
              <p className="text-sm text-muted-foreground">Total</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Meter No.</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Reading</TableHead>
                  <TableHead>Outstanding</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {customer.address}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-sm flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {customer.phone}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {customer.email}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{customer.meterNumber}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(customer.status) as any}>
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{customer.lastReading}</TableCell>
                    <TableCell className={customer.outstanding === "KSh 0" ? "text-success" : "text-destructive"}>
                      {customer.outstanding}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Customers;