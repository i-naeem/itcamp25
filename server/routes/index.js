const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  return res.json({ content: 'We are up and running. 🚀' });
});

module.exports = router;
