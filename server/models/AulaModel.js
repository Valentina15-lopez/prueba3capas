// server/models/AulaModel.js
//const mongoose = require("mongoose");
//const Schema = mongoose.Schema;

/*const aulaSchema = new Schema({
  nombre: { type: String, required: true },
  capacidad: { type: Number, required: true },
  // Otros campos según tus necesidades
});

const AulaModel = mongoose.model("Aula", aulaSchema);
*/
const AulaModel = {
  getAulas: async (req, res) => {
    console.log("aula model");
    /* try {
      const aulas = await AulaModel.find();
      res.json(aulas);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las aulas" });
    }*/
  },
};

module.exports = AulaModel;
