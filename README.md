# Projeto2-WebFullstack
## 🌦️ SkyTrack

Sistema web fullstack para gerenciamento de registros climáticos, desenvolvido como entrega acadêmica da disciplina **ES47B - Programação Web Fullstack**.

O projeto é uma evolução do **SkyTrack**, desenvolvido anteriormente como Projeto 1. Na versão inicial, o sistema trabalhava com dados climáticos obtidos por API externa. Nesta versão, os registros climáticos passam a ser cadastrados, buscados e persistidos em um banco de dados **PostgreSQL**, com acesso por meio de uma API REST em **Express.js**.

---

## 📌 Sobre o projeto

O **SkyTrack Database** permite que usuários autenticados realizem operações de cadastro e busca de registros climáticos.

A aplicação foi desenvolvida em uma arquitetura de **3 camadas**:

```txt
Frontend React → Backend Express → Banco PostgreSQL
```

O sistema possui autenticação com JWT, armazenamento seguro de senhas, validações no servidor, logs de monitoramento, cache no backend, compressão de respostas e pool de conexões com o banco de dados.

---

## 🎯 Funcionalidades

* Login de usuário
* Busca de registros climáticos
* Inserção de novos registros climáticos
* Rotas protegidas por autenticação
* Persistência dos dados em PostgreSQL
* Logs de login, busca e inserção
* Cache nas buscas
* Validação dos campos no servidor
* Mensagens de erro e sucesso
* Interface moderna e responsiva

---

## 🧱 Arquitetura

O projeto foi organizado em duas aplicações principais:

```txt
Projeto2-WebFullstack/
├── backend/
└── frontend/
```

### Backend

Implementado com **Node.js** e **Express.js**.

Responsável por:

* Autenticação
* Regras de negócio
* Rotas REST
* Validações
* Segurança
* Comunicação com PostgreSQL
* Registro de logs
* Cache

### Frontend

Implementado com **React.js** e **Vite**.

Responsável por:

* Interface do usuário
* Tela de login
* Tela de busca
* Tela de inserção
* Comunicação HTTP com o backend
* Armazenamento do token JWT no navegador

### Banco de dados

Implementado com **PostgreSQL**, utilizando o **pgAdmin 4** para administração.

---

## 🛠️ Tecnologias utilizadas

### Frontend

* React.js
* Vite
* React Router DOM
* Axios
* CSS puro

### Backend

* Node.js
* Express.js
* PostgreSQL
* JWT
* bcrypt
* dotenv
* cors
* helmet
* express-rate-limit
* compression
* validator
* xss
* node-cache
* pg

### Banco de dados

* PostgreSQL
* pgAdmin 4

---

## 📁 Estrutura do projeto

```txt
Projeto2-WebFullstack/
├── .gitignore
├── README.md
├── database.sql
│
├── backend/
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   ├── .env
│   └── src/
│       ├── config/
│       │   ├── auth.js
│       │   ├── cache.js
│       │   └── database.js
│       │
│       ├── models/
│       │   ├── Log.js
│       │   ├── User.js
│       │   └── Weather.js
│       │
│       └── routes/
│           ├── auth.routes.js
│           ├── logs.routes.js
│           └── weather.routes.js
│
└── frontend/
    ├── package.json
    ├── package-lock.json
    ├── index.html
    ├── vite.config.js
    └── src/
        ├── components/
        │   ├── App.css
        │   ├── ErrorMessage.jsx
        │   ├── Loading.jsx
        │   └── WeatherCard.jsx
        │
        ├── pages/
        │   ├── CreateWeather.jsx
        │   ├── Login.jsx
        │   └── SearchWeather.jsx
        │
        ├── services/
        │   └── api.js
        │
        ├── App.jsx
        └── main.jsx
```

---

## 🔐 Autenticação

O sistema utiliza autenticação baseada em **JWT**.

Fluxo de autenticação:

1. O usuário informa email e senha.
2. O backend valida as credenciais.
3. Se estiverem corretas, um token JWT é gerado.
4. O frontend armazena o token no `localStorage`.
5. As próximas requisições enviam o token no header `Authorization`.

Exemplo:

```txt
Authorization: Bearer token_jwt
```

---

## 👤 Usuário padrão

O sistema possui um usuário administrador inicial:

```txt
Email: admin@skytrack.com
Senha: admin123
```

A senha é armazenada no banco utilizando criptografia.

---

## 🗄️ Banco de dados

Banco utilizado:

```txt
skytrack_db
```

Tabelas principais:

```txt
users
weather_records
logs
```

### Tabela `users`

Armazena os usuários do sistema.

Campos principais:

* id
* name
* email
* password_hash
* created_at

### Tabela `weather_records`

Armazena os registros climáticos.

Campos principais:

* id
* city
* temperature
* windspeed
* winddirection
* description
* created_at

### Tabela `logs`

Armazena os eventos importantes do sistema.

Eventos registrados:

* Login
* Tentativas inválidas de autenticação
* Buscas
* Inserções

---

## 📊 Dados climáticos

Cada registro climático possui:

```txt
Cidade
Temperatura
Velocidade do vento
Direção do vento
Descrição
Data de cadastro
```

Esses dados foram escolhidos por serem similares aos dados trabalhados no Projeto 1, que utilizava informações climáticas obtidas por API.

---

## 🔎 Rotas da API

### Autenticação

#### POST `/api/auth/login`

Realiza login do usuário.

Body:

```json
{
  "email": "admin@skytrack.com",
  "password": "admin123"
}
```

Resposta esperada:

```json
{
  "success": true,
  "message": "Login realizado com sucesso.",
  "token": "token_jwt",
  "user": {
    "id": 1,
    "name": "Administrador",
    "email": "admin@skytrack.com"
  }
}
```

---

### Registros climáticos

#### GET `/api/weather`

Lista todos os registros climáticos.

Requer autenticação.

#### GET `/api/weather?city=Cornelio`

Busca registros por cidade.

Requer autenticação.

#### POST `/api/weather`

Cadastra um novo registro climático.

Requer autenticação.

Body:

```json
{
  "city": "Cornelio Procopio",
  "temperature": 24,
  "windspeed": 12,
  "winddirection": 180,
  "description": "Parcialmente nublado"
}
```

---

### Logs

#### GET `/api/logs`

Lista os logs do sistema.

Requer autenticação.

---

## 🔒 Segurança

O projeto implementa medidas relacionadas às principais categorias de segurança exigidas na proposta.

### Criptografia

* Senhas armazenadas com criptografia.
* Uso de `bcrypt` para validação segura de senhas.
* Token JWT com chave secreta configurada no `.env`.

### Injeção e XSS

* Queries parametrizadas com PostgreSQL.
* Sanitização de entradas com `xss`.
* Validações no servidor.
* Prevenção contra SQL Injection com parâmetros `$1`, `$2`, `$3`, etc.

### Identificação e autenticação

* JWT para controle de sessão.
* Middleware de autenticação.
* Rotas protegidas.
* Expiração de token.
* Rate limit para reduzir tentativas automatizadas.

### Registro e monitoramento

* Logs de login.
* Logs de erros de autenticação.
* Logs de buscas.
* Logs de inserções.

---

## ⚡ Otimizações

### Compressão de respostas

O backend utiliza o middleware `compression`.

Isso reduz o tamanho das respostas HTTP enviadas pelo servidor.

### Cache no backend

As buscas utilizam cache com `node-cache`.

O cache é aplicado nas requisições:

```txt
GET /api/weather
```

Tempo padrão:

```txt
60 segundos
```

Ao cadastrar um novo registro, o cache é invalidado para garantir que as próximas buscas retornem os dados atualizados.

### Build otimizada do frontend

O frontend utiliza Vite, permitindo gerar uma versão otimizada com:

```bash
npm run build
```

---

## 🔌 Pool de conexões

A conexão com o banco utiliza `pg.Pool`.

Isso permite reaproveitar conexões com o PostgreSQL de forma eficiente.

Configuração localizada em:

```txt
backend/src/config/database.js
```

---

## 🚀 Como executar o projeto

### 1. Clonar o repositório

```bash
git clone <url-do-repositorio>
cd Projeto2-WebFullstack
```

### 2. Configurar o banco de dados

Crie o banco no PostgreSQL:

```sql
CREATE DATABASE skytrack_db;
```

Depois execute o script:

```txt
database.sql
```

Esse script cria as tabelas, extensões, usuário inicial e registros climáticos de exemplo.

### 3. Configurar variáveis de ambiente

Crie o arquivo:

```txt
backend/.env
```

Exemplo:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha_do_postgres
DB_NAME=skytrack_db
JWT_SECRET=skytrack_super_secret_2026
JWT_EXPIRES_IN=1h
```

### 4. Rodar o backend

```bash
cd backend
npm install
npm run dev
```

O backend será executado em:

```txt
http://localhost:3000
```

### 5. Rodar o frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

O frontend será executado em:

```txt
http://localhost:5173
```

---

## 🧪 Testes manuais

### Testar login

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" `
-Method POST `
-ContentType "application/json" `
-Body '{"email":"admin@skytrack.com","password":"admin123"}'
```

### Testar busca

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/weather?city=Cornelio" `
-Method GET `
-Headers @{ Authorization = "Bearer SEU_TOKEN" }
```

### Testar inserção

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/weather" `
-Method POST `
-Headers @{ Authorization = "Bearer SEU_TOKEN" } `
-ContentType "application/json" `
-Body '{"city":"Cornelio Procopio","temperature":24,"windspeed":12,"winddirection":180,"description":"Parcialmente nublado"}'
```

---

## 🧾 Consultas úteis no PostgreSQL

### Ver registros climáticos

```sql
SELECT *
FROM weather_records
ORDER BY created_at DESC;
```

### Ver logs

```sql
SELECT 
  logs.id,
  users.email,
  logs.action,
  logs.details,
  logs.created_at
FROM logs
LEFT JOIN users ON users.id = logs.user_id
ORDER BY logs.created_at DESC;
```

### Ver usuários

```sql
SELECT 
  id,
  name,
  email,
  created_at
FROM users;
```

---

## 🖥️ Telas do sistema

O sistema possui:

* Tela de login
* Tela de busca
* Tela de inserção
* Layout responsivo com navegação lateral
* Cards de registros climáticos
* Feedback visual para erros e sucessos

---

## 📚 Requisitos atendidos

| Requisito                      | Status       |
| ------------------------------ | ------------ |
| Login                          | Implementado |
| Busca                          | Implementado |
| Inserção                       | Implementado |
| Frontend React.js              | Implementado |
| Backend Express.js             | Implementado |
| Banco PostgreSQL               | Implementado |
| Arquitetura em 3 camadas       | Implementado |
| Rotas REST                     | Implementado |
| Validação no servidor          | Implementado |
| Mensagens de validação         | Implementado |
| Senhas criptografadas          | Implementado |
| JWT                            | Implementado |
| Sanitização de entradas        | Implementado |
| Prevenção contra SQL Injection | Implementado |
| Prevenção contra XSS           | Implementado |
| Rate limit                     | Implementado |
| Logs de segurança              | Implementado |
| Cache backend                  | Implementado |
| Compressão de respostas        | Implementado |
| Pool de conexões               | Implementado |
| Build otimizada do frontend    | Implementado |

---

## 👨‍💻 Autor

Desenvolvido por:

```txt
Kauan Santos Pedreira
```

Projeto acadêmico da disciplina:

```txt
ES47B - Programação Web Fullstack
Universidade Tecnológica Federal do Paraná
```

---

## 📌 Observação

Este projeto foi desenvolvido com foco acadêmico, seguindo os requisitos definidos na proposta da disciplina.

O sistema utiliza dados climáticos cadastrados manualmente, inspirados no Projeto 1 SkyTrack, que trabalhava com informações de clima obtidas por API.
