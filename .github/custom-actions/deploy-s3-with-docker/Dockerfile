FROM node:20-alpine

# Match GitHub's default working directory
WORKDIR /github/workspace

# Install deps
COPY package.json ./
RUN npm install

# Copy all files from the action folder
COPY . ./

ENTRYPOINT ["node", "deployment.js"]
