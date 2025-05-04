# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency files and install
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

# Copy all source code
COPY . .

# Expose the dev server port (default 3000)
EXPOSE 3000

# Start in development mode
CMD ["npm", "run", "dev"]
