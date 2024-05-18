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

$q="SELECT * FROM 
    ficha_identificacion AS f 
    INNER JOIN antecedentes_gineco AS ag 
        ON f.id_f_identificacion = ag.id_paciente 
    INNER JOIN antecedentes_heredo_fam AS ah
        ON ag.id_paciente = ah.id_paciente
    INNER JOIN antecedentes_no_patologicos AS anp
        ON ah.id_paciente = anp.id_paciente
    INNER JOIN antecedentes_patologicos AS ap
        ON anp.id_paciente = ap.id_paciente
    INNER JOIN arcos_movimiento AS arc
        ON ap.id_paciente = arc.id_paciente
    INNER JOIN dermatomas AS der
        ON arc.id_paciente = der.id_paciente
    INNER JOIN diagnostico_plan AS diagp
        ON der.id_paciente = diagp.id_paciente
    INNER JOIN exploracion_fisica AS expf
        ON diagp.id_paciente = expf.id_paciente
    INNER JOIN exploracion_region AS expr
        ON expf.id_paciente = expr.id_paciente
    INNER JOIN mapa_dolor AS md
        ON expr.id_paciente = md.id_paciente
INNER JOIN padecimiento_actual AS pada
        ON md.id_paciente = pada.id_paciente
    INNER JOIN postura AS post
        ON pada.id_paciente = post.id_paciente
    INNER JOIN sistemas_musculoesque AS sism
        ON post.id_paciente = sism.id_paciente
GROUP BY f.id_f_identificacion";//Variable que contiene el Query y compara si son iguales el usuario y password con las variables $user y $pass.

$result=mysqli_query($con, $q); //Variable que obtiene el resultado del Query.

$outp = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($outp);

?>