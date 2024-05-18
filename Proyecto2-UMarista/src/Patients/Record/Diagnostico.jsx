import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Content from "../../Components/ContentExp";
import { Typography, Card, TextField } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Fab from "@material-ui/core/Fab";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { addDiagnosticoAction } from "../../store/actions/Diagnostico";
import { useEffect } from "react";
import SaveIcon from "@material-ui/icons/Save";

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
    width: "85%",
    alignSelf: "center",
    alignItems: "center",
    height: "fit-content",
    marginTop: "5%",
    overflow: "visible",
  },
  tf: {
    width: "90%",
    marginTop: "1.5%",
  },
}));
const planes = [
  "Diagnóstico fisioterapéutico",
  "Pronostico",
  "Objetivos",
  "Plan fisioterapéutico",
];
function Diagnostico({ addDiagnostico }) {
  useEffect(() => {
    async function fetchData() {
      const formData = new FormData();
      formData.append("id", id);
      const response = await fetch(urlBack + "pac_diag_plan.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((posts) => {
          setMap(Object.values(posts));
        });
    }

    if (id) {
      fetchData();
    }
  }, []);

  function setMap(dat) {
    dat.map((item, index) => {
      setDetalles({
        "Diagnóstico fisioterapéutico": item.diagnostico_fisioterapeutico,
        Pronostico: item.pronostico,
        Objetivos: item.objetivos,
        "Plan fisioterapéutico": item.plan_fisioterapeutico,
      });
    });
  }

  const { id } = useParams();
  const classes = useStyles();
  const history = useHistory();
  const [detalles, setDetalles] = React.useState({
    "Diagnóstico fisioterapéutico": "",
    Pronostico: "",
    Objetivos: "",
    "Plan fisioterapéutico": "",
  });
  const handleNext = async (e) => {
    e.preventDefault();
    if (id) {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("diagnostico", JSON.stringify(detalles));
      const response = await fetch(urlBack + "update_diag.php", {
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
      addDiagnostico(detalles);
      history.push("/Patients/Mapa del dolor");
    }
  };
  return (
    <Content
      nombre="Pacientes"
      edit={id ? true : false}
      id={id}
      select="diagnostico"
    >
      <div
        style={{
          width: "100%",
          backgroundColor: "#F4F4F4",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflowY: "scroll",
        }}
      >
        <Typography className={classes.title}>
          Dermatomas, mitomas y pares craneales
        </Typography>
        {planes.map((plan) => (
          <Card className={classes.Card}>
            <Typography className={classes.title}>{plan}</Typography>
            <TextField
              rows="8"
              variant="filled"
              multiline
              className={classes.tf}
              label={"Diagnóstico fisioterapéutico"}
              helperText="Escribe los detalles"
              onChange={(e) => {
                setDetalles({ ...detalles, [plan]: e.target.value });
              }}
              value={detalles[plan] === "" ? "" : detalles[plan]}
            />
          </Card>
        ))}
        <Fab
          color="primary"
          aria-label="next"
          disabled={detalles === ""}
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
const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  addDiagnostico: addDiagnosticoAction(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Diagnostico);
