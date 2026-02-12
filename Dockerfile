FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy application code
COPY . .

# Build (if applicable)
RUN npm run build 2>/dev/null || true

EXPOSE 3000

CMD ["npm", "start"]
