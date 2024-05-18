import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Content from "../../Components/ContentExp";
import { Card, Typography, CardContent, TextField } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import SaveIcon from "@material-ui/icons/Save";
import Fab from "@material-ui/core/Fab";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { addFichaAction } from "../../store/actions/Ficha";
import { useEffect } from "react";

const urlBack = "http://localhost:4433/umarista-back/";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "95%",
    height: "85%",
    alignSelf: "center",
    marginTop: "2vh",
  },
  title: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: "larger",
    marginTop: "3vh",
  },
  multipleTextfield: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    flexWrap: "wrap",
    marginTop: "4%",
  },
  textfieldindiv: {
    width: "48%",
    [theme.breakpoints.down(850)]: {
      width: "100%",
    },
  },
}));

function Fichaidentificacion({ addFicha }) {
  useEffect(() => {
    async function fetchData() {
      const formData = new FormData();
      formData.append("id", id);
      const response = await fetch(urlBack + "pac_ficha_ident.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((posts) => {
          console.log(Object.values(posts));
          setDatos(Object.values(posts));
          setMap(Object.values(posts));
        });
    }

    if (id) {
      fetchData();
    }
  }, []);

  function setMap(dat) {
    console.log(dat);
    dat.map((item, index) => {
      setValues({
        nombre: item.nombre,
        apaterno: item.ap_p,
        amaterno: item.ap_m,
        edad: item.edad,
        sexo: item.sexo,
        curp: item.curp,
        nacionalidad: item.nacionalidad,
        ocupacion: item.ocupacion,
        religion: item.religion,
        calle: item.calle,
        colonia: item.colonia,
        numeroExterior: item.num_ext,
        codigopostal: item.cod_p,
        municipio: item.municipio,
        estado: item.estado,
        telefono: item.telefono_pac,
        celularP: item.celular,
        correo: item.correo,
        nfamiliar: item.nom_familiar,
        celularF: item.telefono_fam,
      });
    });
  }

  const [datos, setDatos] = React.useState([]);
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  /*
   * State donde se guardan todos los valores de los campos
   */
  const [values, setValues] = React.useState({
    nombre: "",
    calle: "",
    apaterno: "",
    amaterno: "",
    edad: 0,
    sexo: "",
    curp: "",
    nacionalidad: "",
    ocupacion: "",
    religion: "",
    colonia: "",
    numeroExterior: 0,
    codigopostal: "",
    municipio: "",
    telefono: "",
    estado: "",
    celularP: "",
    correo: "",
    nfamiliar: "",
    celularF: "",
  });
  /**
   *
   * @param {nombre de la vvariable a la que se le va a asignar el valor del campo} prop
   * funcion para guardar los valores en el state
   */
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      //console.log(JSON.stringify(values));

      const formData = new FormData();
      formData.append("id", id);
      formData.append("ficha_id", JSON.stringify(values));
      const response = await fetch(urlBack + "update_f_ident.php", {
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
      addFicha(values);
      history.push("/Patients/Antecedentes familiares");
    }
  };
  return (
    <Content
      nombre="Pacientes"
      edit={id ? true : false}
      id={id}
      select="fidentificacion"
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
          Ficha de identificación
        </Typography>
        <Card className={classes.card}>
          <CardContent>
            <form
              id="formulario"
              onSubmit={handleSubmit}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {}
              <div
                style={{
                  width: "48%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <TextField
                  error={
                    /^(?=.{3,15}$)[A-ZÁÉÍÓÚ][a-zñáéíóú]+(?: [A-ZÁÉÍÓÚ][a-zñáéíóú]+)?$/.test(
                      values.nombre
                    )
                      ? false
                      : true
                  }
                  variant="filled"
                  required
                  label="Nombre(s)"
                  helperText={
                    /^(?=.{3,15}$)[A-ZÁÉÍÓÚ][a-zñáéíóú]+(?: [A-ZÁÉÍÓÚ][a-zñáéíóú]+)?$/.test(
                      values.nombre
                    )
                      ? "Ingrese nombre del paciente"
                      : "No debe contener caracteres especiales"
                  }
                  onChange={handleChange("nombre")}
                  style={{ marginTop: "4%" }}
                  value={values.nombre === "" ? "" : values.nombre}
                />
                <div className={classes.multipleTextfield}>
                  <TextField
                    variant="filled"
                    required
                    label="Apellido paterno"
                    error={
                      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(
                        values.apaterno
                      )
                        ? false
                        : true
                    }
                    helperText={
                      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(
                        values.apaterno
                      )
                        ? "Ingresa Apellido paterno"
                        : "Ingresa un apellido valido"
                    }
                    onChange={handleChange("apaterno")}
                    className={classes.textfieldindiv}
                    value={values.apaterno === "" ? "" : values.apaterno}
                  />
                  <TextField
                    variant="filled"
                    label="Apellido materno"
                    error={
                      (/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(
                        values.amaterno
                      )
                        ? false
                        : true) && values.amaterno !== ""
                    }
                    helperText={"Ingrese el apellido materno"}
                    onChange={handleChange("amaterno")}
                    className={classes.textfieldindiv}
                    value={values.amaterno === "" ? "" : values.amaterno}
                  />
                </div>
                <div className={classes.multipleTextfield}>
                  <TextField
                    variant="filled"
                    label="Edad"
                    type="number"
                    required
                    inputProps={{ min: 1 }}
                    error={values.edad === 0}
                    style={{ width: "30%" }}
                    helperText={
                      values.edad === 0
                        ? "Este campo es requerido"
                        : "Ingrese la edad del paciente"
                    }
                    onChange={handleChange("edad")}
                    value={values.edad === "" ? "" : values.edad}
                  />
                  <FormControl
                    variant="filled"
                    className={classes.formControl}
                    style={{ width: "68%" }}
                  >
                    <InputLabel
                      id="demo-simple-select-filled-label"
                      error={values.sexo === ""}
                    >
                      Sexo
                    </InputLabel>
                    <Select
                      required
                      error={values.sexo === ""}
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={values.sexo === "" ? "" : values.sexo}
                      onChange={handleChange("sexo")}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"Hombre"}>Hombre</MenuItem>
                      <MenuItem value={"Mujer"}>Mujer</MenuItem>
                    </Select>
                    <FormHelperText
                      id="standard-weight-helper-text"
                      error={values.sexo === ""}
                    >
                      {values.sexo === ""
                        ? "Campo requerido seleccione una de las opciones"
                        : "seleccione su Sexo"}
                    </FormHelperText>
                  </FormControl>
                </div>
                <TextField
                  variant="filled"
                  label="CURP"
                  error={
                    /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/.test(
                      values.curp
                    )
                      ? false
                      : true
                  }
                  required
                  helperText={
                    /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/.test(
                      values.curp
                    )
                      ? "Ingrese la CURP de paciente"
                      : "Ingrese una curp valida"
                  }
                  onChange={handleChange("curp")}
                  style={{ marginTop: "4%" }}
                  value={values.curp === "" ? "" : values.curp}
                />
                <TextField
                  variant="filled"
                  label="Nacionalidad"
                  required
                  error={values.nacionalidad === ""}
                  helperText={"Ingrese la nacionalidad del paciente"}
                  onChange={handleChange("nacionalidad")}
                  style={{ marginTop: "4%" }}
                  value={values.nacionalidad === "" ? "" : values.nacionalidad}
                />
                <div className={classes.multipleTextfield}>
                  <TextField
                    variant="filled"
                    required
                    error={
                      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(
                        values.ocupacion
                      )
                        ? false
                        : true
                    }
                    label="Ocupación"
                    helperText={
                      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(
                        values.ocupacion
                      )
                        ? "Ingrese la ocupación del paciente"
                        : "No puede contener caracteres especiales"
                    }
                    onChange={handleChange("ocupacion")}
                    className={classes.textfieldindiv}
                    value={values.ocupacion === "" ? "" : values.ocupacion}
                  />
                  <TextField
                    variant="filled"
                    label="Religión"
                    required
                    error={
                      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(
                        values.religion
                      )
                        ? false
                        : true
                    }
                    helperText={
                      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(
                        values.religion
                      )
                        ? "Ingrese la religión del paciente"
                        : "No puede contener caracteres especiales"
                    }
                    onChange={handleChange("religion")}
                    className={classes.textfieldindiv}
                    value={values.religion === "" ? "" : values.religion}
                  />
                </div>
              </div>
              {/**
               * derecha
               */}
              <div
                style={{
                  width: "48%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <TextField
                  variant="filled"
                  error={values.calle === ""}
                  label="Calle"
                  required
                  helperText={"Ingresa la calle del paciente"}
                  onChange={handleChange("calle")}
                  style={{ marginTop: "4%" }}
                  value={values.calle === "" ? "" : values.calle}
                />
                <div className={classes.multipleTextfield}>
                  <TextField
                    variant="filled"
                    label="Colonia"
                    required
                    error={values.colonia === ""}
                    helperText={"Ingrese la colonia de paciente"}
                    onChange={handleChange("colonia")}
                    style={{ width: "68%" }}
                    value={values.colonia === "" ? "" : values.colonia}
                  />
                  <TextField
                    variant="filled"
                    label="Número exterior"
                    inputProps={{ min: 1 }}
                    required
                    error={values.numeroExterior === 0}
                    type="number"
                    helperText={"Ingrese el número exterior"}
                    onChange={handleChange("numeroExterior")}
                    style={{ width: "30%" }}
                    value={
                      values.numeroExterior === "" ? "" : values.numeroExterior
                    }
                  />
                </div>
                <div className={classes.multipleTextfield}>
                  <TextField
                    variant="filled"
                    label="Código Postal"
                    required
                    error={
                      /^[0-9]{5}$/.test(values.codigopostal) ? false : true
                    }
                    helperText={
                      /^[0-9]{5}$/.test(values.codigopostal)
                        ? "Ingrese el Código postal"
                        : "Ingrese codigo postal valido"
                    }
                    onChange={handleChange("codigopostal")}
                    style={{ width: "30%" }}
                    value={
                      values.codigopostal === "" ? "" : values.codigopostal
                    }
                  />
                  <TextField
                    variant="filled"
                    label="Municipio"
                    required
                    error={values.municipio === ""}
                    helperText={"Ingrese el municipio del paciente"}
                    onChange={handleChange("municipio")}
                    style={{ width: "68%" }}
                    value={values.municipio === "" ? "" : values.municipio}
                  />
                </div>
                <div className={classes.multipleTextfield}>
                  <TextField
                    variant="filled"
                    label="Estado"
                    required
                    error={values.estado === ""}
                    helperText={"Ingrese el Estado"}
                    onChange={handleChange("estado")}
                    className={classes.textfieldindiv}
                    value={values.estado === "" ? "" : values.estado}
                  />
                  <TextField
                    variant="filled"
                    label="Teléfono casa/trabajo(Paciente)"
                    error={
                      /^(\+?)[1-9]{1}[0-9]{5,11}$/.test(values.telefono)
                        ? false
                        : true && values.telefono !== ""
                    }
                    helperText={
                      (
                        /^(\+?)[1-9]{1}[0-9]{5,11}$/.test(values.telefono)
                          ? true
                          : false && values.telefono !== ""
                      )
                        ? "Ingrese el telefono del paciente"
                        : "Ingrese un telefono válido"
                    }
                    onChange={handleChange("telefono")}
                    className={classes.textfieldindiv}
                    value={values.telefono === "" ? "" : values.telefono}
                  />
                </div>
                <div className={classes.multipleTextfield}>
                  <TextField
                    variant="filled"
                    label="Celular"
                    required
                    error={
                      /^(\+?)[1-9]{1}[0-9]{5,11}$/.test(values.celularP)
                        ? false
                        : true
                    }
                    helperText={
                      /^(\+?)[1-9]{1}[0-9]{5,11}$/.test(values.celularP)
                        ? "Ingrese el celular del paciente"
                        : "Ingrese un celular valido"
                    }
                    onChange={handleChange("celularP")}
                    className={classes.textfieldindiv}
                    value={values.celularP === "" ? "" : values.celularP}
                  />
                  <TextField
                    variant="filled"
                    label="Correo electrónico"
                    required
                    error={
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
                        values.correo
                      )
                        ? false
                        : true
                    }
                    helperText={
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
                        values.correo
                      )
                        ? "Ingrese el correo electrónico del paciente"
                        : "Ingrese un correo valido"
                    }
                    onChange={handleChange("correo")}
                    className={classes.textfieldindiv}
                    value={values.correo === "" ? "" : values.correo}
                  />
                </div>
                <div className={classes.multipleTextfield}>
                  <TextField
                    variant="filled"
                    error={
                      (/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(
                        values.nfamiliar
                      )
                        ? false
                        : true) && values.nfamiliar !== ""
                    }
                    label="Nombre de un familiar"
                    helperText={"Ingrese el nombre de un familiar"}
                    onChange={handleChange("nfamiliar")}
                    className={classes.textfieldindiv}
                    value={values.nfamiliar === "" ? "" : values.nfamiliar}
                  />
                  <TextField
                    variant="filled"
                    label="Teléfono/celular (familiar)"
                    error={
                      /^(\+?)[1-9]{1}[0-9]{5,11}$/.test(values.celularF)
                        ? false
                        : true && values.telefono !== ""
                    }
                    helperText={"Ingrese el teléfono o celular del familiar"}
                    onChange={handleChange("celularF")}
                    className={classes.textfieldindiv}
                    value={values.telefono === "" ? "" : values.telefono}
                  />
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        <Fab
          color="primary"
          aria-label="next"
          type="submit"
          disabled={
            (/^(?=.{3,15}$)[A-ZÁÉÍÓÚ][a-zñáéíóú]+(?: [A-ZÁÉÍÓÚ][a-zñáéíóú]+)?$/.test(
              values.nombre
            )
              ? false
              : true) ||
            (/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(
              values.apaterno
            )
              ? false
              : true) ||
            ((/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(
              values.amaterno
            )
              ? false
              : true) &&
              values.amaterno !== "") ||
            values.edad === 0 ||
            values.sexo === "" ||
            (/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/.test(
              values.curp
            )
              ? false
              : true) ||
            values.nacionalidad === "" ||
            (/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(
              values.ocupacion
            )
              ? false
              : true) ||
            values.calle === "" ||
            values.numeroExterior === 0 ||
            values.colonia === "" ||
            (/^[0-9]{5}$/.test(values.codigopostal) ? false : true) ||
            values.municipio === "" ||
            values.estado === "" ||
            (/^(\+?)[1-9]{1}[0-9]{5,11}$/.test(values.telefono)
              ? false
              : true && values.telefono !== "") ||
            (/^(\+?)[1-9]{1}[0-9]{5,11}$/.test(values.celularP)
              ? false
              : true) ||
            (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
              values.correo
            )
              ? false
              : true) ||
            ((/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(
              values.nfamiliar
            )
              ? false
              : true) &&
              values.nfamiliar !== "") ||
            (/^(\+?)[1-9]{1}[0-9]{5,11}$/.test(values.celularF)
              ? false
              : true && values.telefono !== "")
          }
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
  addFicha: addFichaAction(dispatch),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Fichaidentificacion);
