import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from "../context/AuthContext";
export default function EditarEmpleado() {
   const { token } = useContext(AuthContext);
    const urlBase = "http://localhost:8080/rh-app/empleados";

    let navegacion = useNavigate();

    const {id} = useParams();

    const [empleado, setEmpleado]=useState({
        nombre:"",
        departamento:"",
        sueldo:""
    })

    const{nombre, departamento, sueldo} = empleado

    useEffect(()=>{
        cargarEmpleado();
    },[])

    const cargarEmpleado = async () => {
        const resultado = await axios.get(`${urlBase}/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`, // ✅ Enviar el token JWT
                "Content-Type": "application/json"
            }
        });
        setEmpleado(resultado.data);
    }

    const onInputChange = (e) => {
        //spread operator ... (expandir los atributos)
        setEmpleado({...empleado, [e.target.name]: e.target.value})
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`${urlBase}/${id}`, empleado, {
            headers: {
                "Authorization": `Bearer ${token}`, // ✅ Enviar el token JWT
                "Content-Type": "application/json"
            }
        });
        // Redirigimos a la pagina de inicio
        navegacion('/dashboard');
    }


  return (
    <div>
        <div style={{margin: "30px"}}>
            <h3>Editar Empleado</h3>
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
            <button type="submit">Guardar</button>
            <a href='/dashboard'>Regresar</a>    
        </div>
        </form>
    </div>
  )
}
