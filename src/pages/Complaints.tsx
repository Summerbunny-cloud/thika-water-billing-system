import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, 
  Plus, 
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertTriangle,
  User,
  Calendar,
  Phone,
  Mail
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Label,
} from "@/components/ui/label";

// Mock complaints data
const complaints = [
  {
    id: "C2024070001",
    customerId: "W2001", 
    customerName: "John Kamau",
    phone: "+254712345678",
    email: "john.kamau@email.com",
    subject: "Low Water Pressure",
    description: "Water pressure has been very low for the past 3 days in our area. Unable to fill tanks properly.",
    category: "Technical",
    priority: "High",
    status: "In Progress",
    dateSubmitted: "2024-07-26",
    assignedTo: "Peter Mbugua",
    location: "Thika Town, Plot 45"
  },
  {
    id: "C2024070002",
    customerId: "W2003",
    customerName: "Peter Mwangi", 
    phone: "+254734567890",
    email: "peter.mwangi@email.com",
    subject: "Billing Discrepancy",
    description: "My bill shows consumption of 15m³ but my meter reading is only 8m³. Please verify.",
    category: "Billing",
    priority: "Medium",
    status: "Resolved",
    dateSubmitted: "2024-07-24",
    assignedTo: "Grace Muthoni",
    location: "Kenyatta Road, Plot 7"
  },
  {
    id: "C2024070003",
    customerId: "W2004",
    customerName: "Grace Njeri",
    phone: "+254745678901", 
    email: "grace.njeri@email.com",
    subject: "No Water Supply",
    description: "No water supply for 2 days. Neighbors also affected. Need urgent attention.",
    category: "Service",
    priority: "Critical",
    status: "Open",
    dateSubmitted: "2024-07-28",
    assignedTo: "John Kiprotich",
    location: "Blue Post Area, House 24"
  },
  {
    id: "C2024070004", 
    customerId: "W2002",
    customerName: "Mary Wanjiku",
    phone: "+254723456789",
    email: "mary.wanjiku@email.com",
    subject: "Burst Pipe",
    description: "Water pipe burst outside my compound causing flooding. Reported to emergency line.",
    category: "Emergency",
    priority: "Critical",
    status: "In Progress",
    dateSubmitted: "2024-07-27",
    assignedTo: "Emergency Team",
    location: "Landless Estate, House 12B"
  },
  {
    id: "C2024070005",
    customerId: "W2005",
    customerName: "James Kariuki",
    phone: "+254756789012",
    email: "james.kariuki@email.com", 
    subject: "Dirty Water",
    description: "Water coming out dirty/brownish. Started 3 days ago. Not safe for consumption.",
    category: "Quality",
    priority: "High",
    status: "Open",
    dateSubmitted: "2024-07-25",
    assignedTo: "Quality Control Team",
    location: "Makongeni Estate, Block C"
  }
];

const Complaints = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || complaint.status.toLowerCase() === statusFilter;
    const matchesPriority = priorityFilter === "all" || complaint.priority.toLowerCase() === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "resolved": return "success";
      case "in progress": return "warning";
      case "open": return "destructive";
      default: return "secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "critical": return "destructive";
      case "high": return "warning";
      case "medium": return "primary";
      case "low": return "secondary";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "resolved": return CheckCircle2;
      case "in progress": return Clock;
      case "open": return AlertTriangle;
      default: return MessageSquare;
    }
  };

  const openComplaints = complaints.filter(c => c.status === "Open");
  const inProgressComplaints = complaints.filter(c => c.status === "In Progress");
  const resolvedComplaints = complaints.filter(c => c.status === "Resolved");
  const criticalComplaints = complaints.filter(c => c.priority === "Critical");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Complaints</h1>
          <p className="text-muted-foreground">Manage customer complaints and issues</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Log Complaint
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Log New Complaint</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customer-id">Customer ID</Label>
                  <Input id="customer-id" placeholder="W2001" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="service">Service</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="quality">Quality</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Brief description of the issue" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Detailed description of the complaint" rows={4} />
              </div>
              <Button>Submit Complaint</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-destructive">{openComplaints.length}</p>
                <p className="text-sm text-muted-foreground">Open</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-warning">{inProgressComplaints.length}</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-success">{resolvedComplaints.length}</p>
                <p className="text-sm text-muted-foreground">Resolved</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-destructive">{criticalComplaints.length}</p>
                <p className="text-sm text-muted-foreground">Critical</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive" />
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
                placeholder="Search by customer name, subject, or complaint ID..."
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
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Complaints Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Complaints</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredComplaints.map((complaint) => {
                  const StatusIcon = getStatusIcon(complaint.status);
                  
                  return (
                    <TableRow key={complaint.id}>
                      <TableCell className="font-medium">{complaint.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{complaint.customerName}</p>
                          <p className="text-sm text-muted-foreground">{complaint.customerId}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {complaint.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          <p className="font-medium">{complaint.subject}</p>
                          <p className="text-sm text-muted-foreground truncate">{complaint.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{complaint.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getPriorityColor(complaint.priority) as any}>
                          {complaint.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(complaint.status) as any} className="flex items-center gap-1 w-fit">
                          <StatusIcon className="h-3 w-3" />
                          {complaint.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(complaint.dateSubmitted).toLocaleDateString()}</TableCell>
                      <TableCell className="text-sm">{complaint.assignedTo}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          {complaint.status !== "Resolved" && (
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

export default Complaints;