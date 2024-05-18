<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include "conexion.php";

$con=connect();

$id=$_POST['id'];
$anp=$_POST['ant_no_pat'];

$pat = json_decode($anp);
$enfermedades_inf = json_encode($pat->{'Enfermedades Infecciosas de la infancia'}, JSON_UNESCAPED_UNICODE);
$intervenciones_quir = json_encode($pat->{'Intervenciones Quirúrgicas'}, JSON_UNESCAPED_UNICODE);
$traumatismos = json_encode($pat->{'Traumatismos(Esguinces.fracturas,luxaciones,desgarres)'}, JSON_UNESCAPED_UNICODE);
$infiltraciones = json_encode($pat->{'Infiltraciones'}, JSON_UNESCAPED_UNICODE);
$hospitalizaciones = json_encode($pat->{'Hospitalizaciones'}, JSON_UNESCAPED_UNICODE);
$perdida_con = json_encode($pat->{'Perdida del Conocimiento'}, JSON_UNESCAPED_UNICODE);
$intol_medicamentos = json_encode($pat->{'Intolerancia a medicamentos'}, JSON_UNESCAPED_UNICODE);
$transfusiones = json_encode($pat->{'Transfuciones'}, JSON_UNESCAPED_UNICODE);
$medicamentos = json_encode($pat->{'Medicamentos'}, JSON_UNESCAPED_UNICODE);
$ets = json_encode($pat->{'ETS'}, JSON_UNESCAPED_UNICODE);

$q="UPDATE `antecedentes_patologicos` 
SET 
    enfermedad_infec='".$enfermedades_inf."',
    intervenciones_quir='".$intervenciones_quir."',
    traumatismos='".$traumatismos."',
    infiltraciones='".$infiltraciones."',
    hospitalizaciones='".$hospitalizaciones."',
    perdida_conocimiento='".$perdida_con."',
    intolerancia_medicamientos='".$intol_medicamentos."',
    transfusiones='".$transfusiones."',
    medicamentos='".$medicamentos."',
    ets='".$ets."'
WHERE `id_paciente`=".$id." LIMIT 1";

if($con->query($q)===TRUE){
    $response["status"] = "1";
    echo json_encode($response);
}else{
    $response["status"] = "0";
    echo json_encode($response);
}

?>