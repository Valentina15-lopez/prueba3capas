const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.static("public"));

// Elige un puerto para el servidor HTTPS
const httpsPort = process.env.HTTPS_PORT || 3001;

// Configurar ruta para manejar la solicitud de '/'

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/aula", (req, res) => {
  res.setHeader("Content-Type", "text/javascript");
  res.sendFile(
    path.join(
      __dirname,
      "../client/src/presentation/components/AulaVirtual",
      "scene.js"
    )
  );
});

// Configura las opciones del servidor HTTPS con tus certificados SSL
const options = {
  key: fs.readFileSync(path.join(__dirname, "../key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "../cert.pem")),
};

// Crea el servidor HTTPS
const server = https.createServer(options, app);

// Establece la conexión del socket.io con el servidor HTTPS
const io = require("socket.io")(server);

// an object where we will store information about active clients
let peers = {};

function main() {
  setupSocketServer();

  setInterval(function () {
    // update all clients of positions
    io.sockets.emit("positions", peers);
  }, 10);
}

main();

function setupSocketServer() {
  // Set up each socket connection
  io.on("connection", (socket) => {
    console.log(
      "Peer joined with ID",
      socket.id,
      ". There are " + io.engine.clientsCount + " peer(s) connected."
    );

    // Add a new client indexed by their socket id
    peers[socket.id] = {
      position: [0, 0.5, 0],
      rotation: [0, 0, 0, 1], // stored as XYZW values of Quaternion
    };

    // Make sure to send the client their ID and a list of ICE servers for WebRTC network traversal
    socket.emit("introduction", Object.keys(peers));

    // also give the client all existing clients positions:
    socket.emit("userPositions", peers);

    // Update everyone that the number of users has changed
    io.emit("newUserConnected", socket.id);

    // whenever the client moves, update their movements in the clients object
    socket.on("move", (data) => {
      if (peers[socket.id]) {
        peers[socket.id].position = data[0];
        peers[socket.id].rotation = data[1];
      }
    });

    // Relay simple-peer signals back and forth
    socket.on("signal", (to, from, data) => {
      if (to in peers) {
        io.to(to).emit("signal", to, from, data);
      } else {
        console.log("Peer not found!");
      }
    });

    // Handle the disconnection
    socket.on("disconnect", () => {
      // Delete this client from the object
      delete peers[socket.id];
      io.sockets.emit(
        "userDisconnected",
        io.engine.clientsCount,
        socket.id,
        Object.keys(peers)
      );
      console.log(
        "User " +
          socket.id +
          " disconnected, there are " +
          io.engine.clientsCount +
          " clients connected"
      );
    });
  });
}

// El puerto para el servidor HTTPS
server.listen(httpsPort, () => {
  console.log("Server is running on https://localhost:" + httpsPort);
});
