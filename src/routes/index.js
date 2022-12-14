const router = require('express').Router();

router.use('/', require('./login'));
router.use('/roll', require('./roll'));
router.use('/brand', require('./brand'));
router.use('/color', require('./color'));
router.use('/employee', require('./employee'));
router.use('/operator', require('./operarios'));
router.use('/auxiliar', require('./auxiliar'));
router.use('/team', require('./team'));
router.use('/combo', require('./combo'));
router.use('/moto', require('./moto'));
router.use('/factura', require('./factura'));
router.use('/fecha', require('./fecha'));
router.use('/person', require('./person'));
router.use('/product', require('./product'));
router.use('/retiroproducto', require('./drawoutProduct'));
router.use('/retiro', require('./drawout'));

module.exports = router;
