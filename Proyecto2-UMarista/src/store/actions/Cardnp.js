import {ADD_CARDNP} from './index';

export const addCardnpAction = dispatch => (value,props) =>{
    dispatch({
        type:ADD_CARDNP,
        payload: value,
        name:props
    })
}