import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 
import Login from './pages/Login';
import Register from './pages/Register';
import ProDashboard from './pages/ProDashboard';
import ClientDashboard from './pages/ClientDashboard';
import ServicesTest from './pages/ServicesTest';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pro/dashboard" element={<ProDashboard />} />
          <Route path="/dashboard" element={<ClientDashboard />} />
          <Route path="/test-services" element={<ServicesTest />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}