FROM node:12-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/jitsu

COPY package*.json ./
RUN npm install 

COPY . .

CMD [ "npm", "start" ]