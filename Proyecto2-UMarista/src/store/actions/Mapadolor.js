import {ADD_MAPADOLOR} from './index';

export const addMapadolorAction = dispatch => value =>{
    dispatch({
        type:ADD_MAPADOLOR,
        payload: value
    })
}