# Use the official Nginx image as a parent image
FROM custom_nginx:latest

# Set the working directory to /usr/share/nginx/html
WORKDIR /usr/share/nginx/html

# Copy the build artifacts from your React app to the working directory
COPY dist/ .

# The default command to start Nginx is already set in the base image