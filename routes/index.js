const express = require('express');
const router = express.Router();

router.use('/inventory', require('./inventory'))
router.use('/', require('./swagger'))

module.exports = router;