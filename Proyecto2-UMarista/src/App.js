import React from "react";
import Login from "./Login/Login";
import Main from "./MainPage/MainPage";
import Dates from "./Dates/Dates";
import Patients from "./Patients/Patients";
import Recordp1 from "./Patients/Record/Identification";
import Recordp2 from "./Patients/Record/Familiarantecedents";
import Recordp3 from "./Patients/Record/Nopatologicantecedents";
import Recordp4 from "./Patients/Record/Patologicrecord";
import Recordp5 from "./Patients/Record/Ginecoobstetricrecord";
import Recordp6 from "./Patients/Record/Generalrecord";
import Recordp7 from "./Patients/Record/Physicalexam";
import Recordp8 from "./Patients/Record/Postura";
import Recordp9 from "./Patients/Record/Dermatomas";
import Recordp10 from "./Patients/Record/Diagnostico";
import Recordp11 from "./Patients/Record/Valorationnotes";
import Recordp12 from "./Patients/Record/Mapadolor";
import Recordp13 from "./Patients/Record/Movearchs";
import Recordp14 from "./Patients/Record/Evolutionnotes";
import Usuers from "./Users/Users";
import Stats from "./Statistics/Statistics";
import Videos from "./Videos/Videos";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/Home">
          <Main />
        </Route>
        <Route exact path="/Dates">
          <Dates />
        </Route>
        <Route exact path="/Patients">
          <Patients />
        </Route>
        <Route exact path="/Patients/Ficha de identificacion">
          <Recordp1 />
        </Route>
        <Route exact path="/Patients/Ficha de identificacion/:id">
          <Recordp1 />
        </Route>
        <Route exact path="/Patients/Antecedentes familiares">
          <Recordp2 />
        </Route>
        <Route exact path="/Patients/Antecedentes familiares/:id">
          <Recordp2 />
        </Route>
        <Route exact path="/Patients/Antecedentes no patologicos">
          <Recordp3 />
        </Route>
        <Route exact path="/Patients/Antecedentes no patologicos/:id">
          <Recordp3 />
        </Route>
        <Route exact path="/Patients/Antecedentes patologicos">
          <Recordp4 />
        </Route>
        <Route exact path="/Patients/Antecedentes patologicos/:id">
          <Recordp4 />
        </Route>
        <Route exact path="/Patients/Antecedentes Gineco-obstetricos">
          <Recordp5 />
        </Route>
        <Route exact path="/Patients/Antecedentes Gineco-obstetricos/:id">
          <Recordp5 />
        </Route>
        <Route exact path="/Patients/Aspectos generales">
          <Recordp6 />
        </Route>
        <Route exact path="/Patients/Aspectos generales/:id">
          <Recordp6 />
        </Route>
        <Route exact path="/Patients/Examen físico">
          <Recordp7 />
        </Route>
        <Route exact path="/Patients/Examen físico/:id">
          <Recordp7 />
        </Route>
        <Route exact path="/Patients/Postura">
          <Recordp8 />
        </Route>
        <Route exact path="/Patients/Postura/:id">
          <Recordp8 />
        </Route>
        <Route exact path="/Patients/Dermatomas mitomas y pares craneales">
          <Recordp9 />
        </Route>
        <Route exact path="/Patients/Dermatomas mitomas y pares craneales/:id">
          <Recordp9 />
        </Route>
        <Route exact path="/Patients/Diagnóstico y plan fisioterapéutico">
          <Recordp10 />
        </Route>
        <Route exact path="/Patients/Diagnóstico y plan fisioterapéutico/:id">
          <Recordp10 />
        </Route>
        <Route exact path="/Patients/Notas de valoracion">
          <Recordp11 />
        </Route>
        <Route exact path="/Patients/Notas de valoracion/:id">
          <Recordp11 />
        </Route>
        <Route exact path="/Patients/Mapa del dolor">
          <Recordp12 />
        </Route>
        <Route exact path="/Patients/Mapa del dolor/:id">
          <Recordp12 />
        </Route>
        <Route exact path="/Patients/Arcos de movimiento">
          <Recordp13 />
        </Route>
        <Route exact path="/Patients/Arcos de movimiento/:id">
          <Recordp13 />
        </Route>
        <Route exact path="/Patients/Notas de evolucion">
          <Recordp14 />
        </Route>
        <Route exact path="/Patients/Notas de evolucion/:id">
          <Recordp14 />
        </Route>
        <Route exact path="/Users">
          <Usuers />
        </Route>
        <Route exact path="/Stats">
          <Stats />
        </Route>
        <Route exact path="/Videos">
          <Videos />
        </Route>
        <Route render={() => <h1>404 Error</h1>} />
      </Switch>
    </Router>
  );
}
