import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Content from "../../Components/ContentExp";
import { Typography } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Fab from "@material-ui/core/Fab";
import Cardgineco from "../../Components/Cardgineco";
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
    overflowY: "scroll",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
  },
}));
const Padecimientos = [
  "Menarca",
  "Ritmo menstrual",
  "Partos",
  "Abortos",
  "Cesáreas",
  "Métodos Anticonceptivos",
];
function Genecorecord({ ago }) {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const handleNext = async (e) => {
    if (id) {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("ant_gin_obs", JSON.stringify(ago));
      const response = await fetch(urlBack + "update_ant_gin.php", {
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
      history.push("/Patients/Aspectos generales");
    }
  };
  return (
    <Content
      nombre="Pacientes"
      edit={id ? true : false}
      id={id}
      select="agineco"
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
          Antecedentes Gineco-obstétricos
        </Typography>
        <div className={classes.container}>
          {Padecimientos.map((padecimiento) => (
            <Cardgineco name={padecimiento} key={padecimiento} id={id} />
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
  ago: state.Cardgineco,
});
const mapDispatchToProps = (state) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Genecorecord);
