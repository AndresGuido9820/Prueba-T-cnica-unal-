# Usa una imagen base ligera de Node.js
FROM node:20-alpine  

# Establece el directorio de trabajo
WORKDIR /app

# Instala dependencias necesarias para Prisma en Alpine
RUN apk add --no-cache openssl python3 make g++  

# Copia solo los archivos necesarios para instalar dependencias
COPY package.json package-lock.json ./

# Instala dependencias en un paso separado para aprovechar la caché de Docker
RUN npm install --omit=dev  

# Copia el resto del código de la aplicación
COPY . .  

# Genera el cliente de Prisma
RUN npx prisma generate  

# Expone el puerto en el que corre el servicio
EXPOSE 3003 

# Comando de inicio
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]

