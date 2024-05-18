<?php

function connect()
{
    $con=mysqli_connect("localhost:3306","root","","umarista") or die("No se pudo conectar: ".mysql_error());

    if(mysqli_connect_errno()){
        printf("Falló la conexión: %s \n",mysqli_connect_errno());
    }
    $con->set_charset("utf8");
    return $con;
}
?>