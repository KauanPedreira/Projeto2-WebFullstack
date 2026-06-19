CREATE DATABASE skytrack_db;

-- Execute os comandos abaixo dentro do banco skytrack_db

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS unaccent;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS weather_records (
    id SERIAL PRIMARY KEY,
    city VARCHAR(100) NOT NULL,
    temperature NUMERIC(5,2) NOT NULL,
    windspeed NUMERIC(5,2),
    winddirection NUMERIC(5,2),
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(50) NOT NULL,
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, password_hash)
VALUES (
  'Administrador',
  'admin@skytrack.com',
  crypt('admin123', gen_salt('bf'))
)
ON CONFLICT (email) DO NOTHING;

INSERT INTO weather_records 
(city, temperature, windspeed, winddirection, description)
VALUES
('Cornelio Procopio', 24.00, 12.00, 180.00, 'Parcialmente nublado'),
('Londrina', 27.50, 10.20, 145.00, 'Céu limpo com poucas nuvens'),
('Curitiba', 18.30, 16.80, 210.00, 'Tempo frio e nublado'),
('Maringa', 29.10, 8.40, 120.00, 'Ensolarado com baixa umidade'),
('Sao Paulo', 22.70, 14.50, 160.00, 'Nublado com possibilidade de chuva'),
('Rio de Janeiro', 31.20, 11.30, 95.00, 'Ensolarado e quente'),
('Belo Horizonte', 25.80, 9.70, 130.00, 'Tempo estável'),
('Salvador', 30.40, 18.20, 80.00, 'Calor com ventos moderados'),
('Brasilia', 26.60, 13.10, 100.00, 'Seco e parcialmente nublado'),
('Florianopolis', 21.90, 20.40, 190.00, 'Vento forte e céu encoberto');