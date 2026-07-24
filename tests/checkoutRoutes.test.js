const request = require('supertest');
const app = require('../src/app');

describe('Checkout Routes', () => {
  it('deve processar o checkout com sucesso', async () => {
    const res = await request(app)
      .post('/api/checkout')
      .send({
        cart: [{ id: 1, name: 'Produto Teste', price: 100 }],
        method: 'credit_card'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.orderId).toMatch(/^NX-\d+$/);
    expect(res.body.method).toBe('credit_card');
  });

  it('deve retornar erro se o carrinho estiver vazio', async () => {
    const res = await request(app)
      .post('/api/checkout')
      .send({ cart: [], method: 'pix' });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Cart is empty');
  });
});
