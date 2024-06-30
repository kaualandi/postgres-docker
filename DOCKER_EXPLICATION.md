### Explicação dos Arquivos

#### Dockerfile para Vite (Frontend)

```Dockerfile
# Dockerfile for Vite
FROM node:18-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
```

**Comandos Explicados:**
- `FROM node:18-slim`: Usa uma imagem base mínima do Node.js versão 18.
- `WORKDIR /app`: Define o diretório de trabalho dentro do contêiner como `/app`.
- `COPY package*.json ./`: Copia os arquivos `package.json` e `package-lock.json` para o diretório de trabalho.
- `RUN npm install`: Instala as dependências listadas em `package.json`.
- `COPY . .`: Copia todos os arquivos do diretório atual para o diretório de trabalho do contêiner.
- `EXPOSE 5173`: Expõe a porta 5173 para permitir o acesso à aplicação Vite.
- `CMD ["npm", "run", "dev"]`: Executa o comando `npm run dev` para iniciar o servidor de desenvolvimento do Vite.

#### Dockerfile para NestJS (Backend)

```Dockerfile
# Dockerfile for NestJS
FROM node:18-slim

RUN apt-get update && apt-get install -y openssl procps

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

CMD ["npm", "run", "start:dev"]
```

**Comandos Explicados:**
- `FROM node:18-slim`: Usa uma imagem base mínima do Node.js versão 18.
- `RUN apt-get update && apt-get install -y openssl procps`: Atualiza a lista de pacotes e instala `openssl` e `procps`, necessários para o NestJS e suas dependências.
- `WORKDIR /app`: Define o diretório de trabalho dentro do contêiner como `/app`.
- `COPY package*.json ./`: Copia os arquivos `package.json` e `package-lock.json` para o diretório de trabalho.
- `RUN npm install`: Instala as dependências listadas em `package.json`.
- `COPY . .`: Copia todos os arquivos do diretório atual para o diretório de trabalho do contêiner.
- `RUN npx prisma generate`: Gera o cliente Prisma baseado no esquema definido.
- `CMD ["npm", "run", "start:dev"]`: Executa o comando `npm run start:dev` para iniciar o servidor de desenvolvimento do NestJS.

#### Arquivo docker-compose.yml

```yaml
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: admin
      POSTGRES_DB: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  prisma:
    image: node:16-buster
    working_dir: /app
    volumes:
      - ./backend:/app
    environment:
      DATABASE_URL: postgres://postgres:admin@postgres:5432/postgres
    command: ["sh", "-c", "npx prisma generate && npx prisma migrate deploy"]
    depends_on:
      - postgres

  backend:
    build:
      context: ./backend
    environment:
      DATABASE_URL: postgres://postgres:admin@postgres:5432/postgres
    depends_on:
      - postgres
      - prisma
    volumes:
      - ./backend:/app
      - /app/node_modules
    ports:
      - "3001:3000"
    command: npm run start:dev

  frontend:
    build:
      context: ./frontend
    ports:
      - "5173:5173"
    depends_on:
      - backend
    volumes:
      - ./frontend:/app
      - /app/node_modules
    command: npm run dev

volumes:
  postgres_data:
```

**Explicação dos Serviços:**

- **postgres:**
  - `image: postgres:15`: Usa a imagem oficial do PostgreSQL versão 15.
  - `environment`: Define variáveis de ambiente para o banco de dados:
    - `POSTGRES_USER`: Usuário do PostgreSQL.
    - `POSTGRES_PASSWORD`: Senha do PostgreSQL.
    - `POSTGRES_DB`: Nome do banco de dados.
  - `ports`: Mapeia a porta 5432 do contêiner para a mesma porta no host.
  - `volumes`: Usa um volume nomeado `postgres_data` para persistir os dados do banco.

- **prisma:**
  - `image: node:16-buster`: Usa uma imagem do Node.js versão 16 com base Debian Buster.
  - `working_dir: /app`: Define o diretório de trabalho dentro do contêiner como `/app`.
  - `volumes`: Monta o diretório `./backend` do host no contêiner.
  - `environment`: Define a variável `DATABASE_URL` para a conexão com o PostgreSQL.
  - `command`: Executa os comandos `npx prisma generate` e `npx prisma migrate deploy` para gerar e aplicar migrações.
  - `depends_on`: Garante que o serviço `postgres` esteja funcionando antes de iniciar.

- **backend:**
  - `build`:
    - `context: ./backend`: Usa o diretório `./backend` para construir a imagem do backend.
  - `environment`: Define a variável `DATABASE_URL` para a conexão com o PostgreSQL.
  - `depends_on`: Garante que os serviços `postgres` e `prisma` estejam funcionando antes de iniciar.
  - `volumes`: Monta os diretórios `./backend` e `/app/node_modules` no contêiner.
  - `ports`: Mapeia a porta 3000 do contêiner para a porta 3001 no host.
  - `command`: Executa o comando `npm run start:dev` para iniciar o servidor de desenvolvimento do backend.

- **frontend:**
  - `build`:
    - `context: ./frontend`: Usa o diretório `./frontend` para construir a imagem do frontend.
  - `ports`: Mapeia a porta 5173 do contêiner para a mesma porta no host.
  - `depends_on`: Garante que o serviço `backend` esteja funcionando antes de iniciar.
  - `volumes`: Monta os diretórios `./frontend` e `/app/node_modules` no contêiner.
  - `command`: Executa o comando `npm run dev` para iniciar o servidor de desenvolvimento do frontend.

**Volumes:**
- `postgres_data`: Volume nomeado usado para persistir os dados do PostgreSQL.