import {ADD_MOVEARCH} from '../actions';

const initialState ={
    "Columna cervical":{},
    "Columna dorsal":{},
    "Columna lumbar":{},
    "Hombro":{},
    "Codo":{},
    "Muñeca":{},
    "Mano":{},
    "Cadera":{},
    "Rodilla":{},
    "Tobillo":{},
    "Pie":{},
}
export default function(state=initialState,action){
    switch(action.type){
        case ADD_MOVEARCH:
            console.log({...state,[action.name]:action.payload})
            return{...state,[action.name]:action.payload};
        default:
            return(state);
    }
}