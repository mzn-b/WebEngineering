# =========================
# 1) Dev stage
# =========================
FROM node:20-alpine AS development
WORKDIR /app

# Install deps first (better caching)
COPY package*.json ./
# If you use pnpm/yarn, adjust accordingly
RUN npm ci

# Copy source
COPY . .

EXPOSE 5173
# Vite dev server must listen on all interfaces in Docker
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]

# =========================
# 2) Build stage
# =========================
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .
# VITE_* env vars can be injected at build time if needed
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}
RUN npm run build

# =========================
# 3) Production stage (Nginx)
# =========================
FROM nginx:1.27-alpine AS production
# SPA-friendly nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Vite build output is typically /dist
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
