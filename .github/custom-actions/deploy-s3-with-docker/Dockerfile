FROM node:16

WORKDIR /app

COPY package.json ./

RUN npm install

COPY deployment.js ./

CMD ["node", "deployment.js"]
