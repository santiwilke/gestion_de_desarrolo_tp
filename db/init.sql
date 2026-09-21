USE tienda;

CREATE TABLE IF NOT EXISTS productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  precio INT NOT NULL,
  stock INT NOT NULL
);

INSERT INTO productos (nombre, precio, stock) VALUES
  ('Remera negra', 15999, 20),
  ('Buzo oversize', 34999, 12),
  ('Gorra', 9999, 30),
  ('Pantalon cargo', 42999, 8);