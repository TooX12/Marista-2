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
$id = $_POST["id"];

$q="SELECT * FROM arcos_movimiento WHERE id_paciente = '".$id."'";//Variable que contiene el Query y compara si son iguales el usuario y password con las variables $user y $pass.

$result=mysqli_query($con, $q); //Variable que obtiene el resultado del Query.

$outp = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($outp);

?>