import {ADD_DIAGNOSTICO} from '../actions'

const initialState = {
    Diagnostico:{},
    error:null
}

export default function(state=initialState,action){
    switch(action.type){
        case ADD_DIAGNOSTICO:
            console.log({...state,Diagnostico:action.payload})
            return{...state,Diagnostico:action.payload};
        default:
            return(state);
    }
}