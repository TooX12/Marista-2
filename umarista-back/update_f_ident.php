<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include "conexion.php";

$con=connect();

$id=$_POST['id'];
$ficha=$_POST['ficha_id'];

$obj = json_decode($ficha);

$q="UPDATE `ficha_identificacion` SET nombre='".$obj->{"nombre"}."', ap_p='".$obj->{"apaterno"}."', ap_m='".$obj->{"amaterno"}."', edad='".$obj->{"edad"}."', sexo='".$obj->{"sexo"}."', curp='".$obj->{"curp"}."', nacionalidad='".$obj->{"nacionalidad"}."', ocupacion='".$obj->{"ocupacion"}."', religion='".$obj->{"religion"}."', calle='".$obj->{"calle"}."',colonia='".$obj->{"colonia"}."', num_ext='".$obj->{"numeroExterior"}."', cod_p='".$obj->{"codigopostal"}."', municipio='".$obj->{"municipio"}."', estado='".$obj->{"estado"}."', telefono_pac='".$obj->{"telefono"}."', celular='".$obj->{"celularP"}."', correo='".$obj->{"correo"}."', nom_familiar='".$obj->{"nfamiliar"}."', telefono_fam='".$obj->{"celularF"}."' WHERE id_f_identificacion=".$id." LIMIT 1";

if($con->query($q)===TRUE){
    $response["status"] = "1";
    echo json_encode($response);
}else{
    $response["status"] = "0";
    echo json_encode($response);
}

?>