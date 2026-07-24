const express = require('express');
const router = express.Router();

router.post('/checkout', (req, res) => {
  const { cart, method } = req.body;
  if (!cart || cart.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  const orderId = 'NX-' + Math.floor(Math.random() * 1000000);

  res.json({
    success: true,
    message: 'Pedido processado com sucesso!',
    orderId,
    method,
    items: cart.length
  });
});

module.exports = router;
