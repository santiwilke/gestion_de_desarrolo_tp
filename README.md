# TP Docker - ACTIVIDAD 2 

Aplicación web full-stack con 3 contenedores Docker:
MySQL (base de datos), FastAPI (backend) y Nginx (frontend),
conectados por una red bridge propia llamada `red-tienda`.

La web muestra un mensaje de bienvenida con el `nombre`
del usuario 1 de la tabla `usuarios`.

## Estructura de carpetas

```
tienda-docker/
├── docker-compose.yml   # los 3 servicios, la red y el volumen
├── .env.example         # plantilla de variables de entorno
├── .gitignore           # evita subir el .env con las claves reales
├── README.md            # este archivo
├── db/
│   └── init.sql         # crea la tabla usuarios y carga datos
├── backend/
│   ├── Dockerfile       # imagen de FastAPI (python:3.11-slim)
│   ├── requirements.txt # dependencias de Python
│   └── main.py          # la API
└── frontend/
    ├── Dockerfile       # imagen de Nginx
    ├── nginx.conf       # sirve la web + proxy y CORS hacia la API
    ├── index.html
    ├── styles.css
    └── app.js           # fetch() a la API
```

## Cómo levantar el entorno

1. Tener Docker Desktop instalado y abierto.
2. Crear el archivo `.env` a partir de la plantilla:
   - Windows: `copy .env.example .env`
   - Linux / Mac: `cp .env.example .env`
3. Levantar todo con un solo comando:

```
docker compose up --build
```

## Dónde ver cada parte

- Web: http://localhost:8080
- API: http://localhost:8000 (documentación en http://localhost:8000/docs)
- Consola de MySQL: `docker exec -it tienda-db mysql -u root -p`

## Endpoints de la API

- `GET /usuarios` devuelve todos los usuarios
- `GET /usuarios/{id}` devuelve un usuario (la web usa el 1)

## Apagar

- `docker compose down` apaga y conserva los datos
- `docker compose down -v` apaga y borra los datos
