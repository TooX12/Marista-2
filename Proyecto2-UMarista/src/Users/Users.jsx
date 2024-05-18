import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import clsx from "clsx";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from "@material-ui/icons/Search";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Content from "../Components/Content";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, InputAdornment } from "@material-ui/core";
import { createPortal } from "react-dom";

const urlBack = "http://localhost:4433/umarista-back/";

const columns = [
  {
    id: "Nombre de Usuario",
    label: "Nombre de  Usuario",
    minWidth: 170,
    align: "left",
  },
  { id: "Nombre", label: "Nombre", minWidth: 170, align: "left" },
  {
    id: "Rango",
    label: "Rango",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "Acciones",
    label: "Acciones",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString(),
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "60%",
    alignSelf: "center",
  },
  container: {
    maxHeight: 587,
  },
  title: {
    flexGrow: 1,
  },
  formulario: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
  },
}));

export default function Users() {
  function createData(Nombre_de_Usiario, Nombre, Rango, Acciones) {
    return { Nombre_de_Usiario, Nombre, Rango, Acciones };
  }

  const rows = [
    createData("Admin", "Gustavo García Sánchez", "Admin"),
    createData("Medico", "Adrián García Sánchez", "Medico"),
    createData("admin", "Gustavo García Sánchez", "Medico"),
    createData("admin", "Gustavo García Sánchez", "Pasante"),
    createData("admin", "Gustavo García Sánchez", "Pasante"),
  ];

  useEffect(() => {
    async function fetchData() {
      //const response = await fetch(urlBack+"cargar_usrs.php",{method: 'GET'});
      //const json = await response.json();
      //setData(json);
      const response = await fetch(urlBack + "usrs_cargar.php", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((posts) => {
          setDatos(Object.values(posts));
        });
    }

    fetchData();
  }, []);

  //var modificar = false;
  //var id_item = "";

  function deleteItem(item) {}

  function dialogItem(item) {
    setModificar(true);
    setId_item(item.id_usuarios);
    values.nombre_usuario = item.username;
    values.nombre = item.nombre;
    values.apaterno = item.ap_p;
    values.amaterno = item.ap_m;
    values.sexo = item.sexo;
    values.rango = item.rango;
    setOpen(true);
  }

  function dialogNuevo() {
    setModificar(false);
    values.nombre_usuario = "";
    values.nombre = "";
    values.apaterno = "";
    values.amaterno = "";
    values.sexo = "";
    values.rango = "";
  }

  const classes = useStyles();
  const [values, setValues] = React.useState({
    nombre_usuario: "",
    nombre: "",
    apaterno: "",
    amaterno: "",
    sexo: "",
    password: "",
    rango: "",
    showPassword: false,
  });
  const [id_item, setId_item] = React.useState();
  const [modificar, setModificar] = React.useState();
  const [datos, setDatos] = React.useState([]);
  const [pw1, setPw1] = React.useState();
  const [page, setPage] = React.useState(0);
  const [search, setSearch] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [borrar, setBorrar] = React.useState(false);
  const handleSearch = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleClose = (e) => {
    setOpen(false);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleOpen = () => {
    dialogNuevo();
    setOpen(true);
  };
  const handleClear = (e) => {
    console.log(search);
    setSearch("");
  };
  const handleDelete = () => {
    setBorrar(false);
    deleteItem();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(modificar);
    if (modificar === true) {
      console.log("modificar");
      const formData = new FormData(e.target);
      formData.append("username", values["nombre_usuario"]);
      formData.append("nombre", values["nombre"]);
      formData.append("ap_p", values["apaterno"]);
      formData.append("ap_m", values["amaterno"]);
      formData.append("sexo", values["sexo"]);
      formData.append("rango", values["rango"]);
      formData.append("password", values["password"]);
      formData.append("id_usuario", id_item);
      const response = await fetch(urlBack + "usr_editar.php", {
        method: "POST",
        /*headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },*/
        body: formData,
      });

      const res = await response.json();

      if (res["status"] === "1") {
        setOpen(false);
        console.log("Se modificó con exito");
        window.location.reload();
      } else {
        console.log("ERROR");
      }
    } else {
      //console.log("agregar");
      const formData = new FormData(e.target);
      formData.append("username", values["nombre_usuario"]);
      formData.append("nombre", values["nombre"]);
      formData.append("ap_p", values["apaterno"]);
      formData.append("ap_m", values["amaterno"]);
      formData.append("sexo", values["sexo"]);
      formData.append("rango", values["rango"]);
      formData.append("password", values["password"]);
      const response = await fetch(urlBack + "usr-nuevo.php", {
        method: "POST",
        /*headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },*/
        body: formData,
      });

      const res = await response.json();

      if (res["status"] === "1") {
        setOpen(false);
        console.log("Se creó con exito");
        window.location.reload();
      } else {
        console.log("ERROR");
      }
      console.log(formData.get("username"));
    }
  };

  return (
    <Content nombre="Usuarios" type="Medico" select="usuarios">
      <div
        style={{
          width: "100%",
          backgroundColor: "#F4F4F4",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflowX: "auto",
        }}
      >
        <Paper className={classes.root}>
          <span
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography
              style={{
                fontSize: "25px",
                fontWeight: "bolder",
                fontFamily: "Roboto",
                margin: "3%",
              }}
            >
              Usuarios
            </Typography>
            <TextField
              id="standard-bare"
              margin="normal"
              placeholder="Buscar"
              value={search}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment
                    position="end"
                    style={{ cursor: "pointer" }}
                    onClick={handleClear}
                  >
                    <ClearIcon />
                  </InputAdornment>
                ),
              }}
              style={{
                color: "#e0e0e0",
                alignSelf: "center",
                marginRight: "3%",
                width: "35%",
              }}
            />
          </span>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        fontWeight: "bold",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {datos
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <TableCell>{item.username}</TableCell>
                        <TableCell>
                          {item.nombre + " " + item.ap_p + " " + item.ap_m}
                        </TableCell>
                        <TableCell>{item.rango}</TableCell>
                        <TableCell>
                          <IconButton
                            color="inherit"
                            aria-label="edit"
                            onClick={() => dialogItem(item)}
                            style={{ padding: 0, marginRight: "13%" }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="inherit"
                            aria-label="edit"
                            onClick={() => setBorrar(true)}
                            style={{ padding: 0, marginRight: "13%" }}
                          >
                            <DeleteForeverIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 5, { label: "All", value: -1 }]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleOpen}
          style={{
            alignSelf: "flex-end",
            backgroundColor: "#FFB700",
            marginRight: "1%",
            marginBottom: "1%",
            position: "absolute",
            bottom: 0,
          }}
        >
          <AddIcon />
        </Fab>
        {/**
         * Dialog de confirmacion para borrar
         */}
        <Dialog open={borrar}>
          <DialogContent>
            <Typography style={{ fontSize: "larger", textAlign: "center" }}>
              ¿Está seguro que quiere borrar este usuario?
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: "70%",
              }}
            >
              <Button
                onClick={handleDelete}
                style={{
                  backgroundColor: "#FFC107",
                  color: "white",
                  marginTop: "1vh",
                  alignSelf: "center",
                }}
              >
                Si
              </Button>
              <Button
                onClick={() => {
                  setBorrar(false);
                }}
                style={{ color: "black" }}
              >
                No
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        {/*
         * 
         
         
         Dialog de registro
         
         
         
         */}
        <Dialog open={open}>
          <DialogContent>
            <DialogTitle>
              <Typography
                style={{
                  fontWeight: "bold",
                  fontSize: "larger",
                  textAlign: "center",
                }}
              >
                Registro
              </Typography>
            </DialogTitle>
            <Typography
              style={{
                fontSize: "large",
                textAlign: "center",
                marginBottom: "4vh",
              }}
            >
              Complete el formulario para registrar
            </Typography>
            <form
              className={classes.formulario}
              onSubmit={handleSubmit}
              id="formulario"
            >
              <div>
                <TextField
                  label="Nombre de Usuario"
                  inputProps={{ maxLength: 40 }}
                  helperText={
                    values.nombre_usuario === ""
                      ? "Campo vacío"
                      : "Ingresa Nombre de Usuario"
                  }
                  variant="filled"
                  required
                  style={{
                    width: "100%",
                    alignSelf: "center",
                    marginBottom: "2%",
                  }}
                  error={values.nombre_usuario === ""}
                  onChange={handleChange("nombre_usuario")}
                  value={
                    values.nombre_usuario === "" ? "" : values.nombre_usuario
                  }
                />
                <TextField
                  label="Nombre(s)"
                  inputProps={{ maxLength: 40 }}
                  required
                  helperText={
                    /^(?=.{3,15}$)[A-ZÁÉÍÓÚ][a-zñáéíóú]+(?: [A-ZÁÉÍÓÚ][a-zñáéíóú]+)?$/.test(
                      values.nombre
                    )
                      ? "Ingrese Nombre(s)"
                      : "Ingrese un nombre valido"
                  }
                  variant="filled"
                  style={{
                    width: "100%",
                    alignSelf: "center",
                    marginBottom: "2%",
                  }}
                  error={
                    /^(?=.{3,15}$)[A-ZÁÉÍÓÚ][a-zñáéíóú]+(?: [A-ZÁÉÍÓÚ][a-zñáéíóú]+)?$/.test(
                      values.nombre
                    )
                      ? false
                      : true
                  }
                  onChange={handleChange("nombre")}
                  value={values.nombre === "" ? "" : values.nombre}
                />
              </div>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    width: "50%",
                    display: "flex",
                    flexDirection: "column",
                    marginRight: "2%",
                  }}
                >
                  <TextField
                    label="Apellido paterno"
                    inputProps={{ maxLength: 40 }}
                    helperText={
                      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(
                        values.apaterno
                      )
                        ? "Ingresa Apellido paterno"
                        : "Ingresa un apellido valido"
                    }
                    variant="filled"
                    required
                    error={
                      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(
                        values.apaterno
                      )
                        ? false
                        : true
                    }
                    style={{
                      width: "100%",
                      alignSelf: "center",
                      marginBottom: "2%",
                    }}
                    onChange={handleChange("apaterno")}
                    value={values.apaterno === "" ? "" : values.apaterno}
                  />
                  <FormControl
                    variant="filled"
                    className={classes.formControl}
                    style={{ marginBottom: "2%" }}
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
                  <FormControl
                    className={clsx(classes.margin, classes.textField)}
                    variant="filled"
                  >
                    <InputLabel
                      htmlFor="filled-adornment-password"
                      error={
                        /^(?=.{5,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/.test(
                          pw1
                        )
                          ? false
                          : true
                      }
                    >
                      Password
                    </InputLabel>
                    <FilledInput
                      required
                      error={
                        /^(?=.{5,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/.test(
                          pw1
                        )
                          ? false
                          : true
                      }
                      type={values.showPassword ? "text" : "password"}
                      onChange={(e) => setPw1(e.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <FormHelperText
                      id="standard-weight-helper-text"
                      error={
                        /^(?=.{5,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/.test(
                          pw1
                        )
                          ? false
                          : true
                      }
                    >
                      {/^(?=.{5,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/.test(
                        pw1
                      )
                        ? "Ingresa la contraseña"
                        : "Debe contener al menos 1 mayúscula, 1 minúscula, 1 dígito, 1 carácter especial y tener una longitud de al menos 5"}
                    </FormHelperText>
                  </FormControl>
                </div>
                <div
                  style={{
                    width: "50%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TextField
                    label="Apellido materno"
                    inputProps={{ maxLength: 40 }}
                    helperText={
                      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{0,40}$/.test(
                        values.amaterno
                      )
                        ? "Ingresa Apellido materno"
                        : "Ingrese un apellido valido"
                    }
                    variant="filled"
                    style={{
                      width: "100%",
                      alignSelf: "center",
                      marginBottom: "2%",
                    }}
                    error={
                      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{0,40}$/.test(
                        values.amaterno
                      )
                        ? false
                        : true
                    }
                    onChange={handleChange("amaterno")}
                    value={values.amaterno === "" ? "" : values.amaterno}
                  />
                  <FormControl
                    variant="filled"
                    className={classes.formControl}
                    style={{ marginBottom: "2%" }}
                  >
                    <InputLabel
                      id="demo-simple-select-filled-label"
                      error={values.rango === ""}
                    >
                      Rango
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={values.rango === "" ? "" : values.rango}
                      required
                      error={values.rango === ""}
                      onChange={handleChange("rango")}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"Medico"}>Médico</MenuItem>
                      <MenuItem value={"Fisio"}>Fisioterapeuta</MenuItem>
                      <MenuItem value={"Pasante"}>Pasante</MenuItem>
                      <MenuItem value={"Practicante"}>Paracticante</MenuItem>
                    </Select>
                    <FormHelperText
                      id="standard-weight-helper-text"
                      error={values.rango === ""}
                    >
                      {values.rango === ""
                        ? "Campo requerido seleccione una de las opciones"
                        : "Seleccione Rango"}
                    </FormHelperText>
                  </FormControl>
                  <FormControl
                    className={clsx(classes.margin, classes.textField)}
                    variant="filled"
                  >
                    <InputLabel
                      htmlFor="filled-adornment-password"
                      error={values.password !== pw1}
                    >
                      Password
                    </InputLabel>
                    <FilledInput
                      type={values.showPassword ? "text" : "password"}
                      onChange={(e) => {
                        if (e.target.value === pw1) {
                          setValues({ ...values, password: e.target.value });
                        } else {
                          console.log("No coincide");
                        }
                      }}
                      error={values.password !== pw1}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <FormHelperText
                      id="standard-weight-helper-text"
                      error={values.password !== pw1}
                    >
                      {values.password === ""
                        ? "Contraseña diferente"
                        : "Comprueba la contraseña"}
                    </FormHelperText>
                  </FormControl>
                </div>
              </div>
            </form>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                onClick={handleClose}
                style={{ color: "#0071CE", alignSelf: "flex-end" }}
              >
                Regrasar
              </Button>
              <Button
                variant="contained"
                form="formulario"
                type="submit"
                style={{
                  backgroundColor: "#FFC107",
                  color: "white",
                  marginTop: "1vh",
                  alignSelf: "center",
                }}
                disabled={
                  values.nombre_usuario === "" ||
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
                  (/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{0,40}$/.test(
                    values.amaterno
                  )
                    ? false
                    : true) ||
                  values.rango === "" ||
                  values.sexo === "" ||
                  values.password !== pw1 ||
                  (/^(?=.{5,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/.test(
                    pw1
                  )
                    ? false
                    : true)
                }
              >
                Registrar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Content>
  );
}
