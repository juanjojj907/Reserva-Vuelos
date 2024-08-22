# Usar la imagen base de Node.js
FROM node:14

# Instalar las herramientas cliente de PostgreSQL
RUN apt-get update && apt-get install -y postgresql-client

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos de package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias del backend
RUN npm install

# Copiar todo el código del backend en el contenedor
COPY . .

# Exponer el puerto en el que se ejecutará la API
EXPOSE 3001

# Comando para ejecutar la API
CMD ["npm", "start"]
