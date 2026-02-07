### MongoDB Replicaset

Showcase of mongodb replicaset


```bash
#nvm install 
nvm use
yarn
# docker-compose down -v
docker-compose up
```


# 1st RS

```bash
mongosh --host localhost:28018
```

Execute:
```js
use admin

rs.initiate({
  _id: 'rs0',
  members: [
    { _id: 0, host: 'localhost:28018', priority: 2 },
    { _id: 1, host: 'localhost:28019', priority: 1 },
    { _id: 2, host: 'localhost:28020', priority: 1 }
  ]
})
```


## 2nd RS

```bash
mongosh --host localhost:28021
```

Execute:
```js
use admin

rs.initiate({
  _id: 'rs1',
  members: [
    { _id: 0, host: 'localhost:28021', priority: 2 },
    { _id: 1, host: 'localhost:28022', priority: 1 },
    { _id: 2, host: 'localhost:28023', priority: 1 }
  ]
})
```


# Config dbs

```bash
mongosh --host localhost:28030
```


```js
rs.initiate({
  _id: "cfgRS",
  configsvr: true,
  members: [
    { _id: 0, host: "localhost:27030" },
    { _id: 1, host: "localhost:27031" },
    { _id: 2, host: "localhost:27032" }
  ]
})
```
```bash
mongosh --port 27040
````


```js
sh.addShard("rs0/localhost:28018,localhost:28019,localhost:28020")
sh.addShard("rs1/localhost:28021,localhost:28022,localhost:28023")
```

```bash
yarn start

# docker container ls
# docker kill anycontainerid_even_prime

curl --request POST \
  --url http://localhost:3000/users \
  --header 'Content-Type: application/json' \
  --data '{
	"username": "Andrew"
}'
```


```js
db.createUser({
  user: 'admin',
  pwd: 'password',
  roles: [{ role: 'root', db: 'admin' }]
})
```