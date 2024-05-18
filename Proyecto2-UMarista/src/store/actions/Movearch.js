import {ADD_MOVEARCH} from './index';

export const addMovearchAction = dispatch => (value,props) =>{
    dispatch({
        type:ADD_MOVEARCH,
        payload: value,
        name:props
    })
}