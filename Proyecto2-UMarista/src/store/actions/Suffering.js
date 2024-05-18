import {ADD_SUFFERING} from './index';

export const addSufferingAction = dispatch => (value,props) =>{
    dispatch({
        type:ADD_SUFFERING,
        payload: value,
        name:props
    })
}