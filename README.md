# Demo Culqui - Tokenización de Tarjetas

Este proyecto es una demo simple de un servicio de tokenización de tarjetas de crédito, desarrollado en Node.js con TypeScript, Express y MongoDB.

## Tecnologías utilizadas

- Node.js + Express
- TypeScript
- MongoDB (con Mongo Express para visualización)
- Docker + Docker Compose
- Jest (para testing)
- Zod (para validaciones de entrada)
- Mongoose (para el manejo de la base de datos)

---

## 🚀 Requisitos previos

- Tener instalado:
  - **Docker** (https://www.docker.com/)
  - **Docker Compose**

> ⚠️ No es necesario instalar Node.js o MongoDB en local si vas a usar Docker.

---

## Endpoint Url
http://a0021dc509af9496dae0fcac0397c10c-1565425667.us-east-2.elb.amazonaws.com:3000

## ⚙️ Levantar el proyecto en entorno local con docker compose

El proyecto está completamente dockerizado. Solo debes ejecutar:

```bash
docker compose up -d
```

## ⚙️ Levantar el proyecto en entorno local sin docker

Si no deseas usar Docker o no tienes Docker Compose instalado, puedes ejecutar el proyecto directamente de forma local.

### 1. Instalar dependencias
Primero instala los paquetes de Node.js:
```bash
npm install
```

### 2. Configurar variables de entorno
Copia el archivo `.env.example` en la raíz del proyecto y renombralo a `.env` y luego reemplaza las siguientes variables:

```env
PORT=3000
MONGODB_URI=mongodb://root:example@mongo:27017/
```

### 3. Levantar el proyecto
Inicia el servidor en modo desarrollo:
```bash
npm run dev
```

## 🧪 Ejecutar los tests
```bash
npm run test
```