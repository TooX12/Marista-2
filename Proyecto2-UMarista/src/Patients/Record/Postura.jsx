import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Content from "../../Components/ContentExp";
import { Typography, Card, TextField } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import SaveIcon from "@material-ui/icons/Save";
import Fab from "@material-ui/core/Fab";
import Postura from "../../Images/postura.jpg";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { addPosturaAction } from "../../store/actions/Postura";
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

function Posturaform({ addPostura }) {
  useEffect(() => {
    async function fetchData() {
      const formData = new FormData();
      formData.append("id", id);
      const response = await fetch(urlBack + "pac_postura.php", {
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
        Anterior: item.anterior,
        Lateral: item.lateral,
        Posterior: item.posterior,
      });
    });
  }

  const { id } = useParams();
  const classes = useStyles();
  const history = useHistory();
  const [values, setValues] = React.useState({
    Anterior: "",
    Lateral: "",
    Posterior: "",
  });
  const handleNext = async (e) => {
    e.preventDefault();
    if (id) {
      console.log(JSON.stringify(values));

      const formData = new FormData();
      formData.append("id", id);
      formData.append("postura", JSON.stringify(values));
      const response = await fetch(urlBack + "update_post.php", {
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
      addPostura(values);
      history.push("/Patients/Dermatomas mitomas y pares craneales");
    }
  };
  return (
    <Content
      nombre="Pacientes"
      edit={id ? true : false}
      id={id}
      select="postura"
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
        <Typography className={classes.title}>Postura</Typography>
        <Card className={classes.Card}>
          <img src={Postura} alt="" width="50%" style={{ height: "50%" }} />
          <form
            id="formulario"
            name="formulario"
            onSubmit={handleNext}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              variant="filled"
              className={classes.tf}
              label="Anterior"
              helperText="Escriba los detalles"
              onChange={(e) => {
                setValues({ ...values, Anterior: e.target.value });
              }}
              value={values.Anterior === "" ? "" : values.Anterior}
            />
            <TextField
              variant="filled"
              className={classes.tf}
              label="Lateral"
              helperText="Escriba los detalles"
              onChange={(e) => {
                setValues({ ...values, Lateral: e.target.value });
              }}
              value={values.Lateral === "" ? "" : values.Lateral}
            />
            <TextField
              variant="filled"
              className={classes.tf}
              label="Posterior"
              helperText="Escriba los detalles"
              onChange={(e) => {
                setValues({ ...values, Posterior: e.target.value });
              }}
              value={values.Posterior === "" ? "" : values.Posterior}
            />
          </form>
        </Card>
        <Fab
          color="primary"
          aria-label="next"
          disabled={
            values.Anterior === "" ||
            values.Lateral === "" ||
            values.Posterior === ""
          }
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
  addPostura: addPosturaAction(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Posturaform);
