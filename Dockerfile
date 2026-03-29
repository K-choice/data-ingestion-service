FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code
COPY ./src ./src

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["node", "src/index.js"]