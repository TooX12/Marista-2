<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include "conexion.php";

$con=connect();

$id=$_POST['id'];
$ago=$_POST['ant_gin_obs'];

$antgin = json_decode($ago);
$menarca = json_encode($antgin->{'Menarca'});
$ritmo_mens = json_encode($antgin->{'Ritmo menstrual'});
$partos = json_encode($antgin->{'Partos'});
$abortos = json_encode($antgin->{'Abortos'});
$cesareas = json_encode($antgin->{'Cesáreas'});
$metodos_ant = json_encode($antgin->{'Métodos Anticonceptivos'});

$q="UPDATE `antecedentes_gineco` 
SET 
    menarca='".$menarca."',
    ritmo_menstrual='".$ritmo_mens."',
    partos='".$partos."',
    abortos='".$abortos."',
    cesareas='".$cesareas."',
    metodo_anticonceptivo='".$metodos_ant."'
WHERE `id_paciente`=".$id." LIMIT 1";

if($con->query($q)===TRUE){
    $response["status"] = "1";
    echo json_encode($response);
}else{
    $response["status"] = "0";
    echo json_encode($response);
}

?>