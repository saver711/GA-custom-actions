FROM node:20-alpine

# Install AWS CLI and required dependencies
RUN apk add --no-cache \
    python3 \
    py3-pip \
    && pip3 install --upgrade pip \
    && pip3 install awscli

WORKDIR /action

# Copy package files first for better caching
COPY package*.json ./

# Install Node dependencies
RUN npm install

# Copy the rest of the files
COPY . .

ENTRYPOINT ["node", "/action/deployment.js"]