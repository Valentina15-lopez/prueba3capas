// server/routes/api.js
const express = require("express");
const router = express.Router();
const aulaController = require("../controllers/AulaController");

router.get("/aulas", aulaController.getAulas);
router.post("/aula", aulaController.createAula);
// Otras rutas para interactuar con el aula virtual
// ...

module.exports = router;
