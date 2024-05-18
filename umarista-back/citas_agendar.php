<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include "conexion.php";
$con=connect();
$info[0]=$_POST['fecha'];
$info[1]=$_POST['hora'];
$info[2]=$_POST['nombre_paciente'];
$info[3]=$_POST['telefono'];
$info[4]=$_POST['padecimiento'];

$q="INSERT INTO `citas` (`fecha`,`hora`,`nombre_paciente`,`telefono`,`padecimiento`) VALUES('".$info[0]."','".$info[1]."','".$info[2]."','".$info[3]."','".$info[4]."')";

if($con->query($q)===TRUE){
    $response["status"] = "1";
    echo json_encode($response);
}else{
    $response["status"] = "0";
    echo json_encode($response);
}

?>