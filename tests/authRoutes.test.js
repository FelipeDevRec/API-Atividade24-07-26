const request = require('supertest');
const app = require('../src/app');
const { users } = require('../src/data/database');

describe('Auth Routes', () => {
  beforeEach(() => {
    users.length = 0;
  });

  it('deve registrar um novo usuário com sucesso', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ name: 'Test User', email: 'test@example.com', password: 'password123' });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.user.email).toBe('test@example.com');
  });

  it('deve falhar ao registrar usuário sem e-mail', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ name: 'Test User', password: 'password123' });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Todos os campos são obrigatórios');
  });

  it('deve fazer login com sucesso após registro', async () => {
    await request(app)
      .post('/api/register')
      .send({ name: 'Test User', email: 'login@example.com', password: 'password123' });

    const res = await request(app)
      .post('/api/login')
      .send({ email: 'login@example.com', password: 'password123' });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.user.email).toBe('login@example.com');
  });

  it('deve falhar no login com senha incorreta', async () => {
    await request(app)
      .post('/api/register')
      .send({ name: 'Test User', email: 'login@example.com', password: 'password123' });

    const res = await request(app)
      .post('/api/login')
      .send({ email: 'login@example.com', password: 'wrongpassword' });

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Credenciais inválidas');
  });
});
