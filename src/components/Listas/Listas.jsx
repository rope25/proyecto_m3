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
      <button onClick={checkConnection}>Probar conexión</button>
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








// import { useEffect, useState, useMemo } from "react";


// // import styles from "../Listas/Listas.module.css";
// import "./Listas.module.css"
// // import "./src/App.css"




// // Mapea un "post" de JSONPlaceholder a nuestro "movie"




// export default function Listas() {

//     const [status, setStatus] = useState(null)
//     const [newDirector, setNewDirector] = useState({ id: '', nombre: '', nacimiento: "", en_activo: "" },)

//     const checkConnection = async () => {
//         try {
//             // Intentamos hacer un select simple a una tabla existente, por ejemplo 'directores'
//             const { data, error } = await supabase.from('director').select('*').limit(1)
//             if (error) {
//                 setStatus('Error de conexion')
//             } else {
//                 setStatus('Conexion muy ok')
//                 console.log(data);
//             }
//         } catch (e) {
//             setStatus('Error de conexion')
//         }
//     }

//     const handleInputChange = (e) => {
//         const { name, value } = e.target
//         setNewDirector({ ...newDirector, [name]: value })
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Asegúrate de transformar los datos correctamente
//         const director = {
//             nombre: newDirector.nombre,
//             nacimiento: newDirector.nacimiento, // Debe ser 'YYYY-MM-DD'
//             en_activo: newDirector.en_activo === 'true' || newDirector.en_activo === true, // Convierte a booleano
//         };

//         const { error } = await supabase
//             .from('director')
//             .insert([director]);

//         if (error) {
//             setStatus('Error al añadir director: ' + error.message);
//         } else {
//             setStatus('Director añadido con éxito');
//             setNewDirector({ nombre: '', nacimiento: '', en_activo: '' });
//         }
//     }

// // estado base
// const [directores,setDirectores]= useState([]);
// const [loading,setLoading]=useState(true);
// const [error1,setError1]=useState(null);


//       // consulta y filtro
//     const [query, setQuery] = useState("");
//     const [sortBy, setSortBy] = useState("director");
//     const [sortDir, setSortDir] = useState("desc");


//     // ---- Formulario (Update) ----
//     const [editingId, setEditingId] = useState(null);
//     const [form, setForm] = useState({
//         director: "",
//         nacimiento: "",
//         en_activo: "",
//     });

//     function ListaDirectores(p) {

//         return {
//             id,
//             nombre: cap(p.nombre ?? "Sin nombre"),
//             nacimiento: Number(p.year ?? "Sin fecha nacimiento"),
//             en_activo: [Boolean],

//         };
//     }

  

//     useEffect(() => {
//         let cancelled = false;
//         (async () => {
//             try {
//                 const res = await fetch(`${'https://kphyqzynaskshjicltdq.supabase.co'}?_limit=12`, { cache: "no-store" });
//                 if (!res.ok) throw new Error(`HTTP ${res.status}`);
//                 const data = await res.json();
//                 if (canceled) return;
//                 setMovies((Array.isArray(data) ? data : []).map(ListaDirectores));
//                 setError(null);
//             } catch (e) {
//                 if (!canceled) setError1(e.message || "Error cargando API");
//             } finally {
//                 if (!canceled) setLoading(false);
//             }
//         })();
//         return () => { canceled = true; };
//     }, []);
// }


//   // ---- Derivados ----
//   const filteredSorted = useMemo(() => {
//     const f = directores
//       .filter(m => m.title.toLowerCase().includes(query.trim().toLowerCase()))

//     const s = [...f].sort((a, b) => {
//       let comp = 0;
//       else if (sortBy === "nombre") comp = a.nombre.localeCompare(b.nombre);
//       return sortDir === "asc" ? comp : -comp;
//     });
//     return s;
//   }, [directores, query,sortBy, sortDir]);

//   console.log (directores);


//   const startEdit = (m) => {
//     setEditingId(m.id);
//     setForm({
//       nombre: m.nombre ?? "",
//       nacimiento: m.nacimiento ?? "",
//       en_activo: m.en_activo ?? "",
//     });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//  const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((f) => ({ ...f, [name]: value }));
//   };

//  // ---- CREATE / UPDATE ----
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // validación HTML nativa:
//     const formEl = e.currentTarget;
//     if (!formEl.checkValidity()) {
//       formEl.reportValidity();
//       return;
//     }

//     const payload = {
//       nombre: form.nombre.trim(),
//       nacimiento: Number(form.nacimiento) || undefined,
//       en_activo: Boolean (form.en_activo) || undefined,
//     };

//     try {
//       if (editingId == null) {
//         // CREATE
//         const res = await fetch(API, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         });
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         const created = await res.json(); // id simulado por la API
//         const director= toDirector({ ...payload, id: created.id ?? Date.now() });
//         setDirectores((prev) => [movie, ...prev]); // añadimos arriba
//       } else {
//         // UPDATE
//         const res = await fetch(`${API}/${editingId}`, {
//           method: "PATCH",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         });
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         const updated = await res.json();
//         setDirectores((prev) =>
//           prev.map((m) => (m.id === editingId ? toDirector({ ...m, ...updated }) : m))
//         );
//       }
//       // reset form
//       setEditingId(null);
//       setForm({ nombre: "", nacimiento: "", en_activo: "" });
//       setError(null);
//     } catch (e2) {
//       setError(e2.message || "Error enviando datos");
//     }
//   };

//   // ---- DELETE ----
//   const handleDelete = async (id) => {
//     if (!confirm("¿Seguro que quieres borrar este director?")) return;
//     try {
//       const res = await fetch(`${'https://kphyqzynaskshjicltdq.supabase.co'}/${id}`, { method: "DELETE" });
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       setDirectores((prev) => prev.filter((m) => m.id !== id));
//     } catch (e2) {
//       setError(e2.message || "Error borrando");
//     }
//   };

//   if (loading) return <p className={styles.status}>Cargando…</p>;
//   if (error)   return <p className={styles.error}>Error: {error}</p>;



// return (
//     <div className="App">
//         {/* <div>
//                 <a href="https://vite.dev" target="_blank">
//                     <img src={viteLogo} className="logo" alt="Vite logo" />
//                 </a>
//                 <a href="https://react.dev" target="_blank">
//                     <img src={reactLogo} className="logo react" alt="React logo" />
//                 </a>
//             </div> */}
//         <h1>
//             Bienvenido a el CRUD de directores con React y Vite
//         </h1>
//         <div className="card">
//             <button onClick={() => checkConnection()}>
//                 API HEALTH TEST
//             </button>

//             <div style={{ marginTop: "1em", padding: "1em", borderRadius: "8px", background: "#f9f9f9", boxShadow: "0 2px 8px #0001" }}>
//                 <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
//                     <div>
//                         <label htmlFor="nombre" style={{ fontWeight: "bold" }}>Nombre</label>
//                         <input
//                             id="nombre"
//                             type="text"
//                             name="nombre"
//                             placeholder="Nombre"
//                             value={newDirector.nombre}
//                             onChange={handleInputChange}
//                             style={{ width: "100%", padding: "0.5em", marginTop: "0.25em" }}
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="nacimiento" style={{ fontWeight: "bold" }}>Nacimiento dd/mm/aaaa</label>
//                         <input
//                             id="nacimiento"
//                             type="text"
//                             name="nacimiento"
//                             placeholder="Nacimiento"
//                             value={newDirector.nacimiento}
//                             onChange={handleInputChange}
//                             style={{ width: "100%", padding: "0.5em", marginTop: "0.25em" }}
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="en_activo" style={{ fontWeight: "bold" }}>En Activo</label>
//                         <select
//                             id="en_activo"
//                             name="en_activo"
//                             value={newDirector.en_activo}
//                             onChange={handleInputChange}
//                             style={{ width: "100%", padding: "0.5em", marginTop: "0.25em" }}
//                         >
//                             <option value="">Selecciona...</option>
//                             <option value="true">Sí</option>
//                             <option value="false">No</option>
//                         </select>
//                     </div>
//                     <button type="submit" style={{ padding: "0.75em", fontWeight: "bold", background: "#646cff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
//                         Añadir Director
//                     </button>


// <section className={styles.wrapper}>
//       <header className={styles.header}>
//         <h2>Directores — CRUD (API pública)</h2>
//       </header>

//       {/* ---- Formulario Create/Update ---- */}
//       <form className={styles.controls} onSubmit={handleSubmit} noValidate>
//         <input
//           className={styles.input}
//           name="nombre"
//           placeholder="nombre *"
//           value={form.title}
//           onChange={handleChange}
//           required
//           minLength={2}
//           maxLength={100}
//         />
//         <input
//           className={styles.number}
//           name="nacimiento"
//           type="number"
//           placeholder="nacimiento"
//           value={form.year}
//           onChange={handleChange}
//           min="1900"
//           max="2099"
//           step="1"
//         />
//         <input
//           className={styles.number}
//           name="en_activo"
//           type="boolean"
//           placeholder="en Activo"
//           value={form.en_Activo}
//           onChange={handleChange}
//         />
     
//         <button
//           type="submit"
//           style={{ padding: ".55rem .9rem", borderRadius: ".55rem", border: "1px solid #cbd5e1" }}
//         >
//           {editingId == null ? "Crear" : "Guardar cambios"}
//         </button>
//         {editingId != null && (
//           <button
//             type="button"
//             onClick={startCreate}
//             style={{ padding: ".55rem .9rem", borderRadius: ".55rem", border: "1px solid #cbd5e1", background: "#f8fafc" }}
//           >
//             Cancelar
//           </button>
//         )}
//       </form>

//       {/* ---- Filtros simples ---- */}
//       <div className={styles.controls}>
//         <input
//           className={styles.input}
//           placeholder="Buscar por título…"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         <label className={styles.row}>
//           Min ★
//           <input
//             className={styles.number}
//             type="number"
//             min="0"
//             max="10"
//             step="0.1"
//             value={minRating}
//             onChange={(e) => setMinRating(e.target.value)}
//           />
//         </label>
//         <label className={styles.row}>
//           Ordenar por
//           <select
//             className={styles.select}
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//           >
//             <option value="rating">rating</option>
//             <option value="year">year</option>
//             <option value="title">title</option>
//           </select>
//         </label>
//         <label className={styles.row}>
//           Dirección
//           <select
//             className={styles.select}
//             value={sortDir}
//             onChange={(e) => setSortDir(e.target.value)}
//           >
//             <option value="desc">desc</option>
//             <option value="asc">asc</option>
//           </select>
//         </label>
//       </div>



































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

