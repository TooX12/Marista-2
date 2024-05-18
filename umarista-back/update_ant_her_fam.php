<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include "conexion.php";

$con=connect();

$id=$_POST['id'];
$ahf=$_POST['ant_her_fam'];

$ant = json_decode($ahf);
$enf_rem = json_encode($ant->{'Enfermedades Reumatológicas'}, JSON_UNESCAPED_UNICODE);
$sist_ner = json_encode($ant->{'Enfermedades del sistema nervioso'}, JSON_UNESCAPED_UNICODE);
$sindrome = json_encode($ant->{'Síndrome'}, JSON_UNESCAPED_UNICODE);
$malformaciones = json_encode($ant->{'Malformaciones'}, JSON_UNESCAPED_UNICODE);
$congenitas = json_encode($ant->{'Congénitas'}, JSON_UNESCAPED_UNICODE);
$diabetes = json_encode($ant->{'Diabetes'}, JSON_UNESCAPED_UNICODE);
$hiperten = json_encode($ant->{'Hipertención arterial sistémica'}, JSON_UNESCAPED_UNICODE);
$cancer = json_encode($ant->{'Cáncer'}, JSON_UNESCAPED_UNICODE);
$cardiopat = json_encode($ant->{'Cardiopatías'}, JSON_UNESCAPED_UNICODE);
$vasculares = json_encode($ant->{'Vasculares'}, JSON_UNESCAPED_UNICODE);
$pulmonares = json_encode($ant->{'Pulmonares'}, JSON_UNESCAPED_UNICODE);
$heptopatias = json_encode($ant->{'Heptopatias'}, JSON_UNESCAPED_UNICODE);
$nefropatias = json_encode($ant->{'Nefropatias'}, JSON_UNESCAPED_UNICODE);
$digestivos = json_encode($ant->{'Digestivos'}, JSON_UNESCAPED_UNICODE);
$endocrino = json_encode($ant->{'Endocrinopatias'}, JSON_UNESCAPED_UNICODE);
$transt_hem = json_encode($ant->{'Transtornos Hematológicos'}, JSON_UNESCAPED_UNICODE);
$displidemias = json_encode($ant->{'Dislipidemias'}, JSON_UNESCAPED_UNICODE);
$otras = json_encode($ant->{'Otras'}, JSON_UNESCAPED_UNICODE);

$q="UPDATE `antecedentes_heredo_fam` SET enfermedades_reumatologicas='".$enf_rem."', enfermedades_sistema_nervioso='".$sist_ner."', sindrome='".$sindrome."', malformaciones='".$malformaciones."', congenitas='".$congenitas."', diabetes='".$diabetes."', hipertension_arterial_sistemica='".$hiperten."', cancer='".$cancer."', cardiopatias='".$cardiopat."', vasculares='".$vasculares."', pulmonares='".$pulmonares."', heptopatias='".$heptopatias."', nefropatias='".$nefropatias."', digestivos='".$digestivos."', endocrinopatias='".$endocrino."', trastornos_hermatologicos='".$transt_hem."', dislipidemias='".$displidemias."', otras='".$otras."' WHERE `id_paciente`=".$id." LIMIT 1";

if($con->query($q)===TRUE){
    $response["status"] = "1";
    echo json_encode($response);
}else{
    $response["status"] = "0";
    echo json_encode($response);
}

?>