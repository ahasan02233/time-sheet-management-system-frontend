import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import EmployeeDashboard from "./pages/EmployeeDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";

import CreateTimesheet from "./pages/CreateTimesheet";
import MyTimesheets from "./pages/MyTimesheets";
import LeaveManagement from "./pages/LeaveManagement";

import PendingTimesheets from "./pages/PendingTimesheets";
import PendingLeaves from "./pages/PendingLeaves";

function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Navigate to="/login" />}
            />

            <Route
                path="/login"
                element={<LoginPage />}
            />

            <Route
                path="/register"
                element={<RegisterPage />}
            />

            <Route
                path="/employee-dashboard"
                element={<EmployeeDashboard />}
            />

            <Route
                path="/manager-dashboard"
                element={<ManagerDashboard />}
            />

            <Route
                path="/create-timesheet"
                element={<CreateTimesheet />}
            />

            <Route
                path="/my-timesheets"
                element={<MyTimesheets />}
            />

            <Route
                path="/leave-management"
                element={<LeaveManagement />}
            />

            <Route
                path="/pending-timesheets"
                element={<PendingTimesheets />}
            />

            <Route
                path="/pending-leaves"
                element={<PendingLeaves />}
            />

        </Routes>
    );
}

export default App;