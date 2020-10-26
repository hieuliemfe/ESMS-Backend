FROM node:12

RUN yarn global add pm2

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN ["yarn", "install"]

COPY . .

CMD ["yarn", "deploy"]
