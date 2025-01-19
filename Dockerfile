# Use the official Node.js runtime as a parent image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the Nuxt 3 app for production
RUN npm run build

ENV HOST=0.0.0.0
ENV NODE_ENV=production
ENV NUXT_PUBLIC_API_HOST=https://api.caesium.app

# Expose the port that Nuxt listens on
EXPOSE 3000

# Define the command to start the app
CMD ["node", ".output/server/index.mjs"]
