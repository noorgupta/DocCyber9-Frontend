import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Store from './pages/Store';
import Verify from './pages/Verify';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('eminent_token');
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('eminent_token');
  if (token) return <Navigate to="/dashboard" replace />;
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/store" element={<ProtectedRoute><Store /></ProtectedRoute>} />
        <Route path="/verify" element={<ProtectedRoute><Verify /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
