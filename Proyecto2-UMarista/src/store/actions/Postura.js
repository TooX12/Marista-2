import {ADD_POSTURA} from './index';

export const addPosturaAction = dispatch => value =>{
    dispatch({
        type:ADD_POSTURA,
        payload: value
    })
}