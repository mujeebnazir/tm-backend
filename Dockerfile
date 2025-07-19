# Use official Node.js image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's code
COPY . .

# Expose the app port (must match the one in docker-compose.yml)
EXPOSE 2000

# Start the application
CMD ["npm", "start"]
