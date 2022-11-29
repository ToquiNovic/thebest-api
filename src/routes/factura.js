const routerFactura = require('express').Router();
const { createFactura } = require('../controllers/factura');
const { getFecha } = require('../controllers/fecha');
const { getMotocycle } = require('../controllers/moto');
const { getPerson } = require('../controllers/person');
const { Factura } = require('../db');

routerFactura.get('/', async (req, res) => {
  res.json(await Factura.findAll());
});

routerFactura.post('/', async (req, res) => {
  const { moto, factura, persona } = req.body;

  const fecha = await getFecha();
  const person = await getPerson(persona);
  const motorcycle = await getMotocycle({ ...moto, PersonId: person.id });

  const newFactura = {
    ...factura,
    total: +factura.price + +factura.overrun,
    MotorcycleId: motorcycle.id,
    FechaId: fecha.id,
  };

  const factu = await createFactura(newFactura);

  res.json({ person, motorcycle, factu });
});

module.exports = routerFactura;
