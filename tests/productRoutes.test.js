const request = require('supertest');
const app = require('../src/app');

describe('Product Routes', () => {
  it('deve retornar a lista de produtos', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('deve retornar a lista de ofertas', async () => {
    const res = await request(app).get('/api/offers');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
