// server/controllers/AulaController.js
const AulaModel = require("../models/AulaModel");

const aulaController = {
  getAulas: async (req, res) => {
    console.log("get aula");
    /* try {
      const aulas = await AulaModel.find();
      res.json(aulas);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las aulas" });
    }*/
  },
  createAula: async (req, res) => {
    const { nombre, capacidad } = req.body;
    console.log("aula creada");
    /*try {
      const nuevaAula = new AulaModel({ nombre, capacidad });
      await nuevaAula.save();
      res.json(nuevaAula);
    } catch (error) {
      res.status(500).json({ error: "Error al crear el aula" });
    }*/
  },
};

module.exports = aulaController;
