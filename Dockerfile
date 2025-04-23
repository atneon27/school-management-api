# Use official Node.js image
FROM node:23-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Transpile the TS code and expose port
RUN npm run build
EXPOSE 3000

# Start the app
CMD ["node", "dist/index.js"]
