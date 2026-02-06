FROM mongo:latest

ENV MONGO_INITDB_ROOT_USERNAME=admin
ENV MONGO_INITDB_ROOT_PASSWORD=password
ENV MONGO_INITDB_DATABASE=messaging-app

COPY ./init-mongo.js /docker-entrypoint-initdb.d/init-mongo.js

EXPOSE 27017

CMD ["mongod"]
