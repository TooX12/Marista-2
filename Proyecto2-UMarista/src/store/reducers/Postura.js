import {ADD_POSTURA} from '../actions'

const initialState = {
    Postura:{},
    error:null
}

export default function(state=initialState,action){
    switch(action.type){
        case ADD_POSTURA:
            console.log({...state,Postura:action.payload})
            return{...state,Postura:action.payload};
        default:
            return(state);
    }
}