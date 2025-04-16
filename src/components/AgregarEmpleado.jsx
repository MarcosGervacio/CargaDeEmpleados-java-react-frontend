import axios from 'axios'
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../context/AuthContext";
export default function AgregarEmpleado() {
    let navegacion = useNavigate();
   const { token } = useContext(AuthContext);
    const [empleado, setEmpleado]=useState({
        nombre:"",
        departamento:"",
        sueldo:""
    })

    const{nombre, departamento, sueldo} = empleado

    const onInputChange = (e) => {
        //spread operator ... (expandir los atributos)
        setEmpleado({...empleado, [e.target.name]: e.target.value})
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const urlBase = "https://accurate-recreation-production.up.railway.app/rh-app/empleados";
        await axios.post(urlBase, empleado, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // 🚀 Enviar el token JWT
            }
        });
        navegacion('/dashboard');
    }


  return (
    <div>
        <div style={{margin: "30px"}}>
            <h3>Agregar Empleado</h3>
        </div>

        <form onSubmit={(e) => onSubmit(e)}>
        <div>
            <label htmlFor="nombre">Nombre</label>
            <input type="text"
            id="nombre" name='nombre' required={true} 
            value={nombre} onChange={(e)=>onInputChange(e)}/>
        </div>
        <div>
            <label htmlFor="departamento">Departamento</label>
            <input type="text"
            id="departamento" name='departamento'
            value={departamento} onChange={(e) => onInputChange(e)} />
        </div>
        <div>
            <label htmlFor="sueldo">Sueldo</label>
            <input type="number" step="any"
            id="sueldo" name='sueldo'
            value={sueldo} onChange={(e) => onInputChange(e)}/>
        </div>
        <div>
            <button type="submit">Agregar</button>
            <a onClick={() => navegacion('/dashboard')}>Regresar</a>    
        </div>
        </form>
    </div>
  )
}
