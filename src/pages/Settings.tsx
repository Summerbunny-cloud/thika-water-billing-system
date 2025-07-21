import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Settings as SettingsIcon,
  Save,
  Users,
  DollarSign,
  Bell,
  Shield,
  Database,
  Mail
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const Settings = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Configure system settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Billing Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Billing Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="water-rate">Water Rate (KSh per m³)</Label>
              <Input id="water-rate" defaultValue="45.50" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sewerage-rate">Sewerage Rate (%)</Label>
              <Input id="sewerage-rate" defaultValue="50" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="service-charge">Monthly Service Charge (KSh)</Label>
              <Input id="service-charge" defaultValue="150.00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="billing-cycle">Billing Cycle</Label>
              <Select defaultValue="monthly">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="biannual">Bi-annual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="due-days">Payment Due Days</Label>
              <Input id="due-days" defaultValue="15" />
            </div>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Billing Settings
            </Button>
          </CardContent>
        </Card>

        {/* User Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              User Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-email">Admin Email</Label>
              <Input id="admin-email" defaultValue="admin@thikawater.co.ke" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="default-role">Default User Role</Label>
              <Select defaultValue="staff">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrator</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="reader">Meter Reader</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Require Password Reset</Label>
                <p className="text-sm text-muted-foreground">Force users to reset passwords every 90 days</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Enable 2FA for all admin users</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save User Settings
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Send email alerts for system events</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">Send SMS for payment reminders</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Bill Reminders</Label>
                <p className="text-sm text-muted-foreground">Auto-send bill reminders 3 days before due</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sms-gateway">SMS Gateway API</Label>
              <Input id="sms-gateway" placeholder="Enter SMS gateway URL" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-smtp">SMTP Server</Label>
              <Input id="email-smtp" defaultValue="mail.thikawater.co.ke" />
            </div>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Notification Settings
            </Button>
          </CardContent>
        </Card>

        {/* System Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5 text-primary" />
              System Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input id="company-name" defaultValue="Thika Water & Sewage Company" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-address">Company Address</Label>
              <Textarea 
                id="company-address" 
                defaultValue="P.O. Box 42, Thika, Kenya"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-phone">Contact Phone</Label>
              <Input id="contact-phone" defaultValue="+254 67 21234" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select defaultValue="kes">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kes">Kenyan Shilling (KSh)</SelectItem>
                  <SelectItem value="usd">US Dollar ($)</SelectItem>
                  <SelectItem value="eur">Euro (€)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select defaultValue="eat">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="gmt">GMT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save System Settings
            </Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Session Timeout</Label>
                <p className="text-sm text-muted-foreground">Auto-logout inactive users</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="space-y-2">
              <Label htmlFor="session-duration">Session Duration (minutes)</Label>
              <Input id="session-duration" defaultValue="30" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Login Attempts Limit</Label>
                <p className="text-sm text-muted-foreground">Lock account after failed attempts</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-attempts">Max Login Attempts</Label>
              <Input id="max-attempts" defaultValue="5" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Audit Logging</Label>
                <p className="text-sm text-muted-foreground">Log all system activities</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Security Settings
            </Button>
          </CardContent>
        </Card>

        {/* Database & Backup */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              Database & Backup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto Backup</Label>
                <p className="text-sm text-muted-foreground">Daily automatic database backup</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="space-y-2">
              <Label htmlFor="backup-time">Backup Time</Label>
              <Input id="backup-time" type="time" defaultValue="02:00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="retention-days">Backup Retention (days)</Label>
              <Input id="retention-days" defaultValue="30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="backup-location">Backup Location</Label>
              <Input id="backup-location" defaultValue="/var/backups/thikawater" />
            </div>
            <div className="flex gap-2">
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Backup Settings
              </Button>
              <Button variant="outline">
                <Database className="h-4 w-4 mr-2" />
                Backup Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;