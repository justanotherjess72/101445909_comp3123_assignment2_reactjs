# Use official Node.js image as a base
FROM node:20

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (to install dependencies)
COPY package*.json ./

# Install dependencies inside the container
RUN npm install

# Copy the rest of the backend app code into the container
COPY . .

# Expose the port that the app will run on
EXPOSE 5000

# Command to run the app (can vary depending on your setup)
CMD ["node", "/index.js"]
