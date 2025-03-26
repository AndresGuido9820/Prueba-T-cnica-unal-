¡Entendido! Aquí tienes el README completo en un solo bloque de texto en formato Markdown, listo para que lo copies y pegues directamente en tu archivo README.md. Incluye todas las secciones que desarrollamos, ajustadas a tu repositorio y el docker-compose.yml que compartiste.

Prueba Técnica UNAL - Sistema de Gestión de Estudiantes
Este proyecto es una prueba técnica desarrollada para la Universidad Nacional de Colombia. Consiste en una aplicación distribuida basada en una arquitectura de microservicios, implementada con Docker Compose y un frontend en Node.js. La aplicación permite gestionar estudiantes, cursos e inscripciones a través de una API Gateway.

Descripción del Proyecto
La aplicación está compuesta por tres microservicios principales, un API Gateway, y un frontend. Todos los microservicios comparten una base de datos PostgreSQL debido a limitaciones de cómputo en el entorno local. A continuación, se describen los componentes:

Student Service: Gestiona la información de los estudiantes (creación, actualización, eliminación, etc.).
Course Service: Administra los cursos disponibles en el sistema.
Enrollment Service: Maneja las inscripciones de estudiantes a cursos.
Gateway: Actúa como un API Gateway que enruta las solicitudes del frontend hacia los microservicios correspondientes.
Todos los microservicios están conteinerizados con Docker y orquestados mediante Docker Compose. La base de datos PostgreSQL (student_management) es compartida por los microservicios para optimizar recursos. Además, se incluye un contenedor de pgAdmin para facilitar la administración de la base de datos.

El frontend, desarrollado en Node.js (probablemente con React, dado el package.json y la carpeta src/), consume los endpoints expuestos por el Gateway.

Requisitos Previos
Asegúrate de tener instaladas las siguientes herramientas:

Docker
Docker Compose
Node.js (versión 16 o superior recomendada)
Git
Instrucciones de Instalación y Despliegue
1. Clonar el Repositorio
bash

Contraer

Ajuste

Copiar
git clone https://github.com/AndresGuido9820/Prueba-T-cnica-unal-.git
cd Prueba-T-cnica-unal-
2. Construir y Levantar los Microservicios con Docker Compose
El archivo docker-compose.yml define los servicios: la base de datos (postgres), pgAdmin, los microservicios (student-service, course-service, enrollment-service), y el Gateway (gateway). Para construir y ejecutar todo:

bash

Contraer

Ajuste

Copiar
docker-compose up --build
Esto hará lo siguiente:

Construye las imágenes de los microservicios a partir de los Dockerfile en cada carpeta (backend/student-service, backend/course-service, backend/enrollment-service, backend/gateway).
Inicia un contenedor de PostgreSQL con la base de datos student_management.
Inicia un contenedor de pgAdmin para administrar la base de datos.
Levanta los microservicios y el Gateway.
Los servicios estarán disponibles en los siguientes puertos:

PostgreSQL: 5432
pgAdmin: 5050 (accesible en http://localhost:5050, usuario: admin@admin.com, contraseña: admin)
Student Service: 3001
Course Service: 3002
Enrollment Service: 3003
Gateway: 3005 (accesible en http://localhost:3005)
Para detener los contenedores:

bash

Contraer

Ajuste

Copiar
docker-compose down
Si deseas eliminar también los volúmenes (incluyendo la base de datos):

bash

Contraer

Ajuste

Copiar
docker-compose down -v
3. Configuración del Frontend
El frontend está en la carpeta frontend/. Sigue estos pasos para configurarlo:

Instalación de Dependencias
bash

Contraer

Ajuste

Copiar
cd frontend
npm install
Esto instala todas las dependencias listadas en package.json.

Iniciar el Frontend
bash

Contraer

Ajuste

Copiar
npm run start
El frontend se ejecutará en http://localhost:3000 (o el puerto configurado en tu proyecto).
Se conectará al Gateway (http://localhost:3005) para consumir los endpoints de los microservicios.
Estructura del Proyecto
text

Contraer

Ajuste

Copiar
Prueba-T-cnica-unal-/
├── backend/               # Carpeta con los microservicios y el Gateway
│   ├── course-service/    # Microservicio para gestionar cursos
│   ├── enrollment-service/ # Microservicio para gestionar inscripciones
│   ├── gateway/           # API Gateway que enruta las solicitudes
│   ├── postgres/          # Scripts de inicialización de la base de datos
│   └── student-service/   # Microservicio para gestionar estudiantes
├── frontend/              # Frontend en Node.js (probablemente React)
│   ├── node_modules/      # Dependencias del frontend
│   ├── public/            # Archivos públicos del frontend
│   ├── src/               # Código fuente del frontend
│   ├── package.json       # Dependencias y scripts del frontend
│   └── package-lock.json  # Lockfile del frontend
├── docker-compose.yml     # Configuración de Docker Compose
└── README.md              # Este archivo
Detalles Técnicos
Base de Datos: Los microservicios comparten una base de datos PostgreSQL (student_management). Esto se hizo para simplificar el entorno local y reducir el uso de recursos. En un entorno de producción, se recomienda usar bases de datos separadas para cada microservicio.
Inicialización de la Base de Datos: El script init.sql en backend/postgres/init-scripts/ se ejecuta al iniciar el contenedor de PostgreSQL para crear las tablas necesarias.
Prisma: Los microservicios usan Prisma como ORM para interactuar con la base de datos (se ejecuta npx prisma generate en el docker-compose.yml).
Gateway: El Gateway enruta las solicitudes a los microservicios usando las URLs definidas en las variables de entorno (STUDENT_SERVICE_URL, COURSE_SERVICE_URL, ENROLLMENT_SERVICE_URL).
Limitaciones: La base de datos compartida puede generar cuellos de botella en un entorno real. Para escalar, considera usar colas de mensajes (como RabbitMQ) y bases de datos independientes.
Uso
Inicia los microservicios y la base de datos: docker-compose up --build.
Inicia el frontend: cd frontend && npm run start.
Accede al frontend en http://localhost:3000.
(Opcional) Administra la base de datos con pgAdmin en http://localhost:5050.
Notas Adicionales
Escalabilidad: La arquitectura permite añadir más instancias de cada microservicio si se configura un balanceador de carga.
Depuración: Si un microservicio no inicia, verifica los logs con docker-compose logs <nombre-servicio> (por ejemplo, docker-compose logs student-service).
Entorno de Desarrollo: Los microservicios están configurados con NODE_ENV=development. Para producción, ajusta las variables de entorno según sea necesario.
Autor
Andrés Guido
GitHub: AndresGuido9820
Instrucciones
Copia todo el texto de arriba (desde # Prueba Técnica UNAL - Sistema de Gestión de Estudiantes hasta el final).
Pégalo directamente en tu archivo README.md en la raíz del repositorio.
Si necesitas hacer ajustes (como cambiar el puerto del frontend o añadir más detalles), puedes editar el archivo después de pegarlo.
Espero que esta versión sea exactamente lo que necesitas. Si hay algo más que quieras modificar, solo dime y lo ajustaré. ¡Avísame cómo te va!
