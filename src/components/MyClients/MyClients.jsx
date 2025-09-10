import { useState, useEffect } from "react";
import { supabase } from "../../App.jsx";

function MyClients() {
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);

  // Cargar clientes al montar el componente
  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      const user = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('Clients')
        .select('*')
        .eq('user_id', user.data.user?.id)
        .order('created_at', { ascending: false });
      if (error) setError(error.message);
      else setClients(data);
      setLoading(false);
    };
    fetchClients();
  }, []);

  // Insertar un cliente de ejemplo
  const handleInsert = async () => {
    setLoading(true);
    const user = await supabase.auth.getUser();
    const { error } = await supabase
      .from('Clients')
      .insert({ nombre: 'Juan', apellido: 'Pérez', edad: 30, email: 'perez@example.com', user_id: user.data.user?.id });
    if (error) {
      alert('Error al insertar: ' + error.message);
    } else {
      // Recargar la lista
      const { data } = await supabase
        .from('clientes')
        .select('*')
        .eq('user_id', user.data.user?.id)
        .order('created_at', { ascending: false });
      setClients(data);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Mis Clientes</h1>
      <button onClick={handleInsert} disabled={loading}>
        {loading ? 'Insertando...' : 'Insertar cliente'}
      </button>
      {error && <p style={{color: 'red'}}>Error: {error}</p>}
      <ul>
        {clients.map((c) => (
          <li key={c.id}>{c.nombre} {c.apellido} - {c.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default MyClients;