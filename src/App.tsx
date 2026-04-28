import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Achievements from './pages/Achievements';
import Books from './pages/Books';
import Outputs from './pages/Outputs';
import Documents from './pages/Documents';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/books" element={<Books />} />
        <Route path="/outputs" element={<Outputs />} />
        <Route path="/documents" element={<Documents />} />
      </Routes>
    </BrowserRouter>
  );
}
