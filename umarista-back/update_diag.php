<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include "conexion.php";

$con=connect();

$id=$_POST['id'];
$diag=$_POST['diagnostico'];

$diagnos = json_decode($diag);
$fisio = $diagnos->{'Diagnóstico fisioterapéutico'};
$pronostico = $diagnos->{'Pronostico'};
$objetivos = $diagnos->{'Objetivos'};
$plan = $diagnos->{'Plan fisioterapéutico'};

$q="UPDATE `diagnostico_plan` 
SET 
    diagnostico_fisioterapeutico='".$fisio."',
    pronostico='".$pronostico."',
    objetivos='".$objetivos."',
    plan_fisioterapeutico='".$plan."'
WHERE `id_paciente`=".$id." LIMIT 1";

if($con->query($q)===TRUE){
    $response["status"] = "1";
    echo json_encode($response);
}else{
    $response["status"] = "0";
    echo json_encode($response);
}

?>