const router = require('express').Router();

router.use('/', require('./login'));
router.use('/admin', require('./admin'));
router.use('/roll', require('./roll'));
router.use('/brand', require('./brand'));
router.use('/color', require('./color'));
router.use('/employee', require('./employee'));
router.use('/operator', require('./operarios'));
router.use('/auxiliar', require('./auxiliar'));
router.use('/team', require('./team'));
router.use('/combo', require('./combo'));
router.use('/moto', require('./moto'));

module.exports = router;
