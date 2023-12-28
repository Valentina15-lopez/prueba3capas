// server/config/database.js
const mongoose = require("mongoose");
const DB_URI = "mongodb://localhost:27017/metaverso";

const database = {
  connect: () => {
    mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const connection = mongoose.connection;
    connection.on(
      "error",
      console.error.bind(console, "Error de conexión a la base de datos:")
    );
    connection.once("open", () => {
      console.log("Conexión exitosa a la base de datos");
    });
  },
};

module.exports = database;
