FROM node:20-alpine

# Create protected directory for action files
RUN mkdir -p /action
WORKDIR /action

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy action files to protected directory
COPY . .

# Set entrypoint to use protected path
ENTRYPOINT ["node", "/action/deployment.js"]