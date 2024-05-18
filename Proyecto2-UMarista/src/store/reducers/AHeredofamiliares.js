import {ADD_FORM2} from '../actions'

const initialState = {
    "Enfermedades Reumatológicas":{},
    "Enfermedades del sistema nervioso":{},
    "Síndrome": {},
      "Malformaciones": {},
      "Congénitas": {},
      "Diabetes": {},
      "Hipertención arterial sistémica": {},
      "Cáncer": {},
      "Cardiopatías": {},
      "Vasculares": {},
      "Pulmonares": {},
      "Heptopatias": {},
      "Nefropatias": {},
      "Digestivos": {},
      "Endocrinopatias": {},
      "Transtornos Hematológicos": {},
      "Dislipidemias": {},
      "Otras": {},
    error:null
}

export default function(state=initialState,action){
    switch(action.type){
        case ADD_FORM2:
            console.log({...state,[action.name]:action.payload})
            return{...state,[action.name]:action.payload};
        default:
            return(state);
    }
}