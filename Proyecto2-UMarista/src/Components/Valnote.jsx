import React from "react";
import { Typography, Card, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    alignSelf: "flex-start",
    fontWeight: "bold",
    fontSize: "larger",
    marginTop: "3vh",
    marginLeft: "1.5%",
  },
  Card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "95%",
    alignSelf: "center",
    alignItems: "center",
    overflowY: "visible",
    height: "fit-content",
    marginTop: "2%",
  },
  content: {
    width: "97%",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: "2%",
    marginBottom: "2%",
  },
}));

export default function Valnoterealized(props) {
  const classes = useStyles();
  return (
    <Card className={classes.Card}>
      <Typography className={classes.title}>{props.data.fecha}</Typography>
      <div className={classes.content}>
        <TextField
          variant="standard"
          label="EVA"
          disabled
          style={{ width: "40%", marginBottom: "2%" }}
          value={props.data.eva}
        />
        <TextField
          variant="standard"
          label="Pruebas funcionales"
          disabled
          style={{ width: "40%", marginBottom: "2%" }}
          value={props.data.pruebas_funcionales}
        />
        <TextField
          variant="standard"
          label="Actividad funcional"
          disabled
          style={{ width: "30%", marginBottom: "2%" }}
          value={props.data.actividad_funcional}
        />
        <TextField
          variant="standard"
          label="Fuerza"
          disabled
          style={{ width: "30%", marginBottom: "2%" }}
          value={props.data.fuerza}
        />
        <TextField
          variant="standard"
          label="ROM"
          disabled
          style={{ width: "30%", marginBottom: "2%" }}
          value={props.data.rom}
        />
      </div>
    </Card>
  );
}
