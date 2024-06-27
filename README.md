# Postgres-Docker

## Índice
1. [Introdução](#introdução)
2. [Pré-requisitos](#pré-requisitos)
3. [Instalação](#instalação)
4. [Configuração](#configuração)
5. [Uso do Docker Compose](#uso-do-docker-compose)
6. [Migrações do Prisma](#migrações-do-prisma)
7. [Estrutura do Projeto](#estrutura-do-projeto)
8. [Scripts Disponíveis](#scripts-disponíveis)
9. [Endpoints](#endpoints)
10. [Banco de Dados](#banco-de-dados)
11. [Licença](#licença)
12. [Autores](#autores)
13. [Contribuição](#contribuição)

## Introdução
Este projeto foi desenvolvido como parte da Avaliação 2 (AV2) da disciplina de Tecnologias da Informação e Comunicação (TIC) do curso de Ciência da Computação (CCOMP) na Unifeso. O objetivo do projeto é criar um executor de queries SQL com as seguintes funcionalidades:
- Histórico de comandos
- Autocomplete básico
- Visualização de resultados em formato de tabela

Para o desenvolvimento deste projeto, foram utilizadas as seguintes tecnologias:
- **NestJS** para a construção do backend
- **React com Vite** para a interface frontend
- **PostgreSQL** como banco de dados relacional
- **Prisma** como ORM para interações com o banco de dados
- **Docker** para facilitar a criação e gerenciamento dos ambientes de desenvolvimento e produção

O projeto está estruturado de forma a utilizar o Docker Compose para orquestrar os contêineres necessários, garantindo um ambiente de desenvolvimento consistente e fácil de configurar.

## Pré-requisitos
Lista de ferramentas necessárias:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/pt)

> O teste foi feito com as seguintes versões:
> - Docker: Client/Engine 26.1.4
> - Docker Compose: 2.27.1
> - Node.js: 20.14.0

## Instalação
Passo a passo para configurar o ambiente:

1. Clone o repositório:
```sh
git clone https://github.com/kaualandi/postgres-docker.git
```

2. Acesse o diretório do projeto:
```sh
cd postgres-docker
```

3. Instale as dependências do backend:
```sh
cd backend && npm install
```

4. Instale as dependências do frontend:
```sh
cd ../frontend && npm install
```

5. Volte para o diretório raiz do projeto:
```sh
cd ..
```

## Configuração
Para configurar o ambiente de desenvolvimento, é necessário um arquivo `.env` dentro do backend do projeto, pode simplesmente copiar o arquivo `.env.example` e renomeá-lo para `.env`.

```sh
cp backend/.env.example backend/.env
```

## Uso do Docker Compose
Para iniciar o ambiente de desenvolvimento, execute o comando:
```sh
docker-compose up --build
```

Para executar em background, adicione a flag `-d`:
```sh
docker-compose up --build -d
```

A partir do momento que estiver rodando, o frontend estará disponível em http://localhost:5173.

Para encerrar, basta executar o comando:
```sh
docker-compose down
```

## Migrações do Prisma
Para criar as migrações do Prisma, execute o comando:
```sh
docker-compose exec backend npx prisma migrate dev
```

## Estrutura do Projeto
A estrutura do projeto está organizada da seguinte forma:
```
postgres-docker/
├── README.md
├── backend
|  ├── Dockerfile
|  ├── Dockerfile.prisma
|  ├── README.md
|  ├── nest-cli.json
|  ├── package-lock.json
|  ├── package.json
|  ├── prisma
|  |  ├── migrations
|  |  |  ├── 20240616182843_fist_migration
|  |  |  |  └── migration.sql
|  |  |  ├── 20240617021309_lower_case_models
|  |  |  |  └── migration.sql
|  |  |  ├── 20240617021650_updated_at_with_default_value_now
|  |  |  |  └── migration.sql
|  |  |  ├── 20240619000154_rename_history_log
|  |  |  |  └── migration.sql
|  |  |  └── migration_lock.toml
|  |  └── schema.prisma
|  ├── src
|  |  ├── app.controller.ts
|  |  ├── app.module.ts
|  |  ├── app.service.ts
|  |  ├── constants
|  |  |  ├── errors.ts
|  |  |  └── querys.ts
|  |  ├── main.ts
|  |  ├── models
|  |  |  ├── history
|  |  |  |  ├── dto
|  |  |  |  |  ├── create-history.dto.ts
|  |  |  |  |  └── update-history.dto.ts
|  |  |  |  ├── entities
|  |  |  |  |  └── history.entity.ts
|  |  |  |  ├── history.controller.ts
|  |  |  |  ├── history.module.ts
|  |  |  |  └── history.service.ts
|  |  |  ├── querys
|  |  |  |  ├── dto
|  |  |  |  |  └── execute-dto.ts
|  |  |  |  ├── querys.controller.ts
|  |  |  |  ├── querys.module.ts
|  |  |  |  └── querys.service.ts
|  |  |  └── querys.ts
|  |  └── modules
|  |     └── prisma
|  |        ├── prisma.module.ts
|  |        └── prisma.service.ts
|  ├── tsconfig.build.json
|  └── tsconfig.json
├── docker-compose.yml
├── frontend
|  ├── Dockerfile
|  ├── README.md
|  ├── index.html
|  ├── package-lock.json
|  ├── package.json
|  ├── postcss.config.js
|  ├── src
|  |  ├── assets
|  |  |  └── icons
|  |  |     ├── delete.tsx
|  |  |     ├── play.tsx
|  |  |     └── reset.tsx
|  |  ├── components
|  |  |  ├── history
|  |  |  |  ├── index.tsx
|  |  |  |  └── styles.ts
|  |  |  ├── modal
|  |  |  |  └── index.tsx
|  |  |  └── table
|  |  |     ├── index.tsx
|  |  |     └── styles.ts
|  |  ├── index.css
|  |  ├── main.tsx
|  |  ├── pages
|  |  |  └── home
|  |  |     ├── index.tsx
|  |  |     └── styles.ts
|  |  ├── styles
|  |  |  └── global.ts
|  |  └── vite-env.d.ts
|  ├── stitches.config.ts
|  ├── tailwind.config.js
|  ├── tsconfig.json
|  ├── tsconfig.node.json
|  ├── vercel.json
|  └── vite.config.ts
└── package.json

Diretórios: 6631
Arquivos: 44939
```

## Scripts Disponíveis
Foi criado alguns scripts para facilitar o desenvolvimento do projeto, eles estão disponíveis no arquivo `package.json` na raiz do projeto. São eles:
- `start`: Inicia o ambiente de desenvolvimento com o Docker Compose em segundo plano
- `dev`: Inicia o ambiente de desenvolvimento com o Docker Compose em primeiro plano
- `clear-cache`: Limpa o cache do Docker Compose, use quando houver problemas de envolvendo a atomicidade dos arquivos

Para executar os scripts, basta utilizar o comando:
```sh
npm run <script>
```

exemplo:
```sh
npm run start
```

## Endpoints
Os endpoints disponíveis são:
- `GET /history`: Retorna o histórico de comandos executados
- `GET /querys/config`: Retorna as tabelas e colunas disponíveis para o autocomplete
- `POST /querys/execute`: Executa uma query SQL
  * Exemplo de payload:
    ```json
    {
      "query": "SELECT * FROM history"
    }
    ```
  * Deve-se atentar que, ao executar comandos de escrita, utiliza-se um Heaader `Authorization` com a senha em Md5 definida no arquivo `.env` do backend

> A porta padrão do backend é 3001

## Banco de Dados
Para acessar o banco de dados, é necessário um cliente de PostgreSQL, como o [DBeaver](https://dbeaver.io/). Utilize as seguintes credenciais:
- **Host**: localhost
- **Port**: 5432
- **Database**: postgres
- **User**: postgres
- **Password**: admin

## Licença
Distribuído sob a licença MIT. Veja [LICENSE](LICENSE) para mais informações.

## Autores
- **Kauã Landi** (06009262) - [@kaualandi](https://github.com/kaualandi)
- **Lucas Anes** (06009881) - [@lucasanes](https://github.com/lucasanes)
- **Murilo Mouteira** (06010561) - [@MuriloThundr](https://github.com/MuriloThundr)

## Contribuição

Contribuições, problemas e solicitações de recursos são bem-vindos! <br/> Sinta-se à vontade para verificar a [página de problemas](https://github.com/kaualandi/postgres-docker/issues). Você também pode dar uma olhada na [página de contribuição](https://github.com/kaualandi/postgres-docker/pulls).