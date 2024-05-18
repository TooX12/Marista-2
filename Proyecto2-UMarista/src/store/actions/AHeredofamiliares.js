import {ADD_FORM2} from './index';

export const addAntecedentsHFAction = dispatch => (value,props) =>{
    dispatch({
        type:ADD_FORM2,
        payload: value,
        name:props
    })
}