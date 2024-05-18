import {ADD_CARDNP} from '../actions';

const initialState ={
    "Enfermedades Infecciosas de la infancia": {},
      "Intervenciones Quirúrgicas": {},
      "Traumatismos(Esguinces.fracturas,luxaciones,desgarres)": {},
      Infiltraciones: {},
      Hospitalizaciones: {},
      "Perdida del Conocimiento": {},
      "Intolerancia a medicamentos": {},
      Transfuciones: {},
      Medicamentos: {},
      ETS: {},
      "Tipo de Cosntrucción no favorable": {},
      "Suelo no regular": {},
      "Escaleras que dificulten actividades de la vida diaria": {},
      "Ventilación inadecuada": {},
      Hacinamiento: {},
      "Adaptaciones y auxiliares para sus avd": {},
      "Servicios de agua": {},
      "Servicios de luz": {},
      "Servicios de drenaje inadecuados": {},
      "Hábitos personales de baño": {},
      "Higiene bucal": {},
      Defecación: {},
      Tabaquismo: {},
      Alcoholismo: {},
      Toxicomanías: {},
      Alimentación: {},
      "Trabajo/Descanso": {},
      Pasatiempo: {},
      "Aparato digestivo": {},
      "Aparato cardiovacular": {},
      "Aparato Respiratorio": {},
      "Aparato Urinario": {},
      "Aparato genital": {},
      "Aparato hematológico": {},
      "Sistema endócrino": {},
      "Sistema nervioso": {},
      "Sistema sensorial": {},
      "Sistema osteomuscular": {}
}
export default function(state=initialState,action){
    switch(action.type){
        case ADD_CARDNP:
            console.log({...state,[action.name]:action.payload})
            return{...state,[action.name]:action.payload};
        default:
            return(state);
    }
}