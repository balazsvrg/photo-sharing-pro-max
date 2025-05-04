# Use official Node.js base image
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install dependencies before copying full app to leverage Docker cache
COPY package*.json ./
COPY tsconfig.json ./
COPY next.config.js ./
COPY public ./public

# Install dependencies with non-root permissions
RUN npm install

# Copy the rest of the application code
COPY . .

# Ensure proper ownership and avoid EACCES errors
RUN addgroup -S appgroup && adduser -S appuser -G appgroup \
  && chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Build the Next.js app
RUN npm run build

# Expose port used by Next.js
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
