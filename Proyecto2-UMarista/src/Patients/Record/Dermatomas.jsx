import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Content from "../../Components/ContentExp";
import { Typography, Card, TextField } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import SaveIcon from "@material-ui/icons/Save";
import Fab from "@material-ui/core/Fab";
import Dermatomas from "../../Images/Drematomas.jpg";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { addDermatomasAction } from "../../store/actions/Dermatomas";
import { useEffect } from "react";

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
    height: "80%",
  },
  tf: {
    width: "70%",
    marginTop: "1.5%",
  },
}));

function Dermatomasform({ addDermatomas }) {
  useEffect(() => {
    async function fetchData() {
      const formData = new FormData();
      formData.append("id", id);
      const response = await fetch(urlBack + "pac_dermatomas.php", {
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
      setDetalles(item.zonas_dermatomas);
    });
  }

  const { id } = useParams();
  const classes = useStyles();
  const history = useHistory();
  const [detalles, setDetalles] = React.useState("");
  const handleNext = async (e) => {
    e.preventDefault();
    if (id) {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("dermatomas", detalles);
      const response = await fetch(urlBack + "update_derm.php", {
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
      addDermatomas(detalles);
      history.push("/Patients/Diagnóstico y plan fisioterapéutico");
    }
  };
  return (
    <Content
      nombre="Pacientes"
      edit={id ? true : false}
      id={id}
      select="dermatomas"
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
        <Typography className={classes.title}>
          Dermatomas, mitomas y pares craneales
        </Typography>
        <Card className={classes.Card}>
          <img src={Dermatomas} alt="" width="50%" style={{ height: "65%" }} />
          <TextField
            variant="filled"
            className={classes.tf}
            rows="8"
            multiline
            label="Escriba las zonas"
            helperText="Escriba los detalles"
            onChange={(e) => {
              setDetalles(e.target.value);
            }}
            value={detalles === "" ? "" : detalles}
          />
        </Card>
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
  addDermatomas: addDermatomasAction(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Dermatomasform);
