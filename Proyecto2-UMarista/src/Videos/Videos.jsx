import React from "react";
import Content from "../Components/Content";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Image from "../Images/CARRUSEL_H_FISIOTERAPIA_3.jpg";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogActions } from "@material-ui/core";
import { useEffect } from "react";

const cards = [1, 2, 3, 4, 5, 6];
const urlBack = "http://localhost:4433/umarista-back/";

const useStyles = makeStyles(theme => ({
  Card: {
    display: "flex",
    flexDirection: "column",
    width: "28%",
    height: "fit-content",
    marginTop: "3vh"
  },
  Botones: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: "#003764"
  },
  Fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    backgroundColor: "#FFB700",
    "&:hover": {
      background: "#FFB700"
    }
  },
  formulario: {
    display: "flex",
    flexDirection: "column",
    width: "550px"
  },
  Boton: {
    backgroundColor: "#FFC107",
    color: "white",
    marginRight: "2%",
    "&:hover": {
      background: "#FFB700"
    }
  }
}));

export default function Statistics() {
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(urlBack + "videos_cargar.php", {
        method: "GET"
      })
        .then(response => response.json())
        .then(posts => {
          setDatos(Object.values(posts));
        });
    }
    fetchData();
  }, []);
  /**
   * constante para llamar los estilos
   */
  const classes = useStyles();
  const [datos, setDatos] = React.useState([]);
  /**
   * States y handles para el control de apertura y cierre de los dialogs
   */
  const [open, setOpen] = React.useState(false);
  const handleOpen = e => {
    e.preventDefault();
    setModificar(false);
    dialogNuevo();
    setOpen(true);
  };

  function dialogNuevo() {
    setModificar(false);
    data.link = "";
    data.titulo = "";
    data.region_padecimiento = "";
    data.area_especifica = "";
    data.observaciones = "";
  }

  function dialogItem(item) {
    setModificar(true);
    setId_item(item.id_videos);
    data.link = item.link;
    data.titulo = item.titulo;
    data.region_padecimiento = item.r_padecimiento;
    data.area_especifica = item.a_especifica;
    data.observaciones = item.observaciones;
    setOpen(true);
  }

  /*
  const handleClose = e => {
    e.preventDefault();
    setOpen(false);
    console.log(data);
  };
  */
  const handleSubmit = async e => {
    e.preventDefault();
    console.log(modificar);
    if (modificar === false) {
      const formData = new FormData(e.target);
      formData.append("link", data["link"]);
      formData.append("titulo", data["titulo"]);
      formData.append("r_padecimiento", data["region_padecimiento"]);
      formData.append("a_especifica", data["area_especifica"]);
      formData.append("observaciones", data["observaciones"]);
      const response = await fetch(urlBack + "videos_agregar.php", {
        method: "POST",
        body: formData
      });

      const res = await response.json();

      if (res["status"] === "1") {
        setOpen(false);
        console.log("Se agregó con exito");
        window.location.reload();
      } else {
        console.log("ERROR");
      }
    } else {
      const formData = new FormData(e.target);
      formData.append("link", data["link"]);
      formData.append("titulo", data["titulo"]);
      formData.append("r_padecimiento", data["region_padecimiento"]);
      formData.append("a_especifica", data["area_especifica"]);
      formData.append("observaciones", data["observaciones"]);
      formData.append("id_video", id_item);
      const response = await fetch(urlBack + "videos_editar.php", {
        method: "POST",
        body: formData
      });
      const res = await response.json();

      if (res["status"] === "1") {
        setOpen(false);
        console.log("Se agregó con exito");
        window.location.reload();
      } else {
        console.log("ERROR");
      }
    }
  };

  /**
   * State donde se guarda la data del video
   */
  const [id_item, setId_item] = React.useState();
  const [modificar, setModificar] = React.useState(false);
  const [data, setData] = React.useState({
    link: "",
    titulo: "",
    region_padecimiento: "",
    area_especifica: "",
    observaciones: ""
  });
  /**
   *
   * @param {los valores se guardan enviandolos como props} prop
   */
  const handleChange = prop => event => {
    setData({ ...data, [prop]: event.target.value });
  };
  return (
    <Content nombre="Videos" select="videos">
      <div
        style={{
          width: "100%",
          backgroundColor: "#F4F4F4",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          flexWrap: "wrap"
        }}
      >
        {/**
         * Aqui se insertan las cards
         */}
        {datos.map((item, index) => {
          return (
            <Card className={classes.Card}>
              <img src={item.link_img} alt="" width="100%" />
              <CardContent>
                <Typography
                  style={{
                    fontWeight: "bold",
                    fontSize: "larger",
                    fontFamily: "Roboto"
                  }}
                >
                  {item.titulo}
                </Typography>
                <Typography
                  color={"textSecondary"}
                  style={{
                    fontFamily: "Roboto",
                    marginTop: "1vh"
                  }}
                >
                  Región del padecimiento: {item.r_padecimiento}
                </Typography>
                <Typography
                  color={"textSecondary"}
                  style={{
                    fontFamily: "Roboto"
                  }}
                >
                  Área específica: {item.a_especifica}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  className={classes.Botones}
                  onClick={() => dialogItem(item)}
                >
                  EDITAR
                </Button>
                <Button
                  className={classes.Botones}
                  onClick={() => window.open(item.link, "_blank")}
                >
                  IR AL VIDEO
                </Button>
              </CardActions>
            </Card>
          );
        })}
        {/**
         * Fin del bloque de las cards
         * se coloca un float action button
         */}
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleOpen}
          className={classes.Fab}
        >
          <AddIcon />
        </Fab>
        {/**
         * inicio de los dialogs
         *
         */}
        <Dialog
          open={open}
          style={{ display: "flex", flexDirection: "column" }}
          maxWidth={false}
        >
          <DialogTitle style={{ textAlign: "center" }}>
            Agregar video
            <Typography>Agrega los datos que se te piden</Typography>
          </DialogTitle>
          <DialogContent>
            <form
              id="formulario"
              className={classes.formulario}
              onSubmit={handleSubmit}
            >
              <TextField
                id="filled-helperText"
                label="Link del video"
                required
                helperText={
                  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(
                    data.link
                  )
                    ? "Ingresa el link del video"
                    : "Ingresa un link valido"
                }
                variant="filled"
                value={data.link === "" ? "" : data.link}
                error={
                  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(
                    data.link
                  )
                    ? false
                    : true
                }
                onChange={handleChange("link")}
              />
              <TextField
                id="filled-helperText"
                label="Titulo"
                inputProps={{ maxLength: 80 }}
                required
                error={
                  /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(
                    data.titulo
                  )
                    ? false
                    : true
                }
                helperText={
                  /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(
                    data.titulo
                  )
                    ? "Ingresa el titulo del video"
                    : "El título no puede contener caracteres especiales"
                }
                variant="filled"
                value={data.titulo}
                onChange={handleChange("titulo")}
              />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <TextField
                  id="filled-helperText"
                  label="Región del Padecimiento"
                  inputProps={{ maxLength: 60 }}
                  required
                  helperText={
                    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(
                      data.region_padecimiento
                    )
                      ? "Ingrese región del padecimiento"
                      : "No puede contener caracteres especiales"
                  }
                  variant="filled"
                  error={
                    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(
                      data.region_padecimiento
                    )
                      ? false
                      : true
                  }
                  value={data.region_padecimiento}
                  onChange={handleChange("region_padecimiento")}
                  style={{ width: "47%" }}
                />

                <TextField
                  id="filled-helperText"
                  inputProps={{ maxLength: 60 }}
                  required
                  label="Área específica"
                  helperText={
                    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(
                      data.area_especifica
                    )
                      ? "Ingrese el área específica"
                      : "No puede contener caracteres especiales"
                  }
                  variant="filled"
                  error={
                    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(
                      data.area_especifica
                    )
                      ? false
                      : true
                  }
                  value={data.area_especifica}
                  onChange={handleChange("area_especifica")}
                  style={{ width: "47%" }}
                />
              </div>
              <TextField
                id="filled-multiline-static"
                label="Observaciones"
                error={
                  /^[a-zA-Z0-9 ][ \w].+[a-zA-Z0-9 ]+$/.test(data.observaciones)
                    ? false
                    : true
                }
                multiline
                helperText={
                  /^[a-zA-Z0-9 ][ \w].+[a-zA-Z0-9 ]+$/.test(data.observaciones)
                    ? "Indique observaciones"
                    : "No puede iniciar ni terminar con caracteres especiales"
                }
                rows="6"
                value={data.observaciones}
                onChange={handleChange("observaciones")}
                variant="filled"
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              className={classes.Botones}
              onClick={e => {
                setOpen(false);
              }}
            >
              REGRESAR
            </Button>
            <Button
              type="submit"
              form="formulario"
              className={classes.Boton}
              disabled={
                (/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(
                  data.link
                )
                  ? false
                  : true) ||
                (/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(
                  data.titulo
                )
                  ? false
                  : true) ||
                (/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(
                  data.region_padecimiento
                )
                  ? false
                  : true) ||
                (/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(
                  data.area_especifica
                )
                  ? false
                  : true) ||
                (/^[a-zA-Z0-9 ][ \w].+[a-zA-Z0-9 ]+$/.test(data.observaciones)
                  ? false
                  : true)
              }
            >
              {modificar === true ? "MODIFICAR" : "AGREGAR"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Content>
  );
}
