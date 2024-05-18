<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include "conexion.php";

$con=connect();

$id=$_POST['id'];
$post=$_POST['postura'];

$postura = json_decode($post);
$anterior = $postura->{'Anterior'};
$lateral = $postura->{'Lateral'};
$posterior = $postura->{'Posterior'};

$q="UPDATE `postura` 
SET 
    anterior='".$anterior."',
    lateral='".$lateral."',
    posterior='".$posterior."'
WHERE `id_paciente`=".$id." LIMIT 1";

if($con->query($q)===TRUE){
    $response["status"] = "1";
    echo json_encode($response);
}else{
    $response["status"] = "0";
    echo json_encode($response);
}

?>