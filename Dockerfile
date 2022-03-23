FROM node:latest

# Create the directory!
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

# Copy and Install our bot
COPY package.json /usr/src/bot
RUN npm install

# Copy the Bot. It is now in a container
COPY . /usr/src/bot

# Start me!
CMD ["npm", "start"]