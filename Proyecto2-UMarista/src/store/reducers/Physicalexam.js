import {ADD_PHYSICALE} from '../actions'

const initialState = {
    Examenfisico:{},
    error:null
}

export default function(state=initialState,action){
    switch(action.type){
        case ADD_PHYSICALE:
            console.log({...state,Examenfisico:action.payload})
            return{...state,Examenfisico:action.payload};
        default:
            return(state);
    }
}