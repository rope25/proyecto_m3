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
      const { error } = await supabase.from('Clients').select('id').limit(1)
      if (error) {
        setStatus('Error de conexion')
      } else {
        setStatus('Conexion muy ok')
      }
    } catch (e) {
      setStatus('Error de conexion')
    }
  }

  console.log(supabase)
  console.log(status)
 
  return (
    <>
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
          Bienvenido a el CRUD de textos con React y Vite
        </p>
      </div>
      <p className="read-the-docs">
        Gracias por visitar!
      </p>
      <footer>
        <p>© 2025 Mi Aplicación</p>
        <p>setStatus: {status}</p>
      </footer>
    </>
  )
}

export default App




