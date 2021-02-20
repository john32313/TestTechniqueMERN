process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../app');
const { connection, client } = require('../model/connection');
const product = require('./products.json');

xdescribe('GET /product', function () {
  beforeEach(async () => {
    const db = await connection;
    await db.collection('product').deleteMany({});
    await db.collection('product').insertMany(product);
  });

  it('response 200 for all product', (done) => {
    request(app)
      .get('/api/product')
      .set('Accept', /json/)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('response 200 for one product found', (done) => {
    request(app)
      .get('/api/product/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('response 404 for one product not found', (done) => {
    request(app)
      .get('/api/product/4000')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});

xdescribe('POST /product', function () {
  beforeEach(async () => {
    const db = await connection;
    await db.collection('product').deleteMany({});
    await db.collection('product').insertMany(product);
  });
  const data = {
    name: 'frigo',
    type: 'electromenager',
    price: 600,
    rating: 5,
    warranty_years: 6,
    available: true,
  };

  it('sould response 201', (done) => {
    request(app)
      .post('/api/product')
      .send(data)
      .set('Accept', 'application/json')
      .expect(201, done);
  });

  it('should response 400 missing fields', (done) => {
    request(app)
      .post('/api/product')
      .send({ name: 'frigo' })
      .set('Accept', 'application/json')
      .expect(400, done);
  });
});

client.close();
