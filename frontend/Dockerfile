#
# Front End Build stage
#
FROM node:14.17.0-alpine as build
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod
#
# Front End Package stage
#
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/ultimate-stack-developer-ui /usr/share/nginx/html
EXPOSE 4200
