<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include "conexion.php";
$con=connect();
$id=$_POST['id'];
$fecha=$_POST['fecha'];
$eva=$_POST['eva'];
$pruebas=$_POST['pruebas_func'];
$act=$_POST['act_func'];
$fuerza=$_POST['fuerza'];
$rom=$_POST['rom'];

$q="INSERT INTO `nota_valoracion` (
    `id_paciente`,
    `fecha`,
    `eva`,
    `pruebas_funcionales`,
    `actividad_funcional`,
    `fuerza`,
    `rom`) 
VALUES(
    '".$id."',
    '".$fecha."',
    '".$eva."',
    '".$pruebas."',
    '".$act."',
    '".$fuerza."',
    '".$rom."'
)";

if($con->query($q)===TRUE){
    $response["status"] = "1";
    echo json_encode($response);
}else{
    $response["status"] = "0";
    echo json_encode($response);
}

?>