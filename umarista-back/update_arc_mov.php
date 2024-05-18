<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include "conexion.php";

$con=connect();

$id=$_POST['id'];
$arcmov=$_POST['arc_mov'];

$arcos = json_decode($arcmov);
$columna_cervical = json_encode($arcos->{'Columna cervical'}, JSON_UNESCAPED_UNICODE);
$columna_dorsal = json_encode($arcos->{'Columna dorsal'}, JSON_UNESCAPED_UNICODE);
$columna_lumbar = json_encode($arcos->{'Columna lumbar'}, JSON_UNESCAPED_UNICODE);
$hombro = json_encode($arcos->{'Hombro'}, JSON_UNESCAPED_UNICODE);
$codo = json_encode($arcos->{'Codo'}, JSON_UNESCAPED_UNICODE);
$muneca = json_encode($arcos->{'Muñeca'}, JSON_UNESCAPED_UNICODE);
$mano = json_encode($arcos->{'Mano'}, JSON_UNESCAPED_UNICODE);
$cadera = json_encode($arcos->{'Cadera'}, JSON_UNESCAPED_UNICODE);
$rodilla = json_encode($arcos->{'Rodilla'}, JSON_UNESCAPED_UNICODE);
$tobillo = json_encode($arcos->{'Tobillo'}, JSON_UNESCAPED_UNICODE);
$pie = json_encode($arcos->{'Pie'}, JSON_UNESCAPED_UNICODE);

$q="UPDATE `arcos_movimiento` 
SET 
    columna_cervical='".$columna_cervical."',
    columna_dorsal='".$columna_dorsal."',
    columna_lumbar='".$columna_lumbar."',
    hombro='".$hombro."',
    codo='".$codo."',
    muneca='".$muneca."',
    mano='".$mano."',
    cadera='".$cadera."',
    rodilla='".$rodilla."',
    tobillo='".$tobillo."',
    pie='".$pie."'
WHERE `id_paciente`=".$id." LIMIT 1";

if($con->query($q)===TRUE){
    $response["status"] = "1";
    echo json_encode($response);
}else{
    $response["status"] = "0";
    echo json_encode($response);
}

?>