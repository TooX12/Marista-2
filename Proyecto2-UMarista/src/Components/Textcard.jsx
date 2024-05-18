import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography, CardContent, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { addSufferingAction } from "../store/actions/Suffering";
import { useEffect } from "react";

const urlBack = "http://localhost:4433/umarista-back/";

const useStyles = makeStyles((theme) => ({
  cardbody: {
    width: "600px",
    height: "210px",
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

function Textcard({ name, addSuffering, id }) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    "Diagnosticos anteriores": {
      detalles: "",
    },
    "Estudios de gabinete/estudios de laboratorio": {
      detalles: "",
    },
    "Tratamientos anteriores(Tiempo,tipo)": {
      detalles: "",
    },
    "Inquietud subyacente": {
      detalles: "",
    },
  });
  useEffect(() => {
    addSuffering(values[name].detalles, name);
  }, [values]);

  useEffect(() => {
    async function fetchData() {
      const formData = new FormData();
      formData.append("id", id);
      const response = await fetch(urlBack + "pac_pad_act.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((posts) => {
          //console.log(Object.values(posts));
          //setDatos(Object.values(posts));
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
        "Diagnosticos anteriores": {
          detalles: item.diagnosticos_anteriores,
        },
        "Estudios de gabinete/estudios de laboratorio": {
          detalles: item.estudios_gabinete,
        },
        "Tratamientos anteriores(Tiempo,tipo)": {
          detalles: item.tratamientos_anteriores,
        },
        "Inquietud subyacente": {
          detalles: item.inquietud_subyacente,
        },
      });
    });
  }

  return (
    <Card className={classes.cardbody}>
      <CardContent className={classes.card}>
        <Typography style={{ textAlign: "center", marginTop: "1vh" }}>
          {name}
        </Typography>
        <TextField
          label={name}
          multiline
          helperText={"Ingresa los detalles"}
          rows="4"
          onChange={(e) => {
            setValues({
              ...values,
              [name]: { ...values[name], detalles: e.target.value },
            });
          }}
          variant="filled"
          value={values[name].detalles === "" ? "" : values[name].detalles}
        />
      </CardContent>
    </Card>
  );
}
const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  addSuffering: addSufferingAction(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Textcard);
