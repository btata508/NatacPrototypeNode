FROM node:8

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

EXPOSE 8080

CMD ["node","main.js"]
