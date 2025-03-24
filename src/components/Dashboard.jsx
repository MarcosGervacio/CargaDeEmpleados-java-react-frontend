import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);

    if (!user) {
        return <p>No autorizado. Por favor, inicia sesión.</p>;
    }

    const urlBase = "https://accurate-recreation-production.up.railway.app/rh-app/empleados";
    
    const[empleados, setEmpleados] = useState([]);

    useEffect(() => {
        if (token) {
            cargarEmpleados();
        }
    }, [token]);

    const cargarEmpleados = async () => {
        try {
            const response = await axios.get("https://accurate-recreation-production.up.railway.app/rh-app/empleados", {
                headers: {
                    "Authorization": `Bearer ${token}`, // ✅ Enviar token JWT
                    "Content-Type": "application/json"
                }
            });

            setEmpleados(response.data);
        } catch (error) {
            console.error("Error al cargar empleados:", error.response?.data || error.message);
        }
    }

    const eliminarEmpleado = async (id) => {
        try {
            await axios.delete(`${urlBase}/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`, // ✅ Enviar el token JWT
                    "Content-Type": "application/json"
                }
            });
            cargarEmpleados();
        } catch (error) {
            console.error("Error al eliminar el empleado:", error.response?.data || error.message);
        }
    };

    return (
        <>
        <div>
            <h2>Bienvenido, {user.sub}!</h2>
            <p>Tu rol es: {user.role}</p>
            <button onClick={() => { logout(); navigate("/"); }}>Cerrar Sesión</button>
        </div>
            <h3>Sistema de Recursos Humanos</h3>
            <button><Link to="/agregar">Agregar Empleado</Link></button>
            <table>
            <tr>
            <th scope="col">Id</th>
            <th scope="col">Empleado</th>
            <th scope="col">Departamento</th>
            <th scope="col">Sueldo</th>
            <th></th>
            </tr>
            <tbody>
            {
            //Iteramos el arreglo de empleados
            empleados.map((empleado, indice) => (
                <tr key={indice}>
                <th scope="row">{empleado.idEmpleado}</th>
                <td>{empleado.nombre}</td>
                <td>{empleado.departamento}</td>
                <td>{empleado.sueldo}</td>
                <td>
                    <div>
                        <Link to={`/editar/${empleado.idEmpleado}`}>Editar</Link>
                        <button onClick={()=> eliminarEmpleado(empleado.idEmpleado)}>Eliminar</button>
                    </div>
                </td>
            </tr>
            ))
            }
        </tbody>
            </table>
        </>
    );
};

export default Dashboard;
