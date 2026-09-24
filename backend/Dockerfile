# Imagen base liviana de Python 3.11
FROM python:3.11-slim

# Carpeta de trabajo dentro del contenedor
WORKDIR /app

# Primero las dependencias (así Docker las reutiliza si no cambian)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Después el código
COPY . .

# Puerto donde escucha la API
EXPOSE 8000

# Arranca el servidor Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
