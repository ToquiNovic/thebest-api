const router = require('express').Router();

router.use('/admin', require('./admin'));
router.use('/roll', require('./roll'));
router.use('/brand', require('./brand'));
router.use('/color', require('./color'));

module.exports = router;
