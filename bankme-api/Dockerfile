# Usando a imagem oficial do Node.js como base
FROM node:18-alpine

# Definindo o diretório de trabalho
WORKDIR /usr/src/app

# Copiando o package.json e package-lock.json
COPY package*.json ./

# Instalando as dependências
RUN npm install

# Copiando o restante do código-fonte
COPY . .

# Compilando o código TypeScript
RUN npm run build

# Expondo a porta que a aplicação vai rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "run", "start:prod"]
