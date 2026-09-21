import os
import time
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, text

DB_HOST = os.getenv("DB_HOST", "db")
DB_USER = os.getenv("DB_USER", "appuser")
DB_PASSWORD = os.getenv("DB_PASSWORD", "apppass")
DB_NAME = os.getenv("DB_NAME", "tienda")

DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:3306/{DB_NAME}"

# Reintenta conectarse por si la base tarda un toque
engine = None
for intento in range(10):
    try:
        engine = create_engine(DATABASE_URL, pool_pre_ping=True)
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        print("Conectado a la base!")
        break
    except Exception as e:
        print(f"Esperando a la base... {intento + 1}: {e}")
        time.sleep(3)

app = FastAPI(title="API Tienda")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"mensaje": "API de la tienda funcionando"}

@app.get("/productos")
def listar_productos():
    with engine.connect() as conn:
        filas = conn.execute(
            text("SELECT id, nombre, precio, stock FROM productos")
        ).mappings().all()
    return [dict(f) for f in filas]