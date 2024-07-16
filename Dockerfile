#Download node image
FROM node:18

# Create app_backend directory
WORKDIR /usr/src/app_backend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

#expose port 3000 into app
EXPOSE 3000

# Run the app
CMD ["npm", "run","start"]