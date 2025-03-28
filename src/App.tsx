import { Route, Routes } from "react-router-dom";
import { AuthorizationProvider } from "./contexts/AuthorizationProvider";
import Login from "./pages/Login";
import { UrlProvider } from "./contexts/UrlProvider";
import Home from "./pages/Home";

// admin
import AdminDashboard from "./pages/admin/Dashboard";
import AdminMonitor from "./pages/admin/Monitor";
import AdminProfile from "./pages/admin/Profile";
import AdminUsers from "./pages/admin/Users";
import AdminRedeem from "./pages/admin/Redeem";
import AdminHistory from "./pages/admin/History";
import AdminReport from "./pages/admin/Reports";

// staff
import StaffDashboard from "./pages/staff/Dashboard";
import StaffMonitor from "./pages/staff/Monitor";
import StaffProfile from "./pages/staff/Profile";
import StaffHistory from "./pages/staff/History";
import StaffUsers from "./pages/staff/Users";
import StaffRedeem from "./pages/staff/Redeem";
import { UsersProvider } from "./contexts/UsersProvider";
import { RewardsProvider } from "./contexts/RewardsProvider";
import { CitizensProvider } from "./contexts/CitizensProvider";
import { HistoryProvider } from "./contexts/HistoryProvider";
import { WebsocketProvider } from "./contexts/WebsocketProvider";
import { ConfigProvider } from "./contexts/ConfigProvider";
import { ParallaxProvider } from "react-scroll-parallax";
import { ReportsProvider } from "./contexts/ReportsProvider";

function App() {
  return (
    <>
      <ParallaxProvider>
        <UrlProvider>
          <AuthorizationProvider>
            <UsersProvider>
              <RewardsProvider>
                <CitizensProvider>
                  <HistoryProvider>
                    <WebsocketProvider>
                      <ConfigProvider>
                        <ReportsProvider>
                          <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            {/* admin */}
                            <Route
                              path="/admin/dashboard"
                              element={<AdminDashboard />}
                            />
                            <Route
                              path="/admin/monitor"
                              element={<AdminMonitor />}
                            />
                            <Route
                              path="/admin/profile"
                              element={<AdminProfile />}
                            />
                            <Route
                              path="/admin/users"
                              element={<AdminUsers />}
                            />
                            <Route
                              path="/admin/redeem"
                              element={<AdminRedeem />}
                            />
                            <Route
                              path="/admin/history"
                              element={<AdminHistory />}
                            />
                            <Route
                              path="/admin/report"
                              element={<AdminReport />}
                            />

                            {/* staff */}
                            <Route
                              path="/staff/dashboard"
                              element={<StaffDashboard />}
                            />
                            <Route
                              path="/staff/monitor"
                              element={<StaffMonitor />}
                            />
                            <Route
                              path="/staff/redeem"
                              element={<StaffRedeem />}
                            />
                            <Route
                              path="/staff/history"
                              element={<StaffHistory />}
                            />
                            <Route
                              path="/staff/profile"
                              element={<StaffProfile />}
                            />
                            <Route
                              path="/staff/users"
                              element={<StaffUsers />}
                            />
                          </Routes>
                        </ReportsProvider>
                      </ConfigProvider>
                    </WebsocketProvider>
                  </HistoryProvider>
                </CitizensProvider>
              </RewardsProvider>
            </UsersProvider>
          </AuthorizationProvider>
        </UrlProvider>
      </ParallaxProvider>
    </>
  );
}

export default App;
