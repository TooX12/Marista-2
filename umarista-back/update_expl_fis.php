<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include "conexion.php";

$con=connect();

$id=$_POST['id'];
$expf = $_POST['explor_fis'];

$explo_fis = json_decode($expf);
$ta = $explo_fis->{'T.A'};
$fc = $explo_fis->{'F.C'};
$fr = $explo_fis->{'F.R'};
$temp = $explo_fis->{'Temp.'};
$talla = $explo_fis->{'Talla actual'};
$talla_ant = $explo_fis->{'Talla anterior'};
$so2 = $explo_fis->{'S02'};
$peso_act = $explo_fis->{'Peso actual'};
$peso_ant  = $explo_fis->{'Peso anterior'};
$peso_ideal  = $explo_fis->{'Peso ideal'};
$imc  = $explo_fis->{'IMC'};
$estado_conc  = $explo_fis->{'Estado de conciencia'};
$actitud  = $explo_fis->{'Actitud'};
$movimientos_anor  = $explo_fis->{'Movimientos anormales'};
$postura  = $explo_fis->{'Postura'};
$marcha  = $explo_fis->{'Marcha'};
$estado_gral_nut  = $explo_fis->{'Estado general de nutrición'};

$q="UPDATE `exploracion_fisica` 
SET 
    ta='".$ta."',
    fc='".$fc."',
    fr='".$fr."',
    temp='".$temp."',
    talla='".$talla."',
    talla_anterior='".$talla_ant."',
    s02='".$so2."',
    peso_actual='".$peso_act."',
    peso_anterior='".$peso_ant."',
    peso_ideal='".$peso_ideal."',
    imc='".$imc."',
    estado_conciencia='".$estado_conc."',
    actitud='".$actitud."',
    movimientos_anormales='".$movimientos_anor."',
    postura='".$postura."',
    marcha='".$marcha."',
    estado_gral_nutri='".$estado_gral_nut."'
WHERE `id_paciente`=".$id." LIMIT 1";

$result = $con->query($q);
if(!$result){
    die("Error al insertar: ".mysqli_error($con));
}

$explo_reg = json_decode($expf);
$piel_an = $explo_reg->{'Piel y anexos'};
$cabeza = $explo_reg->{'Cabeza'};
$ojos = $explo_reg->{'Ojos'};
$oidos = $explo_reg->{'Oidos'};
$nariz_sen = $explo_reg->{'Nariz y senos p/n'};
$boca = $explo_reg->{'Boca'};
$torax = $explo_reg->{'Torax'};
$vasos_sang = $explo_reg->{'Vasos sanguíneos'};
$mamas = $explo_reg->{'Mamas'};
$genitales = $explo_reg->{'Genitales'};

$q="UPDATE `exploracion_region` 
SET 
    piel_anexos='".$piel_an."',
    cabeza='".$cabeza."',
    ojos='".$ojos."',
    oidos='".$oidos."',
    nariz_senos='".$nariz_sen."',
    boca='".$boca."',
    torax='".$torax."',
    vasos_sang='".$vasos_sang."',
    mamas='".$mamas."',
    genitales='".$genitales."'
WHERE `id_paciente`=".$id." LIMIT 1";

$result = $con->query($q);
if(!$result){
    die("Error al insertar: ".mysqli_error($con));
}

$sist_mus = json_decode($expf);
$cervical = $sist_mus->{'Cervical'};
$dorsal = $sist_mus->{'Dorsal'};
$sacro = $sist_mus->{'Sacroiliaca'};
$hombros = $sist_mus->{'Hombros'};
$codo = $sist_mus->{'Codo'};
$muneca = $sist_mus->{'Muñeca'};
$mano = $sist_mus->{'Mano'};
$cadera = $sist_mus->{'Cadera'};
$rodilla = $sist_mus->{'Rodilla(Genu varo/valgo, recurvatum)'};
$tobillo = $sist_mus->{'Tobillo'};
$pie = $sist_mus->{'Pie(Pie equino, plano, cavo)'};

$q="UPDATE `sistemas_musculoesque` 
SET 
    cervical='".$cervical."',
    dorsal='".$dorsal."',
    sacroiliaca='".$sacro."',
    hombros='".$hombros."',
    codo='".$codo."',
    muneca='".$muneca."',
    mano='".$mano."',
    cadera='".$cadera."',
    rodilla='".$rodilla."',
    tobillo='".$tobillo."',
    pie='".$pie."'
WHERE `id_paciente`=".$id." LIMIT 1";

if($con->query($q)===TRUE){
    $response["status"] = "1";
    echo json_encode($response);
}else{
    $response["status"] = "0";
    echo json_encode($response);
}

?>