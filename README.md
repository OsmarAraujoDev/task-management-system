# 🚀 Task Management System

API RESTful para gerenciamento de tarefas com Node.js, Express e MySQL.

![Node.js](https://img.shields.io/badge/Node.js-22.17-green)
![License](https://img.shields.io/badge/GNU-GENERAL-PUBLIC)

---

## ✨ Funcionalidades

- 👤 Cadastro e Login de usuários
- 📊 Dashboard com estatísticas de tarefas
- 🔎 Filtros avançados de tarefas e usuários
- ✅ Validação de dados com Joi
- 🧪 Testes automáticos

---

## 📦 Estrutura de Pastas

```
scripts/
src/
  config/
  models/
  services/
  controllers/
  routes/
  validations/
  app.js
server.js
.env
.gitignore
```

---

## 🛠 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [Joi](https://joi.dev/) (Validação)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) (Hash de senha)
- [dotenv](https://github.com/motdotla/dotenv) (Variáveis de ambiente)

---

## ⚡ Instalação e Execução

```bash
git clone https://github.com/OsmarAraujoDev/task-management-system.git
cd task-management-system
npm install
npm start
```

---

## 🔐 Configuração de Ambiente

Crie um arquivo `.env` na raiz do projeto com:

```
HOSTNAME=localhost
PORT=3000

DB_HOST=seu_host
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=seu_banco
```

Veja o exemplo em [.env.example](.env.example).

---

## 📚 Exemplos de Endpoints

### Usuários

- **Cadastrar usuário:**  
  `POST /users`  
  ```json
  {
    "nickname": "Seu Nome",
    "email": "email@exemplo.com",
    "phone": "55999999999",
    "password": "senhaSegura123"
  }
  ```

- **Login:**  
  `POST /users/login`  
  ```json
  {
    "email": "email@exemplo.com",
    "password": "senhaSegura123"
  }
  ```

### Tarefas

- **Criar tarefa:**  
  `POST /tasks/:userId`  
  ```json
  {
    "title": "Nova tarefa",
    "description": "Descrição da tarefa"
  }
  ```

- **Listar tarefas:**  
  `GET /tasks/:userId`

---

## 📖 Licença

Distribuído sob a [GNU GPL v3](LICENSE).

---

## 👤 Autor

Feito por **Osmar Araujo**  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?logo=linkedin)](https://www.linkedin.com/in/osmar-araujo-a88bb1396/)