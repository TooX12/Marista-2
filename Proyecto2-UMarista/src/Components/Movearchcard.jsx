import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Card, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { addMovearchAction } from "../store/actions/Movearch";

const urlBack = "http://localhost:4433/umarista-back/";

const useStyles = makeStyles((theme) => ({
  title: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: "larger",
    marginTop: "3vh",
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
    overflow: "initial",
    marginBottom: "1.5%",
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

function Movearchcard({ titulo, addMovearch, id }) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    "Columna cervical": {
      flexion: "",
      extensión: "",
      rinterna: "",
      rexterna: "",
      abduccion: "",
      aduccion: "",
      dradial: "",
      dcubital: "",
    },
    "Columna dorsal": {
      flexion: "",
      extensión: "",
      rinterna: "",
      rexterna: "",
      abduccion: "",
      aduccion: "",
      dradial: "",
      dcubital: "",
    },
    "Columna lumbar": {
      flexion: "",
      extensión: "",
      rinterna: "",
      rexterna: "",
      abduccion: "",
      aduccion: "",
      dradial: "",
      dcubital: "",
    },
    Hombro: {
      flexion: "",
      extensión: "",
      rinterna: "",
      rexterna: "",
      abduccion: "",
      aduccion: "",
      dradial: "",
      dcubital: "",
    },
    Codo: {
      flexion: "",
      extensión: "",
      rinterna: "",
      rexterna: "",
      abduccion: "",
      aduccion: "",
      dradial: "",
      dcubital: "",
    },
    Muñeca: {
      flexion: "",
      extensión: "",
      rinterna: "",
      rexterna: "",
      abduccion: "",
      aduccion: "",
      dradial: "",
      dcubital: "",
    },
    Mano: {
      flexion: "",
      extensión: "",
      rinterna: "",
      rexterna: "",
      abduccion: "",
      aduccion: "",
      dradial: "",
      dcubital: "",
    },
    Cadera: {
      flexion: "",
      extensión: "",
      rinterna: "",
      rexterna: "",
      abduccion: "",
      aduccion: "",
      dradial: "",
      dcubital: "",
    },
    Rodilla: {
      flexion: "",
      extensión: "",
      rinterna: "",
      rexterna: "",
      abduccion: "",
      aduccion: "",
      dradial: "",
      dcubital: "",
    },
    Tobillo: {
      flexion: "",
      extensión: "",
      rinterna: "",
      rexterna: "",
      abduccion: "",
      aduccion: "",
      dradial: "",
      dcubital: "",
    },
    Pie: {
      flexion: "",
      extensión: "",
      rinterna: "",
      rexterna: "",
      abduccion: "",
      aduccion: "",
      dradial: "",
      dcubital: "",
    },
  });
  const handleChange = (prop) => (e) => {
    setValues({
      ...values,
      [titulo]: { ...values[titulo], [prop]: e.target.value },
    });
    console.log(values[titulo]);
  };
  useEffect(() => {
    addMovearch(values[titulo], titulo);
  }, [values]);

  useEffect(() => {
    async function fetchData() {
      const formData = new FormData();
      formData.append("id", id);
      const response = await fetch(urlBack + "pac_arc_mov.php", {
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
        "Columna cervical": JSON.parse(item.columna_cervical),
        "Columna dorsal": JSON.parse(item.columna_dorsal),
        "Columna lumbar": JSON.parse(item.columna_lumbar),
        Hombro: JSON.parse(item.hombro),
        Codo: JSON.parse(item.codo),
        Muñeca: JSON.parse(item.muneca),
        Mano: JSON.parse(item.mano),
        Cadera: JSON.parse(item.cadera),
        Rodilla: JSON.parse(item.rodilla),
        Tobillo: JSON.parse(item.tobillo),
        Pie: JSON.parse(item.pie),
      });
    });
  }

  return (
    <Card className={classes.Card}>
      <Typography className={classes.title}>{titulo}</Typography>
      <div className={classes.content}>
        <TextField
          variant="filled"
          label="Flexión"
          onChange={handleChange("flexion")}
          helperText="Escribe los detalles"
          style={{ width: "350px", marginBottom: "1.5%" }}
          value={values[titulo].flexion === "" ? "" : values[titulo].flexion}
        />
        <TextField
          variant="filled"
          label="Extensión"
          onChange={handleChange("extensión")}
          helperText="Escribe los detalles"
          style={{ width: "350px", marginBottom: "1.5%" }}
          value={
            values[titulo].extensión === "" ? "" : values[titulo].extensión
          }
        />
        <TextField
          variant="filled"
          label="Rotación interna"
          onChange={handleChange("rinterna")}
          helperText="Escribe los detalles"
          style={{ width: "350px", marginBottom: "1.5%" }}
          value={values[titulo].rinterna === "" ? "" : values[titulo].rinterna}
        />
        <TextField
          variant="filled"
          label="Rotación externa"
          onChange={handleChange("rexterna")}
          helperText="Escribe los detalles"
          style={{ width: "350px", marginBottom: "1.5%" }}
          value={values[titulo].rexterna === "" ? "" : values[titulo].rexterna}
        />
        <TextField
          variant="filled"
          label="Abducción"
          onChange={handleChange("abduccion")}
          helperText="Escribe los detalles"
          style={{ width: "350px", marginBottom: "1.5%" }}
          value={
            values[titulo].abduccion === "" ? "" : values[titulo].abduccion
          }
        />
        <TextField
          variant="filled"
          label="Aducción"
          onChange={handleChange("aduccion")}
          helperText="Escribe los detalles"
          style={{ width: "350px", marginBottom: "1.5%" }}
          value={values[titulo].aduccion === "" ? "" : values[titulo].aduccion}
        />
        <TextField
          variant="filled"
          label="Desv/Radial"
          onChange={handleChange("dradial")}
          helperText="Escribe los detalles"
          style={{ width: "350px", marginBottom: "1.5%" }}
          value={values[titulo].dradial === "" ? "" : values[titulo].dradial}
        />
        <TextField
          variant="filled"
          label="Desv/Cubital"
          onChange={handleChange("dcubital")}
          helperText="Escribe los detalles"
          style={{ width: "350px", marginBottom: "1.5%" }}
          value={values[titulo].dcubital === "" ? "" : values[titulo].dcubital}
        />
      </div>
    </Card>
  );
}
const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  addMovearch: addMovearchAction(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Movearchcard);
