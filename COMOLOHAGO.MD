## Día 1 (6–8 h)
-----------------------------------------------------------------
Repo + README + elección de stack.
Backend: esqueleto, /api/health, migración items, seed.
Front: proyecto base (Vite/CLI), router, página Lista + botón “Probar conexión”.

Creada una tabla llamada clientes

## Datos para conectar el cliente con la API
-----------------------
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(

process.env.NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxxxxxx
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY=zzzzzzzzzzzz
)

me da la impresion de que esto no me hace falta?¿
-----------------------------

##RLS
ROW LEVEL SECURITY
Creo tambien esta caracteristica de seguridad es atributo desde supabase
// Row Level Security (RLS)
alter table public.clientes enable row level security;



##FILTRO PAGINACION
// Filtro y paginación
const { data, error, count } = await supabase
  .from('orders')
  .select('id,total,created_at', { count: 'exact' })
  .gte('total', 50)
  .order('created_at', { ascending: false })
  .range(0, 49)

##POLITICAS

Existen plantillas dentro de supabase para definir quien esta autorizado a realizar modificaciones en la base de datos

##AUTENTIFICAR

Tambien se establecen formas alternativas de autentificar usuarios desde Supabase
OAuth: Google, GitHub, GitLab, Azure AD, etc.
