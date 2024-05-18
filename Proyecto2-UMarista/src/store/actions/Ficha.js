import {ADD_FORM} from './index';

export const addFichaAction = dispatch => value =>{
    dispatch({
        type:ADD_FORM,
        payload: value
    })
}