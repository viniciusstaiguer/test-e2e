# Test E2E Project

Este projeto é um exemplo de configuração de um servidor Node.js com autenticação JWT e testes de integração usando `node:test`.

## Estrutura do Projeto

```
/project-root
│
├── /src
│   ├── /api
│   │   └── api.js
│
├── /test
│   ├── /e2e
│   │   └── api.test.js
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Configuração do Ambiente

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```plaintext
BASE_URL=your_base_url
JWT_SECRET_KEY=your_secret_key_here
```

### Instalação de Dependências

Execute o seguinte comando para instalar as dependências do projeto:

```sh
npm install
```

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor em modo de desenvolvimento.
- `npm test`: Executa os testes de integração.

## Implementação

### Servidor Node.js

O servidor é implementado no arquivo `src/api/api.js`. Ele utiliza `http` para criar um servidor e `jsonwebtoken` para gerar tokens JWT.

#### Rotas

- `POST /login`: Rota para autenticação de usuário. Gera um token JWT se as credenciais estiverem corretas.

### Testes de Integração

Os testes de integração são implementados no arquivo `test/e2e/api.test.js`. Eles utilizam `node:test` e `node-fetch` para testar as rotas do servidor.

#### Testes Implementados

- `should receive not authorized given wrong user and password`: Verifica se a resposta é `401` quando as credenciais são inválidas.
- `should login successfully given user and password`: Verifica se a resposta é `200` e se um token JWT é retornado quando as credenciais são válidas.

## Como Executar

### Iniciar o Servidor

Para iniciar o servidor, execute:

```sh
npm run dev
```

### Executar os Testes

Para executar os testes, execute:

```sh
npm test
```

## Dependências

- `dotenv`: Carrega variáveis de ambiente de um arquivo `.env`.
- `jsonwebtoken`: Biblioteca para gerar e verificar tokens JWT.
- `node-fetch`: Biblioteca para fazer requisições HTTP no Node.js.

## Licença

Este projeto está licenciado sob a licença ISC.

