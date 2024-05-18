import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Content from "../../Components/ContentExp";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import SaveIcon from "@material-ui/icons/Save";
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
  "Enfermedades Infecciosas de la infancia",
  "Intervenciones Quirúrgicas",
  "Traumatismos(Esguinces.fracturas,luxaciones,desgarres)",
  "Infiltraciones",
  "Hospitalizaciones",
  "Perdida del Conocimiento",
  "Intolerancia a medicamentos",
  "Transfuciones",
  "Medicamentos",
  "ETS",
];
function Nopatologic({ anp }) {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const handleNext = async (e) => {
    e.preventDefault();
    if (id) {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("ant_no_pat", JSON.stringify(anp));
      const response = await fetch(urlBack + "update_ant_pat.php", {
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
      history.push("/Patients/Antecedentes Gineco-obstetricos");
    }
  };
  return (
    <Content
      nombre="Pacientes"
      select="apatologicos"
      id={id}
      edit={id ? true : false}
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
          Antecedentes personales patológicos
        </Typography>
        <div className={classes.container}>
          {Padecimientos.map((padecimiento) => (
            <CardnP name={padecimiento} id={id} />
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
});
const mapDispatchToProps = (state) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Nopatologic);
