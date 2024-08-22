# Usar la imagen base de Node.js
FROM node:14

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos de package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias del frontend
RUN npm install

# Copiar todo el código del frontend en el contenedor
COPY . .

# Construir la aplicación
RUN npm run build

# Instalar un servidor para servir la aplicación
RUN npm install -g serve

# Exponer el puerto donde se servirá la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación en modo de producción
CMD ["serve", "-s", "build"]
