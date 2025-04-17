#  build the image 

FROM node:20-alpine3.16 AS build

WORKDIR /app

COPY package* .json ./


RUN npm install

COPY . .

CMD [ "npm" , "start" ]

#  lets try build with multi staged building 

