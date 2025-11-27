FROM node:18-alpine

WORKDIR /usr/src/app

# Copy only package files first so Docker can cache npm install
COPY package*.json ./

# Install dependencies (use npm install instead of npm ci)
RUN npm install --only=production

# Now copy the rest of the app
COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
