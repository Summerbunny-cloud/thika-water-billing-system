import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { 
  Users, 
  Droplets, 
  CreditCard, 
  AlertTriangle,
  TrendingUp,
  Calendar,
  Activity,
  DollarSign
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

// Mock data for charts
const waterUsageData = [
  { month: "Jan", usage: 1200, target: 1000 },
  { month: "Feb", usage: 1100, target: 1000 },
  { month: "Mar", usage: 1300, target: 1000 },
  { month: "Apr", usage: 1400, target: 1000 },
  { month: "May", usage: 1250, target: 1000 },
  { month: "Jun", usage: 1350, target: 1000 },
  { month: "Jul", usage: 1450, target: 1000 },
];

const revenueData = [
  { month: "Jan", revenue: 2400000 },
  { month: "Feb", revenue: 2200000 },
  { month: "Mar", revenue: 2600000 },
  { month: "Apr", revenue: 2800000 },
  { month: "May", revenue: 2500000 },
  { month: "Jun", revenue: 2700000 },
  { month: "Jul", revenue: 2900000 },
];

const customerStatusData = [
  { name: "Active", value: 8453, color: "#0ea5e9" },
  { name: "Inactive", value: 1247, color: "#f59e0b" },
  { name: "Suspended", value: 234, color: "#ef4444" },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Thika Water & Sewage Company - July 2024</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Customers"
          value="9,934"
          change="+12% from last month"
          changeType="positive"
          icon={Users}
        />
        <StatsCard
          title="Active Connections"
          value="8,453"
          change="85.1% active rate"
          changeType="positive"
          icon={Droplets}
        />
        <StatsCard
          title="Monthly Revenue"
          value="KSh 2.9M"
          change="+7.4% from June"
          changeType="positive"
          icon={DollarSign}
        />
        <StatsCard
          title="Pending Complaints"
          value="47"
          change="-15% from last week"
          changeType="positive"
          icon={AlertTriangle}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Water Usage Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Water Usage Trend (Cubic Meters)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={waterUsageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} m³`, "Usage"]} />
                <Line 
                  type="monotone" 
                  dataKey="usage" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="hsl(var(--muted-foreground))" 
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Monthly Revenue (KSh)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`KSh ${(value as number / 1000000).toFixed(1)}M`, "Revenue"]} />
                <Bar 
                  dataKey="revenue" 
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Customer Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={customerStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {customerStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, "Customers"]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {customerStatusData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: "2 hours ago", action: "New customer registration", details: "John Kamau - Thika Town" },
                { time: "5 hours ago", action: "Payment received", details: "KSh 3,450 - Customer #W2045" },
                { time: "1 day ago", action: "Meter reading updated", details: "Sector 5 - 234 meters read" },
                { time: "1 day ago", action: "Complaint resolved", details: "Low water pressure - Pipeline Road" },
                { time: "2 days ago", action: "Bill generated", details: "July 2024 billing cycle completed" },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-accent/50">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.details}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;