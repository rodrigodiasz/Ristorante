
# Ristorante - Sistema de Gerenciamento

Uma aplicação web para gerenciamento completo de um restaurante, com funcionalidades como autenticação de usuários, gerenciamento de pedidos e controle de produtos. O projeto foi desenvolvido utilizando Next.js no front-end, Node.js no back-end e PostgreSQL como banco de dados.

## 🚀 Funcionalidades

- Interface Web Responsiva com Next.js
- API RESTful utilizando Node.js
- Banco de Dados PostgreSQL para armazenamento dos dados
- Autenticação de usuários com JWT
- Gerenciamento de pedidos, produtos e usuários (CRUD)
- Controle de status de pedidos em tempo real

## 🛠️ Tecnologias Utilizadas

- **Front-end:** Next.js
- **Back-end:** Node.js + Express
- **Banco de Dados:** PostgreSQL
- **Autenticação:** JWT 
- **Outras dependências:** Axios

## 📄 Pré-requisitos

Antes de rodar o projeto, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- npm ou yarn

## 📥 Instalação

Clone o repositório:

```bash
git clone https://github.com/rodrigodiasz/Ristorante.git
cd Ristorante
```

### Front-end

```bash
cd front-end
npm install
# ou
yarn install
```

### Back-end

```bash
cd ../back-end
npm install
# ou
yarn install
```

## ⚙️ Configuração

Crie um arquivo `.env` dentro do diretório `backend` com as seguintes variáveis:

```
PORT=3001
DATABASE_URL=postgres://usuario:senha@localhost:5432/nome_do_banco
JWT_SECRET=sua_chave_secreta
```

**(Configure também as variáveis necessárias no frontend, se houver)**

## ▶️ Como rodar o projeto

No diretório do **backend**:

```bash
npm start
# ou
yarn start
```

No diretório do **frontend**:

```bash
npm run dev
# ou
yarn dev
```

Acesse a aplicação no navegador:

```
http://localhost:3000
```
