
// src/AppRouter.jsx
import { Routes, Route, Navigate, NavLink, Outlet, href } from 'react-router-dom'

import Listas from '../components/Listas/Listas'
import MyClients from '../components/MyClients/MyClients'


function Layout() {
    return (

        <>
            <header style={{ padding: "12px 16px", borderBottom: "2px solid #eee", center:"top"}}>
            
                <nav style={{ display: "flex", gap: 12 }}>
                    
                     <NavLink
                        to="/Listas"
                        style={({ isActive }) => ({
                            textDecoration: "none",
                            color: isActive ? "#1d4ed8" : "#111827",
                            fontWeight: isActive ? 700 : 500,
                        })}
                    >
                        Listas
                    </NavLink>
                   
                 
                    <NavLink
                        to="/MyClients"
                        style={({ isActive }) => ({
                            textDecoration: "none",
                            color: isActive ? "#1d4ed8" : "#111827",
                            fontWeight: isActive ? 700 : 500,
                        })}
                    >
                        MyClients
                    </NavLink>
                   
                </nav>
            </header>
            <main style={{ padding: 70}}>
                <Outlet />
            </main>
        </>
    );
}

function NotFound() {
   return 
 }


export default function AppRouter() {

    return (
        <Routes>
            <Route element={<Layout />}>
                // punto de entrada 
                <Route index path="/Listas" element={<Listas/>} />
                // otras paginas hijas           
                <Route path="/MyClients" element={<MyClients />} />
                // link roto o no encontrado
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>

    );
}






