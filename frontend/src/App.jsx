import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import ProDashboard from './pages/ProDashboard';
import ClientDashboard from './pages/ClientDashboard';
import ServicesTest from './pages/ServicesTest';
import EditProfile from './pages/EditProfile';
import ProProfile from './pages/ProProfile';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute allowedRole="client" />}>
            <Route path="/dashboard" element={<ClientDashboard />} />
            <Route path="/pro/:id" element={<ProProfile />} />
          </Route>

          <Route element={<ProtectedRoute allowedRole="pro" />}>
            <Route path="/pro/dashboard" element={<ProDashboard />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<EditProfile />} />
            <Route path="/test-services" element={<ServicesTest />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}