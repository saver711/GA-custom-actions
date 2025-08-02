FROM node:20-alpine

# Install AWS CLI from Alpine repositories (v2.x)
RUN apk add --no-cache aws-cli

WORKDIR /action
COPY package*.json ./
RUN npm install
COPY . .

ENTRYPOINT ["node", "/action/deployment.js"]