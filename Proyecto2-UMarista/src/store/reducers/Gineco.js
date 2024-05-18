import {ADD_GINECO} from '../actions';

const initialState ={
    "Menarca":{},
    "Ritmo menstrual":{},
    "Partos":{},
    "Abortos":{},
    "Cesáreas":{},
    "Métodos Anticonceptivos":{}
}
export default function(state=initialState,action){
    switch(action.type){
        case ADD_GINECO:
            console.log({...state,[action.name]:action.payload})
            return{...state,[action.name]:action.payload};
        default:
            return(state);
    }
}