<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include "conexion.php";

$con=connect();

$info[0]=$_POST['link'];
$info[1]=$_POST['titulo'];
$info[2]=$_POST['r_padecimiento'];
$info[3]=$_POST['a_especifica'];
$info[4]=$_POST['observaciones'];
$info[5]=$_POST['id_video'];

$fetch=explode("v=", $info[0]);
$videoid=$fetch[1];
$url_img = 'http://img.youtube.com/vi/'.$videoid.'/mqdefault.jpg';

$q="UPDATE `videos` SET link='".$info[0]."', titulo='".$info[1]."', r_padecimiento='".$info[2]."', a_especifica='".$info[3]."', observaciones='".$info[4]."', link_img='".$url_img."' WHERE id_videos=".$info[5]."";

if($con->query($q)===TRUE){
    $response["status"] = "1";
    echo json_encode($response);
}else{
    $response["status"] = "0";
    echo json_encode($response);
}

?>