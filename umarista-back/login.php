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
$user=$_POST['username']; //Variable que contiene el username obtenido por el metodo POST.
$pass=$_POST['password']; //Variable que contiene el password obtenido por el metodo POST.

//printf($user);
//printf($pass);

$q="SELECT * FROM usuarios WHERE username='".$user."' AND password=MD5('".$pass."')"; //Variable que contiene el Query y compara si son iguales el usuario y password con las variables $user y $pass.
/*
$result=mysqli_query($con, $q); //Variable que obtiene el resultado del Query.
$result=mysqli_fetch_row($result); //Variable que obtiene la fila de los resultados.
*/
/*
*	Comparación que si es verdadera inicia sesión y lo regresa a la página Home.
*	Si es falso entonces arroja un error en el navegador y lo regresa a la página Index.
*//*
if(sizeof($result)==0){
	$response["status"] = "0";
}else{
	$response["status"] = "1";
}

echo json_encode($response);
*/

$result=mysqli_query($con, $q); //Variable que obtiene el resultado del Query.

$outp = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($outp);

?>
