# Use a Node.js image for development
FROM node:20 AS dev

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Expose port 3000 for the React development server
EXPOSE 3000

# Start the React app in development mode
CMD ["npm", "start"]
