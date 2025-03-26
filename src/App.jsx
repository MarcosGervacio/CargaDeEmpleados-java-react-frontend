import { BrowserRouter , Routes, Route, Navigate } from "react-router-dom";
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
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route exact path="/registro" element={<Registro />} />
                    <Route exact path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route exact path="/agregar" element={<PrivateRoute><AgregarEmpleado /></PrivateRoute>} />
                    <Route exact path="/editar/:id" element={<PrivateRoute><EditarEmpleado /></PrivateRoute>} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </>
  )
}

export default App
