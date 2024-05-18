import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { connect } from "react-redux";
import { addGinecoAction } from "../store/actions/Gineco";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Card, Typography, CardContent, TextField } from "@material-ui/core";
import { useEffect } from "react";

const urlBack = "http://localhost:4433/umarista-back/";

const useStyles = makeStyles((theme) => ({
  cardbody: {
    width: "600px",
    height: "255px",
    marginTop: "2%",
    [theme.breakpoints.down(800)]: {
      width: "500px",
    },
  },
  card: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: "larger",
    marginTop: "3vh",
  },
  cardtitle: {
    textAlign: "center",
    fontWeight: "bold",
    marginTop: "2%",
  },
  checkbox: {
    width: "40%",
  },
}));

function Cardgineco({ name, addCardgineco, id }) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    Menarca: {
      confirmacion: "",
      detalles: "",
      fecha: new Date(),
    },
    "Ritmo menstrual": {
      confirmacion: "",
      detalles: "",
      fecha: new Date(),
    },
    Partos: {
      confirmacion: "",
      detalles: "",
      fecha: new Date(),
    },
    Abortos: {
      confirmacion: "",
      detalles: "",
      fecha: new Date(),
    },
    Cesáreas: {
      confirmacion: "",
      detalles: "",
      fecha: new Date(),
    },
    "Métodos Anticonceptivos": {
      confirmacion: "",
      detalles: "",
      fecha: new Date(),
    },
  });
  useEffect(() => {
    addCardgineco(values[name], name);
  }, [values]);

  useEffect(() => {
    async function fetchData() {
      const formData = new FormData();
      formData.append("id", id);
      const response = await fetch(urlBack + "pac_ant_gin.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((posts) => {
          setMap(Object.values(posts));
        });
    }
    if (id) {
      fetchData();
    }
  }, []);

  function setMap(dat) {
    dat.map((item, index) => {
      setValues({
        Menarca: JSON.parse(item.menarca),
        "Ritmo menstrual": JSON.parse(item.ritmo_menstrual),
        Partos: JSON.parse(item.partos),
        Abortos: JSON.parse(item.abortos),
        Cesáreas: JSON.parse(item.cesareas),
        "Métodos Anticonceptivos": JSON.parse(item.metodo_anticonceptivo),
      });
    });
  }

  return (
    <Card className={classes.cardbody}>
      <CardContent className={classes.card}>
        <Typography style={{ textAlign: "center", marginTop: "1vh" }}>
          {name}
        </Typography>
        <FormGroup row style={{ justifyContent: "center" }}>
          <FormControlLabel
            control={
              <Checkbox
                value="si"
                color="primary"
                checked={values[name].confirmacion === "si"}
                onChange={(e) => {
                  setValues({
                    ...values,
                    [name]: { ...values[name], confirmacion: e.target.value },
                  });
                }}
              />
            }
            label="Si"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="no"
                color="primary"
                checked={values[name].confirmacion === "no"}
                onChange={(e) => {
                  setValues({
                    ...values,
                    [name]: { ...values[name], confirmacion: e.target.value },
                  });
                }}
              />
            }
            label="No"
          />
        </FormGroup>
        <TextField
          label="¿Cuantos?"
          helperText={"Ingresa los detalles"}
          disabled={values[name].confirmacion === "no"}
          onChange={(e) => {
            setValues({
              ...values,
              [name]: { ...values[name], detalles: e.target.value },
            });
          }}
          variant="filled"
          value={values[name].detalles === "" ? "" : values[name].detalles}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            label="Fecha"
            disabled={values[name].confirmacion === "no"}
            value={values[name].fecha}
            onChange={(date) => {
              setValues({
                ...values,
                [name]: { ...values[name], fecha: date },
              });
            }}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            style={{
              alignSelf: "center",
              width: "100%",
            }}
          />
        </MuiPickersUtilsProvider>
      </CardContent>
    </Card>
  );
}
const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  addCardgineco: addGinecoAction(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Cardgineco);
