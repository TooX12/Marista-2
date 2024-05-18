import {ADD_DERMATOMAS} from './index';

export const addDermatomasAction = dispatch => value =>{
    dispatch({
        type:ADD_DERMATOMAS,
        payload: value
    })
}