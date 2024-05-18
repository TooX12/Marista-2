import React from "react";
import Content from "../Components/Content";
import Excel from "../Images/excel.png";
import { Button } from "@material-ui/core";
import ReactExport from "react-export-excel";
import { useEffect } from "react";

const urlBack = "http://localhost:4433/umarista-back/";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const dataSet1 = [
  {
    name: "Johson",
    amount: 30000,
    sex: "M",
    is_married: true,
  },
  {
    name: "Monika",
    amount: 355000,
    sex: "F",
    is_married: false,
  },
  {
    name: "John",
    amount: 250000,
    sex: "M",
    is_married: false,
  },
  {
    name: "Josef",
    amount: 450500,
    sex: "M",
    is_married: true,
  },
];

export default function Statistics() {
  useEffect(() => {
    //console.log(format(calendarDate, "HH:mm"));
    async function fetchData() {
      const response = await fetch(urlBack + "estadisticas_cargar.php", {
        method: "POST",
      })
        .then((response) => response.json())
        .then((posts) => {
          console.log(Object.values(posts));
          setDatos(Object.values(posts));
        });
    }

    fetchData();
  }, []);

  const [datos, setDatos] = React.useState([]);

  return (
    <Content nombre="Estadisticas" select="estadisticas">
      <div
        style={{
          width: "100%",
          backgroundColor: "#F4F4F4",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={Excel} alt="" width="50%"></img>
        <ExcelFile
          element={
            <Button
              style={{
                backgroundColor: "#FFB700",
                color: "white",
                width: "180%",
              }}
            >
              Obtener Excel
            </Button>
          }
        >
          <ExcelSheet data={datos} name="Employees">
            <ExcelColumn label="Nombre" value="nombre" />
            <ExcelColumn label="Apellido Paterno" value="ap_p" />
            <ExcelColumn label="Apellido Materno" value="ap_m" />
            <ExcelColumn label="Edad" value="edad" />
            <ExcelColumn label="Sexo" value="sexo" />
            <ExcelColumn label="CURP" value="curp" />
            <ExcelColumn label="Nacionalidad" value="nacionalidad" />
            <ExcelColumn label="Ocupacion" value="ocupacion" />
            <ExcelColumn label="Religión" value="religion" />
            <ExcelColumn label="Calle" value="calle" />
            <ExcelColumn label="Colonia" value="colonia" />
            <ExcelColumn label="Numero Exterior" value="num_ext" />
            <ExcelColumn label="Codigo Postal" value="cod_p" />
            <ExcelColumn label="Municipio" value="municipio" />
            <ExcelColumn label="Estado" value="estado" />
            <ExcelColumn label="Telefono del Paciente" value="telefono_pac" />
            <ExcelColumn label="Celular" value="celular" />
            <ExcelColumn label="Correo" value="correo" />
            <ExcelColumn label="Nombre del Familiar" value="nom_familiar" />
            <ExcelColumn label="Telefono del Familiar" value="telefono_fam" />
            <ExcelColumn label="Menarca" value="menarca" />
            <ExcelColumn label="Ritmo Menstrual" value="ritmo_menstrual" />
            <ExcelColumn label="Partos" value="partos" />
            <ExcelColumn label="Abortos" value="abortos" />
            <ExcelColumn label="Cesareas" value="cesareas" />
            <ExcelColumn
              label="Metodo Anticonceptivo"
              value="metodo_anticonceptivo"
            />
            <ExcelColumn
              label="Enfermedades Reumatologicas"
              value="enfermedades_reumatologicas"
            />
            <ExcelColumn
              label="Enfermedades del Sistema Nervioso"
              value="enfermedades_sistema_nervioso"
            />
            <ExcelColumn label="Sindrome" value="sindrome" />
            <ExcelColumn label="Malformaciones" value="malformaciones" />
            <ExcelColumn label="Congenitas" value="congenitas" />
            <ExcelColumn label="Diabetes" value="diabetes" />
            <ExcelColumn
              label="Hipertension Arterial Sistemica"
              value="hipertension_arterial_sistemica"
            />
            <ExcelColumn label="Cancer" value="cancer" />
            <ExcelColumn label="Cardiopatias" value="cardiopatias" />
            <ExcelColumn label="Vasculares" value="vasculares" />
            <ExcelColumn label="Pulmonares" value="pulmonares" />
            <ExcelColumn label="Heptopatias" value="heptopatias" />
            <ExcelColumn label="Nefropatias" value="nefropatias" />
            <ExcelColumn label="Digestivos" value="digestivos" />
            <ExcelColumn label="Endocrinopatias" value="endocrinopatias" />
            <ExcelColumn
              label="Trastornos Hermatologicos"
              value="trastornos_hermatologicos"
            />
            <ExcelColumn label="Dislipidemias" value="dislipidemias" />
            <ExcelColumn label="Otras" value="otras" />

            <ExcelColumn label="Tipo de Construcción" value="tipo_constr" />
            <ExcelColumn label="Suelo no regular" value="suelo_no_reg" />
            <ExcelColumn label="Escaleras" value="escaleras" />
            <ExcelColumn label="Ventilacion" value="ventilacion" />
            <ExcelColumn label="Hacinamiento" value="hacinamiento" />
            <ExcelColumn label="Adaptaciones" value="adaptaciones" />
            <ExcelColumn label="Servicio de Agua" value="serv_agua" />
            <ExcelColumn label="Servicio de Luz" value="serv_luz" />
            <ExcelColumn label="Servicio de Drenaje" value="serv_drenaje" />
            <ExcelColumn
              label="Habitos Personales de Higiene"
              value="habitos_pers_bath"
            />
            <ExcelColumn label="Higiene Bucal" value="higiente_bucal" />
            <ExcelColumn label="Defecacion" value="defecacion" />
            <ExcelColumn label="Tabaquismo" value="tabaquismo" />
            <ExcelColumn label="Alcoholismo" value="alcoholismo" />
            <ExcelColumn label="Toxicomanias" value="toxicomanias" />
            <ExcelColumn label="Alimentacion" value="alimentacion" />
            <ExcelColumn label="Trabajo" value="trabajo" />
            <ExcelColumn label="Pasatiempo" value="pasatiempo" />
            <ExcelColumn
              label="Enfermedades Infecciosas"
              value="enfermedad_infec"
            />
            <ExcelColumn
              label="Intervenciones Quirurgicas"
              value="intervenciones_quir"
            />
            <ExcelColumn label="Traumatismos" value="traumatismos" />
            <ExcelColumn label="Infiltraciones" value="infiltraciones" />
            <ExcelColumn label="Hospitalizaciones" value="hospitalizaciones" />
            <ExcelColumn
              label="Perdida del Conocimiento"
              value="perdida_conocimiento"
            />
            <ExcelColumn
              label="Intolerancia a Medicamentos"
              value="intolerancia_medicamentos"
            />
            <ExcelColumn label="Transfusiones" value="transfusiones" />
            <ExcelColumn label="Medicamentos" value="medicamentos" />
            <ExcelColumn label="ETS" value="ets" />
            <ExcelColumn label="Columna Cervical" value="columna_cervical" />
            <ExcelColumn label="Columna Dorsal" value="columna_dorsal" />
            <ExcelColumn label="Columna Lumbar" value="columna_lumbar" />
            <ExcelColumn label="Hombro" value="hombro" />
            <ExcelColumn label="Codo" value="codo" />
            <ExcelColumn label="Muñeca" value="muneca" />
            <ExcelColumn label="Mano" value="mano" />
            <ExcelColumn label="Cadera" value="cadera" />
            <ExcelColumn label="Rodilla" value="rodilla" />
            <ExcelColumn label="Tobillo" value="tobillo" />
            <ExcelColumn label="Pie" value="pie" />
            <ExcelColumn label="Dermatomas" value="dermatomas" />
            <ExcelColumn
              label="Diagnostico Fisioterapeutico"
              value="diagnostico_fisioterapeutico"
            />
            <ExcelColumn label="Pronostico" value="pronostico" />
            <ExcelColumn label="Objetivos" value="objetivos" />
            <ExcelColumn
              label="Plan Fisioterapeutico"
              value="plan_fisioterapeutico"
            />
            <ExcelColumn label="TA" value="ta" />
            <ExcelColumn label="FC" value="fc" />
            <ExcelColumn label="FR" value="fr" />
            <ExcelColumn label="Temp" value="temp" />
            <ExcelColumn label="Talla" value="talla" />
            <ExcelColumn label="Talla Anterior" value="talla_anterior" />
            <ExcelColumn label="S02" value="s02" />
            <ExcelColumn label="Peso Actual" value="peso_actual" />
            <ExcelColumn label="Peso Anterior" value="peso_anterior" />
            <ExcelColumn label="Peso Ideal" value="peso_ideal" />
            <ExcelColumn label="IMC" value="imc" />
            <ExcelColumn
              label="Estado de Conciencia"
              value="estado_conciencia"
            />
            <ExcelColumn label="Actitud" value="actitud" />
            <ExcelColumn
              label="Movimientos Anormales"
              value="movimientos_anormales"
            />
            <ExcelColumn label="Postura" value="postura" />
            <ExcelColumn label="Marcha" value="marcha" />
            <ExcelColumn
              label="Estado General de Nutrición"
              value="estado_gral_nutri"
            />
            <ExcelColumn label="Piel y Anexos" value="piel_anexos" />
            <ExcelColumn label="Cabeza" value="cabeza" />
            <ExcelColumn label="Ojos" value="ojos" />
            <ExcelColumn label="Oidos" value="oidos" />
            <ExcelColumn label="Nariz Senos" value="nariz_senos" />
            <ExcelColumn label="Boca" value="boca" />
            <ExcelColumn label="Torax" value="torax" />
            <ExcelColumn label="Vasos Sanguineos" value="vasos_sang" />
            <ExcelColumn label="Mamas" value="mamas" />
            <ExcelColumn label="Genitales" value="genitales" />
            <ExcelColumn label="Mapa del Dolor" value="zonas" />
            <ExcelColumn label="Nota de Evolución" value="nota" />
            <ExcelColumn label="Nota de Valoración: Fecha" value="fecha" />
            <ExcelColumn label="Nota de Valoración: EVA" value="eva" />
            <ExcelColumn
              label="Nota de Valoración: Pruebas Funcionales"
              value="pruebas_funcionales"
            />
            <ExcelColumn
              label="Nota de Valoración: Actividad Funcional"
              value="actividad_funcional"
            />
            <ExcelColumn label="Nota de Valoración: Fuerza" value="fuerza" />
            <ExcelColumn label="Nota de Valoración: ROM" value="rom" />
            <ExcelColumn label="Padecimiento Actual: inicio" value="inicio" />
            <ExcelColumn
              label="Padecimiento Actual: evolucion"
              value="evolucion"
            />
            <ExcelColumn label="Padecimiento Actual: actual" value="actual" />
            <ExcelColumn label="Astenia" value="astenia" />
            <ExcelColumn label="Adinamia" value="adinamia" />
            <ExcelColumn label="Anorexia" value="anorexia" />
            <ExcelColumn label="Fiebre" value="fiebre" />
            <ExcelColumn label="Perdida de Peso" value="perdida_peso" />
            <ExcelColumn label="Aparato Digestivo" value="aparato_digestivo" />
            <ExcelColumn
              label="Aparato Cardiovascular"
              value="aparato_cardiovascular"
            />
            <ExcelColumn
              label="Aparato Respiratorio"
              value="aparato_respiratorio"
            />
            <ExcelColumn label="Aparato Urinario" value="aparato_urinario" />
            <ExcelColumn label="Aparato Genital" value="aparato_genital" />
            <ExcelColumn
              label="Aparato Hermatologico"
              value="aparato_hermatologico"
            />
            <ExcelColumn label="Aparato Endocrino" value="aparato_endocrino" />
            <ExcelColumn label="Aparato Nervioso" value="aparato_nervioso" />
            <ExcelColumn label="Aparato Sensorial" value="aparato_sensorial" />
            <ExcelColumn
              label="Aparato Osteomuscular"
              value="aparato_osteomuscular"
            />
            <ExcelColumn
              label="Diagnosticos Anteriores"
              value="diagnosticos_anteriores"
            />
            <ExcelColumn
              label="Estudios de Gabinete"
              value="estudios_gabinete"
            />
            <ExcelColumn
              label="Tratamientos Anteriores"
              value="tratamientos_anteriores"
            />
            <ExcelColumn
              label="Inquietud Subyacente"
              value="inquietud_subyacente"
            />
            <ExcelColumn label="Postura: Anterior" value="anterior" />
            <ExcelColumn label="Postura: Lateral" value="lateral" />
            <ExcelColumn label="Postura: Posterior" value="posterior" />
            <ExcelColumn label="Cervical" value="cervical" />
            <ExcelColumn label="Dorsal" value="dorsal" />
            <ExcelColumn label="Sacroiliaca" value="sacroiliaca" />
            <ExcelColumn label="Hombros" value="hombros" />
          </ExcelSheet>
        </ExcelFile>
      </div>
    </Content>
  );
}
