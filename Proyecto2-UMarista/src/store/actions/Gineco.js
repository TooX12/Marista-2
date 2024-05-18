import {ADD_GINECO} from './index';

export const addGinecoAction = dispatch => (value,props) =>{
    dispatch({
        type:ADD_GINECO,
        payload: value,
        name:props
    })
}