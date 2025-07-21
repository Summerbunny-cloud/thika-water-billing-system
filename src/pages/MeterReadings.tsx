import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Upload,
  Download,
  Calendar,
  Gauge,
  TrendingUp,
  AlertTriangle,
  CheckCircle
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

// Mock meter readings data
const meterReadings = [
  {
    id: "R001",
    customerId: "W2001",
    customerName: "John Kamau",
    meterNumber: "TW2001",
    previousReading: 140.2,
    currentReading: 145.5,
    consumption: 5.3,
    readingDate: "2024-07-28",
    status: "Confirmed",
    reader: "Peter Mbugua",
    location: "Thika Town"
  },
  {
    id: "R002",
    customerId: "W2002", 
    customerName: "Mary Wanjiku",
    meterNumber: "TW2002",
    previousReading: 85.1,
    currentReading: 89.2,
    consumption: 4.1,
    readingDate: "2024-07-28",
    status: "Pending",
    reader: "Grace Muthoni",
    location: "Landless Estate"
  },
  {
    id: "R003",
    customerId: "W2003",
    customerName: "Peter Mwangi", 
    meterNumber: "TW2003",
    previousReading: 198.8,
    currentReading: 203.1,
    consumption: 4.3,
    readingDate: "2024-07-27",
    status: "Anomaly",
    reader: "John Kiprotich",
    location: "Kenyatta Road"
  },
  {
    id: "R004",
    customerId: "W2004",
    customerName: "Grace Njeri",
    meterNumber: "TW2004",
    previousReading: 52.4,
    currentReading: 56.8,
    consumption: 4.4,
    readingDate: "2024-07-28",
    status: "Confirmed",
    reader: "Peter Mbugua",
    location: "Blue Post Area"
  },
  {
    id: "R005",
    customerId: "W2005",
    customerName: "James Kariuki",
    meterNumber: "TW2005",
    previousReading: 175.2,
    currentReading: 178.9,
    consumption: 3.7,
    readingDate: "2024-07-26",
    status: "Confirmed",
    reader: "Grace Muthoni",
    location: "Makongeni Estate"
  }
];

const MeterReadings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredReadings = meterReadings.filter(reading => {
    const matchesSearch = reading.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reading.meterNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reading.customerId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || reading.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed": return "success";
      case "pending": return "warning";
      case "anomaly": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed": return CheckCircle;
      case "pending": return Calendar;
      case "anomaly": return AlertTriangle;
      default: return Gauge;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Meter Readings</h1>
          <p className="text-muted-foreground">Manage and track water meter readings</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Bulk Upload
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Reading
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-success">1,284</p>
                <p className="text-sm text-muted-foreground">Confirmed</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-warning">456</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
              <Calendar className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-destructive">23</p>
                <p className="text-sm text-muted-foreground">Anomalies</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-primary">5.2 m³</p>
                <p className="text-sm text-muted-foreground">Avg. Consumption</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
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
                placeholder="Search by customer name, meter number, or ID..."
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
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="anomaly">Anomaly</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Readings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Readings - July 2024</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reading ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Meter No.</TableHead>
                  <TableHead>Previous Reading</TableHead>
                  <TableHead>Current Reading</TableHead>
                  <TableHead>Consumption</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reader</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReadings.map((reading) => {
                  const StatusIcon = getStatusIcon(reading.status);
                  return (
                    <TableRow key={reading.id}>
                      <TableCell className="font-medium">{reading.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{reading.customerName}</p>
                          <p className="text-sm text-muted-foreground">{reading.customerId}</p>
                        </div>
                      </TableCell>
                      <TableCell>{reading.meterNumber}</TableCell>
                      <TableCell>{reading.previousReading} m³</TableCell>
                      <TableCell className="font-medium">{reading.currentReading} m³</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4 text-primary" />
                          {reading.consumption} m³
                        </div>
                      </TableCell>
                      <TableCell>{new Date(reading.readingDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(reading.status) as any} className="flex items-center gap-1 w-fit">
                          <StatusIcon className="h-3 w-3" />
                          {reading.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{reading.reader}</TableCell>
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

export default MeterReadings;