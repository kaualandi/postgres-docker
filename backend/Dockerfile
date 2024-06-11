# Dockerfile for NestJS
FROM node:18-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["node", "dist/main"]