FROM node:alpine


WORKDIR /usr/app

COPY *.json .

RUN npm install

COPY . .

CMD node index.js