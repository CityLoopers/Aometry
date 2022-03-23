FROM node:16.14-alpine

WORKDIR /home/aometry
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "start"]