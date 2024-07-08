# Projeto-Flexilease-Autos

## 📄Descrição

Este projeto é uma API que simula um sistema de gerenciamento para um concessionária. Há no total três tabelas principais no banco de dados: `Car`, `User` e `Reserve`. Cada tabela é acessível através de suas próprias rotas dedicadas, permitindo operações de CRUD (Criar, Ler, Atualizar e Deletar) independentes. Com esta API, você pode:

- **Criar** novos cadastros de carros, usuários e reservas.
- **Ler** e recuperar informações existentes de carros, usuários e reservas.
- **Atualizar** informações de carros, usuários e reservas existentes.
- **Deletar** cadastros de carros, usuários e reservas quando necessário.

## 🛠️Tecnologias Utilizadas

- `Typescript:` Principal linguagem de programação do projeto.
- `noSQL:` Linguagem usada para trabalhar com um banco de dados não relacional.
- `MongoDB:` SGBD (Sistema de Gerenciamento de Banco de Dados).
- `TypeORM` ORM para podermos fazer as querys do banco de dados no nosso código de forma mais fácil e rápida.

## 🚩Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado:

- **Node.js**
- **npm**
- **Git**

## 📌Índice

- Título do Projeto
- Descrição
- Tecnologias Usadas
- Pré-requisitos
- Índice
- Instalação
- Uso

# 💻Instalação

Siga estas etapas para instalar o projeto:

1.  Clone o repositório:

`git clone https://github.com/PauloVargas07/ticketOffice.git`

2.  Navegue até o diretório do projeto:

`cd flexilease-autos`

3.  Instale as dependências:

`npm install`

4.  Crie um arquivo .env, baseado no .env.example

## ⚙️Uso

Para testar e interagir com a API, vamos fazer uso de um aplicativo cliente HTTP, como o Postman, entretanto você pode usar da maneira que desejar. No Postman, irémos configurar algumas solicitações para as várias rotas da API e ver as respostas em tempo real. Mas antes você precisa inicializar o servidor

- No console digite:

`npm run dev`

- Agora vá para o seu aplicativo cliente HTTP de sua escolha e começe os testes.

## 📍Rotas

Aqui estão as rotas disponíveis para a API. Todas as rotas começam com `localhost:{PORT}/api/v1`.

Só é possível cadastrar um carro ou reserva após criar um castrado de usuário e se autenticar, e só é possível cadastrar uma reserva após cadastrar um carro.

Lembre-se de alterar o `:id` pelos seus referentes IDs.

## 🚗Cars

- **GET geral**: `/car`
- **GET específico**: `/car/:id`
- **POST**: `/car`
- **PUT**: `/car/:id`
- **DELETE**: `/car/:id`

## 🙋🏻‍♂️Users

- **POST**: `/user`
- **PUT**: `/user/:id`
- **DELETE**: `/user/:id`

## 📝Reserves

- **POST**: `/reserve`
- **PUT**: `/reserve/:id`
- **DELETE**: `/reserve/:id`
