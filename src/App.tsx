import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthProvider";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import MeterReadings from "./pages/MeterReadings";
import Bills from "./pages/Bills";
import Payments from "./pages/Payments";
import Complaints from "./pages/Complaints";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import CustomerPortal from "./pages/CustomerPortal";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/portal" element={<CustomerPortal />} />
            <Route path="/" element={
              <ProtectedRoute requiredRole="staff">
                <AppLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="customers" element={<Customers />} />
              <Route path="readings" element={<MeterReadings />} />
              <Route path="bills" element={<Bills />} />
              <Route path="payments" element={<Payments />} />
              <Route path="complaints" element={<Complaints />} />
              <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
