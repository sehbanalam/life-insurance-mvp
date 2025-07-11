# Stage 1: Build TypeScript
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Stage 2: Run production image
FROM node:18-alpine

WORKDIR /app

# Only copy necessary files for running
COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

# Optional: expose PORT from env or default
ENV PORT=5000
EXPOSE 5000

CMD ["node", "dist/index.js"]
