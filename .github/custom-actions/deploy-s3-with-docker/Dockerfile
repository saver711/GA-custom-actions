FROM node:16

WORKDIR /github/workspace

COPY . .
RUN npm install

CMD ["node", "/github/workspace/deployment.js"]