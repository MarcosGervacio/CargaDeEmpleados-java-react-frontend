import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AgregarEmpleado from "./components/AgregarEmpleado";
import { useContext } from "react";
import './App.css'
import EditarEmpleado from "./components/EditarEmpleado";
import Registro from "./components/Registro";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/" />;
};

function App() {

  return (
    <>
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/registro" element={<PrivateRoute><Registro /></PrivateRoute>} />
                    <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path="/agregar" element={<PrivateRoute><AgregarEmpleado /></PrivateRoute>} />
                    <Route path="/editar/:id" element={<PrivateRoute><EditarEmpleado /></PrivateRoute>} />
                </Routes>
            </Router>
        </AuthProvider>
    </>
  )
}

export default App
