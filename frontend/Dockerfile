FROM node:20-alpine

WORKDIR /app

# Copy dependency files and install
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

# Copy all source code
COPY . .

# Fix permissions inside container
RUN mkdir -p .next && chmod -R 777 .next

# Expose the dev server port
EXPOSE 3000

CMD ["npm", "run", "dev"]
