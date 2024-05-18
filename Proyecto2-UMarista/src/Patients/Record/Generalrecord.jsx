import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Content from "../../Components/ContentExp";
import { Typography } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Fab from "@material-ui/core/Fab";
import Cardyesno from "../../Components/Yesnocard";
import CardnP from "../../Components/Cardnopatologic";
import Cardtext from "../../Components/Textcard";
import Evacard from "../../Components/Evacards";
import { useHistory, useParams } from "react-router-dom";
import SaveIcon from "@material-ui/icons/Save";
import { connect } from "react-redux";

const urlBack = "http://localhost:4433/umarista-back/";

const useStyles = makeStyles((theme) => ({
  title: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: "larger",
    marginTop: "3vh",
  },
  container: {
    display: "flex",
    width: "94%",
    height: "100%",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
  },
}));
const Sintomas = [
  "Astenia",
  "Adinamia",
  "Anorexia",
  "Fiebre",
  "Perdida de peso",
];
const Padecimientos = [
  "Aparato digestivo",
  "Aparato cardiovacular",
  "Aparato Respiratorio",
  "Aparato Urinario",
  "Aparato genital",
  "Aparato hematológico",
  "Sistema endócrino",
  "Sistema nervioso",
  "Sistema sensorial",
  "Sistema osteomuscular",
];
const Otros = [
  "Diagnosticos anteriores",
  "Estudios de gabinete/estudios de laboratorio",
  "Tratamientos anteriores(Tiempo,tipo)",
  "Inquietud subyacente",
];
const Eva = ["Inicio", "Evolución", "Actual"];
function Genecorecord({ anp, pad, expf }) {
  const { id } = useParams();
  const classes = useStyles();
  const history = useHistory();
  const handleNext = async (e) => {
    e.preventDefault();
    if (id) {
      console.log(JSON.stringify(anp));
      console.log(JSON.stringify(pad));
      const formData = new FormData();
      formData.append("id", id);
      formData.append("ant_no_pat", JSON.stringify(anp));
      formData.append("padecimientos", JSON.stringify(pad));
      const response = await fetch(urlBack + "update_pad_act.php", {
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
      history.push("/Patients/Examen físico");
    }
  };
  return (
    <Content
      nombre="Pacientes"
      edit={id ? true : false}
      id={id}
      select="padecimientos"
    >
      <div
        style={{
          width: "100%",
          backgroundColor: "#F4F4F4",
          display: "flex",
          flexDirection: "column",
          overflowY: "scroll",
        }}
      >
        <Typography className={classes.title}>Padecimiento Actual</Typography>
        {Eva.map((eva) => (
          <Evacard title={eva} id={id} />
        ))}
        <Typography className={classes.title}>Sintomas Generales</Typography>
        <div className={classes.container}>
          {Sintomas.map((sintoma) => (
            <Cardyesno name={sintoma} key={sintoma} id={id} />
          ))}
        </div>
        <Typography className={classes.title}>Aparatos y sistemas</Typography>
        <div className={classes.container}>
          {Padecimientos.map((padecimiento) => (
            <CardnP name={padecimiento} key={padecimiento} id={id} />
          ))}
          {Otros.map((otro) => (
            <Cardtext name={otro} key={otro} id={id} />
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
        >
          {id != null ? <SaveIcon /> : <NavigateNextIcon />}
        </Fab>
      </div>
    </Content>
  );
}
const mapStateToProps = (state) => ({
  anp: state.Cardnp,
  pad: state.Suffering,
  expf: state.Physicalexam.Examenfisico,
});
const mapDispatchToProps = (state) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Genecorecord);
