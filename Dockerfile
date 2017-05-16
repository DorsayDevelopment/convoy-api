FROM node

WORKDIR /src
COPY package.json /src

RUN npm i --production --silent

COPY . /src

ENV API_PORT 80
ENV API_SECRET secret

ENV API_DB_NAME convoy
ENV API_DB_USER postgres
ENV API_DB_PASSWORD postgres
ENV API_DB_HOST localhost
ENV API_DB_PORT 5432

EXPOSE 80
CMD ["npm", "start"]