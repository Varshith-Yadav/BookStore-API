#  build the image 

# FROM node:20-alpine3.16 AS build

# WORKDIR /app

# COPY package*.json ./


# RUN npm install

# COPY . .

# CMD [ "npm" , "start" ]



#   multi staged building 



FROM node:20-alpine3.16 AS build 

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

FROM node:18-alpine AS production

WORKDIR /app

COPY --from=build /app .

CMD [ "npm" , "start" ]

EXPOSE 3000

