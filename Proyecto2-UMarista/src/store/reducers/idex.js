import { combineReducers } from "redux";

import Ficha from "./Ficha";
import AHeredofamiliares from "./AHeredofamiliares";
import Cardnp from "./Cardnp";
import Cardgineco from "./Gineco";
import Suffering from "./Suffering";
import Physicalexam from "./Physicalexam";
import Postura from './Postura';
import Dermatomas from './Dermatomas';
import Diagnostico from './Diagnostico';
import Mapadolor from './Mapadolor';
import Movearch from './Movearch'

export default combineReducers({
  Ficha,
  AHeredofamiliares,
  Cardnp,
  Cardgineco,
  Suffering,
  Physicalexam,
  Postura,
  Dermatomas,
  Diagnostico,
  Mapadolor,
  Movearch
});
