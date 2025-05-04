FROM node:20-alpine

WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
COPY tsconfig.json ./
COPY next.config.ts ./
COPY public ./public

RUN npm install

# Copy application source
COPY . .

# Build as root — no issue here since it's during build
RUN npm run build

# Make critical folders writable by any user (OpenShift safe)
RUN mkdir -p /app/.next/cache/fetch-cache /app/runtime-cache \
  && chmod -R g=u /app

# Environment settings
ENV NODE_ENV=production
ENV NEXT_RUNTIME_CACHE_DIR=/app/runtime-cache

# Expose default port
EXPOSE 3000

# Use non-root execution — but OpenShift may override this UID
CMD ["npx", "next", "start"]

