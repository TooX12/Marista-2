<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include "conexion.php";
$con=connect();
$fecha=$_POST['fecha'];
$hora=$_POST['hora'];
$paciente=$_POST['nombre_paciente'];
$telefono=$_POST['telefono'];
$padecimiento=$_POST['padecimiento'];
$id=$_POST['id_citas'];

$q="UPDATE `citas` SET 
    `fecha` = '".$fecha."',
    `hora` = '".$hora."',
    `nombre_paciente` = '".$paciente."',
    `telefono` = '".$telefono."',
    `padecimiento`= '".$padecimiento."'
WHERE
    `id_citas` = '".$id."'";

if($con->query($q)===TRUE){
    $response["status"] = "1";
    echo json_encode($response);
}else{
    $response["status"] = "0";
    echo json_encode($response);
}
?>