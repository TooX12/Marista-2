import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { connect } from "react-redux";
import { addAntecedentsHFAction } from "../store/actions/AHeredofamiliares";
import { Card, Typography, CardContent, TextField } from "@material-ui/core";
import { useEffect } from "react";
const urlBack = "http://localhost:4433/umarista-back/";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  cardbody: {
    width: "600px",
    height: "225px",
    marginTop: "2%",
    [theme.breakpoints.down(800)]: {
      width: "500px",
    },
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
function Cardrecord({ name, addAHF, id }) {
  const classes = useStyles();
  const [er, setEr] = React.useState({
    "Enfermedades Reumatológicas": {
      confirmacion: "",
      madre: "",
      abuelos: "",
      padre: "",
      hermano: "",
      otros: "",
      dtalles: "",
    },
    "Enfermedades del sistema nervioso": {
      confirmacion: "",
      madre: "",
      abuelos: "",
      padre: "",
      hermano: "",
      otros: "",
      dtalles: "",
    },
    Síndrome: {
      confirmacion: "",
      madre: "",
      abuelos: "",
      padre: "",
      hermano: "",
      otros: "",
      dtalles: "",
    },
    Malformaciones: {
      confirmacion: "",
      madre: "",
      abuelos: "",
      padre: "",
      hermano: "",
      otros: "",
      dtalles: "",
    },
    Congénitas: {
      confirmacion: "",
      madre: "",
      abuelos: "",
      padre: "",
      hermano: "",
      otros: "",
      dtalles: "",
    },
    Diabetes: {
      confirmacion: "",
      madre: "",
      abuelos: "",
      padre: "",
      hermano: "",
      otros: "",
      dtalles: "",
    },
    "Hipertención arterial sistémica": {
      confirmacion: "",
      madre: "",
      abuelos: "",
      padre: "",
      hermano: "",
      otros: "",
      dtalles: "",
    },
    Cáncer: {
      confirmacion: "",
      madre: "",
      abuelos: "",
      padre: "",
      hermano: "",
      otros: "",
      dtalles: "",
    },
    Cardiopatías: {
      confirmacion: "",
      madre: "",
      abuelos: "",
      padre: "",
      hermano: "",
      otros: "",
      dtalles: "",
    },
    Vasculares: {
      confirmacion: "",
      madre: "",
      abuelos: "",
      padre: "",
      hermano: "",
      otros: "",
      dtalles: "",
    },
    Pulmonares: {
      confirmacion: "",
      madre: "",
      abuelos: "",
      padre: "",
      hermano: "",
      otros: "",
      dtalles: "",
    },
    Heptopatias: {
      confirmacion: "",
      madre: "",
      abuelos: "",
      padre: "",
      hermano: "",
      otros: "",
      dtalles: "",
    },
    Nefropatias: {
      confirmacion: "",
      madre: "",
      abuelos: "",
      padre: "",
      hermano: "",
      otros: "",
      dtalles: "",
    },
    Digestivos: {
      confirmacion: "",
      madre: "",
      abuelos: "",
      padre: "",
      hermano: "",
      otros: "",
      dtalles: "",
    },
    Endocrinopatias: {
      confirmacion: "",
      madre: "",
      abuelos: "",
      padre: "",
      hermano: "",
      otros: "",
      dtalles: "",
    },
    "Transtornos Hematológicos": {
      confirmacion: "",
      madre: "",
      abuelos: "",
      padre: "",
      hermano: "",
      otros: "",
      dtalles: "",
    },
    Dislipidemias: {
      confirmacion: "",
      madre: "",
      abuelos: "",
      padre: "",
      hermano: "",
      otros: "",
      dtalles: "",
    },
    Otras: {
      confirmacion: "",
      madre: "",
      abuelos: "",
      padre: "",
      hermano: "",
      otros: "",
      dtalles: "",
    },
  });
  const [datos, setDatos] = React.useState([]);
  const handleChange = (prop) => (e) => {
    //e.preventDefault();
    console.log(e.target.checked);
    if (e.target.checked) {
      setEr({ ...er, [name]: { ...er[name], [prop]: e.target.value } });
    } else {
      setEr({ ...er, [name]: { ...er[name], [prop]: "" } });
    }
  };
  useEffect(() => {
    addAHF(er[name], name);
  }, [er]);
  useEffect(() => {
    async function fetchData() {
      const formData = new FormData();
      formData.append("id", id);
      const response = await fetch(urlBack + "pac_ant_her_fam.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((posts) => {
          //console.log(Object.values(posts));
          setDatos(Object.values(posts));
          setMap(Object.values(posts));
        });
    }
    if (id) {
      fetchData();
    }
  }, []);
  /*
  async function fetchData() {
    const formData = new FormData();
    formData.append("id", id);
    const response = await fetch(urlBack + "pac_ant_her_fam.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((posts) => {
        //console.log(Object.values(posts));
        setDatos(Object.values(posts));
        setMap(Object.values(posts));
      });
  }
  if (id) {
    fetchData();
  }
*/
  function setMap(dat) {
    console.log("dat");
    dat.map((item, index) => {
      setEr({
        "Enfermedades Reumatológicas": JSON.parse(
          item.enfermedades_reumatologicas
        ),
        "Enfermedades del sistema nervioso": JSON.parse(
          item.enfermedades_sistema_nervioso
        ),
        Síndrome: JSON.parse(item.sindrome),
        Malformaciones: JSON.parse(item.malformaciones),
        Congénitas: JSON.parse(item.congenitas),
        Diabetes: JSON.parse(item.diabetes),
        "Hipertención arterial sistémica": JSON.parse(
          item.hipertension_arterial_sistemica
        ),
        Cáncer: JSON.parse(item.cancer),
        Cardiopatías: JSON.parse(item.cardiopatias),
        Vasculares: JSON.parse(item.vasculares),
        Pulmonares: JSON.parse(item.pulmonares),
        Heptopatias: JSON.parse(item.heptopatias),
        Nefropatias: JSON.parse(item.nefropatias),
        Digestivos: JSON.parse(item.digestivos),
        Endocrinopatias: JSON.parse(item.endocrinopatias),
        "Transtornos Hematológicos": JSON.parse(item.trastornos_hermatologicos),
        Dislipidemias: JSON.parse(item.dislipidemias),
        Otras: JSON.parse(item.otras),
      });
    });
  }

  return (
    <Card className={classes.cardbody} key={name}>
      <Typography className={classes.cardtitle}>{name}</Typography>
      <CardContent className={classes.card}>
        {/**
         * izquierda
         */}
        <div
          style={{
            width: "48%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FormGroup row style={{ justifyContent: "space-between" }}>
            <FormControlLabel
              control={
                <Checkbox
                  value="si"
                  color="primary"
                  checked={er[name].confirmacion === "si"}
                  onChange={handleChange("confirmacion")}
                />
              }
              label="Si"
              className={classes.checkbox}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="no"
                  color="primary"
                  checked={er[name].confirmacion === "no"}
                  onChange={handleChange("confirmacion")}
                />
              }
              label="No"
              className={classes.checkbox}
            />
          </FormGroup>
          <FormGroup row style={{ justifyContent: "space-between" }}>
            <FormControlLabel
              control={
                <Checkbox
                  value="si"
                  disabled={
                    er[name].confirmacion === "" ||
                    er[name].confirmacion === "no"
                  }
                  color="primary"
                  onChange={handleChange("madre")}
                  checked={er[name].madre}
                />
              }
              label="Madre"
              className={classes.checkbox}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="si"
                  disabled={
                    er[name].confirmacion === "" ||
                    er[name].confirmacion === "no"
                  }
                  color="primary"
                  onChange={handleChange("abuelos")}
                  checked={er[name].abuelos === "" ? false : true}
                />
              }
              label="Abuelos"
              className={classes.checkbox}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="si"
                  disabled={
                    er[name].confirmacion === "" ||
                    er[name].confirmacion === "no"
                  }
                  color="primary"
                  onChange={handleChange("padre")}
                  checked={er[name].padre === "" ? false : true}
                />
              }
              label="Padre"
              className={classes.checkbox}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="si"
                  disabled={
                    er[name].confirmacion === "" ||
                    er[name].confirmacion === "no"
                  }
                  color="primary"
                  onChange={handleChange("hermano")}
                  checked={er[name].hermano === "" ? false : true}
                />
              }
              label="Hermano"
              className={classes.checkbox}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="si"
                  disabled={
                    er[name].confirmacion === "" ||
                    er[name].confirmacion === "no"
                  }
                  color="primary"
                  onChange={handleChange("otros")}
                  checked={er[name].otros === "" ? false : true}
                />
              }
              label="Otros"
              className={classes.checkbox}
            />
          </FormGroup>
        </div>
        {/**
         * derecha
         */}
        <div
          style={{
            width: "45%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextField
            label="Detalles"
            multiline
            onChange={handleChange("dtalles")}
            helperText={"Ingresa los detalles"}
            rows="4"
            variant="filled"
            disabled={
              er[name].confirmacion === "" || er[name].confirmacion === "no"
            }
            value={er[name].dtalles === "" ? "" : er[name].dtalles}
          />
        </div>
      </CardContent>
    </Card>
  );
}
const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  addAHF: addAntecedentsHFAction(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Cardrecord);
