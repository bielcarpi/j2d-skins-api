# Stage 1: Build the TypeScript application
FROM node:20 AS builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Build the project
RUN npm run build

# Stage 2: Set up the production environment
FROM node:20

WORKDIR /usr/src/app

# Copy built assets from the builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY package*.json ./
COPY db.json ./

# Install only production dependencies
RUN npm install --only=production

# Expose the port 3000
EXPOSE 3000

CMD npm start