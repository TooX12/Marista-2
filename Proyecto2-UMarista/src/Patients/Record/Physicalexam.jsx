import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Card, TextField } from "@material-ui/core";
import Content from "../../Components/ContentExp";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import SaveIcon from "@material-ui/icons/Save";
import Fab from "@material-ui/core/Fab";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { addPhysicaleAction } from "../../store/actions/Physicalexam";
import { useEffect } from "react";

const urlBack = "http://localhost:4433/umarista-back/";

const useStyles = makeStyles((theme) => ({
  title: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: "x-large",
    marginTop: "4vh",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "92%",
    alignSelf: "center",
    justifyContent: "center",
  },
  subtitle: {
    alignSelf: "left",
    fontWeight: "bold",
    fontSize: "x-large",
    marginTop: "4vh",
    marginLeft: "6%",
  },
}));

const ef = [
  "T.A",
  "F.C",
  "F.R",
  "Temp.",
  "Talla actual",
  "Talla anterior",
  "S02",
  "Peso actual",
  "Peso anterior",
  "Peso ideal",
  "IMC",
];
const eg = [
  "Estado de conciencia",
  "Actitud",
  "Movimientos anormales",
  "Postura",
  "Marcha",
  "Estado general de nutrición",
];
const er = [
  "Piel y anexos",
  "Cabeza",
  "Ojos",
  "Oidos",
  "Nariz y senos p/n",
  "Boca",
  "Torax",
  "Vasos sanguíneos",
  "Mamas",
  "Genitales",
];
const columna = ["Cervical", "Dorsal", "Sacroiliaca"];
const ms = ["Hombros", "Codo", "Muñeca", "Mano"];
const mi = [
  "Cadera",
  "Rodilla(Genu varo/valgo, recurvatum)",
  "Tobillo",
  "Pie(Pie equino, plano, cavo)",
];
function Pysicalexam({ addPhysicale }) {
  useEffect(() => {
    async function fetchData() {
      const formData = new FormData();
      formData.append("id", id);
      const response = await fetch(urlBack + "pac_exp_fis.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((posts) => {
          console.log(Object.values(posts));
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
        "T.A": item.ta,
        "F.C": item.fc,
        "F.R": item.fr,
        "Temp.": item.temp,
        "Talla actual": item.talla,
        "Talla anterior": item.talla_anterior,
        S02: item.s02,
        "Peso actual": item.peso_actual,
        "Peso anterior": item.peso_anterior,
        "Peso ideal": item.peso_ideal,
        IMC: item.imc,
        "Estado de conciencia": item.estado_conciencia,
        Actitud: item.actitud,
        "Movimientos anormales": item.movimientos_anormales,
        Postura: item.postura,
        Marcha: item.marcha,
        "Estado general de nutrición": item.estado_gral_nutri,
        "Piel y anexos": item.piel_anexos,
        Cabeza: item.cabeza,
        Ojos: item.ojos,
        Oidos: item.oidos,
        "Nariz y senos p/n": item.nariz_senos,
        Boca: item.boca,
        Torax: item.torax,
        "Vasos sanguíneos": item.vasos_sang,
        Mamas: item.mamas,
        Genitales: item.genitales,
        Cervical: item.cervical,
        Dorsal: item.dorsal,
        Sacroiliaca: item.sacroiliaca,
        Hombros: item.hombros,
        Codo: item.codo,
        Muñeca: item.muneca,
        Mano: item.mano,
        Cadera: item.cadera,
        "Rodilla(Genu varo/valgo, recurvatum)": item.rodilla,
        Tobillo: item.tobillo,
        "Pie(Pie equino, plano, cavo)": item.pie,
      });
    });
  }

  const { id } = useParams();
  const classes = useStyles();
  const history = useHistory();
  const [values, setValues] = React.useState({
    "T.A": "",
    "F.C": "",
    "F.R": "",
    "Temp.": "",
    "Talla actual": "",
    "Talla anterior": "",
    S02: "",
    "Peso actual": "",
    "Peso anterior": "",
    "Peso ideal": "",
    IMC: "",
    "Estado de conciencia": "",
    Actitud: "",
    "Movimientos anormales": "",
    Postura: "",
    Marcha: "",
    "Estado general de nutrición": "",
    "Piel y anexos": "",
    Cabeza: "",
    Ojos: "",
    Oidos: "",
    "Nariz y senos p/n": "",
    Boca: "",
    Torax: "",
    "Vasos sanguíneos": "",
    Mamas: "",
    Genitales: "",
    Cervical: "",
    Dorsal: "",
    Sacroiliaca: "",
    Hombros: "",
    Codo: "",
    Muñeca: "",
    Mano: "",
    Cadera: "",
    "Rodilla(Genu varo/valgo, recurvatum)": "",
    Tobillo: "",
    "Pie(Pie equino, plano, cavo)": "",
  });
  const handleNext = async (e) => {
    e.preventDefault();
    if (id) {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("explor_fis", JSON.stringify(values));
      const response = await fetch(urlBack + "update_expl_fis.php", {
        method: "POST",
        body: formData,
      });
      const res = await response.json();

      if (res["status"] === "1") {
        console.log("Se modificó con exito");
        window.location.reload();
      } else {
        console.log("ERROR");
      }
    } else {
      addPhysicale(values);
      history.push("/patients/Postura");
    }
  };
  return (
    <Content
      nombre="Pacientes"
      edit={id ? true : false}
      id={id}
      select="efisica"
    >
      <div
        style={{
          width: "100%",
          backgroundColor: "#F4F4F4",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography className={classes.title}>Exploración física</Typography>
        <Card
          style={{
            width: "90%",
            alignSelf: "center",
            display: "flex",
            flexDirection: "column",
            overflowY: "scroll",
          }}
        >
          <form
            style={{
              alignSelf: "center",
              display: "flex",
              flexDirection: "column",
              width: "90%",
            }}
            onSubmit={handleNext}
            id="formulario"
            name="formulario"
          >
            <div className={classes.container}>
              {ef.map((val) => (
                <TextField
                  variant={"filled"}
                  label={val}
                  onChange={(e) => {
                    setValues({ ...values, [val]: e.target.value });
                  }}
                  helperText={"Escriba los detalles"}
                  style={{ marginRight: "2%", marginTop: "2%" }}
                  value={values[val] === "" ? "" : values[val]}
                />
              ))}
            </div>
            <Typography className={classes.title}>
              Exploración General
            </Typography>
            <div className={classes.container}>
              {eg.map((valg) => (
                <TextField
                  variant={"filled"}
                  label={valg}
                  onChange={(e) => {
                    setValues({ ...values, [valg]: e.target.value });
                  }}
                  helperText={"Escriba los detalles"}
                  style={{ marginRight: "3%", marginTop: "2%", width: "350px" }}
                  value={values[valg] === "" ? "" : values[valg]}
                />
              ))}
            </div>
            <Typography className={classes.title}>
              Exploración por región
            </Typography>
            <div className={classes.container}>
              {er.map((valr) => (
                <TextField
                  variant={"filled"}
                  label={valr}
                  onChange={(e) => {
                    setValues({ ...values, [valr]: e.target.value });
                  }}
                  helperText={"Escriba los detalles"}
                  style={{ marginTop: "2%", width: "95%" }}
                  value={values[valr] === "" ? "" : values[valr]}
                />
              ))}
            </div>
            <Typography className={classes.title}>
              Sistemas musculoesqueléticos por regiones
            </Typography>
            <Typography className={classes.subtitle}>Columna</Typography>
            <div className={classes.container}>
              {columna.map((valr) => (
                <TextField
                  variant={"filled"}
                  label={valr}
                  onChange={(e) => {
                    setValues({ ...values, [valr]: e.target.value });
                  }}
                  helperText={"Escriba los detalles"}
                  style={{ marginTop: "2%", width: "95%" }}
                  value={values[valr] === "" ? "" : values[valr]}
                />
              ))}
            </div>
            <Typography className={classes.subtitle}>
              Miembro superior
            </Typography>
            <div className={classes.container}>
              {ms.map((valr) => (
                <TextField
                  variant={"filled"}
                  label={valr}
                  onChange={(e) => {
                    setValues({ ...values, [valr]: e.target.value });
                  }}
                  helperText={"Escriba los detalles"}
                  style={{ marginTop: "2%", width: "95%" }}
                  value={values[valr] === "" ? "" : values[valr]}
                />
              ))}
            </div>
            <Typography className={classes.subtitle}>
              Miembro Inferior
            </Typography>
            <div className={classes.container}>
              {mi.map((valr) => (
                <TextField
                  variant={"filled"}
                  label={valr}
                  onChange={(e) => {
                    setValues({ ...values, [valr]: e.target.value });
                  }}
                  helperText={"Escriba los detalles"}
                  style={{ marginTop: "2%", width: "95%" }}
                  value={values[valr] === "" ? "" : values[valr]}
                />
              ))}
            </div>
          </form>
        </Card>
        <Fab
          color="primary"
          aria-label="next"
          type="submit"
          form="formulario"
          style={{
            alignSelf: "flex-end",
            backgroundColor: "#FFB700",
            position: "absolute",
            bottom: 10,
            right: 10,
          }}
        >
          {id != null ? <SaveIcon /> : <NavigateNextIcon />}
        </Fab>
      </div>
    </Content>
  );
}
const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  addPhysicale: addPhysicaleAction(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Pysicalexam);
