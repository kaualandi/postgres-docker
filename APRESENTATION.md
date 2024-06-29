### Apresentação: Postgres-Docker

---

#### **Apresentador 1: Kauã Landi**

## 1. Introdução
- **Objetivo do Projeto**: Criar um executor de queries SQL com:
  - Histórico de comandos
  - Autocomplete básico
  - Visualização de resultados em formato de tabela

- **Tecnologias Utilizadas**:
  - **Backend**: NestJS
  - **Frontend**: React com Vite
  - **Banco de Dados**: PostgreSQL
  - **ORM**: Prisma
  - **Gerenciamento de Ambientes**: Docker e Docker Compose

---

## 2. Pré-requisitos
- **Ferramentas Necessárias**:
  - [Docker](https://docs.docker.com/get-docker/)
  - [Docker Compose](https://docs.docker.com/compose/install/)
  - [Node.js](https://nodejs.org/pt)

- **Versões Utilizadas**:
  - Docker: Client/Engine 26.1.4
  - Docker Compose: 2.27.1
  - Node.js: 20.14.0

---

## 3. Instalação
1. **Clonar o Repositório**:
```sh
git clone https://github.com/kaualandi/postgres-docker.git
```

2. **Acessar o Diretório do Projeto**:
```sh
cd postgres-docker
```

3. **Instalar Dependências do Backend**:
```sh
cd backend && npm install
```

4. **Instalar Dependências do Frontend**:
```sh
cd ../frontend && npm install
```

5. **Voltar para o Diretório Raiz**:
```sh
cd ..
```

---

#### **Apresentador 2: Lucas Anes**

## 4. Configuração
- **Criar o arquivo `.env`**:
```sh
cp backend/.env.example backend/.env
```

---

## 5. Uso do Docker Compose
- **Iniciar Ambiente de Desenvolvimento**:
```sh
docker-compose up --build
```

- **Iniciar em Background**:
```sh
docker-compose up --build -d
```

- **Acessar o Frontend**:
  - http://localhost:5173

- **Encerrar Ambiente**:
```sh
docker-compose down
```

---

## 6. Migrações do Prisma
- **Criar Migrações**:
```sh
docker-compose exec backend npx prisma migrate dev
```

---

## 7. Estrutura do Projeto
```
postgres-docker/
├── README.md
├── backend
│  ├── Dockerfile
│  ├── Dockerfile.prisma
│  ├── README.md
│  ├── nest-cli.json
│  ├── package-lock.json
│  ├── package.json
│  ├── prisma
│  │  ├── migrations
│  │  ├── schema.prisma
│  ├── src
│  │  ├── app.controller.ts
│  │  ├── app.module.ts
│  │  ├── app.service.ts
│  │  ├── constants
│  │  ├── main.ts
│  │  ├── models
│  │  ├── modules
│  ├── tsconfig.build.json
│  └── tsconfig.json
├── docker-compose.yml
├── frontend
│  ├── Dockerfile
│  ├── README.md
│  ├── index.html
│  ├── package-lock.json
│  ├── package.json
│  ├── postcss.config.js
│  ├── src
│  │  ├── assets
│  │  ├── components
│  │  ├── index.css
│  │  ├── main.tsx
│  │  ├── pages
│  │  ├── styles
│  │  ├── vite-env.d.ts
│  ├── stitches.config.ts
│  ├── tailwind.config.js
│  ├── tsconfig.json
│  ├── tsconfig.node.json
│  ├── vercel.json
│  └── vite.config.ts
└── package.json
```

---

#### **Apresentador 3: Murilo Mouteira**

## 8. Scripts Disponíveis
- **Scripts no `package.json`**:
  - `start`: Inicia o ambiente de desenvolvimento com Docker Compose em segundo plano
  - `dev`: Inicia o ambiente de desenvolvimento com Docker Compose em primeiro plano
  - `clear-cache`: Limpa o cache do Docker Compose

- **Executar Scripts**:
```sh
npm run <script>
```
  - Exemplo:
```sh
npm run start
```

---

## 9. Endpoints
- **Endpoints Disponíveis**:
  - `GET /history`: Retorna o histórico de comandos executados
  - `GET /querys/config`: Retorna tabelas e colunas para autocomplete
  - `POST /querys/execute`: Executa uma query SQL
    - **Exemplo de Payload**:
    ```json
    {
      "query": "SELECT * FROM history"
    }
    ```

- **Porta Padrão do Backend**: 3001

---

## 10. Banco de Dados
- **Credenciais de Acesso**:
  - **Host**: localhost
  - **Port**: 5432
  - **Database**: postgres
  - **User**: postgres
  - **Password**: admin

---

## 11. Licença
- **Licença MIT**: [LICENSE](LICENSE)

---

## 12. Autores
- **Kauã Landi** (06009262) - [@kaualandi](https://github.com/kaualandi)
- **Lucas Anes** (06009881) - [@lucasanes](https://github.com/lucasanes)
- **Murilo Mouteira** (06010561) - [@MuriloThundr](https://github.com/MuriloThundr)

---

## 13. Contribuição
- **Contribuições e Problemas**:
  - [Página de Problemas](https://github.com/kaualandi/postgres-docker/issues)
  - [Página de Contribuição](https://github.com/kaualandi/postgres-docker/pulls)

---

Assim, cada apresentador cobre uma parte específica do projeto, garantindo uma apresentação clara e organizada.