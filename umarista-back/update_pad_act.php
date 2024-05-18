<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include "conexion.php";

$con=connect();

$id=$_POST['id'];
$anp = $_POST['ant_no_pat'];
$pad = $_POST['padecimientos'];

$pat = json_decode($anp);
$padec = json_decode($pad);
$inicio = json_encode($padec->{'Inicio'}, JSON_UNESCAPED_UNICODE);
$evolucion = json_encode($padec->{'Evolución'}, JSON_UNESCAPED_UNICODE);
$actual = json_encode($padec->{'Actual'}, JSON_UNESCAPED_UNICODE);
$astenia = $padec->{'Astenia'};
$adinamia = $padec->{'Adinamia'};
$anorexia = $padec->{'Anorexia'};
$fiebre = $padec->{'Fiebre'};
$perdida_pes = $padec->{'Perdida de peso'};
$ap_digestivo = json_encode($pat->{'Aparato digestivo'}, JSON_UNESCAPED_UNICODE);
$ap_cardiovascular = json_encode($pat->{'Aparato cardiovacular'}, JSON_UNESCAPED_UNICODE);
$ap_respiratorio = json_encode($pat->{'Aparato Respiratorio'}, JSON_UNESCAPED_UNICODE);
$ap_urinario = json_encode($pat->{'Aparato Urinario'}, JSON_UNESCAPED_UNICODE);
$ap_genital = json_encode($pat->{'Aparato genital'}, JSON_UNESCAPED_UNICODE);
$ap_hermatologico = json_encode($pat->{'Aparato hematológico'}, JSON_UNESCAPED_UNICODE);
$ap_endocrino = json_encode($pat->{'Sistema endócrino'}, JSON_UNESCAPED_UNICODE);
$ap_nervioso = json_encode($pat->{'Sistema nervioso'}, JSON_UNESCAPED_UNICODE);
$ap_sensorial = json_encode($pat->{'Sistema sensorial'}, JSON_UNESCAPED_UNICODE);
$ap_osteomuscular = json_encode($pat->{'Sistema osteomuscular'}, JSON_UNESCAPED_UNICODE);
$diagn_ante = $padec->{'Diagnosticos anteriores'};
$est_gab = $padec->{'Estudios de gabinete/estudios de laboratorio'};
$trat_ant = $padec->{'Tratamientos anteriores(Tiempo,tipo)'};
$inqu_sub = $padec->{'Inquietud subyacente'};

$q="UPDATE `padecimiento_actual` 
SET 
    inicio='".$inicio."',
    evolucion='".$evolucion."',
    actual='".$actual."',
    astenia='".$astenia."',
    adinamia='".$adinamia."',
    anorexia='".$anorexia."',
    fiebre='".$fiebre."',
    perdida_peso='".$perdida_pes."',
    aparato_digestivo='".$ap_digestivo."',
    aparato_cardiovascular='".$ap_cardiovascular."',
    aparato_respiratorio='".$ap_respiratorio."',
    aparato_urinario='".$ap_urinario."',
    aparato_genital='".$ap_genital."',
    aparato_hermatologico='".$ap_hermatologico."',
    aparato_endocrino='".$ap_endocrino."',
    aparato_nervioso='".$ap_nervioso."',
    aparato_sensorial='".$ap_sensorial."',
    aparato_osteomuscular='".$ap_osteomuscular."',
    diagnosticos_anteriores='".$diagn_ante."',
    estudios_gabinete='".$est_gab."',
    tratamientos_anteriores='".$trat_ant."',
    inquietud_subyacente='".$inqu_sub."'
WHERE `id_paciente`=".$id." LIMIT 1";

if($con->query($q)===TRUE){
    $response["status"] = "1";
    echo json_encode($response);
}else{
    $response["status"] = "0";
    echo json_encode($response);
}

?>