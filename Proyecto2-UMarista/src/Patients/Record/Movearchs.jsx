import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Content from "../../Components/ContentExp";
import { Typography } from "@material-ui/core";
import Archcard from "../../Components/Movearchcard";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import SaveIcon from "@material-ui/icons/Save";
import Fab from "@material-ui/core/Fab";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";

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

const Arcos = [
  "Columna cervical",
  "Columna dorsal",
  "Columna lumbar",
  "Hombro",
  "Codo",
  "Muñeca",
  "Mano",
  "Cadera",
  "Rodilla",
  "Tobillo",
  "Pie",
];

function MoveArch({ arcmov }) {
  const { id } = useParams();
  const classes = useStyles();
  const history = useHistory();
  const handleNext = async (e) => {
    e.preventDefault();
    if (id) {
      console.log(JSON.stringify(arcmov));
      const formData = new FormData();
      formData.append("id", id);
      formData.append("arc_mov", JSON.stringify(arcmov));
      const response = await fetch(urlBack + "update_arc_mov.php", {
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
      history.push("/Patients/Notas de valoracion");
    }
  };
  return (
    <Content
      nombre="Pacientes"
      edit={id ? true : false}
      id={id}
      select="amovimiento"
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
        <Typography className={classes.title}>Arcos de movimiento</Typography>
        {Arcos.map((arco) => (
          <Archcard key={arco} titulo={arco} id={id} />
        ))}
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
  arcmov: state.Movearch,
});
const mapDispatchToProps = (state) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(MoveArch);
