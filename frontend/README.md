# 🩺 Sistema de Agendamento Médico

Aplicação para gestão de agendamentos médicos, permitindo cadastro de especialidades, convênios, horários de disponibilidade, agendamentos e atendimentos.

---

## 🚀 Funcionalidades

✅ Cadastrar e listar especialidades  
✅ Cadastrar e listar convênios  
✅ Definir horários de disponibilidade por médico, especialidade e dia  
✅ Listar todos os horários (disponíveis e ocupados)  
✅ Agendar consulta em horários disponíveis  
✅ Listar agendamentos com filtros por paciente e data  
✅ Marcar agendamentos como atendidos  
✅ Listar atendimentos com filtros

---

## 🛠 Tecnologias

- React + Vite
- React Bootstrap
- JSON Server (mock da API REST)
- Docker + Docker Compose

---

## ▶️ Executando localmente

### 🔧 Pré-requisitos

- Node.js ≥ 16
- npm ou yarn


### 1. Inicie o mock da API (JSON Server)

npm install -g json-server
json-server --watch api-mock/db.json --port 3001

### 2. Rode o frontend (Vite)
cd frontend
npm install
npm run dev



🧪 Endpoints da API (mock)
POST /especialidades – Cadastrar especialidade

GET /especialidades – Listar especialidades

POST /convenios – Cadastrar convênio

GET /convenios – Listar convênios

POST /disponibilidades/definir – Cadastrar disponibilidade

POST /disponibilidades – Obter horários para data/especialidade

POST /agendamentos – Agendar consulta

GET /agendamentos – Listar agendamentos

POST /atendimentos – Marcar como atendido

GET /atendimentos – Listar atendimentos


👨‍💻  Aquiles Jordan — Desenvolvedor FullStack.