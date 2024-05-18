import React, { useState } from "react";
import AppBar from "./AppBar";
import SideMenu from "./SideMenuRegister";

export default function Content(props) {
  const [menu, setMenu] = useState(true);
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
      }}
    >
      <AppBar
        handleMenu={(e) => setMenu(menu ? false : true)}
        nombre={props.nombre}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          width: "100%",
          height: "100%",
        }}
      >
        <SideMenu
          select={props.select}
          edit={props.edit}
          id={props.id}
          visible={menu}
        />
        {props.children}
      </div>
    </div>
  );
}
