####  Build stage ##############
FROM node:latest AS build

RUN mkdir /app
WORKDIR /app

COPY package.json .
RUN npm install 

COPY . .
RUN ls

RUN npm run build

#### NGINX FOR Single Page Application ####
FROM steebchen/nginx-spa


COPY --from=build /app/dist/esm /app
COPY avatar.conf /etc/nginx/conf.d/avatar.conf

EXPOSE 80
EXPOSE 8081

CMD ["nginx"]

