import {ADD_PHYSICALE} from './index';

export const addPhysicaleAction = dispatch => value =>{
    dispatch({
        type:ADD_PHYSICALE,
        payload: value
    })
}