import {ADD_DERMATOMAS} from '../actions'

const initialState = {
    Dermatomas:"",
    error:null
}

export default function(state=initialState,action){
    switch(action.type){
        case ADD_DERMATOMAS:
            console.log({...state,Dermatomas:action.payload})
            return{...state,Dermatomas:action.payload};
        default:
            return(state);
    }
}