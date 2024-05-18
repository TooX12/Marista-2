import React from 'react';
import Logo from '../Images/Maristas.png'
import { makeStyles } from '@material-ui/core/styles';
import Content from '../Components/Content';

const useStyles = makeStyles(theme => ({
    image:{
        margin:"auto",
        float:"right",
        paddingBottom:"5vh",
        [theme.breakpoints.down(900)]:{
            width:"40%",
        },
    }
}));

export default function Main(){
    const classes =useStyles();
    return(
        <Content type="Medico" nombre="Home">
            <img src={Logo} alt="" width="30%" className={classes.image}/>
        </Content>
    );
}