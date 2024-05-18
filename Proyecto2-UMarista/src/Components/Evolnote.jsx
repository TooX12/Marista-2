import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Card, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: "larger",
    marginTop: "1%",
  },
  Card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "95%",
    alignSelf: "center",
    alignItems: "center",
    overflow: "initial",
    marginBottom:"2%"
  },
  content: {
    width: "97%",
    display: "flex",
    flexDirection:"column",
    justifyContent: "space-between",
    marginTop: "2%",
    marginBottom: "2%",
  },
}));


export default function Valnotes(props) {
  const classes = useStyles();
  return (
        <Card className={classes.Card}>
          <div className={classes.content}>
            <Typography className={classes.title}>{props.data.fecha}</Typography>
            <TextField
              variant="filled"
              label="Nota de evolución"
              multiline
              rows="12"
              disabled
              value={props.data.nota}
              style={{ width: "100%",marginTop:"2%" }}
            />
          </div>
        </Card>
  );
}
