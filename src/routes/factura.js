const routerFactura = require('express').Router();
const {
  createFactura,
  getFacturaMotoCombo,
  getGanaciasTotales,
} = require('../controllers/factura');
const { getFecha } = require('../controllers/fecha');
const { getMotocycle } = require('../controllers/moto');
const { getPerson } = require('../controllers/person');
const { Factura, Employee } = require('../db');
const { verifyToken } = require('../utils/middleware');

routerFactura.get('/', async (req, res) => {
  res.json(await getGanaciasTotales());
});

routerFactura.get('/:id', async (req, res) => {
  const { id } = req.params;
  res.json(await getFacturaMotoCombo(id));
});

routerFactura.post('/', async (req, res) => {
  const { moto, factura, persona } = req.body;

  const fecha = await getFecha();
  const person = await getPerson(persona);
  const motorcycle = await getMotocycle({ ...moto, PersonId: person.id });

  const newFactura = {
    ...factura,
    description: `Precio: ${factura.price} + ${
      factura.overrun ? factura.overrun : '0'
    }`,
    total: +factura.price + +factura.overrun,
    MotorcycleId: motorcycle.id,
    FechaId: fecha.id,
  };

  const factu = await createFactura(newFactura);

  res.json(factu);
});

routerFactura.post('/:id', async (req, res) => {
  const { id } = req.params;
  const { Employees } = req.body;

  const factura = await Factura.findByPk(id, { include: Employee });

  factura.setEmployees(Employees);
  res.json(factura);
});

routerFactura.put('/:id', async (req, res) => {
  const { id } = req.params;
  const factura = await Factura.findByPk(id);
  factura.update(req.body);
  res.json(factura);
});

routerFactura.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const factura = await Factura.destroy({
    where: {
      id,
    },
  });
  res.json(factura);
});

module.exports = routerFactura;
