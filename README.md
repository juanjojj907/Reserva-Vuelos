# Sistema de Reservas de Vuelos

Este es un sistema básico de reservas de vuelos desarrollado con Node.js, Express, React y PostgreSQL. La aplicación permite realizar CRUD (Crear, Leer, Actualizar y Eliminar) operaciones sobre vuelos y reservas de vuelos.

![image](https://github.com/user-attachments/assets/159a288b-99bc-4d03-a64d-874171eece36)



https://github.com/user-attachments/assets/0eb7f1bc-9302-444c-a0b2-d67af2060f5c



## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu máquina:

- Node.js (v14.x o superior)
- NPM (v6.x o superior)
- PostgreSQL (v13.x o superior)

## Configuración del Proyecto

### 1. Clonar el Repositorio

Clona este repositorio en tu máquina local utilizando el siguiente comando:

```bash
git clone https://github.com/tu-usuario/Reserva-Vuelos.git

## 2. Configuración del Backend

Navega a la carpeta del backend:
cd backend

Instala las dependencias necesarias:
npm install

Crea un archivo .env en la carpeta backend y configura la URL de la base de datos de PostgreSQL:
DATABASE_URL=postgres://usuario:contraseña@localhost:5432/vuelos_db

Asegúrate de reemplazar usuario, contraseña, y vuelos_db con tus propias credenciales y el nombre de tu base de datos.

Inicia el servidor backend:
node server.js

El servidor debería iniciarse en el puerto 3001.

## 3. Configuración del Frontend
Navega a la carpeta del frontend:
cd frontend

Instala las dependencias necesarias:
npm install

Crea un archivo .env en la carpeta frontend y agrega la URL del backend:
REACT_APP_API_URL=http://localhost:3001

Inicia el servidor frontend:
npm start

El servidor frontend debería iniciarse en el puerto 3000.

## 4. Crear la Base de Datos
Inicia sesión en PostgreSQL:
psql -U usuario
Reemplaza usuario con tu nombre de usuario de PostgreSQL.

Crea la base de datos:
CREATE DATABASE vuelos_db;

Asegúrate de que tu backend esté correctamente configurado para conectarse a esta base de datos, como se describe en el archivo .env del backend.

## 5. Acceder a la Aplicación
Una vez que ambos servidores estén en funcionamiento, puedes acceder a la aplicación en tu navegador:

Frontend: http://localhost:3000
Backend: http://localhost:3001

Funcionalidades
Vuelos: CRUD completo para gestionar vuelos.
Reservas: CRUD completo para gestionar reservas de vuelos.
Búsqueda de vuelos: Permite buscar vuelos según criterios como origen, destino y fechas.
Estadísticas: Consultar las aerolíneas con más reservas y el número total de aerolíneas registradas.
