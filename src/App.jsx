import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { createClient } from '@supabase/supabase-js'

// Configura tu URL y clave pública de Supabase aquí
const supabaseUrl = 'https://kphyqzynaskshjicltdq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwaHlxenluYXNrc2hqaWNsdGRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2MjQ4MjAsImV4cCI6MjA3MTIwMDgyMH0.ofNAEf4D_46g3qN1OYlGddAMw9zJqsDW9PdbieV4Fz8' // Reemplaza esto por tu clave pública de Supabase
const supabase = createClient(supabaseUrl, supabaseKey)

function App() {

  const [status, setStatus] = useState(null)

  const checkConnection = async () => {
    try {
      // Intentamos hacer un select simple a una tabla existente, por ejemplo 'clientes'
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

  // Necesitamos generar un formulario para añadir directores a la aplicación
  const [newDirector, setNewDirector] = useState({ id: '', nombre: '', nacimiento: "", en_activo: "" },)

  const handleInputChange = (e) => {
    const { nombre, value } = e.target
    setNewDirector({ ...newDirector, [nombre]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('director').insert([newDirector])
    if (error) {
      setStatus('Error al añadir director')
    } else {
      setStatus('Director añadido con éxito')
      setNewDirector({ nombre: '', nacimiento: '', en_activo: '' })
    }
  }

  // CRUD -> Create Read Update Delete



  // PARA VER SI FUNCIONA SUPABASE
  console.log(supabase)
  console.log(status)

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
              <label htmlFor="en_act" style={{ fontWeight: "bold" }}>En Activo</label>
              <input
                id="en_act"
                type="text"
                name="en_act"
                placeholder="En Activo"
                value={newDirector.en_act}
                onChange={handleInputChange}
                style={{ width: "100%", padding: "0.5em", marginTop: "0.25em" }}
              />
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
  )
}

export default App
