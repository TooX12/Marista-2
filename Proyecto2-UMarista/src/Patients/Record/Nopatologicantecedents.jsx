import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Content from "../../Components/ContentExp";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import SaveIcon from "@material-ui/icons/Save";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Fab from "@material-ui/core/Fab";
import CardnP from "../../Components/Cardnopatologic";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";

const urlBack = "http://localhost:4433/umarista-back/";

const useStyles = makeStyles((theme) => ({
  title: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: "larger",
    marginTop: "4vh",
  },
  container: {
    display: "flex",
    width: "94%",
    height: "100%",
    overflowY: "scroll",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
  },
}));
const Padecimientos = [
  "Tipo de Cosntrucción no favorable",
  "Suelo no regular",
  "Escaleras que dificulten actividades de la vida diaria",
  "Ventilación inadecuada",
  "Hacinamiento",
  "Adaptaciones y auxiliares para sus avd",
  "Servicios de agua",
  "Servicios de luz",
  "Servicios de drenaje inadecuados",
  "Hábitos personales de baño",
  "Higiene bucal",
  "Defecación",
  "Tabaquismo",
  "Alcoholismo",
  "Toxicomanías",
  "Alimentación",
  "Trabajo/Descanso",
  "Pasatiempo",
];
function Nopatologic({ anp }) {
  const { id } = useParams();
  const classes = useStyles();
  const history = useHistory();
  const [confirmacion, setConfirmacion] = React.useState("");
  const handleNext = async (e) => {
    e.preventDefault();
    if (id) {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("ant_no_pat", JSON.stringify(anp));
      const response = await fetch(urlBack + "update_ant_no_pat.php", {
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
      history.push("/Patients/Antecedentes patologicos");
    }
  };
  return (
    <Content
      nombre="Pacientes"
      edit={id ? true : false}
      id={id}
      select="antnopatologicos"
    >
      <div
        style={{
          width: "100%",
          backgroundColor: "#F4F4F4",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography className={classes.title}>
          Antecedentes No Patológicos
        </Typography>
        <Typography style={{ alignSelf: "center", marginTop: "2vh" }}>
          Factores de riesgo en el hogar para el padecimiento actual
        </Typography>
        <FormGroup row style={{ justifyContent: "center" }}>
          <FormControlLabel
            control={
              <Checkbox
                value="si"
                color="primary"
                checked={confirmacion === "si"}
                onChange={(e) => {
                  setConfirmacion(e.target.value);
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
                checked={confirmacion === "no"}
                onChange={(e) => {
                  setConfirmacion(e.target.value);
                }}
              />
            }
            label="No"
          />
        </FormGroup>
        <div className={classes.container}>
          {Padecimientos.map((padecimiento) => (
            <CardnP name={padecimiento} disabled={confirmacion} id={id} />
          ))}
        </div>
        <Fab
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
          disabled={confirmacion === ""}
        >
          {id != null ? <SaveIcon /> : <NavigateNextIcon />}
        </Fab>
      </div>
    </Content>
  );
}
const mapStateToProps = (state) => ({
  anp: state.Cardnp,
});
const mapDispatchToProps = (state) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Nopatologic);
