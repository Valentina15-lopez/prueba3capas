// App.js
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AulaVirtual from "./AulaVirtual/Aula";
import OtraEscena from "./OtraEscena"; // Importa tus componentes de escena si existen

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={AulaVirtual} />
        <Route path="/otra-escena" component={OtraEscena} />{" "}
        {/* Agrega más rutas según sea necesario */}
      </Switch>
    </Router>
  );
}

export default App;
