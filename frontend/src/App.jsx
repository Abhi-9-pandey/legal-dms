import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Placeholder from "./pages/Placeholder";
import Documents from "./pages/Documents";

import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* Public Routes */}
        <Route 
          path="/"
          element={<h1>Secure Legal DMS</h1>}
        />

        <Route 
          path="/login"
          element={<Login />}
        />

        <Route 
          path="/register"
          element={<Register />}
        />

        {/* Protected Application */}

        <Route 
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >

          <Route 
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route 
            path="/documents" 
            element={<Documents />} 
          /> 
          
          <Route 
            path="/cases" 
            element={<Placeholder title="Cases" />} 
          /> 
          
          <Route 
            path="/evidence" 
            element={<Placeholder title="Evidence" />} 
          /> 
          
          <Route 
            path="/audit-logs" 
            element={<Placeholder title="Audit Logs" />} 
          /> 
          
          <Route 
            path="/users" 
            element={<Placeholder title="Users" />} 
          /> 
          
          <Route 
            path="/settings" 
            element={<Placeholder title="Settings" />} 
          />

        </Route>


      </Routes>    
    </BrowserRouter>
  );
}

export default App;