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
$tipo_constr = json_encode($pat->{'Tipo de Cosntrucción no favorable'}, JSON_UNESCAPED_UNICODE);
$suelo_no = json_encode($pat->{'Suelo no regular'}, JSON_UNESCAPED_UNICODE);
$escaleras = json_encode($pat->{'Escaleras que dificulten actividades de la vida diaria'}, JSON_UNESCAPED_UNICODE);
$ventilacion = json_encode($pat->{'Ventilación inadecuada'}, JSON_UNESCAPED_UNICODE);
$hacinamiento = json_encode($pat->{'Hacinamiento'}, JSON_UNESCAPED_UNICODE);
$adaptaciones = json_encode($pat->{'Adaptaciones y auxiliares para sus avd'}, JSON_UNESCAPED_UNICODE);
$serv_agua = json_encode($pat->{'Servicios de agua'}, JSON_UNESCAPED_UNICODE);
$serv_luz = json_encode($pat->{'Servicios de luz'}, JSON_UNESCAPED_UNICODE);
$serv_drenaje = json_encode($pat->{'Servicios de drenaje inadecuados'}, JSON_UNESCAPED_UNICODE);
$habitos_pers = json_encode($pat->{'Hábitos personales de baño'}, JSON_UNESCAPED_UNICODE);
$higiene_buc = json_encode($pat->{'Higiene bucal'}, JSON_UNESCAPED_UNICODE);
$defecacion = json_encode($pat->{'Defecación'}, JSON_UNESCAPED_UNICODE);
$tabaquismo = json_encode($pat->{'Tabaquismo'}, JSON_UNESCAPED_UNICODE);
$alcoholismo = json_encode($pat->{'Alcoholismo'}, JSON_UNESCAPED_UNICODE);
$toxicomanias = json_encode($pat->{'Toxicomanías'}, JSON_UNESCAPED_UNICODE);
$alimentacion = json_encode($pat->{'Alimentación'}, JSON_UNESCAPED_UNICODE);
$trabajo = json_encode($pat->{'Trabajo/Descanso'}, JSON_UNESCAPED_UNICODE);
$pasatiempo = json_encode($pat->{'Pasatiempo'}, JSON_UNESCAPED_UNICODE);

$q="UPDATE `antecedentes_no_patologicos` 
SET 
    tipo_constr='".$tipo_constr."',
    suelo_no_reg='".$suelo_no."',
    escaleras='".$escaleras."',
    ventilacion='".$ventilacion."',
    hacinamiento='".$hacinamiento."',
    adaptaciones='".$adaptaciones."',
    serv_agua='".$serv_agua."',
    serv_luz='".$serv_luz."',
    serv_drenaje='".$serv_drenaje."',
    habitos_pers_bath='".$habitos_pers."',
    higiente_bucal='".$higiene_buc."',
    defecacion='".$defecacion."',
    tabaquismo='".$tabaquismo."',
    alcoholismo='".$alcoholismo."',
    toxicomanias='".$toxicomanias."',
    alimentacion='".$alimentacion."',
    trabajo='".$trabajo."',
    pasatiempo='".$pasatiempo."'
WHERE `id_paciente`=".$id." LIMIT 1";

if($con->query($q)===TRUE){
    $response["status"] = "1";
    echo json_encode($response);
}else{
    $response["status"] = "0";
    echo json_encode($response);
}

?>