import {ADD_DIAGNOSTICO} from './index';

export const addDiagnosticoAction = dispatch => value =>{
    dispatch({
        type:ADD_DIAGNOSTICO,
        payload: value
    })
}