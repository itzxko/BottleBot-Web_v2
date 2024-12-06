import { Route, Routes } from "react-router-dom";
import { AuthorizationProvider } from "./contexts/AuthorizationProvider";
import Login from "./pages/Login";

// admin
import AdminDashboard from "./pages/admin/Dashboard";
import AdminMonitor from "./pages/admin/Monitor";
import AdminProfile from "./pages/admin/Profile";

// staff
import StaffDashboard from "./pages/staff/Dashboard";
import StaffMonitor from "./pages/staff/Monitor";
import StaffProfile from "./pages/staff/Profile";
import StaffHistory from "./pages/staff/History";
import StaffUsers from "./pages/staff/Users";
import StaffRedeem from "./pages/staff/Redeem";

function App() {
  return (
    <>
      <AuthorizationProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* admin */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/monitor" element={<AdminMonitor />} />
          <Route path="/admin/profile" element={<AdminProfile />} />

          {/* staff */}
          <Route path="/staff/dashboard" element={<StaffDashboard />} />
          <Route path="/staff/monitor" element={<StaffMonitor />} />
          <Route path="/staff/redeem" element={<StaffRedeem />} />
          <Route path="/staff/history" element={<StaffHistory />} />
          <Route path="/staff/profile" element={<StaffProfile />} />
          <Route path="/staff/users" element={<StaffUsers />} />
        </Routes>
      </AuthorizationProvider>
    </>
  );
}

export default App;
