### Install dependencies

### Make copy of .env.sample to .env

### Write environment variable in .env (database, port)

### Add user.json to database with collection name `user`

### Route

/api/product :
GET : get all products
POST : insert new product

/api/product/:id :
PUT: update product
DELETE: remove product
GET: get one product

/api/login :
POST : submit email and password to login
GET : verif cookie token is present
