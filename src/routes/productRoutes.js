const express = require('express');
const router = express.Router();
const { products, offers } = require('../data/database');

router.get('/products', (req, res) => {
  res.json(products);
});

router.get('/offers', (req, res) => {
  res.json(offers);
});

module.exports = router;
