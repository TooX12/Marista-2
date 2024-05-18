import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Card, Typography, CardContent } from "@material-ui/core";
import { connect } from "react-redux";
import { addSufferingAction } from "../store/actions/Suffering";
import { useEffect } from "react";

const urlBack = "http://localhost:4433/umarista-back/";

const useStyles = makeStyles((theme) => ({
  cardbody: {
    width: "600px",
    height: "100px",
    marginTop: "2%",
    [theme.breakpoints.down(800)]: {
      width: "500px",
    },
  },
  card: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: "larger",
    marginTop: "3vh",
  },
  cardtitle: {
    textAlign: "center",
    fontWeight: "bold",
    marginTop: "2%",
  },
  checkbox: {
    width: "40%",
  },
}));

function Yesnocard({ name, addSuffering, id }) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    Astenia: {
      confirmacion: "",
    },
    Adinamia: {
      confirmacion: "",
    },
    Anorexia: {
      confirmacion: "",
    },
    Fiebre: {
      confirmacion: "",
    },
    "Perdida de peso": {
      confirmacion: "",
    },
  });
  useEffect(() => {
    addSuffering(values[name].confirmacion, name);
  }, [values]);

  useEffect(() => {
    async function fetchData() {
      const formData = new FormData();
      formData.append("id", id);
      const response = await fetch(urlBack + "pac_pad_act.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((posts) => {
          //console.log(Object.values(posts));
          //setDatos(Object.values(posts));
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
        Astenia: {
          confirmacion: item.astenia,
        },
        Adinamia: {
          confirmacion: item.adinamia,
        },
        Anorexia: {
          confirmacion: item.anorexia,
        },
        Fiebre: {
          confirmacion: item.fiebre,
        },
        "Perdida de peso": {
          confirmacion: item.perdida_peso,
        },
      });
    });
  }

  return (
    <Card className={classes.cardbody}>
      <CardContent className={classes.card}>
        <Typography style={{ textAlign: "center", marginTop: "1vh" }}>
          {name}
        </Typography>
        <FormGroup row style={{ justifyContent: "center" }}>
          <FormControlLabel
            control={
              <Checkbox
                value="si"
                color="primary"
                checked={values[name].confirmacion === "si"}
                onChange={(e) => {
                  setValues({
                    ...values,
                    [name]: { ...values[name], confirmacion: e.target.value },
                  });
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
                checked={values[name].confirmacion === "no"}
                onChange={(e) => {
                  setValues({
                    ...values,
                    [name]: { ...values[name], confirmacion: e.target.value },
                  });
                }}
              />
            }
            label="No"
          />
        </FormGroup>
      </CardContent>
    </Card>
  );
}
const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  addSuffering: addSufferingAction(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Yesnocard);
