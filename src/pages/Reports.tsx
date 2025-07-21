import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  FileText,
  Users,
  DollarSign,
  Droplets
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

// Mock data for reports
const monthlyRevenue = [
  { month: "Jan", revenue: 2400000, target: 2500000 },
  { month: "Feb", revenue: 2200000, target: 2500000 },
  { month: "Mar", revenue: 2600000, target: 2500000 },
  { month: "Apr", revenue: 2800000, target: 2500000 },
  { month: "May", revenue: 2500000, target: 2500000 },
  { month: "Jun", revenue: 2700000, target: 2500000 },
  { month: "Jul", revenue: 2900000, target: 2500000 },
];

const customerGrowth = [
  { month: "Jan", new: 45, total: 9234 },
  { month: "Feb", new: 52, total: 9286 },
  { month: "Mar", new: 38, total: 9324 },
  { month: "Apr", new: 61, total: 9385 },
  { month: "May", new: 47, total: 9432 },
  { month: "Jun", new: 55, total: 9487 },
  { month: "Jul", new: 73, total: 9560 },
];

const paymentMethods = [
  { name: "M-Pesa", value: 67, color: "#0ea5e9" },
  { name: "Bank Transfer", value: 23, color: "#10b981" },
  { name: "Cash", value: 10, color: "#f59e0b" },
];

const regionConsumption = [
  { region: "Thika Town", consumption: 4500, customers: 2845 },
  { region: "Landless Estate", consumption: 3200, customers: 1932 },
  { region: "Makongeni", consumption: 2800, customers: 1654 },
  { region: "Blue Post", consumption: 2100, customers: 1298 },
  { region: "Kenyatta Road", consumption: 1900, customers: 1205 },
];

const Reports = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">Comprehensive business insights and performance metrics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-bold text-success">KSh 2.9M</p>
                <p className="text-xs text-success">+16% vs target</p>
              </div>
              <DollarSign className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Consumption</p>
                <p className="text-2xl font-bold text-primary">14.5K m³</p>
                <p className="text-xs text-primary">July 2024</p>
              </div>
              <Droplets className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">New Customers</p>
                <p className="text-2xl font-bold text-foreground">73</p>
                <p className="text-xs text-success">+32% vs last month</p>
              </div>
              <Users className="h-8 w-8 text-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Collection Rate</p>
                <p className="text-2xl font-bold text-success">87.3%</p>
                <p className="text-xs text-success">Above industry avg</p>
              </div>
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue and Customer Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Monthly Revenue vs Target (KSh)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`KSh ${(value as number / 1000000).toFixed(1)}M`, "Amount"]} />
                <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Customer Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={customerGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value, name) => [value, name === "new" ? "New Customers" : "Total Customers"]} />
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="new" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods and Regional Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Payment Method Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={paymentMethods}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {paymentMethods.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "Usage"]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {paymentMethods.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Regional Water Consumption</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={regionConsumption} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="region" type="category" width={100} />
                <Tooltip formatter={(value) => [`${value} m³`, "Consumption"]} />
                <Bar dataKey="consumption" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Regional Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Regional Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Region</th>
                  <th className="text-right p-4">Customers</th>
                  <th className="text-right p-4">Consumption (m³)</th>
                  <th className="text-right p-4">Avg per Customer</th>
                  <th className="text-right p-4">Revenue (KSh)</th>
                  <th className="text-right p-4">Collection %</th>
                </tr>
              </thead>
              <tbody>
                {regionConsumption.map((region, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-4 font-medium">{region.region}</td>
                    <td className="p-4 text-right">{region.customers.toLocaleString()}</td>
                    <td className="p-4 text-right">{region.consumption.toLocaleString()}</td>
                    <td className="p-4 text-right">{(region.consumption / region.customers).toFixed(1)}</td>
                    <td className="p-4 text-right">KSh {(region.consumption * 45.5 / 1000).toFixed(0)}K</td>
                    <td className="p-4 text-right text-success">{(85 + Math.random() * 10).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Report Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex-col gap-2">
              <FileText className="h-6 w-6" />
              <span>Monthly Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Users className="h-6 w-6" />
              <span>Customer Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <DollarSign className="h-6 w-6" />
              <span>Financial Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;