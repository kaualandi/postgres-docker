### Script de Apresentação: Postgres-Docker

---

#### **Apresentador 1: Kauã Landi**

**Slide 1: Introdução**

**Kauã:**
"Olá, bom dia a todos! Hoje, vamos apresentar nosso projeto, chamado Postgres-Docker. Este projeto foi desenvolvido como parte da Avaliação 2 da disciplina de Tecnologias da Informação e Comunicação no curso de Ciência da Computação na Unifeso. O objetivo do nosso projeto é criar um executor de queries SQL com funcionalidades de histórico de comandos, autocomplete básico e visualização de resultados em formato de tabela.

Para isso, utilizamos diversas tecnologias:
- **NestJS** para o backend,
- **React com Vite** para o frontend,
- **PostgreSQL** como banco de dados,
- **Prisma** como ORM,
- E **Docker** para gerenciamento de ambientes.

Além disso, usamos o Docker Compose para orquestrar os contêineres, garantindo um ambiente de desenvolvimento consistente e fácil de configurar."

---

**Slide 2: Pré-requisitos**

**Kauã:**
"Para configurar e executar nosso projeto, são necessárias algumas ferramentas:
- Docker
- Docker Compose
- Node.js

Testamos o projeto com as seguintes versões:
- Docker: Client/Engine 26.1.4
- Docker Compose: 2.27.1
- Node.js: 20.14.0"

---

**Slide 3: Instalação**

**Kauã:**
"Agora, vou explicar como instalar o projeto. Primeiramente, você deve clonar o repositório do GitHub:

```sh
git clone https://github.com/kaualandi/postgres-docker.git
```

Depois, acesse o diretório do projeto:

```sh
cd postgres-docker
```

Instale as dependências do backend:

```sh
cd backend && npm install
```

E as dependências do frontend:

```sh
cd ../frontend && npm install
```

Finalmente, volte para o diretório raiz do projeto:

```sh
cd ..
```

Agora vou passar a palavra para o Lucas, que continuará a apresentação."

---

#### **Apresentador 2: Lucas Anes**

**Slide 4: Configuração**

**Lucas:**
"Obrigado, Kauã. Agora vamos falar sobre a configuração do ambiente. Para isso, é necessário criar um arquivo `.env` dentro do backend do projeto. Você pode copiar o arquivo `.env.example` e renomeá-lo para `.env` com o seguinte comando:

```sh
cp backend/.env.example backend/.env
```

---

**Slide 5: Uso do Docker Compose**

**Lucas:**
"Para iniciar o ambiente de desenvolvimento, você deve usar o Docker Compose. Execute o comando:

```sh
docker-compose up --build
```

Se preferir executar em background, adicione a flag `-d`:

```sh
docker-compose up --build -d
```

Com o ambiente rodando, você pode acessar o frontend em http://localhost:5173. Para encerrar, basta executar o comando:

```sh
docker-compose down
```

---

**Slide 6: Migrações do Prisma**

**Lucas:**
"Para criar as migrações do Prisma, execute o comando:

```sh
docker-compose exec backend npx prisma migrate dev
```

---

**Slide 7: Estrutura do Projeto**

**Lucas:**
"A estrutura do projeto está organizada da seguinte forma:

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

Agora vou passar a palavra para o Murilo, que continuará com os scripts disponíveis, endpoints e outras informações."

---

#### **Apresentador 3: Murilo Mouteira**

**Slide 8: Scripts Disponíveis**

**Murilo:**
"Obrigado, Lucas. No nosso projeto, criamos alguns scripts para facilitar o desenvolvimento. Eles estão disponíveis no arquivo `package.json` na raiz do projeto. Os principais scripts são:
- `start`: Inicia o ambiente de desenvolvimento com o Docker Compose em segundo plano
- `dev`: Inicia o ambiente de desenvolvimento com o Docker Compose em primeiro plano
- `clear-cache`: Limpa o cache do Docker Compose

Para executar os scripts, basta usar o comando:

```sh
npm run <script>
```

Por exemplo:

```sh
npm run start
```

---

**Slide 9: Endpoints**

**Murilo:**
"Nosso projeto possui alguns endpoints disponíveis:
- `GET /history`: Retorna o histórico de comandos executados
- `GET /querys/config`: Retorna as tabelas e colunas disponíveis para o autocomplete
- `POST /querys/execute`: Executa uma query SQL

Aqui está um exemplo de payload para o endpoint `POST /querys/execute`:

```json
{
  "query": "SELECT * FROM history"
}
```

Atenção: para comandos de escrita, utilize um Header `Authorization` com a senha em MD5 definida no arquivo `.env` do backend. A porta padrão do backend é 3001."

---

**Slide 10: Banco de Dados**

**Murilo:**
"Para acessar o banco de dados, você pode utilizar um cliente de PostgreSQL como o [DBeaver](https://dbeaver.io/). As credenciais de acesso são:
- **Host**: localhost
- **Port**: 5432
- **Database**: postgres
- **User**: postgres
- **Password**: admin

---

**Slide 11: Licença**

**Murilo:**
"O nosso projeto está distribuído sob a licença MIT. Para mais informações, veja o arquivo [LICENSE](LICENSE)."

---

**Slide 12: Autores**

**Murilo:**
"Os autores do projeto são:
- **Kauã Landi** (06009262) - [@kaualandi](https://github.com/kaualandi)
- **Lucas Anes** (06009881) - [@lucasanes](https://github.com/lucasanes)
- **Murilo Mouteira** (06010561) - [@murilothunder](https://github.com/murilothunder)

---

**Slide 13: Contribuição**

**Murilo:**
"Contribuições, problemas e solicitações de recursos são bem-vindos! Sinta-se à vontade para verificar a [página de problemas](https://github.com/kaualandi/postgres-docker/issues) e a [página de contribuição](https://github.com/kaualandi/postgres-docker/pulls). 

Obrigado pela atenção e estamos abertos para perguntas!"

---

Este script detalhado guia os apresentadores através da apresentação, assegurando que cada um cobre sua parte designada de forma clara e completa.