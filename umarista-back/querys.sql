INSERT INTO usuarios(username, nombre, ap_p, ap_m, sexo, rango, password) VALUES('admin','Gustavo','Garcia','Sanchez','Hombre','Admin','admin');

INSERT INTO videos(link, titulo, r_padecimiento, a_especifica, observaciones) VALUES('','','','','');

INSERT INTO ficha_identificacion(nombre,ap_p,ap_m,edad,sexo,curp,nacionalidad,ocupacion,religion,calle,colonia,num_ext,cod_p,municipio,estado,telefono_pac,celular,correo,nom_familiar,telefono_fam) VALUES ('','','','','','','','','','','','','','','','','','','','');

INSERT INTO antecedentes_heredo_fam(id_paciente, enfermedados_reumatologicas, enfermedades_sistema_nervioso, sindrome, malformaciones, congenitas, diabetes, hipertension_arterial_sistemica, cancer, cardiopatias, vasculares, pulmonares, heptopatias, nefropatias, digestivos, endocrinopatias, trastornos_hermatologicos, dislipidemias, otras) 
    VALUES();

INSERT INTO antecedentes_no_patologicos(id_paciente, tipo_constr, suelo_no_reg, escaleras, ventilacion, hacinamiento, adaptaciones, serv_agua, serv_luz, serv_drenaje, habitos_pers_bath, higiente_bucal, defecacion, tabaquismo, alcoholismo, toxicomanias, alimentacion, trabajo, pasatiempo) VALUES();

INSERT INTO antecedentes_patologicos(id_paciente, enfermedad_infec, intervenciones_quir, traumatismos, infiltraciones, hospitalizaciones, perdida_conocimiento, intolerancia_medicamentos, transfusiones, medicamentos, ets) VALUES ();

INSERT INTO antecedentes_gineco(id_paciente, menarca, ritmo_menstrual, partos, abortos, cesareas, metodo_anticonceptivo) VALUES();

INSERT INTO exploracion_fisica(id_paciente, ta, fc, fr, temp, talla, s02, peso_actual, peso_anterior, peso_ideal, imc, estado_conciencia, actitud, movimientos_anormales, postura, marcha, estado_gra_nutri) VALUES();

INSERT INTO exploracion_region(id_paciente, piel_anexos, cabeza, ojos, oidos, nariz_senos, boca, torax, vasos_sang, mamas, genitales) VALUES();

INSERT INTO sistemas_musculoesque(id_paciente, cervical, dorsal, sacroiliaca, hombros, codo, muneca, mano, cadera, rodilla, tobillo, pie) VALUES();

INSERT INTO postura(id_paciente, anterior, lateral, posterior) VALUES();

INSERT INTO dermatomas(id_paciente, zonas_dermatomas) VALUES();



SELECT * FROM ficha_identificacion WHERE id_f_identificacion = 1;

SELECT * FROM antecedentes_heredo_fam WHERE id_ant_heredo_fam = 1;

SELECT * FROM antecedentes_patologicos AS a INNER JOIN antecedentes_no_patologicos AS b ON a.id_paciente = b.id_paciente INNER JOIN padecimiento_actual AS c ON b.id_paciente = c.id_paciente WHERE a.id_paciente = 1;

SELECT * FROM exploracion_fisica AS a INNER JOIN exploracion_region as b ON a.id_paciente = b.id_paciente INNER JOIN sistemas_musculoesque AS c ON b.id_paciente = c.id_paciente WHERE a.id_paciente = 1;


CREATE TABLE padecimiento_actual (id_padecimiento_actual INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_paciente INT NOT NULL,
    CONSTRAINT FK_PadecimientoAct_Paciente FOREIGN KEY (id_paciente) REFERENCES ficha_identificacion(id_f_identificacion), 
    inicio TEXT, 
    evolucion TEXT, 
    actual TEXT, 
    astenia TINYINT, 
    adinamia TINYINT, 
    anorexia TINYINT, 
    fiebre TINYINT, 
    perdida_peso TINYINT, 
    aparato_digestivo TEXT, 
    aparato_cardiovascular TEXT, 
    aparato_respiratorio TEXT, 
    aparato_urinario TEXT, 
    aparato_genital TEXT, 
    aparato_hermatologico TEXT, 
    aparato_endocrino TEXT, 
    aparato_nervioso TEXT, 
    aparato_sensorial TEXT, 
    aparato_osteomuscular TEXT, 
    diagnosticos_anteriores TEXT, 
    estudios_gabinete TEXT, 
    tratamientos_anteriores TEXT, 
    inquietud_subyacente TEXT)

INSERT INTO padecimiento_actual(`id_paciente`,`inicio`, `evolucion`, `actual`, `astenia`, `adinamia`, `anorexia`, `fiebre`, `perdida_peso`, `aparato_digestivo`, `aparato_cardiovascular`, `aparato_respiratorio`, `aparato_urinario`, `aparato_genital`, `aparato_hermatologico`, `aparato_endocrino`, `aparato_nervioso`, `aparato_sensorial`, `aparato_osteomuscular`, `diagnosticos_anteriores`, `estudios_gabinete`, `tratamientos_anteriores`, `inquietud_subyacente`) VALUES();

CREATE TABLE diagnostico_plan (id_diagnostico_plan INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    id_paciente INT NOT NULL, 
    CONSTRAINT FK_DiagnosticoPlan_Paciente FOREIGN KEY (id_paciente) REFERENCES ficha_identificacion(id_f_identificacion), 
    diagnostico_fisioterapeutico TEXT, 
    pronostico TEXT, 
    objetivos TEXT, 
    plan_fisioterapeutico TEXT)

INSERT INTO diagnostico_plan(`id_paciente`,`diagnostico_fisioterapeutico`, `pronostico`, `objetivos`, `plan_fisioterapeutico`) VALUES()

CREATE TABLE nota_valoracion (id_nota_valoracion INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    id_paciente INTEGER NOT NULL, 
    CONSTRAINT FK_NotaValoracion_Paciente FOREIGN KEY (id_paciente) REFERENCES ficha_identificacion(id_f_identificacion), 
    fecha DATE, 
    eva TEXT, 
    pruebas_funcionales TEXT, 
    actividad_funcional TEXT, 
    fuerza TEXT, 
    rom TEXT)

INSERT INTO nota_valoracion(`id_paciente`,`fecha`,`eva`,`pruebas_funcionales`, `actividad_funcional`, `fuerza`, `rom`) VALUES ()

CREATE TABLE mapa_dolor (id_mapa_dolor INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    id_paciente INTEGER NOT NULL, 
    CONSTRAINT FK_MapaDolor_Paciente FOREIGN KEY (id_paciente) REFERENCES ficha_identificacion(id_f_identificacion), 
    zonas TEXT)

INSERT INTO mapa_dolor(`id_paciente`,`zonas`) VALUES ()

CREATE TABLE arcos_movimiento (id_arcos_movimiento INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    id_paciente INTEGER NOT NULL, 
    CONSTRAINT FK_ArcosMovimiento_Paciente FOREIGN KEY (id_paciente) REFERENCES ficha_identificacion(id_f_identificacion), 
    columna_cervical TEXT, 
    columna_dorsal TEXT, 
    columna_lumbar TEXT, 
    hombro TEXT, 
    codo TEXT, 
    muneca TEXT, 
    mano TEXT, 
    cadera TEXT, 
    rodilla TEXT, 
    tobillo TEXT, 
    pie TEXT)

INSERT INTO arcos_movimiento(`id_paciente`, `columna_cervical`, `columna_dorsal`, `columna_lumbar`, `hombro`, `codo`, `muneca`, `mano`, `cadera`, `rodilla`, `tobillo`, `pie`) VALUES()

CREATE TABLE notas_evolucion (id_notas_evolucion INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    id_paciente INTEGER NOT NULL, 
    CONSTRAINT FK_NotasEvolucion FOREIGN KEY (id_paciente) REFERENCES ficha_identificacion(id_f_identificacion), 
    fecha DATE, 
    nota TEXT)

INSERT INTO notas_evolucion(`id_paciente`, `fecha`, `nota`) VALUES()

SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE ficha_identificacion;

TRUNCATE TABLE antecedentes_heredo_fam;

TRUNCATE TABLE antecedentes_no_patologicos;

TRUNCATE TABLE antecedentes_patologicos;

TRUNCATE TABLE antecedentes_gineco;

TRUNCATE TABLE padecimiento_actual;

TRUNCATE TABLE exploracion_fisica;

TRUNCATE TABLE exploracion_region;

TRUNCATE TABLE sistemas_musculoesque;

TRUNCATE TABLE postura;

TRUNCATE TABLE dermatomas;

TRUNCATE TABLE diagnostico_plan;

TRUNCATE TABLE mapa_dolor;

TRUNCATE TABLE arcos_movimiento;




CONSTRAINT `FK_AntecedentesG_FichaId` FOREIGN KEY (`id_paciente`) REFERENCES `ficha_identificacion` (`id_f_identificacion`) ON DELETE NO ACTION ON UPDATE NO ACTION

CONSTRAINT `FK_AntecedentesHF_FichaId` FOREIGN KEY (`id_paciente`) REFERENCES `ficha_identificacion` (`id_f_identificacion`) ON DELETE CASCADE

CONSTRAINT `FK_AntecedentesNoP_FichaIdent` FOREIGN KEY (`id_paciente`) REFERENCES `ficha_identificacion` (`id_f_identificacion`) ON DELETE CASCADE

CONSTRAINT `FK_AntecedentesP_FichaId` FOREIGN KEY (`id_paciente`) REFERENCES `ficha_identificacion` (`id_f_identificacion`) ON DELETE CASCADE

CONSTRAINT `FK_ArcosMovimiento_Paciente` FOREIGN KEY (`id_paciente`) REFERENCES `ficha_identificacion` (`id_f_identificacion`) ON DELETE CASCADE

CONSTRAINT `FK_Dermatomas_FichaId` FOREIGN KEY (`id_paciente`) REFERENCES `ficha_identificacion` (`id_f_identificacion`) ON DELETE CASCADE

CONSTRAINT `FK_DiagnosticoPlan_Paciente` FOREIGN KEY (`id_paciente`) REFERENCES `ficha_identificacion` (`id_f_identificacion`) ON DELETE CASCADE;

CONSTRAINT `FK_ExplorFis_FichaId` FOREIGN KEY (`id_paciente`) REFERENCES `ficha_identificacion` (`id_f_identificacion`) ON DELETE CASCADE

CONSTRAINT `FK_MapaDolor_Paciente` FOREIGN KEY (`id_paciente`) REFERENCES `ficha_identificacion` (`id_f_identificacion`) ON DELETE CASCADE

CONSTRAINT `FK_NotaValoracion_Paciente` FOREIGN KEY (`id_paciente`) REFERENCES `ficha_identificacion` (`id_f_identificacion`) ON DELETE CASCADE

CONSTRAINT `FK_NotasEvolucion` FOREIGN KEY (`id_paciente`) REFERENCES `ficha_identificacion` (`id_f_identificacion`) ON DELETE CASCADE

CONSTRAINT `FK_PadecimientoAct_Paciente` FOREIGN KEY (`id_paciente`) REFERENCES `ficha_identificacion` (`id_f_identificacion`) ON DELETE CASCADE

CONSTRAINT `FK_Postura_FichaId` FOREIGN KEY (`id_paciente`) REFERENCES `ficha_identificacion` (`id_f_identificacion`) ON DELETE CASCADE

CONSTRAINT `FK_SistemasMusc_FichaId` FOREIGN KEY (`id_paciente`) REFERENCES `ficha_identificacion` (`id_f_identificacion`) ON DELETE CASCADE





SELECT * FROM 
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
    INNER JOIN nota_valoracion AS nv
        ON md.id_paciente = nv.id_paciente
    INNER JOIN notas_evolucion AS ne
        ON nv.id_paciente = ne.id_paciente
    INNER JOIN padecimiento_actual AS pada
        ON ne.id_paciente = pada.id_paciente
    INNER JOIN postura AS post
        ON pada.id_paciente = post.id_paciente
    INNER JOIN sistemas_musculoesque AS sism
        ON post.id_paciente = sism.id_paciente
    GROUP BY f.id_f_identificacion;