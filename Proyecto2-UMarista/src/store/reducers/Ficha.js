import {ADD_FORM} from '../actions'

const initialState = {
    ficha:{},
    error:null
}

export default function(state=initialState,action){
    switch(action.type){
        case ADD_FORM:
            console.log({...state,ficha:action.payload})
            return{...state,ficha:action.payload};
        default:
            return(state);
    }
}