<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include "conexion.php";
$con=connect();
$id=$_POST['id'];
$fecha=$_POST['fecha'];
$evolucion=$_POST['evolucion'];

$q="INSERT INTO `notas_evolucion` (
    `id_paciente`,
    `fecha`,
    `nota`)
VALUES(
    '".$id."',
    '".$fecha."',
    '".$evolucion."'
)";

if($con->query($q)===TRUE){
    $response["status"] = "1";
    echo json_encode($response);
}else{
    $response["status"] = "0";
    echo json_encode($response);
}

?>