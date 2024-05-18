import React, { useEffect, useState, Component } from "react";
import Content from "../Components/Content";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Calendar from "react-calendar";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import { TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";
import StepLabel from "@material-ui/core/StepLabel";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import { format } from "date-fns";

const urlBack = "http://localhost:4433/umarista-back/";

/**
 * funcion donde se encuentran los pasos del steper
 */
function getSteps() {
  return [
    "Seleccionar una fecha",
    "Seleccionar hora disponible",
    "Seleccionar paciente",
    "Definir padecimiento",
  ];
}

/**
 * se definen los estilos aplicados a la interfaz
 */
const useStyles = makeStyles((theme) => ({
  root: {
    width: "97%",
    alignSelf: "center",
  },
  container: {
    maxHeight: 587,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  Icon: {
    color: "#FFB700 !important",
  },
  calendar: {
    boxShadow: "10px 1px 60px -15px #111",
    border: "none",
    width: "100%",
    height: "",
  },
  tarjeta: {
    width: "auto",
    marginTop: "5%",
  },
  left: {
    marginLeft: "3%",
    marginTop: "2%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "30%",
  },
  alert: {
    position: "absolute",
    bottom: 0,
    right: 0,
    transition: ".5s",
    cursor: "pointer",
  },
  alertclose: {
    position: "absolute",
    bottom: 0,
    right: 0,
    visibility: "hidden",
    transition: ".5s",
  },
}));
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

const citas = [
  {
    paciente: "Gustavo García Sánchez",
    edad: 22,
    telefono: "443-165-3698",
    tipoconsulta: " Fisioterapia",
    fecha: "2020-04-01",
    hora: "12:00",
  },
  {
    paciente: "Gustavo García Sánchez",
    edad: 22,
    telefono: "443-165-3698",
    tipoconsulta: " Fisioterapia",
    fecha: "2020-04-01",
    hora: "16:00",
  },
];
/**
 * función principal del componente
 */
export default function Dates() {
  /*useEffect(() => {
    //console.log(format(calendarDate, "HH:mm"));
    async function fetchData() {
      const formData = new FormData();
      formData.append("fecha", format(calendarDate, "yyyy-MM-dd"));
      const response = await fetch(urlBack + "citas_cargar.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((posts) => {
          console.log(Object.values(posts));
          //setDatos(Object.values(posts));
        });
    }

    fetchData();
  }, []);
  */
  const classes = useStyles();
  const [values, setValues] = React.useState({
    fecha: new Date(),
    time: new Date(),
    paciente: "",
    tipoconsulta: "",
    telefono: "",
  });
  const [id_item, setId_item] = React.useState();
  const [calendarDate, setCalendardate] = React.useState(new Date());
  const [modificar, setModificar] = React.useState(false);
  const [datos, setDatos] = React.useState([]);
  const [activeStep, setActiveStep] = React.useState(0);
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const steps = getSteps();
  const [open, setOpen] = React.useState(false);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  /**
   *handles para el siguiente paso y el paso anterior en el dialog
   */
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  /**
   *
   * handle para definir la fecha de la cita en el dialog
   */
  const handleDateChange = (date) => {
    setValues({
      fecha: date,
      time: new Date(),
      time: values.time,
      paciente: values.paciente,
      tipoconsulta: values.tipoconsulta,
      telefono: values.telefono,
    });
  };
  /**
   * handle para el cierre del dialog
   */
  const handleCloseOut = () => {
    setOpen(false);
    setActiveStep(0);
  };

  const handleClose = () => {
    setOpen(false);
    setActiveStep(0);
    if (
      values.paciente === "" ||
      values.telefono === "" ||
      values.tipoconsulta === "" ||
      /^(\+?)[1-9]{1}[0-9]{5,11}$/.test(values.telefono) === false ||
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(
        values.paciente
      ) === false
    ) {
      setError(true);
    } else {
      agendar();
      //setSuccess(true);
      //console.log(values);
    }
    /*FALTARÁ REAGENDAR*/
  };

  async function atenderCita(item) {
    const formData = new FormData();
    formData.append("estado", "Atendido");
    formData.append("id_cita", item.id_citas);
    const response = await fetch(urlBack + "citas_estado.php", {
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
  }

  async function cancelarCita(item) {
    const formData = new FormData();
    formData.append("estado", "Cancelado");
    formData.append("id_cita", item.id_citas);
    const response = await fetch(urlBack + "citas_estado.php", {
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
  }

  function reagendarCita(item) {
    setModificar(true);
    setId_item(item.id_citas);
    setValues({
      fecha: new Date(item.fecha),
      time: new Date(item.hora),
      paciente: item.nombre_paciente,
      telefono: item.telefono,
      tipoconsulta: item.padecimiento,
    });
    setOpen(true);
  }

  function nuevaCita() {
    setModificar(false);
    setValues({
      fecha: new Date(),
      time: new Date(),
      paciente: "",
      telefono: "",
      tipoconsulta: "",
    });
    setOpen(true);
  }

  async function agendar() {
    if (modificar === false) {
      const formData = new FormData();
      formData.append("fecha", format(values["fecha"], "yyyy-MM-dd"));
      formData.append("hora", format(values["time"], "HH:mm"));
      formData.append("nombre_paciente", values["paciente"]);
      formData.append("telefono", values["telefono"]);
      formData.append("padecimiento", values["tipoconsulta"]);
      const response = await fetch(urlBack + "citas_agendar.php", {
        method: "POST",
        body: formData,
      });

      const res = await response.json();

      if (res["status"] === "1") {
        setSuccess(true);
        window.location.reload();
      } else {
        console.log("ERROR");
        setError(true);
      }
    } else {
      const formData = new FormData();
      formData.append("fecha", format(values["fecha"], "yyyy-MM-dd"));
      formData.append("hora", format(values["time"], "HH:mm"));
      formData.append("nombre_paciente", values["paciente"]);
      formData.append("telefono", values["telefono"]);
      formData.append("padecimiento", values["tipoconsulta"]);
      formData.append("id_citas", id_item);
      const response = await fetch(urlBack + "citas_reagendar.php", {
        method: "POST",
        body: formData,
      });
      const res = await response.json();

      if (res["status"] === "1") {
        setSuccess(true);
        window.location.reload();
      } else {
        console.log("ERROR");
        setError(true);
      }
    }
  }
  /**
   *
   *
   * handle para guardar la fecha seleccionada en el calendario
   */

  async function handleDate(value) {
    setCalendardate(value);
    const formData = new FormData();
    formData.append("fecha", format(value, "yyyy-MM-dd"));
    const response = await fetch(urlBack + "citas_cargar.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((posts) => {
        setDatos(Object.values(posts));
      });
  }

  return (
    <Content nombre="Citas" select="citas">
      <div
        style={{
          width: "100%",
          backgroundColor: "#F4F4F4",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {/**
         * contenido de la parte izquierdas
         */}
        <Card className={classes.left}>
          <CardContent style={{ padding: "0" }}>
            <Calendar
              onChange={handleDate}
              value={calendarDate}
              className={classes.calendar}
              selectRange={false}
              minDetail="month"
            />
          </CardContent>
          <CardActions>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography style={{ fontSize: "small", fontWeight: "bold" }}>
                Añadir una nueva cita
              </Typography>
              <AddIcon
                style={{ cursor: "pointer" }}
                onClick={() => {
                  nuevaCita();
                  //setOpen(true);
                }}
              />
            </div>
          </CardActions>
        </Card>
        {/**
         * contenido de la parte derecha
         */}
        <Card
          style={{
            marginLeft: "1%",
            marginTop: "2%",
            display: "flex",
            flexDirection: "column",
            width: "65%",
          }}
        >
          <Typography
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              fontFamily: "Roboto",
              margin: "2%",
            }}
          >
            Citas de hoy
          </Typography>
          <Grid
            container
            spacing={3}
            style={{ padding: "2%", overflowY: "scroll" }}
          >
            {datos.map((item, index) =>
              calendarDate.getUTCDate() ===
              new Date(item.fecha).getUTCDate() ? (
                <Grid item xs={6}>
                  <Card className={classes.tarjeta}>
                    <CardContent style={{ backgroundColor: "#61B4E4" }}>
                      <Typography
                        style={{
                          color: "white",
                          fontSize: "Large",
                          fontWeight: "bolder",
                        }}
                      >
                        {item.nombre_paciente}
                      </Typography>
                      <div style={{ display: "flex" }}>
                        <Typography style={{ color: "white" }}>
                          {item.telefono}
                        </Typography>
                      </div>
                      <Typography style={{ color: "white", fontSize: "small" }}>
                        Tipo de Consulta: {item.padecimiento}
                      </Typography>
                      <Typography style={{ color: "white", fontSize: "small" }}>
                        Estado de la consulta: {item.estado}
                      </Typography>
                    </CardContent>
                    <CardActions
                      style={{
                        backgroundColor: "#003764",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex", width: "50%" }}>
                        <AccessTimeIcon style={{ color: "white" }} />
                        <Typography
                          style={{
                            color: "white",
                            fontSize: "small",
                            alignSelf: "center",
                            marginLeft: "3%",
                          }}
                        >
                          {new Date("1970-01-01T" + item.hora).getHours()}:
                          {addZero(
                            new Date("1970-01-01T" + item.hora).getMinutes()
                          )}
                          -{new Date("1970-01-01T" + item.hora).getHours() + 1}:
                          {addZero(
                            new Date("1970-01-01T" + item.hora).getMinutes()
                          )}
                        </Typography>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          width: "40%",
                          justifyContent: "flex-end",
                        }}
                      >
                        <CheckCircleIcon
                          style={{
                            color: "white",
                            paddingRight: "5%",
                            cursor: "pointer",
                          }}
                          onClick={() => atenderCita(item)}
                        />
                        <EditIcon
                          style={{
                            color: "white",
                            paddingRight: "5%",
                            cursor: "pointer",
                          }}
                          onClick={() => reagendarCita(item)}
                        />
                        <CancelIcon
                          style={{
                            color: "white",
                            paddingRight: "5%",
                            cursor: "pointer",
                          }}
                          onClick={() => cancelarCita(item)}
                        />
                      </div>
                    </CardActions>
                  </Card>
                </Grid>
              ) : (
                ""
              )
            )}
          </Grid>
        </Card>
        {/**
         * Dialog donde se agregan las citas
         */}
        <Dialog
          open={open}
          onClose={handleCloseOut}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="form-dialog-title"
            style={{
              fontSize: "25px",
              fontWeight: "bolder",
              fontFamily: "Roboto",
              textAlign: "center",
            }}
          >
            Agendar Cita
          </DialogTitle>
          <DialogContent>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel
                    StepIconProps={{
                      classes: {
                        completed: classes.Icon,
                        active: classes.Icon,
                      },
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            <div>
              <div>
                {/**
                 * Switch case donde aparecen los componentes de cada step
                 */}
                {(() => {
                  switch (activeStep) {
                    case 0:
                      return (
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <Typography
                            style={{
                              fontSize: "20px",
                              fontWeight: "bold",
                              fontFamily: "Roboto",
                              margin: "3%",
                            }}
                          >
                            Fecha
                          </Typography>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              disableToolbar
                              variant="inline"
                              format="dd/MM/yyyy"
                              margin="normal"
                              id="date-picker-inline"
                              label="Fecha"
                              value={
                                values.fecha === ""
                                  ? new Date()
                                  : new Date(values.fecha)
                              }
                              onChange={handleDateChange}
                              KeyboardButtonProps={{
                                "aria-label": "change date",
                              }}
                              style={{
                                marginLeft: "6%",
                                marginBottom: "6%",
                                alignSelf: "center",
                                width: "100%",
                              }}
                              disablePast="true"
                            />
                          </MuiPickersUtilsProvider>
                        </div>
                      );
                    case 1:
                      return (
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <Typography
                            style={{
                              fontSize: "20px",
                              fontWeight: "bold",
                              fontFamily: "Roboto",
                              margin: "3%",
                            }}
                          >
                            Horas disponibles
                          </Typography>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardTimePicker
                              margin="normal"
                              id="time-picker"
                              label="Time picker"
                              value={
                                values.time === new Date()
                                  ? new Date()
                                  : values.time
                              }
                              onChange={(e) => {
                                setValues({ ...values, time: e });
                              }}
                              KeyboardButtonProps={{
                                "aria-label": "change time",
                              }}
                              style={{
                                marginLeft: "6%",
                                marginBottom: "6%",
                                alignSelf: "center",
                                width: "100%",
                              }}
                            />
                          </MuiPickersUtilsProvider>
                        </div>
                      );
                    case 2:
                      return (
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <Typography
                            style={{
                              fontSize: "20px",
                              fontWeight: "bold",
                              fontFamily: "Roboto",
                              margin: "3%",
                            }}
                          >
                            Paciente
                          </Typography>
                          <TextField
                            label="Nombre del paciente"
                            helperText={
                              /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(
                                values.paciente
                              )
                                ? "Ingresa nombre del paciente"
                                : "No puede contener caracteres especiales"
                            }
                            error={
                              /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(
                                values.paciente
                              )
                                ? false
                                : true
                            }
                            onChange={handleChange("paciente")}
                            style={{
                              marginLeft: "6%",
                              marginBottom: "6%",
                              alignSelf: "center",
                              width: "100%",
                            }}
                            value={
                              values.paciente === "" ? "" : values.paciente
                            }
                          />
                          <TextField
                            label="Teléfono del paciente"
                            helperText={
                              /^(\+?)[1-9]{1}[0-9]{5,11}$/.test(values.telefono)
                                ? "Ingresa teléfono del paciente"
                                : "Ingresa un teléfono valido"
                            }
                            onChange={handleChange("telefono")}
                            error={
                              /^(\+?)[1-9]{1}[0-9]{5,11}$/.test(values.telefono)
                                ? false
                                : true
                            }
                            style={{
                              marginLeft: "6%",
                              marginBottom: "6%",
                              alignSelf: "center",
                              width: "100%",
                            }}
                            value={
                              values.telefono === "" ? "" : values.telefono
                            }
                          />
                        </div>
                      );
                    case 3:
                      return (
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <Typography
                            style={{
                              fontSize: "20px",
                              fontWeight: "bold",
                              fontFamily: "Roboto",
                              margin: "3%",
                            }}
                          >
                            Tipo de consulta
                          </Typography>
                          <FormControl
                            className={classes.formControl}
                            style={{ marginBottom: "2%" }}
                          >
                            <InputLabel id="demo-simple-select-filled-label">
                              Tipo de Consulta
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-filled-label"
                              id="demo-simple-select-filled"
                              error={values.tipoconsulta === ""}
                              value={
                                values.tipoconsulta === ""
                                  ? ""
                                  : values.tipoconsulta
                              }
                              onChange={handleChange("tipoconsulta")}
                            >
                              <MenuItem value={""}>
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value={"Primera vez"}>
                                Primera vez
                              </MenuItem>
                              <MenuItem value={"Fisioterapia"}>
                                Fisioterapia
                              </MenuItem>
                              <MenuItem value={"Hidroterapia"}>
                                Hidroterapia
                              </MenuItem>
                            </Select>
                            <FormHelperText id="standard-weight-helper-text">
                              {values.tipoconsulta === ""
                                ? "Seleccione el tipo de consulta"
                                : "Debe seleccionar uno"}
                            </FormHelperText>
                          </FormControl>
                        </div>
                      );
                    default:
                      return "Unknown stepIndex";
                  }
                })()}
                <div style={{ marginTop: "2%" }}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton}
                    style={{ color: "gray" }}
                  >
                    Atras
                  </Button>
                  <Button
                    variant="contained"
                    onClick={
                      activeStep === steps.length - 1 ? handleClose : handleNext
                    }
                    style={{ backgroundColor: "#FFB700", color: "white" }}
                  >
                    {activeStep === steps.length - 1 ? "Agendar" : "Siguiente"}
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <Alert
          severity="error"
          onClick={() => {
            setError(false);
          }}
          className={error === true ? classes.alert : classes.alertclose}
        >
          <AlertTitle>Error</AlertTitle>
          No se creo de manera adecuada la cita vuelva a intentarlo
        </Alert>
        <Alert
          severity="success"
          onClick={() => {
            setSuccess(false);
          }}
          className={success === true ? classes.alert : classes.alertclose}
        >
          <AlertTitle>Success</AlertTitle>
          Se ha agendado la cita de manera exitosa
        </Alert>
      </div>
    </Content>
  );
}
