const express = require('express');
const router = express.Router();
const { users } = require('../data/database');

router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }
  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.status(400).json({ error: 'E-mail já cadastrado' });
  }
  const newUser = { id: Date.now(), name, email, password };
  users.push(newUser);
  res.json({ success: true, message: 'Usuário cadastrado com sucesso', user: { id: newUser.id, name: newUser.name, email: newUser.email } });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.json({ success: true, message: 'Login realizado', user: { id: user.id, name: user.name, email: user.email } });
  } else {
    res.status(401).json({ error: 'Credenciais inválidas' });
  }
});

module.exports = router;
