# Contatos - Backend API

Sistema de gerenciamento de contatos com autenticação JWT e envio de emails.

## 🚀 Tecnologias

- Node.js
- Express
- PostgreSQL
- TypeORM
- JWT
- Nodemailer (Mailtrap)

## 📋 Pré-requisitos

- Node.js (v16+)
- PostgreSQL
- npm 

## ⚙️ Configuração

### 1. Clonar o repositório
```bash
git clone https://jonasaquino@bitbucket.org/newm-dev1/projeto3_back_jonas.git
cd projeto3_back_jonas
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Configurar banco de dados
- Instale e inicie o PostgreSQL
- Crie um banco chamado `contatos_db`

### 4. Configurar variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL=postgres://postgres:password@localhost:5432/contatos_db
JWT_SECRET=minha_chave_secreta
JWT_EXPIRATION=1h
JWT_ISSUER=http://localhost:3333
JWT_AUDIENCE=http://localhost:3333
PORT=3333
EMAIL_HOST=live.smtp.mailtrap.io
EMAIL_PORT=587
EMAIL_USER=api
EMAIL_PASS=seu_token_mailtrap
EMAIL_FROM_NAME=Topaz Contatos
```

### 5. Executar o projeto
```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3333`


## 📡 Endpoints

### Autenticação
- `POST /auth/register` - Cadastrar usuário
- `POST /auth/login` - Login

### Contatos (requer autenticação)
- `GET /contacts` - Listar contatos
- `GET /contacts/:id` - Buscar contato por ID  
- `POST /contacts` - Criar contato
- `PUT /contacts/:id` - Atualizar contato
- `DELETE /contacts/:id` - Deletar contato

### Email (requer autenticação)
- `POST /email/send` - Enviar email

## 🔐 Autenticação

Para rotas protegidas, inclua o header:
```
Authorization: Bearer seu_jwt_token
```

## 📧 Configuração do Email

Configure uma conta no [Mailtrap](https://mailtrap.io) e adicione suas credenciais no `.env`.

## 🛠️ Desenvolvimento

```bash
npm run dev

npm run build
```

## 📝 Exemplo de Uso

### Cadastro
```json
POST /auth/register
{
  "name": "João Silva",
  "email": "joao@email.com", 
  "password": "123456"
}
```

### Login
```json
POST /auth/login
{
  "email": "joao@email.com",
  "password": "123456"
}
```

### Criar Contato
```json
POST /contacts
Authorization: Bearer token_aqui
{
  "name": "Maria",
  "email": "maria@email.com",
  "phone": "11999999999",
  "favorite": false
}
```

### Enviar Email
```json
POST /email/send
Authorization: Bearer token_aqui
{
  "to": "destinatario@email.com",
  "subject": "Olá!",
  "message": "Mensagem de teste",
  "senderName": "João Silva"
}
```
