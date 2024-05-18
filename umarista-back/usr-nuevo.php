<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include "conexion.php";

$con=connect();

$info[0]=$_POST['username'];
$info[1]=$_POST['nombre'];
$info[2]=$_POST['ap_p'];
$info[3]=$_POST['ap_m'];
$info[4]=$_POST['sexo'];
$info[5]=$_POST['rango'];
$info[6]=$_POST['password'];

$q="INSERT INTO `usuarios` (`username`,`nombre`,`ap_p`,`ap_m`,`sexo`,`rango`,`password`) VALUES('".$info[0]."','".$info[1]."','".$info[2]."','".$info[3]."','".$info[4]."','".$info[5]."', MD5('".$info[6]."')) ";

if($con->query($q)===TRUE){
    $response["status"] = "1";
    echo json_encode($response);
}else{
    $response["status"] = "0";
    echo json_encode($response);
}

?>