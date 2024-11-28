# Use official Node.js image for building the app
FROM node:20 AS build

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json for dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the React app files
COPY . .

# Build the React app for production
RUN npm run build

# Use the Nginx image to serve the build folder
FROM nginx:alpine

# Copy the custom Nginx configuration to the container
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the build output from the build stage to the Nginx serving folder
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose port 80 for the web app
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
