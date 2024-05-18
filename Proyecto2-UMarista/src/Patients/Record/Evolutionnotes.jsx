import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Content from "../../Components/ContentExp";
import { Typography, Card, TextField, Button } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Fab from "@material-ui/core/Fab";
import Evolnote from "../../Components/Evolnote";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect } from "react";
import { format } from "date-fns";

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
    height: "fit-content",
    overflow: "initial",
  },
  content: {
    width: "97%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: "2%",
    marginBottom: "2%",
  },
}));

const data = [
  {
    fecha: "06/04/2020",
    nota: "Hay un gran avance",
  },
  {
    fecha: "07/04/2020",
    nota: "Hay un gran avance",
  },
];

function Valnotes({
  ficha,
  ahf,
  anp,
  ago,
  pad,
  expf,
  post,
  derm,
  diag,
  mapdol,
  arcmov,
}) {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const [values, setValues] = React.useState({
    fecha: new Date(),
    Nevolucion: "",
  });
  const [datos, setDatos] = React.useState([]);
  const handleChange = (props) => (e) => {
    setValues({ ...values, [props]: e.target.value });
  };
  const handleNext = async () => {
    //Aquí va la subida de todos los datos a la BD
    const formData = new FormData();
    formData.append("ficha_id", JSON.stringify(ficha));
    formData.append("ant_her_fam", JSON.stringify(ahf));
    formData.append("ant_no_pat", JSON.stringify(anp));
    formData.append("ant_gin_obs", JSON.stringify(ago));
    formData.append("padecimientos", JSON.stringify(pad));
    formData.append("explor_fis", JSON.stringify(expf));
    formData.append("postura", JSON.stringify(post));
    formData.append("dermatomas", JSON.stringify(derm));
    formData.append("diagnostico", JSON.stringify(diag));
    formData.append("map_dol", JSON.stringify(mapdol));
    formData.append("arc_mov", JSON.stringify(arcmov));
    console.log(formData["ficha_id"]);
    const response = await fetch(urlBack + "paciente_agregar.php", {
      method: "POST",
      body: formData,
    });

    const res = await response.json();

    if (res["status"] === "1") {
      history.push("/Patients");
    } else {
      console.log("ERROR");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("fecha", format(values.fecha, "yyyy-MM-dd"));
    formData.append("evolucion", values.Nevolucion);
    const response = await fetch(urlBack + "notas_evolucion_cargar.php", {
      method: "POST",
      body: formData,
    });

    const res = await response.json();

    if (res["status"] === "1") {
      window.location.reload();
    } else {
      console.log("ERROR");
    }
  };
  useEffect(() => {
    //console.log(format(calendarDate, "HH:mm"));
    async function fetchData() {
      const formData = new FormData();
      formData.append("id", id);
      const response = await fetch(urlBack + "pac_not_evo.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((posts) => {
          console.log(Object.values(posts));
          setDatos(Object.values(posts));
        });
    }

    fetchData();
  }, []);
  return (
    <Content nombre="Pacientes" edit={id ? true : false} id={id} select="nevol">
      <div
        style={{
          width: "100%",
          backgroundColor: "#F4F4F4",
          display: "flex",
          flexDirection: "column",
          overflowY: "scroll",
        }}
      >
        <Typography className={classes.title}>Notas de Evolución</Typography>
        <Card className={classes.Card}>
          <form
            id="formulario"
            name="formulario"
            onSubmit={handleSubmit}
            className={classes.content}
          >
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="dialog"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Fecha"
                style={{ margin: "initial", width: "150px" }}
                value={values.fecha}
                onChange={(e) => {
                  setValues({ ...values, fecha: e });
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                disablePast="true"
              />
            </MuiPickersUtilsProvider>
            <TextField
              variant="filled"
              label="Nota de evolución"
              multiline
              rows="12"
              onChange={handleChange("Nevolucion")}
              style={{ width: "100%", marginTop: "2%" }}
              helperText={"Escribir detalles"}
            />
          </form>
          <Button
            disabled={!id}
            style={{
              alignSelf: "flex-end",
              backgroundColor: "#FFB700",
              marginBottom: "1%",
              marginRight: "1.5%",
              color: "white",
            }}
            type="submit"
            form="formulario"
          >
            Agregar nota de evolución
          </Button>
        </Card>
        <Typography className={classes.title}>
          Notas de evolución anotadas
        </Typography>
        {datos.map((item, index) => (
          <Evolnote data={item} />
        ))}
        <Fab
          disabled={id}
          color="primary"
          aria-label="next"
          onClick={handleNext}
          style={{
            alignSelf: "flex-end",
            backgroundColor: "#FFB700",
            position: "absolute",
            bottom: 10,
            right: 10,
          }}
        >
          <NavigateNextIcon />
        </Fab>
      </div>
    </Content>
  );
}
const mapStateToProps = (state) => ({
  ficha: state.Ficha.ficha,
  ahf: state.AHeredofamiliares,
  anp: state.Cardnp,
  ago: state.Cardgineco,
  pad: state.Suffering,
  expf: state.Physicalexam.Examenfisico,
  post: state.Postura.Postura,
  derm: state.Dermatomas,
  diag: state.Diagnostico.Diagnostico,
  mapdol: state.Mapadolor,
  arcmov: state.Movearch,
});
const mapDispatchToProps = (state) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Valnotes);
