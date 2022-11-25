const teamRouter = require('express').Router();
const { Team, Employee, Roll } = require('../db');

teamRouter.get('/', async (req, res) => {
  const { employee } = req.query;
  if (employee) {
    const employees = await Employee.findAll({
      include: Roll,
    });
    res.json(
      employees
        .filter((emplo) => emplo.Roll.role === 'OPERA' && emplo.TeamId === null)
        .map((empl) => ({
          id: empl.id,
          dni: empl.dni,
          names: empl.names,
          surnames: empl.surnames,
          role: empl.Roll.role,
        })),
    );
  } else {
    const teams = await Team.findAll({ include: Employee });
    res.json(
      teams.map(({ id, name, Employees }) => ({
        id,
        name,
        Employees: Employees.map((empl) => ({
          id: empl.id,
          dni: empl.dni,
          names: empl.names,
          surnames: empl.surnames,
        })),
      })),
    );
  }
});

teamRouter.post('/', async (req, res) => {
  const { name, Employees } = req.body;
  const newTeam = await Team.create({ name });
  newTeam.setEmployees(Employees || []);
  res.json(newTeam);
});

teamRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { Employees } = req.body;
  const team = await Team.findByPk(id);
  if (!team) {
    res.status(400).json({ msg: 'Error el equipo no existe!' });
  } else if (!Employees || Employees.length === 0) {
    res.status(400).json({ msg: 'Error debes enviar una lista de empleados!' });
  } else {
    team.setEmployees(Employees);
    res.json(team);
  }
});

teamRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const team = await Team.findByPk(id);

  if (!team) {
    res.status(400).json({ msg: 'ID invalido o no existe' });
  } else {
    res.json(await team.destroy());
  }
});

module.exports = teamRouter;
