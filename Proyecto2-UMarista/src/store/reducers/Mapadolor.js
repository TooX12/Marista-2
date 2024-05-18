import {ADD_MAPADOLOR} from '../actions'

const initialState = {
    Mapadolor:"",
    error:null
}

export default function(state=initialState,action){
    switch(action.type){
        case ADD_MAPADOLOR:
            console.log({...state,Mapadolor:action.payload})
            return{...state,Mapadolor:action.payload};
        default:
            return(state);
    }
}