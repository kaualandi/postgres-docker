# Dockerfile for NestJS
FROM node:18-slim

RUN apt-get update && apt-get install -y openssl procps

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "prisma:generate"]

CMD ["npm", "run", "start:dev"]
