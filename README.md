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

## 🧪 Testes

O projeto utiliza Jest para testes unitários tanto no front-end quanto no back-end. Para executar os testes, siga os passos abaixo:

### Front-end

No diretório do **frontend**:

```bash
# Executar testes unitários com Jest
npm test
# ou
yarn test

# Executar testes E2E com Cypress
npx cypress open
# ou
yarn cypress open


Os testes do front-end incluem:

- Testes unitários com Jest
  - Testes de componentes UI
  - Testes de integração
  - Testes de funcionalidades
- Testes E2E com Cypress
  - Testes de fluxos completos
  - Testes de interação do usuário
  - Testes de responsividade

### Back-end

No diretório do **backend**:

```bash
# Executar todos os testes unitários
npm test
# ou
yarn test


Os testes do back-end incluem:

- Testes unitários de serviços:
  - Autenticação (login/logout)
  - Usuários (criação, atualização)
  - Produtos (criação, listagem)
  - Categorias (criação, listagem)
  - Mesas (criação, status)
  - Pedidos (criação, finalização)

Observações importantes:

1. Os testes utilizam o banco de dados real, então é necessário ter o PostgreSQL configurado e rodando
2. Alguns testes podem criar dados temporários no banco, mas incluem limpeza automática após a execução
3. Para rodar os testes, certifique-se de que:
   - O arquivo `.env` está configurado corretamente
   - O banco de dados está acessível
   - As dependências estão instaladas (`npm install` ou `yarn install`)
