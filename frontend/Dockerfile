FROM node:20-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .
COPY .env.production .env.development

EXPOSE 3000

CMD ["npm", "run", "dev"]