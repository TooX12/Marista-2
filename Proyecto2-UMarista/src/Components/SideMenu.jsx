import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import DateRangeIcon from "@material-ui/icons/DateRange";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import PersonIcon from "@material-ui/icons/Person";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
    height: "100%",
    boxShadow: "2px 0 5px -2px #888;",
    overflow: "hidden",
    zIndex: "1",
  },
  menuHide: {
    transition: "0.7s",
    width: "0px",
  },
  fullList: {
    width: "auto",
  },
}));

export default function SideMenu(props) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div
      className={`${classes.list} ${props.visible ? "" : classes.menuHide}`}
      role="presentation"
    >
      <Typography
        style={{
          fontSize: "larger",
          fontWeight: "bold",
          marginTop: "1vh",
          marginLeft: "6%",
        }}
      >
        {localStorage.getItem("nombre_usuario")}
      </Typography>
      <Typography
        color="textSecondary"
        style={{
          fontSize: "medium",
          fontWeight: "400px",
          marginTop: ".5vh",
          marginLeft: "6%",
        }}
      >
        {localStorage.getItem("tipo_usr")}
      </Typography>
      <Divider />
      <List style={{ fontWeight: "bold" }}>
        {localStorage.getItem("tipo_usr") === "Admin" ||
        "Medico" ||
        "Practicante" ||
        "Pasante" ||
        "Fisio" ? (
          <ListItem
            button
            key="Citas"
            style={
              props.select === "citas"
                ? { backgroundColor: "#61B4E4", color: "white" }
                : {}
            }
            onClick={(e) => history.push("/Dates")}
          >
            <ListItemIcon>
              <DateRangeIcon
                style={props.select === "citas" ? { color: "white" } : {}}
              />
            </ListItemIcon>
            <ListItemText primary="Citas" />
          </ListItem>
        ) : (
          ""
        )}

        {localStorage.getItem("tipo_usr") === "Admin" ||
        "Medico" ||
        "Practicante" ||
        "Pasante" ||
        "Fisio" ? (
          <ListItem
            button
            key="Pacientes"
            style={
              props.select === "pacientes"
                ? { backgroundColor: "#61B4E4", color: "white" }
                : {}
            }
            onClick={(e) => history.push("/Patients")}
          >
            <ListItemIcon>
              <PeopleAltIcon
                style={props.select === "pacientes" ? { color: "white" } : {}}
              />
            </ListItemIcon>
            <ListItemText primary="Pacientes" />
          </ListItem>
        ) : (
          ""
        )}

        {localStorage.getItem("tipo_usr") === "Admin" ? (
          <ListItem
            button
            key="Usuarios"
            style={
              props.select === "usuarios"
                ? { backgroundColor: "#61B4E4", color: "white" }
                : {}
            }
            onClick={(e) => history.push("/Users")}
          >
            <ListItemIcon>
              <PersonIcon
                style={props.select === "usuarios" ? { color: "white" } : {}}
              />
            </ListItemIcon>
            <ListItemText primary="Usuarios" />
          </ListItem>
        ) : (
          ""
        )}

        {localStorage.getItem("tipo_usr") === "Admin" || "Medico" || "Fisio" ? (
          <ListItem
            button
            key="Estadísticas"
            style={
              props.select === "estadisticas"
                ? { backgroundColor: "#61B4E4", color: "white" }
                : {}
            }
            onClick={(e) => history.push("/Stats")}
          >
            <ListItemIcon>
              <ShowChartIcon
                style={
                  props.select === "estadisticas" ? { color: "white" } : {}
                }
              />
            </ListItemIcon>
            <ListItemText primary="Estadisticas" />
          </ListItem>
        ) : (
          ""
        )}

        {localStorage.getItem("tipo_usr") === "Admin" || "Medico" || "Fisio" ? (
          <ListItem
            button
            key="Videos"
            style={
              props.select === "videos"
                ? { backgroundColor: "#61B4E4", color: "white" }
                : {}
            }
            onClick={(e) => history.push("/Videos")}
          >
            <ListItemIcon>
              <YouTubeIcon
                style={props.select === "videos" ? { color: "white" } : {}}
              />
            </ListItemIcon>
            <ListItemText primary="Videos" />
          </ListItem>
        ) : (
          ""
        )}

        <ListItem
          button
          key="Cerrar Sesión"
          onClick={(e) => {
            localStorage.removeItem("nombre_usuario");
            localStorage.removeItem("tipo_usr");
            history.push("/");
          }}
        >
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Cerrar Sesión" />
        </ListItem>
      </List>
    </div>
  );
}
