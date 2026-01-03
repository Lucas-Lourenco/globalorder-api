# GlobalOrder API

<div align="center">
  <p>
    Uma API robusta para gerenciamento de pedidos e clientes desenvolvida com <strong>NestJS</strong>, <strong>MongoDB</strong> e <strong>Redis</strong>.
  </p>
</div>

## 📋 Índice

- [Sobre](#sobre)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Execução](#execução)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [API Endpoints](#api-endpoints)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Docker](#docker)
- [Scripts Disponíveis](#scripts-disponíveis)

## 🎯 Sobre

GlobalOrder API é uma aplicação de backend desenvolvida como projeto educacional para gerenciamento de clientes, pedidos e relatórios. O projeto implementa boas práticas de arquitetura, validação de dados, processamento assíncrono de filas e integração com serviços externos.

### Funcionalidades Principais

- ✅ Gestão de clientes (CRUD)
- ✅ Gestão de pedidos (CRUD)
- ✅ Processamento assíncrono de pedidos com BullMQ
- ✅ Conversão de moedas em tempo real
- ✅ Upload de arquivos (Local Storage / S3 Ready)
- ✅ Geração de relatórios
- ✅ Documentação interativa com Swagger
- ✅ Validação robusta de dados
- ✅ Segurança com Helmet

## 🛠️ Tecnologias

| Tecnologia | Versão | Propósito |
|-----------|--------|----------|
| **NestJS** | ^11.0.1 | Framework web progressivo |
| **Node.js** | 18+ | Runtime JavaScript |
| **MongoDB** | latest | Banco de dados NoSQL |
| **Mongoose** | ^9.1.0 | ODM para MongoDB |
| **Redis** | alpine | Cache e fila de mensagens |
| **BullMQ** | ^11.0.4 | Gerenciador de filas |
| **TypeScript** | ^5.3.3 | Linguagem tipada |
| **Swagger** | ^11.2.3 | Documentação da API |
| **Helmet** | ^8.1.0 | Segurança HTTP |

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **Docker** e **Docker Compose** (opcional, mas recomendado)
- **MongoDB** (ou use Docker)
- **Redis** (ou use Docker)

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/Lucas-Lourenco/globalorder-api.git

cd globalorder-api
```

### 2. Instale as dependências

```bash
npm install
```

ou com yarn:

```bash
yarn install
```

## ⚙️ Configuração

### 1. Crie o arquivo `.env`

Copie o arquivo `.env.example` e configure as variáveis de ambiente:

```bash
cp .env.example .env
```

### 2. Configure as variáveis necessárias

Edite o arquivo `.env` com suas configurações:

```env
# CONFIGURAÇÕES DE BANCO DE DADOS
DATABASE_URL=mongodb://localhost:27017/global_order_db

# CONFIGURAÇÕES DO REDIS (BULLMQ)
REDIS_HOST=localhost
REDIS_PORT=6379

# INTEGRAÇÃO COM API DE ECONOMIA
ECONOMIA_API=https://economia.awesomeapi.com.br/json/last/USD-BRL

# INTEGRAÇÃO COM AWS S3 (CREDENCIAIS DE EXEMPLO)
AWS_ACCESS_KEY_ID=sua_chave_aqui
AWS_SECRET_ACCESS_KEY=seu_segredo_aqui
AWS_REGION=us-east-1
S3_BUCKET=nome-do-seu-bucket
```

## 🎬 Execução

### Opção 1: Com Docker Compose (Recomendado)

```bash
docker-compose up -d
```

Isso iniciará:
- MongoDB na porta `27017`
- Redis na porta `6379`

Depois, execute a aplicação:

```bash
npm run start:dev
```

### Opção 2: Instalação Local

Se você tem MongoDB e Redis rodando localmente, execute:

```bash
npm run start:dev
```

A API estará disponível em: `http://localhost:3000`

Acesse a documentação Swagger em: `http://localhost:3000/api/docs`

## 📁 Estrutura do Projeto

```
globalorder-api/
├── src/
│   ├── common/
│   │   ├── common.module.ts          # Módulo compartilhado
│   │   └── currency.service.ts       # Serviço de conversão de moedas
│   ├── customers/
│   │   ├── customers.controller.ts   # Controller de clientes
│   │   ├── customers.service.ts      # Serviço de clientes
│   │   ├── customers.module.ts       # Módulo de clientes
│   │   ├── dto/
│   │   │   ├── create-customer.dto.ts
│   │   │   └── update-customer.dto.ts
│   │   └── schemas/
│   │       └── customer.schema.ts    # Schema MongoDB
│   ├── orders/
│   │   ├── orders.controller.ts      # Controller de pedidos
│   │   ├── orders.service.ts         # Serviço de pedidos
│   │   ├── orders.processor.ts       # Processador de fila
│   │   ├── orders.module.ts          # Módulo de pedidos
│   │   ├── dto/
│   │   │   ├── create-order.dto.ts
│   │   │   └── update-order.dto.ts
│   │   └── schemas/
│   │       └── order.schema.ts       # Schema MongoDB
│   ├── reports/
│   │   ├── reports.controller.ts     # Controller de relatórios
│   │   ├── reports.service.ts        # Serviço de relatórios
│   │   └── reports.module.ts         # Módulo de relatórios
│   ├── app.controller.ts             # Controller raiz
│   ├── app.service.ts                # Serviço raiz
│   ├── app.module.ts                 # Módulo raiz
│   └── main.ts                       # Arquivo de entrada
├── uploads/                          # Diretório de uploads
├── docker-compose.yml                # Configuração Docker
├── package.json                      # Dependências
├── tsconfig.json                     # Configuração TypeScript
├── nest-cli.json                     # Configuração NestJS CLI
├── eslint.config.mjs                 # Configuração ESLint
└── README.md                         # Este arquivo
```

## 🔌 API Endpoints

### Clientes (Customers)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/clientes` | Criar novo cliente |
| GET | `/clientes` | Listar todos os clientes |
| GET | `/clientes/:id` | Obter cliente por ID |
| PUT | `/clientes/:id` | Atualizar cliente |
| DELETE | `/clientes/:id` | Deletar cliente |

### Pedidos (Orders)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/pedidos` | Criar novo pedido (Dispara fila de e-mail) |
| GET | `/pedidos` | Listar pedidos (com paginação) |
| GET | `/pedidos/:id` | Obter pedido por ID |
| PUT | `/pedidos/:id` | Atualizar pedido |
| DELETE | `/pedidos/:id` | Deletar pedido |
| POST | `/pedidos/:id/comprovante` | 📤 Upload de comprovante (PDF/Imagem) |

### Relatórios (Reports)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/relatorios/top-clientes` | 🏆 Ranking de clientes por valor total gasto (BRL) |

## 🌍 Variáveis de Ambiente

| Variável | Tipo | Descrição |
|----------|------|-----------|
| `DATABASE_URL` | string | URI de conexão do MongoDB |
| `REDIS_HOST` | string | Host do Redis (padrão: localhost) |
| `REDIS_PORT` | number | Porta do Redis (padrão: 6379) |
| `ECONOMIA_API` | string | URL da API de economia para conversão |
| `AWS_ACCESS_KEY_ID` | string | Chave de acesso AWS |
| `AWS_SECRET_ACCESS_KEY` | string | Chave secreta AWS |
| `AWS_REGION` | string | Região AWS (padrão: us-east-1) |
| `S3_BUCKET` | string | Nome do bucket S3 |

## 🐳 Docker

### Iniciar Serviços

```bash
docker-compose up -d
```

### Parar Serviços

```bash
docker-compose down
```

### Ver Logs

```bash
docker-compose logs -f
```

### Acessar MongoDB

```bash
docker exec -it nest-mongo mongosh
```

### Acessar Redis

```bash
docker exec -it nest-redis redis-cli
```

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:dev          # Inicia em modo watch
npm run start:debug        # Inicia em modo debug

# Produção
npm run build              # Compila o projeto
npm run start:prod         # Inicia a versão compilada

# Qualidade de Código
npm run lint               # Executa ESLint
npm run format             # Formata código com Prettier

# Testes
npm run test               # Executa testes
npm run test:watch         # Executa testes em modo watch
npm run test:cov           # Executa testes com cobertura
npm run test:debug         # Executa testes em modo debug
npm run test:e2e           # Executa testes end-to-end
```

## 📚 Documentação da API

Após iniciar o servidor, acesse a documentação interativa do Swagger:

```
http://localhost:3000/api
```

Lá você encontrará:
- Todos os endpoints disponíveis
- Exemplos de requisição e resposta
- Esquemas de dados
- Autenticação (se aplicável)

## 🔒 Segurança

A aplicação implementa várias camadas de segurança:

- **Helmet**: Protege contra vulnerabilidades HTTP comuns
- **CORS**: Habilitado para requisições cross-origin
- **Validação**: Usa `class-validator` para validar dados de entrada
- **Whitelist**: Apenas campos esperados são aceitos
- **Transformação**: Dados são transformados automaticamente para os tipos corretos

## 🧪 Testes

Para executar os testes:

```bash
# Testes unitários
npm run test

# Testes em modo watch
npm run test:watch

# Cobertura de testes
npm run test:cov

# Testes end-to-end
npm run test:e2e
```

## 🌟 Padrões e Boas Práticas

- ✅ Arquitetura modular com NestJS
- ✅ DTOs (Data Transfer Objects) para validação
- ✅ Schemas Mongoose para tipagem
- ✅ Injeção de dependência
- ✅ Tratamento de erros consistente
- ✅ Padrão async/await
- ✅ Processamento assíncrono com BullMQ
- ✅ Integração com serviços externos

## 📝 Padrão de Desenvolvimento

### Criar um novo Módulo

```bash
nest g module nome-modulo
nest g controller nome-modulo
nest g service nome-modulo
```

### Criar um novo DTO

```bash
nest g class nome-modulo/dto/create-nome.dto
```

### Criar um novo Schema

```bash
nest g class nome-modulo/schemas/nome.schema
```

## 🐛 Troubleshooting

### Erro: Conexão recusada ao MongoDB

- Certifique-se de que o MongoDB está rodando
- Verifique se a URI está correta em `.env`
- Se usar Docker, execute: `docker-compose up -d`

### Erro: Conexão recusada ao Redis

- Certifique-se de que o Redis está rodando
- Verifique host e porta em `app.module.ts`
- Se usar Docker, execute: `docker-compose up -d`

### Porta 3000 já em uso

```bash
# Linux/Mac
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.

## 📄 Licença

Este projeto é licenciado sob a licença UNLICENSED. Veja o arquivo `package.json` para mais detalhes.

## 👨‍💻 Desenvolvedor

**GlobalOrder API** - Projeto educacional de backend com NestJS

---

<div align="center">
  <p>Feito por Lucas Lourenço com ❤️ usando NestJS, MongoDB e Redis</p>
</div>
