### MongoDB Replicaset

Showcase of mongodb replicaset + sharding


```bash
#nvm install 
nvm use
yarn
# docker-compose down -v
docker-compose up

sleep 40
node seed.js
mongosh --port 28021
>
use admin
db.createUser({
  user: 'admin',
  pwd: 'password',
  roles: ['root']
})


mongosh --port 28018 -u admin -p password --authenticationDatabase admin messaging-app
db.users.find().count()


mongosh --port 28018
>
use admin
db.createUser({
  user: 'admin',
  pwd: 'password',
  roles: ['root']
})


mongosh --port 28018 -u admin -p password --authenticationDatabase admin messaging-app
db.users.find().count()


```
