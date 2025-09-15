# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.





##ENUNCIADO

**Obligatorio**
----------------------------------------------
Proyecto Práctico Final Módulo 3
*Requisitos obligatorios
*Crear aplicación front con React / Angular / Vue / JS Vanilla (elige uno).
*Crear backend con Java Spring Boot / Node (Express/Fastify) / Supabase (elige uno).
*Implementar un modelo de datos mínimo Item con CRUD completo (crear, listar, ver, actualizar, borrar) y persistencia real.
*El frontend debe:
*Mostrar listado, detalle y formulario de alta/edición de Item.
*Consumir el backend real (no mocks) y manejar loading y errores.
*Implementar búsqueda de un Item concreto.
*Incluir un botón “Probar conexión” que consulta GET /api/health y muestra estado Conexión abierta/Sin conexión con la DB.
*README con instrucciones de arranque local, variables de entorno y rutas. Todo lo necesario para iniciar el proyecto debidamente.
*Pruebas básicas:
*Backend: 1 test de integración del CRUD o colección Postman con scripts.
*Control de versiones: repo público, commits pequeños y mensajes claros.


**Requisitos opcionales**
-----------------------------------------------------
CSS Básico
CSS Responsive (móvil-first; ≤ 360px)
Animaciones y transiciones (respetando prefers-reduced-motion)
Implementación de Login (registro + login con JWT o Supabase Auth; rutas protegidas)
Accesibilidad mínima (foco visible, labels, contraste ≥ 4.5:1)
Docker Compose (front + back + db en un comando)
CI simple (GitHub Actions: lint + test + build)
Despliegue (front en Netlify/Vercel; back en Render/Fly.io)
Exponer en backend al menos:
GET /api/health (ping de salud)
GET /api/items?search=&page=&pageSize= (listado con búsqueda y paginación)
POST /api/items (crear)
GET /api/items/:id (detalle)
PUT /api/items/:id (actualizar)
DELETE /api/items/:id (borrar)


**Enunciado del proyecto**
-----------------------------------------
Construye “MyItems”, una app CRUD de un único recurso Item que permita:

Crear, listar, buscar, ver, editar y borrar items.
Atributos de Item:
id, title (obligatorio), description (opcional), tags (array de strings), createdAt, updatedAt.
La búsqueda filtra por title y tags vía ?search=....
La paginación es de servidor (page, pageSize) y el front muestra controles (siguiente/anterior).
Si la API devuelve error (400/404/500), el front muestra mensaje claro y recuperable.
