# =========================
# Build Stage
# =========================
FROM node:20-alpine AS builder
WORKDIR /app

ARG ENV=development

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build -- --mode $ENV

# =========================
# Production Stage with Nginx
# =========================
FROM nginx:alpine

# Remove default config and clear html
RUN rm /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*

# Copy all built files from builder
COPY --from=builder /app/dist/. /usr/share/nginx/html/

# Create temp dirs for Nginx (needed for logs & caching)
RUN mkdir -p /tmp/nginx/client_temp \
         /tmp/nginx/proxy_temp \
         /tmp/nginx/fastcgi_temp \
         /tmp/nginx/uwsgi_temp \
         /tmp/nginx/scgi_temp \
    && chmod -R 777 /tmp/nginx \
    && chown -R nginx:nginx /usr/share/nginx/html

# Copy custom nginx configuration
COPY ./nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 8080

# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
