FROM node:20-alpine

WORKDIR /github/workspace

# Install dependencies
COPY package.json ./
RUN npm install

# Copy script
COPY deployment.js ./

ENTRYPOINT ["node", "deployment.js"]
