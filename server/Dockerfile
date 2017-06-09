FROM node:latest

WORKDIR /usr/src/app
RUN npm install -g babel-cli
COPY ./package.json package.json
RUN npm install
COPY . /usr/src/app
RUN npm run build

EXPOSE 8080

CMD ["node", "lib"]