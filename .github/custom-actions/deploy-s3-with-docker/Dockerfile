FROM node:20-alpine

WORKDIR /github/workspace

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy ALL files from action directory
COPY . .

# Verify file existence (optional but helpful for debugging)
RUN ls -la

ENTRYPOINT ["node", "deployment.js"]