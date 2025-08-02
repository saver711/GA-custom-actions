FROM node:20-alpine

WORKDIR /github/workspace

# Install dependencies
COPY .github/custom-actions/deploy-s3-with-docker/package.json ./
RUN npm install

# Copy script
COPY .github/custom-actions/deploy-s3-with-docker/deployment.js ./

ENTRYPOINT ["node", "deployment.js"]