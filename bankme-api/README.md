#### Como preparar o ambiente

Para preparar o ambiente para rodar o projeto, siga os seguintes passos:

1. **Instalar o Docker**:
   - Se você ainda não tem o Docker instalado, [faça o download e instale o Docker](https://www.docker.com/get-started).

2. **Configurar o Ambiente**:
   - No terminal, navegue até a raiz do seu projeto.

---

#### Como instalar as dependências

No ambiente de desenvolvimento (fora do Docker), para instalar as dependências do projeto:

1. **Instalar o Node.js**:
   - Se você ainda não tem o Node.js instalado, [faça o download e instale o Node.js](https://nodejs.org/).

2. **Instalar as dependências**:
   - Navegue até a pasta do seu projeto no terminal e execute:
   ```bash
   npm install
   ```

3. **Instalar o Prisma**:
   - Se estiver utilizando o Prisma, execute:
   ```bash
   npx prisma generate
   ```

---

#### Como rodar o projeto

Existem duas formas de rodar o projeto: utilizando o Docker ou de forma tradicional no Node.js.

##### 1. **Rodando com Docker**

Para rodar a aplicação utilizando o Docker e Docker Compose:

1. **Iniciar os containers**:
   - No terminal, navegue até a pasta do seu projeto e execute:
   ```bash
   docker-compose up --build
   ```
   Isso irá construir a imagem do Docker e iniciar os containers definidos no `docker-compose.yaml`.

2. **Verificar se o serviço está rodando**:
   - Abra o navegador e acesse `http://localhost:3000`. Você deve ver sua API em execução.

##### 2. **Rodando de forma tradicional (sem Docker)**

Para rodar a aplicação sem Docker (no ambiente de desenvolvimento local):

1. **Rodar a aplicação em modo de desenvolvimento**:
   - Execute o comando abaixo:
   ```bash
   npm run start:dev
   ```

2. **Rodar a aplicação em modo de produção**:
   - Se você já compilou o código (ou se a aplicação já foi criada via Docker), execute:
   ```bash
   npm run start:prod
   ```
