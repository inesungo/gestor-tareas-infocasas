# Gestor de Tareas (Laravel + React)

Este proyecto es una aplicación simple para gestionar tareas, construida con:

- *Backend:* Laravel (PHP)
- *Frontend:* React (JavaScript)
- *Base de datos:* MariaDB (MySQL)

Permite crear, ver, editar, eliminar y filtrar tareas.

---

## Qué hace esta aplicación?

- Crear nuevas tareas
- Listar todas las tareas
- Editar tareas existentes
- Eliminar tareas (con confirmación)
- Marcar tareas como completadas o pendientes
- Buscar tareas por nombre
- Filtrar por completadas, pendientes o todas
- Paginación de tareas (7 por página)

---

## Estructura del proyecto

infocasas/
│
├── backend/       → API REST desarrollada en Laravel
├── frontend/      → Aplicación web en React
└── README.md      → Documentación del proyecto

---

## Requisitos previos

Asegurate de tener instalados:

- PHP 8.2 o superior
- Composer
- Node.js y npm
- MySQL o MariaDB
- Laravel instalado globalmente (opcional)
- Un servidor local (ej: XAMPP, Laragon o similar)

---
## COMIENZO

### Clonar el proyecto desde GitHub
1. Cloná el repositorio: git clone https://github.com/inesungo/gestor-tareas-infocasas.git
2. Entrá a la carpeta del proyecto: cd gestor-tareas-infocasas

### Instalación del Backend (Laravel), todo sobre la terminal

1. Abrí una terminal y entrá en la carpeta backend: cd backend
2. Instalá las dependencias del proyecto: composer install
3. Copiá el archivo de configuración .env : cp .env.example .env
4. Generá la clave de la app: php artisan key:generate
5. Configurá tu conexión a base de datos en el archivo .env :
DB_DATABASE=infocasas_tasks
DB_USERNAME=root
DB_PASSWORD=
6. Creá las tablas de la base de datos: php artisan migrate:fresh
7. Levantá el servidor del backend: php artisan serve

Se iniciará en http://localhost:8000.

### Instalación del Frontend (React), todo sobre la terminal
1. En una nueva terminal, entrá en la carpeta frontend: cd frontend
2. Instalá las dependencias de React: npm install
3. Iniciá el servidor de React: npm start

Se abrirá automáticamente en http://localhost:3000.

#### COMO USAR LA WEB

1. Accedé a http://localhost:3000 en tu navegador.
2. Escribí una tarea en el formulario y hacé clic en Agregar.
3. La nueva tarea aparecerá en la lista.
4. Usá los botones para: Completar o desmarcar, Editar, Eliminar
5. Usá el buscador para encontrar tareas por nombre.
6. Filtrá por estado: todas, completadas o pendientes.
7. Cambiá de página si hay muchas tareas.


##### COSAS A TENER EN CUENTA
- El backend y frontend corren por separado.
- Ambos deben estar activos para que la app funcione correctamente.



Ines Ungo.
