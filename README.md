# Prueba Técnica UNAL - Sistema de Gestión de Estudiantes

Este proyecto es una prueba técnica desarrollada para la Universidad Nacional de Colombia. Consiste en una aplicación distribuida basada en una arquitectura de microservicios, implementada con Docker Compose y un frontend en Node.js. La aplicación permite gestionar estudiantes, cursos e inscripciones a través de una API Gateway.

## Descripción del Proyecto

La aplicación está compuesta por **tres microservicios** principales, un **API Gateway**, y un frontend. Todos los microservicios comparten una base de datos PostgreSQL debido a limitaciones de cómputo en el entorno local. A continuación, se describen los componentes:

- **Student Service**: Gestiona la información de los estudiantes (creación, actualización, eliminación, etc.).
- **Course Service**: Administra los cursos disponibles en el sistema.
- **Enrollment Service**: Maneja las inscripciones de estudiantes a cursos.
- **Gateway**: Actúa como un API Gateway que enruta las solicitudes del frontend hacia los microservicios correspondientes.

Todos los microservicios están conteinerizados con Docker y orquestados mediante Docker Compose. La base de datos PostgreSQL (`student_management`) es compartida por los microservicios para optimizar recursos. Además, se incluye un contenedor de **pgAdmin** para facilitar la administración de la base de datos.

El frontend, desarrollado en Node.js (probablemente con React, dado el `package.json` y la carpeta `src/`), consume los endpoints expuestos por el Gateway.

## Requisitos Previos

Asegúrate de tener instaladas las siguientes herramientas:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (versión 16 o superior recomendada)
- [Git](https://git-scm.com/)

## Instrucciones de Instalación y Despliegue

### 1. Clonar el Repositorio

```bash
git clone https://github.com/AndresGuido9820/Prueba-T-cnica-unal-.git
cd Prueba-T-cnica-unal-
```
### 2. Construir y levantar los microservicios con docker compose 
El archivo docker-compose.yml define los servicios: la base de datos (postgres), pgAdmin, los microservicios (student-service, course-service, enrollment-service), y el Gateway (gateway). Para construir y ejecutar todo:
```bash
docker-compose up --build
```
-Construye las imágenes de los microservicios a partir de los Dockerfile en cada carpeta (backend/student-service, backend/course-service, backend/enrollment-service, backend/gateway).
-Inicia un contenedor de PostgreSQL con la base de datos student_management.
-Inicia un contenedor de pgAdmin para administrar la base de datos.
-Levanta los microservicios y el Gateway.
###3. Configuración del Frontend
El frontend está en la carpeta frontend/. Sigue estos pasos para configurarlo:

Instalación de Dependencias

```bash
cd frontend
npm install
```

Iniciar el Frontend

```bash
npm run start
```

-El frontend se ejecutará en http://localhost:3000.
-Se conectará al Gateway (http://localhost:3005) para consumir los endpoints de los microservicios.





## Estructura del Proyecto


---


```markdown
| Carpeta/Archivo          | Descripción                              |
|--------------------------|------------------------------------------|
| **backend/**             | Microservicios y API Gateway             |
| ├── course-service/      | Lógica de gestión de cursos              |
| ├── enrollment-service/  | Manejo de inscripciones                  |
| ├── gateway/             | Enrutamiento de solicitudes              |
| ├── postgres/            | Scripts SQL y configuración de PostgreSQL|
| └── student-service/     | CRUD de estudiantes                      |
| **frontend/**            | Aplicación React                         |
| ├── src/                 | Componentes y lógica frontend            |
| ├── public/              | Archivos estáticos (HTML, imágenes)      |
| └── package.json         | Dependencias y scripts                   |
| docker-compose.yml       | Configuración de contenedores Docker     |
| README.md                | Documentación principal                  |
```



## Detalles Técnicos

### Base de Datos
- Los microservicios comparten una base de datos PostgreSQL (`student_management`)
- En producción se recomienda usar bases de datos separadas para cada microservicio, se uso así porque el contenedor estaba quedando muy pesado para mi computador 

### Inicialización
- El script `init.sql` en `backend/postgres/init-scripts/` crea las tablas necesarias al iniciar el contenedor

### Tecnologías
- **Prisma**: ORM para interactuar con la base de datos
- **Gateway**: Enruta solicitudes usando variables de entorno:
  - `STUDENT_SERVICE_URL`
  - `COURSE_SERVICE_URL` 
  - `ENROLLMENT_SERVICE_URL`

## Cómo Usar

1. Iniciar los servicios:
```bash
docker-compose up --build
```
```bash
cd frontend && npm start
```
Administrar la base de datos:
http://localhost:5050 (pgAdmin)


---
**Autor**: [Andrés Felipe Guido Montoya]  
**GitHub**: [@guidomontoya12](https://github.com/guidomontoya12)  
**Fecha**: 2025  
---



