import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Content from "../../Components/ContentExp";
import { Typography } from "@material-ui/core";
import Cardexp from "../../Components/Cardrecord";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import SaveIcon from "@material-ui/icons/Save";
import Fab from "@material-ui/core/Fab";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect } from "react";

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
    overflowY: "scroll",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
  },
}));

const Padecimientos = [
  "Enfermedades Reumatológicas",
  "Enfermedades del sistema nervioso",
  "Síndrome",
  "Malformaciones",
  "Congénitas",
  "Diabetes",
  "Hipertención arterial sistémica",
  "Cáncer",
  "Cardiopatías",
  "Vasculares",
  "Pulmonares",
  "Heptopatias",
  "Nefropatias",
  "Digestivos",
  "Endocrinopatias",
  "Transtornos Hematológicos",
  "Dislipidemias",
  "Otras",
];

function Antecedentes({ ahf }) {
  const { id } = useParams();
  const classes = useStyles();
  const history = useHistory();
  const handleNext = async (e) => {
    e.preventDefault();
    if (id) {
      //console.log(JSON.stringify(ahf));
      const formData = new FormData();
      formData.append("id", id);
      formData.append("ant_her_fam", JSON.stringify(ahf));
      const response = await fetch(urlBack + "update_ant_her_fam.php", {
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
      history.push("/Patients/Antecedentes no patologicos");
    }
  };
  return (
    <Content
      nombre="Pacientes"
      edit={id ? true : false}
      id={id}
      select="afamiliares"
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
          Antecedentes Heredo Familiares
        </Typography>
        <div className={classes.container}>
          {Padecimientos.map((padecimiento) => (
            <Cardexp name={padecimiento} key={padecimiento} id={id} />
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
  ahf: state.AHeredofamiliares,
});
const mapDispatchToProps = (state) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Antecedentes);
