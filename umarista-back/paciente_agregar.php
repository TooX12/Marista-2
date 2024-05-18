<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include "conexion.php";

$con=connect();
$response = array();

$ficha = [];

$ficha = $_POST['ficha_id'];
$ahf = $_POST['ant_her_fam'];
$anp = $_POST['ant_no_pat'];
$ago = $_POST['ant_gin_obs'];
$pad = $_POST['padecimientos'];
$expf = $_POST['explor_fis'];
$post = $_POST['postura'];
$derm = $_POST['dermatomas'];
$diag = $_POST['diagnostico'];
$mapdol = $_POST['map_dol'];
$arcmov = $_POST['arc_mov'];


//    Aquí se hace el insert te la tabla de Ficha Identificacion
$obj = json_decode($ficha);

$query_ficha = "INSERT INTO `ficha_identificacion`(`nombre`,`ap_p`,`ap_m`,`edad`,`sexo`,`curp`,`nacionalidad`,`ocupacion`,`religion`,`calle`,`colonia`,`num_ext`,`cod_p`,`municipio`,`estado`,`telefono_pac`,`celular`,`correo`,`nom_familiar`,`telefono_fam`) VALUES ('".$obj->{"nombre"}."','".$obj->{"apaterno"}."','".$obj->{"amaterno"}."','".$obj->{"edad"}."','".$obj->{"sexo"}."','".$obj->{"curp"}."','".$obj->{"nacionalidad"}."','".$obj->{"ocupacion"}."','".$obj->{"religion"}."','".$obj->{"calle"}."','".$obj->{"colonia"}."','".$obj->{"numeroExterior"}."','".$obj->{"codigopostal"}."','".$obj->{"municipio"}."','".$obj->{"estado"}."','".$obj->{"telefono"}."','".$obj->{"celularP"}."','".$obj->{"correo"}."','".$obj->{"nfamiliar"}."','".$obj->{"celularF"}."')";


$result = $con->query($query_ficha);
if(!$result){
    die("Error al insertar: ".mysqli_error($con));
}

$query_id = "SELECT (`id_f_identificacion`) FROM `ficha_identificacion` WHERE `id_f_identificacion` = (SELECT LAST_INSERT_ID())";
$result = mysqli_query($con,$query_id);
$row=mysqli_fetch_assoc($result);

$id_paciente = $row["id_f_identificacion"];


//    Aquí en esta parte se hace el INSERT de Antecedentes Heredo Familiares
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

$query_ant_her_fam = "INSERT INTO `antecedentes_heredo_fam`(`id_paciente`, `enfermedades_reumatologicas`, `enfermedades_sistema_nervioso`, `sindrome`, `malformaciones`, `congenitas`, `diabetes`, `hipertension_arterial_sistemica`, `cancer`, `cardiopatias`, `vasculares`, `pulmonares`, `heptopatias`, `nefropatias`, `digestivos`, `endocrinopatias`, `trastornos_hermatologicos`, `dislipidemias`, `otras`) VALUES('".$id_paciente."', '".$enf_rem."','".$sist_ner."','".$sindrome."','".$malformaciones."','".$congenitas."','".$diabetes."','".$hiperten."','".$cancer."','".$cardiopat."','".$vasculares."','".$pulmonares."','".$heptopatias."','".$nefropatias."','".$digestivos."','".$endocrino."','".$transt_hem."','".$displidemias."','".$otras."')";

$result = $con->query($query_ant_her_fam);
if(!$result){
    die("Error al insertar: ".mysqli_error($con));
}


//    Aquí en esta parte se hace el INSERT de antecedentes patologicos y no patologicos

//echo $anp;
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

$query_antecedentes_no_pat = "INSERT INTO antecedentes_no_patologicos(
    `id_paciente`, 
    `tipo_constr`, 
    `suelo_no_reg`, 
    `escaleras`, 
    `ventilacion`, 
    `hacinamiento`, 
    `adaptaciones`, 
    `serv_agua`, 
    `serv_luz`, 
    `serv_drenaje`, 
    `habitos_pers_bath`, 
    `higiente_bucal`, 
    `defecacion`, 
    `tabaquismo`, 
    `alcoholismo`, 
    `toxicomanias`, 
    `alimentacion`, 
    `trabajo`, 
    `pasatiempo`) 
VALUES(
    '".$id_paciente."',
    '".$tipo_constr."',
    '".$suelo_no."',
    '".$escaleras."',
    '".$ventilacion."',
    '".$hacinamiento."',
    '".$adaptaciones."',
    '".$serv_agua."',
    '".$serv_luz."',
    '".$serv_drenaje."',
    '".$habitos_pers."',
    '".$higiene_buc."',
    '".$defecacion."',
    '".$tabaquismo."',
    '".$alcoholismo."',
    '".$toxicomanias."',
    '".$alimentacion."',
    '".$trabajo."',
    '".$pasatiempo."'
)";

$result = $con->query($query_antecedentes_no_pat);
if(!$result){
    die("Error al insertar: ".mysqli_error($con));
}


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

$query_antecedentes_pat = "INSERT INTO antecedentes_patologicos(
    `id_paciente`, 
    `enfermedad_infec`, 
    `intervenciones_quir`, 
    `traumatismos`, 
    `infiltraciones`, 
    `hospitalizaciones`, 
    `perdida_conocimiento`, 
    `intolerancia_medicamientos`, 
    `transfusiones`, 
    `medicamentos`, 
    `ets`) 
VALUES (
    '".$id_paciente."',
    '".$enfermedades_inf."',
    '".$intervenciones_quir."',
    '".$traumatismos."',
    '".$infiltraciones."',
    '".$hospitalizaciones."',
    '".$perdida_con."',
    '".$intol_medicamentos."',
    '".$transfusiones."',
    '".$medicamentos."',
    '".$ets."'
)";

$result = $con->query($query_antecedentes_pat);
if(!$result){
    die("Error al insertar: ".mysqli_error($con));
}

// Aquí se hace el INSERT de Antecedentes Gineco Obstetricos
$antgin = json_decode($ago);
$menarca = json_encode($antgin->{'Menarca'});
$ritmo_mens = json_encode($antgin->{'Ritmo menstrual'});
$partos = json_encode($antgin->{'Partos'});
$abortos = json_encode($antgin->{'Abortos'});
$cesareas = json_encode($antgin->{'Cesáreas'});
$metodos_ant = json_encode($antgin->{'Métodos Anticonceptivos'});

$query_antecedentes_ginceo = "INSERT INTO antecedentes_gineco(
    `id_paciente`, 
    `menarca`, 
    `ritmo_menstrual`, 
    `partos`, 
    `abortos`, 
    `cesareas`, 
    `metodo_anticonceptivo`) 
VALUES(
    '".$id_paciente."',
    '".$menarca."',
    '".$ritmo_mens."',
    '".$partos."',
    '".$abortos."',
    '".$cesareas."',
    '".$metodos_ant."'
)";

$result = $con->query($query_antecedentes_ginceo);
if(!$result){
    die("Error al insertar: ".mysqli_error($con));
}


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

$query_padecimiento_actual = "INSERT INTO padecimiento_actual(
    `id_paciente`,
    `inicio`, 
    `evolucion`, 
    `actual`, 
    `astenia`, 
    `adinamia`, 
    `anorexia`, 
    `fiebre`, 
    `perdida_peso`,
    `aparato_digestivo`, 
    `aparato_cardiovascular`, 
    `aparato_respiratorio`, 
    `aparato_urinario`, 
    `aparato_genital`, 
    `aparato_hermatologico`, 
    `aparato_endocrino`, 
    `aparato_nervioso`, 
    `aparato_sensorial`, 
    `aparato_osteomuscular`, 
    `diagnosticos_anteriores`, 
    `estudios_gabinete`, 
    `tratamientos_anteriores`, 
    `inquietud_subyacente`) 
VALUES(
    '".$id_paciente."',
    '".$inicio."',
    '".$evolucion."',
    '".$actual."',
    '".$astenia."',
    '".$adinamia."',
    '".$anorexia."',
    '".$fiebre."',
    '".$perdida_pes."',
    '".$ap_digestivo."',
    '".$ap_cardiovascular."',
    '".$ap_respiratorio."',
    '".$ap_urinario."',
    '".$ap_genital."',
    '".$ap_hermatologico."',
    '".$ap_endocrino."',
    '".$ap_nervioso."',
    '".$ap_sensorial."',
    '".$ap_osteomuscular."',
    '".$diagn_ante."',
    '".$est_gab."',
    '".$trat_ant."',
    '".$inqu_sub."'
)";

$result = $con->query($query_padecimiento_actual);
if(!$result){
    die("Error al insertar: ".mysqli_error($con));
}

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

$query_exploracion_fisica = "INSERT INTO exploracion_fisica(
    `id_paciente`, 
    `ta`, 
    `fc`, 
    `fr`, 
    `temp`, 
    `talla`,
    `talla_anterior`,
    `s02`, 
    `peso_actual`, 
    `peso_anterior`, 
    `peso_ideal`, 
    `imc`, 
    `estado_conciencia`, 
    `actitud`, 
    `movimientos_anormales`, 
    `postura`, 
    `marcha`, 
    `estado_gral_nutri`) 
VALUES(
    '".$id_paciente."',
    '".$ta."',
    '".$fc."',
    '".$fr."',
    '".$temp."',
    '".$talla."',
    '".$talla_ant."',
    '".$so2."',
    '".$peso_act."',
    '".$peso_ant."',
    '".$peso_ideal."',
    '".$imc."',
    '".$estado_conc."',
    '".$actitud."',
    '".$movimientos_anor."',
    '".$postura."',
    '".$marcha."',
    '".$estado_gral_nut."'
)";

$result = $con->query($query_exploracion_fisica);
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

$query_exploracion_region = "INSERT INTO exploracion_region(
    `id_paciente`, 
    `piel_anexos`, 
    `cabeza`, 
    `ojos`, 
    `oidos`, 
    `nariz_senos`, 
    `boca`, 
    `torax`, 
    `vasos_sang`, 
    `mamas`, 
    `genitales`) 
VALUES(
    '".$id_paciente."',
    '".$piel_an."',
    '".$cabeza."',
    '".$ojos."',
    '".$oidos."',
    '".$nariz_sen."',
    '".$boca."',
    '".$torax."',
    '".$vasos_sang."',
    '".$mamas."',
    '".$genitales."'
)";

$result = $con->query($query_exploracion_region);
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

$query_sistemas_musculo = "INSERT INTO sistemas_musculoesque(
    `id_paciente`, 
    `cervical`, 
    `dorsal`, 
    `sacroiliaca`, 
    `hombros`, 
    `codo`, 
    `muneca`, 
    `mano`, 
    `cadera`, 
    `rodilla`, 
    `tobillo`, 
    `pie`) 
VALUES(
    '".$id_paciente."',
    '".$cervical."',
    '".$dorsal."',
    '".$sacro."',
    '".$hombros."',
    '".$codo."',
    '".$muneca."',
    '".$mano."',
    '".$cadera."',
    '".$rodilla."',
    '".$tobillo."',
    '".$pie."'
)";

$result = $con->query($query_sistemas_musculo);
if(!$result){
    die("Error al insertar: ".mysqli_error($con));
}

$postura = json_decode($post);
$anterior = $postura->{'Anterior'};
$lateral = $postura->{'Lateral'};
$posterior = $postura->{'Posterior'};

$query_postura = "INSERT INTO postura(
    `id_paciente`, 
    `anterior`, 
    `lateral`, 
    `posterior`) 
VALUES(
    '".$id_paciente."',
    '".$anterior."',
    '".$lateral."',
    '".$posterior."'
)";

$result = $con->query($query_postura);
if(!$result){
    die("Error al insertar: ".mysqli_error($con));
}


$derma = json_decode($derm);
$dermatomas = $derma->{'Dermatomas'};

$query_dermatomas = "INSERT INTO dermatomas(
    `id_paciente`, 
    `zonas_dermatomas`) 
VALUES(
    '".$id_paciente."',
    '".$dermatomas."'
)";

$result = $con->query($query_dermatomas);
if(!$result){
    die("Error al insertar: ".mysqli_error($con));
}

$diagnos = json_decode($diag);
$fisio = $diagnos->{'Diagnóstico fisioterapéutico'};
$pronostico = $diagnos->{'Pronostico'};
$objetivos = $diagnos->{'Objetivos'};
$plan = $diagnos->{'Plan fisioterapéutico'};

$query_diagnostico_plan = "INSERT INTO diagnostico_plan(
    `id_paciente`,
    `diagnostico_fisioterapeutico`, 
    `pronostico`, 
    `objetivos`, 
    `plan_fisioterapeutico`) 
VALUES(
    '".$id_paciente."',
    '".$fisio."',
    '".$pronostico."',
    '".$objetivos."',
    '".$plan."'
)";

$result = $con->query($query_diagnostico_plan);
if(!$result){
    die("Error al insertar: ".mysqli_error($con));
}

$mapa = json_decode($mapdol);
$mapa_dolor = $mapa->{'Mapadolor'};

$query_mapa_dolor = "INSERT INTO mapa_dolor(
    `id_paciente`,
    `zonas`) 
VALUES (
    '".$id_paciente."',
    '".$mapa_dolor."'
)";

$result = $con->query($query_mapa_dolor);
if(!$result){
    die("Error al insertar: ".mysqli_error($con));
}

$arcos = json_decode($arcmov);
$columna_cervical = json_encode($arcos->{'Columna cervical'}, JSON_UNESCAPED_UNICODE);
$columna_dorsal = json_encode($arcos->{'Columna dorsal'}, JSON_UNESCAPED_UNICODE);
$columna_lumbar = json_encode($arcos->{'Columna lumbar'}, JSON_UNESCAPED_UNICODE);
$hombro = json_encode($arcos->{'Hombro'}, JSON_UNESCAPED_UNICODE);
$codo = json_encode($arcos->{'Codo'}, JSON_UNESCAPED_UNICODE);
$muneca = json_encode($arcos->{'Muñeca'}, JSON_UNESCAPED_UNICODE);
$mano = json_encode($arcos->{'Mano'}, JSON_UNESCAPED_UNICODE);
$cadera = json_encode($arcos->{'Cadera'}, JSON_UNESCAPED_UNICODE);
$rodilla = json_encode($arcos->{'Rodilla'}, JSON_UNESCAPED_UNICODE);
$tobillo = json_encode($arcos->{'Tobillo'}, JSON_UNESCAPED_UNICODE);
$pie = json_encode($arcos->{'Pie'}, JSON_UNESCAPED_UNICODE);

$query_arcos_movimiento = "INSERT INTO arcos_movimiento(
    `id_paciente`, 
    `columna_cervical`, 
    `columna_dorsal`, 
    `columna_lumbar`, 
    `hombro`, 
    `codo`, 
    `muneca`, 
    `mano`, 
    `cadera`, 
    `rodilla`, 
    `tobillo`, 
    `pie`) 
VALUES(
    '".$id_paciente."',
    '".$columna_cervical."',
    '".$columna_dorsal."',
    '".$columna_lumbar."',
    '".$hombro."',
    '".$codo."',
    '".$muneca."',
    '".$mano."',
    '".$cadera."',
    '".$rodilla."',
    '".$tobillo."',
    '".$pie."'
)";

$result = $con->query($query_arcos_movimiento);
if(!$result){
    die("Error al insertar: ".mysqli_error($con));
}

$response["status"] = "1";
echo json_encode($response);

?>