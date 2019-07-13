const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route  POST api/users
// @desc Register a user
// @access Public
router.post(
  '/',
  [
    check('name', 'Por favor, entre com um nome')
      .not()
      .isEmpty(),
    check('email', 'Por favor, forneça um email válido').isEmail(),
    check(
      'password',
      'Por favor, entre com a senha de 6 ou mais caracteres'
    ).isLength({min: 6})
  ],
  (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()})
    }

    res.send('passed');//não achou errors
  }
);

module.exports = router;
