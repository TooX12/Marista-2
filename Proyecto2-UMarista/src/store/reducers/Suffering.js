import { ADD_SUFFERING } from "../actions";

const initialState = {
  Inicio: {},
  "Evolución": {},
  Actual: {},
  Astenia: "",
  Adinamia: "",
  Anorexia: "",
  Fiebre: "",
  "Perdida de peso": "",
  "Diagnosticos anteriores":"",
  "Estudios de gabinete/estudios de laboratorio":"",
  "Tratamientos anteriores(Tiempo,tipo)":"",
  "Inquietud subyacente":"",
};
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_SUFFERING:
      console.log({ ...state, [action.name]: action.payload });
      return { ...state, [action.name]: action.payload };
    default:
      return state;
  }
}
