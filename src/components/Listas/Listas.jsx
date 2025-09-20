import { useEffect, useState, useMemo } from "react";
import styles from "./Listas.module.css";

// Configura tu URL y clave pública de Supabase aquí
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://kphyqzynaskshjicltdq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwaHlxenluYXNrc2hqaWNsdGRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2MjQ4MjAsImV4cCI6MjA3MTIwMDgyMH0.ofNAEf4D_46g3qN1OYlGddAMw9zJqsDW9PdbieV4Fz8' // Reemplaza esto por tu clave pública de Supabase
const supabase = createClient(supabaseUrl, supabaseKey)

// Helpers
const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);


export default function Listas() {
  const [status, setStatus] = useState(null);
  const [directores, setDirectores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("nombre");
  const [sortDir, setSortDir] = useState("asc");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    nacimiento: "",
    en_activo: "",
  });


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


 



  console.log(error);
  console.log(editingId)

  const fetchDirectores = async () => {
    try {
      const { data, error } = await supabase.from("director").select("*");
      if (error) throw error;
      setDirectores(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDirectores();
  }, []);

  const filteredSorted = useMemo(() => {
    const filtered = directores.filter((d) =>
      d.nombre.toLowerCase().includes(query.toLowerCase())
    );
    const sorted = [...filtered].sort((a, b) => {
      const comp = a[sortBy]?.localeCompare?.(b[sortBy]) ?? 0;
      return sortDir === "asc" ? comp : -comp;
    });
    return sorted;
  }, [directores, query, sortBy, sortDir]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      nombre: form.nombre.trim(),
      nacimiento: form.nacimiento,
      en_activo: form.en_activo === "true",
    };

    try {
      if (editingId) {
        await supabase.from("director").update(payload).eq("id", editingId);
        setStatus("Director actualizado");
      } else {
        await supabase.from("director").insert([payload]);
        setStatus("Director añadido");
      }
      setForm({ nombre: "", nacimiento: "", en_activo: "" });
      setEditingId(null);
      fetchDirectores();
    } catch (e) {
      setError(e.message);
    }
  };

  const handleEdit = (director) => {
    setEditingId(director.id);
    setForm({
      nombre: director.nombre,
      nacimiento: director.nacimiento,
      en_activo: director.en_activo.toString(),
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que quieres borrar este director?")) return;
    await supabase.from("director").delete().eq("id", id);
    fetchDirectores();
  };

  if (loading) return <p className={styles.status}>Cargando…</p>;
  if (error) return <p className={styles.error}>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <h1>CRUD de Directores</h1>
      <button onClick={checkConnection}className={styles.connectionButton}>Probar conexión</button>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <input
          name="nacimiento"
          type="date"
          value={form.nacimiento}
          onChange={handleChange}
          required
        />
        <select name="en_activo" value={form.en_activo} onChange={handleChange}>
          <option value="">¿En activo?</option>
          <option value="true">Sí</option>
          <option value="false">No</option>
        </select>
        <button type="submit">
          {editingId ? "Actualizar" : "Añadir"} Director
        </button>
      </form>

      <input
        placeholder="Buscar director..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.search}
      />

      <ul className={styles.list}>
        {filteredSorted.map((d) => (
          <li key={d.id} className={styles.item}>
            <strong>{d.nombre}</strong> — {d.nacimiento} —{" "}
            {d.en_activo ? "Activo" : "Inactivo"}
            <div>
              <button onClick={() => handleEdit(d)}>Editar</button>
              <button onClick={() => handleDelete(d.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>

      <footer>
        <p>Status: {status}</p>
      </footer>
    </div>
  );
}










































//                     <button onClick={() => } type="submit" style={{ padding: "0.75em", fontWeight: "bold", background: "#646cff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
//                         Ver lista directores
//                     </button>










//                     <button type="submit" style={{ padding: "0.75em", fontWeight: "bold", background: "#646cff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
//                         Borrar
//                     </button>




//                     <button type="submit" style={{ padding: "0.75em", fontWeight: "bold", background: "#646cff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
//                         Actualizar
//                     </button>
//                 </form>
//                 <p className="read-the-docs">
//                     Gracias por visitar!
//                 </p>
//                 <footer>
//                     <p>© 2025 Mi Aplicación</p>
//                     <p>setStatus: {status}</p>
//                 </footer>
//             </div>
//         </div>
//     </div>

// );

// }

