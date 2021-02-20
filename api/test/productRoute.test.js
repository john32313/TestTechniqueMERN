const request = require('supertest');
const app = require('../app');

xdescribe('GET /product', function () {
  it('response 200 for all product', (done) => {
    request(app)
      .get('/api/product')
      .set('Accept', 'application/json')
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
