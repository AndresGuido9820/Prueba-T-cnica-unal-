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

