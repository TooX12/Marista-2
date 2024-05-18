<?php
/*
*	Código que realiza realiza el login.
*/
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include "conexion.php"; //Se importa todo el código contenido en conexion.php.

$con=connect(); //Variable que contiene el metodo de conexión a la base de datos.
$response = array();
$id=$_POST['id'];

$q="DELETE FROM ficha_identificacion WHERE id_f_identificacion=".$id;//Variable que contiene el Query y compara si son iguales el usuario y password con las variables $user y $pass.

if($con->query($q)===TRUE){
    $response["status"] = "1";
    echo json_encode($response);
}else{
    $response["status"] = "0";
    echo json_encode($response);
}
?>
