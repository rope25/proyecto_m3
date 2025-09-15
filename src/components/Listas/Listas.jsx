import { useState } from "react";
import "./Listas.module.css"

// import styles from "../Listas/Listas.module.css";

// Configura tu URL y clave pública de Supabase aquí
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://kphyqzynaskshjicltdq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwaHlxenluYXNrc2hqaWNsdGRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2MjQ4MjAsImV4cCI6MjA3MTIwMDgyMH0.ofNAEf4D_46g3qN1OYlGddAMw9zJqsDW9PdbieV4Fz8' // Reemplaza esto por tu clave pública de Supabase
const supabase = createClient(supabaseUrl, supabaseKey)

// de alguna manera aqui hacer el volcado de un determinado numero de registros, y el filtro 

// test de conexion con la base de datos en Supabase

const checkConnection = async () => {
    try {
        // Intentamos hacer un select simple a una tabla existente, por ejemplo 'directores'
        const { data, error } = await supabase.from('director').select('*').limit(1)
        if (error) {
            setStatus('Error de conexion')
        } else {
            setStatus('Conexion muy ok')
            console.log(data);
        }
    } catch (e) {
        setStatus('Error de conexion')
    }
}

// PARA VER SI FUNCIONA SUPABASE
// console.log(data)
// console.log(status)

// Necesitamos generar un formulario para añadir directores a la aplicación

const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewDirector({ ...newDirector, [name]: value })
}

const handleSubmit = async (e) => {
    e.preventDefault();

    // Asegúrate de transformar los datos correctamente
    const director = {
        nombre: newDirector.nombre,
        nacimiento: newDirector.nacimiento, // Debe ser 'YYYY-MM-DD'
        en_activo: newDirector.en_activo === 'true' || newDirector.en_activo === true, // Convierte a booleano
    };

    const { error } = await supabase
        .from('director')
        .insert([director]);

    if (error) {
        setStatus('Error al añadir director: ' + error.message);
    } else {
        setStatus('Director añadido con éxito');
        setNewDirector({ nombre: '', nacimiento: '', en_activo: '' });
    }
}

export default function Listas() {
    
const [status, setStatus] = useState(null)
const [newDirector, setNewDirector] = useState({ id: '', nombre: '', nacimiento: "", en_activo: "" },)

    return (
        <div className="App">
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => checkConnection()}>
                    API HEALTH TEST
                </button>
                <p>
                    Bienvenido a el CRUD de directores con React y Vite
                </p>
                <div style={{ marginTop: "1em", padding: "1em", borderRadius: "8px", background: "#f9f9f9", boxShadow: "0 2px 8px #0001" }}>
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
                        <div>
                            <label htmlFor="nombre" style={{ fontWeight: "bold" }}>Nombre</label>
                            <input
                                id="nombre"
                                type="text"
                                name="nombre"
                                placeholder="Nombre"
                                value={newDirector.nombre}
                                onChange={handleInputChange}
                                style={{ width: "100%", padding: "0.5em", marginTop: "0.25em" }}
                            />
                        </div>
                        <div>
                            <label htmlFor="nacimiento" style={{ fontWeight: "bold" }}>Nacimiento dd/mm/aaaa</label>
                            <input
                                id="nacimiento"
                                type="text"
                                name="nacimiento"
                                placeholder="Nacimiento"
                                value={newDirector.nacimiento}
                                onChange={handleInputChange}
                                style={{ width: "100%", padding: "0.5em", marginTop: "0.25em" }}
                            />
                        </div>
                        <div>
                            <label htmlFor="en_activo" style={{ fontWeight: "bold" }}>En Activo</label>
                            <select
                                id="en_activo"
                                name="en_activo"
                                value={newDirector.en_activo}
                                onChange={handleInputChange}
                                style={{ width: "100%", padding: "0.5em", marginTop: "0.25em" }}
                            >
                                <option value="">Selecciona...</option>
                                <option value="true">Sí</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                        <button type="submit" style={{ padding: "0.75em", fontWeight: "bold", background: "#646cff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                            Añadir Director
                        </button>
                    </form>
                    <p className="read-the-docs">
                        Gracias por visitar!
                    </p>
                    <footer>
                        <p>© 2025 Mi Aplicación</p>
                        <p>setStatus: {status}</p>
                    </footer>
                </div>
            </div>
        </div>

    );

}

