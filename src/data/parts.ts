/**
 * Catálogo de partes automotrices con terminología venezolana.
 * Fuente: catalogo_partes_VE_venezolano.xlsx
 */

export interface PartEntry {
  id: string;
  category: string;
  subcategory: string;
  technicalName: string;
  venezuelanName: string;
  searchTags: string[];
}

export interface GlossaryEntry {
  term: string;
  technicalMeaning: string;
  context: string;
}

// ============================================================
// Glosario de términos venezolanos → significado técnico
// ============================================================
export const VENEZUELAN_GLOSSARY: GlossaryEntry[] = [
  { term: "automático", technicalMeaning: "Solenoide del motor de arranque", context: "Arranque" },
  { term: "banditas", technicalMeaning: "Zapatas de freno de tambor", context: "Frenos" },
  { term: "bandas de la caja", technicalMeaning: "Kit de fricción de caja automática", context: "Transmisión" },
  { term: "balinera", technicalMeaning: "Rodamiento de empuje del embrague", context: "Embrague" },
  { term: "bayoneta", technicalMeaning: "Varilla medidora de aceite", context: "Motor" },
  { term: "bendix", technicalMeaning: "Mecanismo de engrane del arranque", context: "Arranque" },
  { term: "block", technicalMeaning: "Bloque del motor", context: "Motor" },
  { term: "blower", technicalMeaning: "Motor del ventilador interior del A/C", context: "A/C" },
  { term: "bomba de clutch", technicalMeaning: "Cilindro maestro de embrague", context: "Embrague" },
  { term: "bomba de freno", technicalMeaning: "Cilindro maestro de freno", context: "Frenos" },
  { term: "bombín", technicalMeaning: "Cilindro de rueda / Cilindro esclavo", context: "Frenos/Embrague" },
  { term: "bomper", technicalMeaning: "Parachoques", context: "Carrocería" },
  { term: "bonete", technicalMeaning: "Capó", context: "Carrocería" },
  { term: "bulbo", technicalMeaning: "Sensor de temperatura del refrigerante", context: "Sensores" },
  { term: "cabezote", technicalMeaning: "Culata / Tapa de cilindros", context: "Motor" },
  { term: "calavera", technicalMeaning: "Luz trasera / Stop", context: "Iluminación" },
  { term: "candelita", technicalMeaning: "Bujía de precalentamiento (diesel)", context: "Diesel" },
  { term: "caucho", technicalMeaning: "Neumático", context: "Ruedas" },
  { term: "cielo raso", technicalMeaning: "Tapizado del techo interior", context: "Interior" },
  { term: "clutch", technicalMeaning: "Embrague", context: "Embrague" },
  { term: "croche", technicalMeaning: "Embrague", context: "Embrague" },
  { term: "cocuyo", technicalMeaning: "Luz antiniebla / Luz lateral", context: "Iluminación" },
  { term: "computadora del carro", technicalMeaning: "ECU / PCM", context: "Electrónica" },
  { term: "concha", technicalMeaning: "Cojinete de biela o bancada", context: "Motor" },
  { term: "copa", technicalMeaning: "Tapa/Cubierta del rin", context: "Ruedas" },
  { term: "correa de tiempo", technicalMeaning: "Correa de distribución", context: "Distribución" },
  { term: "corneta", technicalMeaning: "Parlante / Bocina", context: "Audio/Eléctrico" },
  { term: "cruceta", technicalMeaning: "Junta universal del cardán", context: "Transmisión" },
  { term: "electro", technicalMeaning: "Electroventilador del radiador", context: "Enfriamiento" },
  { term: "empacadura", technicalMeaning: "Junta / Gasket", context: "Motor/General" },
  { term: "espiga", technicalMeaning: "Base/Soporte del amortiguador", context: "Suspensión" },
  { term: "estárter", technicalMeaning: "Motor de arranque", context: "Arranque" },
  { term: "estarter", technicalMeaning: "Motor de arranque", context: "Arranque" },
  { term: "estopera", technicalMeaning: "Retén / Sello de aceite", context: "Motor/General" },
  { term: "flauta", technicalMeaning: "Riel de inyectores", context: "Combustible" },
  { term: "fuelle", technicalMeaning: "Guardapolvo de junta homocinética", context: "Transmisión" },
  { term: "goma de la meseta", technicalMeaning: "Buje del brazo de control", context: "Suspensión" },
  { term: "guaya", technicalMeaning: "Cable (clutch, acelerador, freno de mano)", context: "General" },
  { term: "hidrovac", technicalMeaning: "Servofreno / Booster de freno", context: "Frenos" },
  { term: "hub", technicalMeaning: "Manzana libre (4x4)", context: "4x4" },
  { term: "llanta", technicalMeaning: "Rin (NO es el caucho en VE)", context: "Ruedas" },
  { term: "luneta", technicalMeaning: "Vidrio trasero", context: "Vidrios" },
  { term: "manocontacto", technicalMeaning: "Sensor de presión de aceite", context: "Sensores" },
  { term: "maquinaria del vidrio", technicalMeaning: "Regulador del vidrio eléctrico", context: "Carrocería" },
  { term: "mariposa", technicalMeaning: "Cuerpo de aceleración / Throttle body", context: "Combustible" },
  { term: "meseta", technicalMeaning: "Brazo de control (control arm)", context: "Suspensión" },
  { term: "motoventilador", technicalMeaning: "Electroventilador", context: "Enfriamiento" },
  { term: "pata de motor", technicalMeaning: "Soporte/Base del motor", context: "Motor" },
  { term: "pasador eléctrico", technicalMeaning: "Actuador de seguro de puerta", context: "Carrocería" },
  { term: "pila", technicalMeaning: "Bomba de gasolina sumergida", context: "Combustible" },
  { term: "piquito", technicalMeaning: "Válvula del neumático", context: "Ruedas" },
  { term: "pito", technicalMeaning: "Bocina / Claxon", context: "Eléctrico" },
  { term: "plafonera", technicalMeaning: "Luz interior de techo", context: "Interior" },
  { term: "pluma", technicalMeaning: "Cuchilla del limpiaparabrisas", context: "Vidrios" },
  { term: "prensa", technicalMeaning: "Plato de presión del embrague", context: "Embrague" },
  { term: "punta de eje", technicalMeaning: "Junta homocinética exterior", context: "Transmisión" },
  { term: "relay", technicalMeaning: "Relé", context: "Eléctrico" },
  { term: "rin", technicalMeaning: "Rin / Rueda", context: "Ruedas" },
  { term: "rolinera", technicalMeaning: "Rodamiento", context: "General" },
  { term: "serpentina", technicalMeaning: "Correa de accesorios múltiple", context: "Correas" },
  { term: "sincrónico", technicalMeaning: "Transmisión manual", context: "Transmisión" },
  { term: "sincronico", technicalMeaning: "Transmisión manual", context: "Transmisión" },
  { term: "switch", technicalMeaning: "Interruptor / Contacto de encendido", context: "Encendido" },
  { term: "taquete", technicalMeaning: "Levantaválvulas hidráulico", context: "Motor" },
  { term: "taqué", technicalMeaning: "Levantaválvulas hidráulico", context: "Motor" },
  { term: "terminal", technicalMeaning: "Rótula de dirección", context: "Dirección" },
  { term: "timón", technicalMeaning: "Volante", context: "Dirección" },
  { term: "transfer", technicalMeaning: "Caja de transferencia 4x4", context: "4x4" },
  { term: "tripoide", technicalMeaning: "Junta homocinética interior", context: "Transmisión" },
  { term: "turbina", technicalMeaning: "Convertidor de torque", context: "Transmisión" },
];

// ============================================================
// Catálogo completo de partes (255 partes)
// Formato compacto: [id, categoría, subcategoría, nombre técnico, nombre venezolano, tags de búsqueda]
// ============================================================
const PARTS_RAW: [string, string, string, string, string, string][] = [
  // Motor - Bloque y Estructura
  ["MOT-001", "Motor", "Bloque y Estructura", "Bloque de motor", "El block", "block,bloque,motor"],
  ["MOT-002", "Motor", "Bloque y Estructura", "Culata / Tapa de cilindros", "El cabezote", "cabezote,culata,tapa"],
  ["MOT-003", "Motor", "Bloque y Estructura", "Junta de culata", "La empacadura del cabezote", "empacadura,empaque,cabezote,junta"],
  ["MOT-004", "Motor", "Bloque y Estructura", "Cárter de aceite", "El cárter", "carter,bandeja,aceite"],
  ["MOT-005", "Motor", "Bloque y Estructura", "Junta del cárter", "La empacadura del cárter", "empacadura,carter,empaque"],
  ["MOT-006", "Motor", "Bloque y Estructura", "Tapa de válvulas", "La tapa válvulas / La tapita", "tapa,valvulas,tapita"],
  ["MOT-007", "Motor", "Bloque y Estructura", "Junta de tapa de válvulas", "La empacadura de la tapa válvulas", "empacadura,tapa,valvulas"],
  ["MOT-008", "Motor", "Bloque y Estructura", "Múltiple de admisión", "El múltiple de admisión / El manifold", "multiple,manifold,admision"],
  ["MOT-009", "Motor", "Bloque y Estructura", "Junta del múltiple de admisión", "Empacadura del múltiple", "empacadura,multiple,admision"],
  ["MOT-010", "Motor", "Bloque y Estructura", "Múltiple de escape", "El múltiple de escape / El header", "multiple,escape,header"],
  ["MOT-011", "Motor", "Bloque y Estructura", "Junta del múltiple de escape", "Empacadura del escape", "empacadura,escape"],
  // Motor - Pistones y Bielas
  ["MOT-020", "Motor", "Pistones y Bielas", "Pistón", "El pistón", "piston,cilindro"],
  ["MOT-021", "Motor", "Pistones y Bielas", "Anillos de pistón", "Los anillos / Los rings", "anillos,rings,aros"],
  ["MOT-022", "Motor", "Pistones y Bielas", "Biela", "La biela", "biela"],
  ["MOT-023", "Motor", "Pistones y Bielas", "Cojinete de biela", "La concha de biela", "concha,biela,cojinete"],
  ["MOT-024", "Motor", "Pistones y Bielas", "Pasador de pistón", "El bulón / El pasador", "bulon,pasador"],
  ["MOT-025", "Motor", "Pistones y Bielas", "Camisa de cilindro", "La camisa", "camisa"],
  // Motor - Cigüeñal y Volante
  ["MOT-030", "Motor", "Cigüeñal y Volante", "Cigüeñal", "El cigüeñal", "ciguenal"],
  ["MOT-031", "Motor", "Cigüeñal y Volante", "Cojinete de bancada", "La concha de bancada", "concha,bancada,cojinete"],
  ["MOT-032", "Motor", "Cigüeñal y Volante", "Volante del motor", "El volante del motor / El flywheel", "volante,flywheel"],
  ["MOT-033", "Motor", "Cigüeñal y Volante", "Volante bimasa", "El volante bimasa", "volante,bimasa"],
  ["MOT-034", "Motor", "Cigüeñal y Volante", "Polea del cigüeñal", "La polea del cigüeñal / El damper", "polea,ciguenal,damper"],
  ["MOT-035", "Motor", "Cigüeñal y Volante", "Retén delantero cigüeñal", "La estopera delantera del cigüeñal", "estopera,ciguenal,reten"],
  ["MOT-036", "Motor", "Cigüeñal y Volante", "Retén trasero cigüeñal", "La estopera trasera del cigüeñal", "estopera,ciguenal,reten"],
  // Motor - Árbol de Levas y Válvulas
  ["MOT-040", "Motor", "Árbol de Levas y Válvulas", "Árbol de levas", "El árbol de levas", "arbol,levas"],
  ["MOT-041", "Motor", "Árbol de Levas y Válvulas", "Válvula de admisión", "Las válvulas de admisión", "valvula,admision"],
  ["MOT-042", "Motor", "Árbol de Levas y Válvulas", "Válvula de escape", "Las válvulas de escape", "valvula,escape"],
  ["MOT-043", "Motor", "Árbol de Levas y Válvulas", "Resorte de válvula", "El resorte de válvula", "resorte,valvula"],
  ["MOT-044", "Motor", "Árbol de Levas y Válvulas", "Guía de válvula", "La guía de válvula", "guia,valvula"],
  ["MOT-045", "Motor", "Árbol de Levas y Válvulas", "Sello de válvula", "El sello de válvula / La gomita de válvula", "sello,valvula,gomita"],
  ["MOT-046", "Motor", "Árbol de Levas y Válvulas", "Balancín", "El balancín / El rocker", "balancin,rocker"],
  ["MOT-047", "Motor", "Árbol de Levas y Válvulas", "Levantaválvulas hidráulico", "El taquete / El taqué", "taquete,taque,levantavalvulas"],
  ["MOT-048", "Motor", "Árbol de Levas y Válvulas", "Varilla empujadora", "La varilla / El pushrod", "varilla,pushrod"],
  // Motor - Lubricación
  ["MOT-050", "Motor", "Lubricación", "Bomba de aceite", "La bomba de aceite", "bomba,aceite"],
  ["MOT-051", "Motor", "Lubricación", "Enfriador de aceite", "El enfriador de aceite / El oil cooler", "enfriador,aceite,oil cooler"],
  ["MOT-052", "Motor", "Lubricación", "Varilla medidora de aceite", "La bayoneta del aceite", "bayoneta,varilla,aceite"],
  ["MOT-053", "Motor", "Lubricación", "Tapón de drenaje", "El tapón del cárter", "tapon,carter,drenaje"],
  // Motor - Turbo
  ["MOT-060", "Motor", "Turbo / Sobrealimentación", "Turbocompresor", "El turbo", "turbo,turbocompresor"],
  ["MOT-061", "Motor", "Turbo / Sobrealimentación", "Intercooler", "El intercooler", "intercooler"],
  ["MOT-062", "Motor", "Turbo / Sobrealimentación", "Válvula wastegate", "La wastegate", "wastegate"],
  ["MOT-063", "Motor", "Turbo / Sobrealimentación", "Válvula blow-off", "La blow-off", "blow-off,blowoff"],
  // Motor - Soportes
  ["MOT-070", "Motor", "Soportes", "Soporte del motor", "La pata de motor / La base del motor", "pata,base,soporte,motor"],
  ["MOT-071", "Motor", "Soportes", "Soporte de transmisión", "La pata de la caja / La base de la caja", "pata,base,soporte,caja"],
  // Transmisión y Embrague - Caja Manual
  ["TRA-001", "Transmisión y Embrague", "Caja Manual", "Transmisión manual", "La caja sincrónica / La caja de cambios", "caja,sincronica,sincronico,cambios"],
  ["TRA-002", "Transmisión y Embrague", "Caja Manual", "Sincronizador", "El sincrónico / El sincro", "sincronico,sincro,sincronizador"],
  ["TRA-003", "Transmisión y Embrague", "Caja Manual", "Engranaje de velocidad", "El piñón / La corona de la caja", "pinon,corona,engranaje"],
  ["TRA-004", "Transmisión y Embrague", "Caja Manual", "Horquilla de cambios", "La horquilla", "horquilla"],
  ["TRA-005", "Transmisión y Embrague", "Caja Manual", "Palanca y cable de cambios", "La palanca de cambios / La guaya de la caja", "palanca,guaya,cambios"],
  ["TRA-006", "Transmisión y Embrague", "Caja Manual", "Rodamiento de la caja", "La rolinera de la caja", "rolinera,rodamiento,caja"],
  // Transmisión - Clutch / Embrague
  ["TRA-010", "Transmisión y Embrague", "Clutch / Embrague", "Disco de embrague", "El disco de clutch / El clutch", "disco,clutch,embrague,croche"],
  ["TRA-011", "Transmisión y Embrague", "Clutch / Embrague", "Plato de presión", "La prensa / El plato", "prensa,plato,presion"],
  ["TRA-012", "Transmisión y Embrague", "Clutch / Embrague", "Rodamiento de empuje", "La balinera del clutch / El collarín", "balinera,collarin,rodamiento,clutch"],
  ["TRA-013", "Transmisión y Embrague", "Clutch / Embrague", "Cable de embrague", "La guaya del clutch", "guaya,cable,clutch"],
  ["TRA-014", "Transmisión y Embrague", "Clutch / Embrague", "Cilindro maestro de embrague", "La bomba de clutch / La bomba de arriba", "bomba,clutch,cilindro,maestro"],
  ["TRA-015", "Transmisión y Embrague", "Clutch / Embrague", "Cilindro auxiliar de embrague", "El bombín del clutch / La bomba de abajo", "bombin,clutch,cilindro,auxiliar"],
  // Transmisión - Caja Automática
  ["TRA-020", "Transmisión y Embrague", "Caja Automática", "Transmisión automática", "La caja automática", "caja,automatica"],
  ["TRA-021", "Transmisión y Embrague", "Caja Automática", "Convertidor de torque", "La turbina", "turbina,convertidor,torque"],
  ["TRA-022", "Transmisión y Embrague", "Caja Automática", "Kit de fricción", "Las bandas / Los discos de la caja", "bandas,discos,friccion,caja"],
  ["TRA-023", "Transmisión y Embrague", "Caja Automática", "Cuerpo de válvulas", "El cuerpo de válvulas / El cerebro de la caja", "cuerpo,valvulas,cerebro,caja"],
  ["TRA-024", "Transmisión y Embrague", "Caja Automática", "Solenoides de caja", "Los solenoides de la caja", "solenoides,caja"],
  ["TRA-025", "Transmisión y Embrague", "Caja Automática", "Filtro de transmisión automática", "El filtro de la caja", "filtro,caja,transmision"],
  ["TRA-026", "Transmisión y Embrague", "Caja Automática", "Sellos de la caja", "Las estoperas de la caja", "estoperas,sellos,caja"],
  // Transmisión - CVT / DCT
  ["TRA-030", "Transmisión y Embrague", "CVT / DCT", "Transmisión CVT", "La caja CVT / La caja variable", "cvt,variable,caja"],
  ["TRA-031", "Transmisión y Embrague", "CVT / DCT", "Correa/Cadena CVT", "La correa de la CVT", "correa,cvt"],
  ["TRA-032", "Transmisión y Embrague", "CVT / DCT", "Transmisión DCT", "La caja de doble clutch / La DCT", "dct,doble,clutch"],
  ["TRA-033", "Transmisión y Embrague", "CVT / DCT", "Mecatrónica DCT", "La mecatrónica", "mecatronica"],
  // Transmisión - Cardán y Juntas
  ["TRA-040", "Transmisión y Embrague", "Cardán y Juntas", "Eje cardánico", "El cardán", "cardan"],
  ["TRA-041", "Transmisión y Embrague", "Cardán y Juntas", "Junta universal", "La cruceta", "cruceta,junta,universal"],
  ["TRA-042", "Transmisión y Embrague", "Cardán y Juntas", "Soporte central del cardán", "La rolinera del cardán / El soporte central", "rolinera,cardan,soporte"],
  ["TRA-043", "Transmisión y Embrague", "Cardán y Juntas", "Junta homocinética interior", "El tripoide", "tripoide,homocinetica,interior"],
  ["TRA-044", "Transmisión y Embrague", "Cardán y Juntas", "Junta homocinética exterior", "La punta de eje", "punta,eje,homocinetica,exterior"],
  ["TRA-045", "Transmisión y Embrague", "Cardán y Juntas", "Guardapolvo de junta", "El fuelle / La goma de la punta", "fuelle,goma,punta,guardapolvo"],
  ["TRA-046", "Transmisión y Embrague", "Cardán y Juntas", "Semi-eje completo", "La flecha / El semi-eje / El palier", "flecha,semi-eje,palier"],
  // Sistema de Enfriamiento
  ["ENF-001", "Sistema de Enfriamiento", "Radiador", "Radiador", "El radiador", "radiador"],
  ["ENF-002", "Sistema de Enfriamiento", "Radiador", "Tapa del radiador", "La tapa del radiador / La tapita", "tapa,radiador"],
  ["ENF-003", "Sistema de Enfriamiento", "Radiador", "Manguera del radiador", "La manguera del radiador (alta/baja)", "manguera,radiador"],
  ["ENF-004", "Sistema de Enfriamiento", "Bomba y Termostato", "Bomba de agua", "La bomba de agua", "bomba,agua"],
  ["ENF-005", "Sistema de Enfriamiento", "Bomba y Termostato", "Termostato", "El termostato", "termostato"],
  ["ENF-006", "Sistema de Enfriamiento", "Ventilador", "Electro-ventilador", "El electro / El motoventilador", "electro,motoventilador,ventilador"],
  ["ENF-007", "Sistema de Enfriamiento", "Ventilador", "Aspas del ventilador mecánico", "El fan clutch / El abanico", "fan,clutch,abanico"],
  ["ENF-008", "Sistema de Enfriamiento", "Depósito", "Depósito de expansión", "El envase del agua / El depósito", "envase,deposito,expansion,agua"],
  // Sistema de Combustible
  ["COM-001", "Sistema de Combustible", "Tanque y Bomba", "Tanque de combustible", "El tanque de gasolina", "tanque,gasolina"],
  ["COM-002", "Sistema de Combustible", "Tanque y Bomba", "Bomba de combustible", "La pila / La bomba de gasolina", "pila,bomba,gasolina,combustible"],
  ["COM-003", "Sistema de Combustible", "Tanque y Bomba", "Sensor de nivel", "El flotante / El sensor del tanque", "flotante,sensor,tanque,nivel"],
  ["COM-004", "Sistema de Combustible", "Inyección", "Inyector de combustible", "El inyector", "inyector"],
  ["COM-005", "Sistema de Combustible", "Inyección", "Riel de inyectores", "La flauta / El riel", "flauta,riel,inyectores"],
  ["COM-006", "Sistema de Combustible", "Inyección", "Regulador de presión", "El regulador de gasolina", "regulador,gasolina,presion"],
  ["COM-007", "Sistema de Combustible", "Inyección", "Cuerpo de aceleración", "El cuerpo de aceleración / El throttle", "cuerpo,aceleracion,throttle,mariposa"],
  ["COM-008", "Sistema de Combustible", "Inyección", "Válvula IAC", "La válvula IAC / La válvula de mínima", "iac,valvula,minima"],
  ["COM-009", "Sistema de Combustible", "Carburador", "Carburador", "El carburador", "carburador"],
  ["COM-010", "Sistema de Combustible", "Carburador", "Kit de reparación carburador", "El kit del carburador / El diafragma", "kit,carburador,diafragma"],
  ["COM-011", "Sistema de Combustible", "Líneas", "Manguera de combustible", "La manguera de gasolina", "manguera,gasolina"],
  ["COM-012", "Sistema de Combustible", "Líneas", "Filtro de gasolina", "El filtro de gasolina", "filtro,gasolina"],
  // Sistema Eléctrico
  ["ELE-001", "Sistema Eléctrico", "Batería", "Batería", "La batería", "bateria"],
  ["ELE-002", "Sistema Eléctrico", "Batería", "Bornes / Terminales", "Los bornes", "bornes,terminales,bateria"],
  ["ELE-003", "Sistema Eléctrico", "Cableado", "Caja de fusibles", "La caja de fusibles", "caja,fusibles"],
  ["ELE-004", "Sistema Eléctrico", "Cableado", "Fusible", "El fusible", "fusible"],
  ["ELE-005", "Sistema Eléctrico", "Cableado", "Relé", "El relay", "relay,rele"],
  ["ELE-006", "Sistema Eléctrico", "Cableado", "Arnés de cables", "El ramal / El arnés", "ramal,arnes,cables"],
  // Sistema de Encendido
  ["ELE-010", "Sistema de Encendido", "Bujías", "Bujía", "La bujía", "bujia"],
  ["ELE-011", "Sistema de Encendido", "Bujías", "Cable de bujía", "El cable de bujía", "cable,bujia"],
  ["ELE-012", "Sistema de Encendido", "Bobinas", "Bobina de encendido", "La bobina", "bobina,encendido"],
  ["ELE-013", "Sistema de Encendido", "Bobinas", "Bobina individual (COP)", "La bobina individual / El coil on plug", "bobina,individual,cop,coil"],
  ["ELE-014", "Sistema de Encendido", "Distribuidor", "Tapa y rotor del distribuidor", "La tapa del distribuidor / El rotor", "tapa,distribuidor,rotor"],
  ["ELE-015", "Sistema de Encendido", "Arranque", "Switch de encendido", "El switch / El contacto", "switch,contacto,encendido"],
  ["ELE-016", "Sistema de Encendido", "Arranque", "Bujía precalentamiento (diesel)", "La candelita / El calentador", "candelita,calentador,diesel"],
  // Sistema de Carga y Arranque
  ["ELE-020", "Sistema de Carga y Arranque", "Alternador", "Alternador", "El alternador", "alternador"],
  ["ELE-021", "Sistema de Carga y Arranque", "Arranque", "Motor de arranque", "El arranque / El estárter", "arranque,estarter,starter"],
  ["ELE-022", "Sistema de Carga y Arranque", "Arranque", "Bendix del arranque", "El bendix", "bendix"],
  ["ELE-023", "Sistema de Carga y Arranque", "Arranque", "Automático del arranque", "El automático / El solenoide", "automatico,solenoide,arranque"],
  // Iluminación
  ["ILU-001", "Iluminación", "Faros", "Faro delantero completo", "El faro / La farola", "faro,farola"],
  ["ILU-002", "Iluminación", "Faros", "Bombillo de faro", "El bombillo / La luz", "bombillo,luz,faro"],
  ["ILU-003", "Iluminación", "Traseras", "Luz trasera / Stop", "El stop / La calavera", "stop,calavera,luz,trasera"],
  ["ILU-004", "Iluminación", "Traseras", "Tercera luz de freno", "El tercer stop", "tercer,stop"],
  ["ILU-005", "Iluminación", "Direccionales", "Luz direccional", "La direccional / El cruce", "direccional,cruce"],
  ["ILU-006", "Iluminación", "Antiniebla", "Luz antiniebla", "El cocuyo / La antiniebla", "cocuyo,antiniebla"],
  ["ILU-007", "Iluminación", "Interior", "Luz interior de techo", "La plafonera / La luz de techo", "plafonera,luz,techo"],
  ["ILU-008", "Iluminación", "Interior", "Luz de placa", "La luz de la placa", "luz,placa"],
  // Suspensión Delantera
  ["SUS-001", "Suspensión", "Amortiguadores", "Amortiguador delantero", "El amortiguador delantero", "amortiguador,delantero"],
  ["SUS-002", "Suspensión", "Amortiguadores", "Base del amortiguador", "La espiga / La base del amortiguador", "espiga,base,amortiguador"],
  ["SUS-003", "Suspensión", "Amortiguadores", "Rodamiento base amortiguador", "La rolinera de la espiga", "rolinera,espiga"],
  ["SUS-004", "Suspensión", "Resortes", "Resorte espiral", "El espiral / El resorte", "espiral,resorte"],
  ["SUS-005", "Suspensión", "Brazos y Rótulas", "Brazo de control inferior", "La meseta inferior / La tijera", "meseta,inferior,tijera,brazo"],
  ["SUS-006", "Suspensión", "Brazos y Rótulas", "Brazo de control superior", "La meseta superior", "meseta,superior,brazo"],
  ["SUS-007", "Suspensión", "Brazos y Rótulas", "Rótula inferior", "La rótula inferior / El muñón inferior", "rotula,munon,inferior"],
  ["SUS-008", "Suspensión", "Brazos y Rótulas", "Rótula superior", "La rótula superior", "rotula,superior"],
  ["SUS-009", "Suspensión", "Bujes y Barras", "Buje de brazo de control", "La goma de la meseta / El buje", "goma,meseta,buje"],
  ["SUS-010", "Suspensión", "Bujes y Barras", "Barra estabilizadora", "La barra estabilizadora / La barra antivuelco", "barra,estabilizadora,antivuelco"],
  ["SUS-011", "Suspensión", "Bujes y Barras", "Buje de barra estabilizadora", "La goma de la barra / El buje", "goma,barra,buje"],
  ["SUS-012", "Suspensión", "Bujes y Barras", "Link / Terminal estabilizadora", "El link de la barra / El terminal", "link,barra,terminal"],
  // Suspensión Trasera
  ["SUS-020", "Suspensión", "Amortiguadores", "Amortiguador trasero", "El amortiguador trasero", "amortiguador,trasero"],
  ["SUS-021", "Suspensión", "Ballestas", "Ballesta / Muelle de hoja", "La ballesta / El muelle / Las hojas", "ballesta,muelle,hojas"],
  ["SUS-022", "Suspensión", "Ballestas", "Buje de ballesta", "La goma del ojo / El buje de la ballesta", "goma,ojo,buje,ballesta"],
  ["SUS-023", "Suspensión", "Ballestas", "Abrazadera U de ballesta", "El U-bolt / La abrazadera", "ubolt,abrazadera,ballesta"],
  // Dirección
  ["DIR-001", "Dirección", "Cremallera", "Cremallera de dirección", "La cremallera / La cajetín de dirección", "cremallera,cajetin,direccion"],
  ["DIR-002", "Dirección", "Cremallera", "Caja de dirección", "La caja de dirección / El sector", "caja,direccion,sector"],
  ["DIR-003", "Dirección", "Terminales", "Terminal de dirección exterior", "El terminal de dirección", "terminal,direccion"],
  ["DIR-004", "Dirección", "Terminales", "Barra de acoplamiento interior", "La bieleta / El terminal interior", "bieleta,terminal,interior"],
  ["DIR-005", "Dirección", "Terminales", "Brazo Pitman", "El brazo Pitman", "brazo,pitman"],
  ["DIR-006", "Dirección", "Terminales", "Brazo loco", "El brazo loco / El idler", "brazo,loco,idler"],
  ["DIR-007", "Dirección", "Terminales", "Barra central", "La barra central / El center link", "barra,central,center,link"],
  ["DIR-008", "Dirección", "Bomba", "Bomba de dirección hidráulica", "La bomba de la dirección", "bomba,direccion,hidraulica"],
  ["DIR-009", "Dirección", "Bomba", "Manguera de dirección presión", "La manguera de presión de la dirección", "manguera,presion,direccion"],
  ["DIR-010", "Dirección", "Bomba", "Manguera de retorno dirección", "La manguera de retorno", "manguera,retorno,direccion"],
  ["DIR-011", "Dirección", "Volante", "Volante", "El volante / El timón", "volante,timon"],
  // Frenos
  ["FRE-001", "Frenos", "Disco", "Disco de freno delantero", "El disco delantero", "disco,freno,delantero"],
  ["FRE-002", "Frenos", "Disco", "Disco de freno trasero", "El disco trasero", "disco,freno,trasero"],
  ["FRE-003", "Frenos", "Pastillas", "Pastillas de freno delanteras", "Las pastillas delanteras", "pastillas,freno,delanteras"],
  ["FRE-004", "Frenos", "Pastillas", "Pastillas de freno traseras", "Las pastillas traseras", "pastillas,freno,traseras"],
  ["FRE-005", "Frenos", "Caliper", "Caliper / Mordaza", "El caliper / La mordaza", "caliper,mordaza"],
  ["FRE-006", "Frenos", "Caliper", "Kit de reparación caliper", "El kit del caliper / Las gomitas del caliper", "kit,caliper,gomitas"],
  ["FRE-007", "Frenos", "Tambor", "Tambor de freno", "El tambor", "tambor,freno"],
  ["FRE-008", "Frenos", "Tambor", "Bandas / Zapatas de freno", "Las banditas / Las zapatas", "banditas,zapatas,bandas,freno"],
  ["FRE-009", "Frenos", "Tambor", "Cilindro de rueda", "El bombín de freno / El cilindrito", "bombin,cilindro,rueda"],
  ["FRE-010", "Frenos", "Sistema Hidráulico", "Cilindro maestro de freno", "La bomba de freno / El cilindro maestro", "bomba,freno,cilindro,maestro"],
  ["FRE-011", "Frenos", "Sistema Hidráulico", "Servofreno / Booster", "El hidrovac / El booster", "hidrovac,booster,servofreno"],
  ["FRE-012", "Frenos", "Sistema Hidráulico", "Manguera de freno flexible", "La manguera de freno / El latigillo", "manguera,freno,latigillo"],
  ["FRE-013", "Frenos", "Sistema Hidráulico", "Tubería de freno rígida", "La cañería de freno / El tubo", "caneria,tubo,freno"],
  ["FRE-014", "Frenos", "Freno de mano", "Cable de freno de mano", "La guaya del freno de mano", "guaya,freno,mano"],
  ["FRE-015", "Frenos", "ABS", "Módulo ABS", "El módulo del ABS / La bomba del ABS", "modulo,abs,bomba"],
  ["FRE-016", "Frenos", "ABS", "Sensor de velocidad ABS", "El sensor del ABS", "sensor,abs"],
  // Ruedas y Neumáticos
  ["RUE-001", "Ruedas y Neumáticos", "Cauchos", "Neumático", "El caucho", "caucho,neumatico"],
  ["RUE-002", "Ruedas y Neumáticos", "Cauchos", "Caucho de repuesto", "El caucho de repuesto / La de emergencia", "caucho,repuesto,emergencia"],
  ["RUE-003", "Ruedas y Neumáticos", "Rines", "Rin / Rueda", "El rin / La llanta", "rin,llanta,rueda"],
  ["RUE-004", "Ruedas y Neumáticos", "Rines", "Tapa de rin", "La copa / La tapa del rin", "copa,tapa,rin"],
  ["RUE-005", "Ruedas y Neumáticos", "Accesorios", "Tuerca de rueda", "La tuerca de la llanta / El birlo", "tuerca,llanta,birlo"],
  ["RUE-006", "Ruedas y Neumáticos", "Accesorios", "Válvula de neumático", "El piquito del caucho / La válvula", "piquito,caucho,valvula"],
  ["RUE-007", "Ruedas y Neumáticos", "Rodamientos", "Rodamiento de rueda delantero", "La rolinera delantera", "rolinera,delantera,rodamiento"],
  ["RUE-008", "Ruedas y Neumáticos", "Rodamientos", "Rodamiento de rueda trasero", "La rolinera trasera", "rolinera,trasera,rodamiento"],
  ["RUE-009", "Ruedas y Neumáticos", "Manzana", "Manzana / Hub", "La manzana / El hub", "manzana,hub"],
  // Carrocería Exterior
  ["CAR-001", "Carrocería", "Estructura", "Capó", "El capó / El bonete", "capo,bonete"],
  ["CAR-002", "Carrocería", "Estructura", "Guardafango delantero", "El guardafango / El tapabarros", "guardafango,tapabarros"],
  ["CAR-003", "Carrocería", "Parachoques", "Parachoques delantero", "El bomper delantero / El parachoques", "bomper,parachoques,delantero"],
  ["CAR-004", "Carrocería", "Parachoques", "Parachoques trasero", "El bomper trasero", "bomper,parachoques,trasero"],
  ["CAR-005", "Carrocería", "Parrilla", "Parrilla frontal", "La parrilla / La rejilla", "parrilla,rejilla"],
  ["CAR-006", "Carrocería", "Puertas", "Puerta", "La puerta", "puerta"],
  ["CAR-007", "Carrocería", "Puertas", "Manilla exterior", "La manilla / La manija", "manilla,manija"],
  ["CAR-008", "Carrocería", "Puertas", "Seguro eléctrico de puerta", "El pasador eléctrico / El actuador", "pasador,electrico,actuador"],
  ["CAR-009", "Carrocería", "Vidrios eléctricos", "Regulador de vidrio", "La maquinaria del vidrio", "maquinaria,vidrio,regulador"],
  ["CAR-010", "Carrocería", "Vidrios eléctricos", "Motor del vidrio eléctrico", "El motorcito del vidrio", "motorcito,vidrio,motor"],
  ["CAR-011", "Carrocería", "Molduras", "Estribo / Pisadera", "El estribo / La pisadera", "estribo,pisadera"],
  ["CAR-012", "Carrocería", "Molduras", "Guardabarro trasero", "El guardapolvo / La faldilla", "guardapolvo,faldilla"],
  // Vidrios y Espejos
  ["VID-001", "Carrocería", "Vidrios", "Parabrisas", "El parabrisas", "parabrisas"],
  ["VID-002", "Carrocería", "Vidrios", "Vidrio trasero", "La luneta / El vidrio de atrás", "luneta,vidrio,trasero"],
  ["VID-003", "Carrocería", "Espejos", "Espejo retrovisor exterior", "El espejo / El retrovisor", "espejo,retrovisor"],
  ["VID-004", "Carrocería", "Espejos", "Espejo retrovisor interior", "El espejo de adentro", "espejo,retrovisor,interior"],
  ["VID-005", "Carrocería", "Limpiaparabrisas", "Cuchilla limpiaparabrisas", "La pluma / El limpia", "pluma,limpia,limpiaparabrisas,cuchilla"],
  ["VID-006", "Carrocería", "Limpiaparabrisas", "Motor limpiaparabrisas", "El motor de las plumas", "motor,plumas,limpiaparabrisas"],
  // Interior
  ["INT-001", "Carrocería", "Tablero", "Tablero completo", "El tablero / El dashboard", "tablero,dashboard"],
  ["INT-002", "Carrocería", "Tablero", "Guantera", "La guantera", "guantera"],
  ["INT-003", "Carrocería", "Instrumentos", "Cluster de instrumentos", "El tablero de instrumentos / Los relojes", "cluster,instrumentos,relojes"],
  ["INT-004", "Carrocería", "Controles", "Clock spring", "El resorte del airbag / El espiral", "clockspring,resorte,airbag,espiral"],
  ["INT-005", "Carrocería", "Tapicería", "Tapizado de techo", "El cielo raso", "cielo,raso,tapizado,techo"],
  ["INT-006", "Carrocería", "Tapicería", "Panel de puerta", "El tapizado de puerta / El forrito", "tapizado,puerta,forrito,panel"],
  // Climatización
  ["CLI-001", "Sistema de Climatización", "Compresor", "Compresor A/C", "El compresor del aire", "compresor,aire,ac"],
  ["CLI-002", "Sistema de Climatización", "Compresor", "Clutch del compresor", "El clutch del compresor / La polea", "clutch,compresor,polea"],
  ["CLI-003", "Sistema de Climatización", "Condensador", "Condensador A/C", "El condensador", "condensador,aire"],
  ["CLI-004", "Sistema de Climatización", "Evaporador", "Evaporador A/C", "El evaporador", "evaporador"],
  ["CLI-005", "Sistema de Climatización", "Evaporador", "Válvula de expansión", "La válvula de expansión", "valvula,expansion"],
  ["CLI-006", "Sistema de Climatización", "Filtro", "Filtro deshidratador", "El filtro secante / El acumulador", "filtro,secante,acumulador,deshidratador"],
  ["CLI-007", "Sistema de Climatización", "Filtro", "Filtro de cabina", "El filtro de la cabina / El filtro de polen", "filtro,cabina,polen"],
  ["CLI-008", "Sistema de Climatización", "Ventilador", "Motor del blower", "El blower / El ventilador del aire", "blower,ventilador,aire"],
  ["CLI-009", "Sistema de Climatización", "Ventilador", "Resistencia del blower", "La resistencia del blower", "resistencia,blower"],
  ["CLI-010", "Sistema de Climatización", "Mangueras", "Manguera de A/C", "La manguera del aire (alta/baja)", "manguera,aire,ac"],
  // Seguridad
  ["SEG-001", "Seguridad", "Airbag", "Airbag del conductor", "El airbag", "airbag"],
  ["SEG-002", "Seguridad", "Cinturón", "Cinturón de seguridad", "El cinturón", "cinturon,seguridad"],
  ["SEG-003", "Seguridad", "Sensores", "Sensor de estacionamiento", "El sensor de retroceso", "sensor,retroceso,estacionamiento"],
  ["SEG-004", "Seguridad", "Cámara", "Cámara de retroceso", "La cámara de retroceso", "camara,retroceso"],
  // Diferencial y Eje Trasero
  ["DIF-001", "Diferencial", "Diferencial", "Diferencial (corona y piñón)", "El diferencial / La corona", "diferencial,corona,pinon"],
  ["DIF-002", "Diferencial", "Diferencial", "Estopera del piñón", "La estopera del piñón", "estopera,pinon"],
  ["DIF-003", "Diferencial", "Semi-eje", "Semi-eje trasero", "El semi-eje / El palier", "semi-eje,palier"],
  ["DIF-004", "Diferencial", "Semi-eje", "Rodamiento de semi-eje", "La rolinera del semi-eje", "rolinera,semi-eje"],
  // 4x4
  ["4X4-001", "Sistema 4x4", "Transfer", "Caja de transferencia", "La transfer / La caja reductora", "transfer,caja,reductora"],
  ["4X4-002", "Sistema 4x4", "Transfer", "Cadena de transferencia", "La cadena de la transfer", "cadena,transfer"],
  ["4X4-003", "Sistema 4x4", "Hubs", "Hub de manzana libre", "Los hubs / Las manzanas libres", "hubs,manzanas,libres"],
  ["4X4-004", "Sistema 4x4", "Cardán 4x4", "Cardán delantero 4x4", "El cardán delantero", "cardan,delantero"],
  // Pickup / Carga
  ["PKP-001", "Carrocería", "Batea", "Caja de carga", "La batea / El platón / La caja", "batea,platon,caja,carga"],
  ["PKP-002", "Carrocería", "Batea", "Compuerta trasera", "La compuerta / El tailgate", "compuerta,tailgate"],
  ["PKP-003", "Carrocería", "Batea", "Protector de batea", "El bedliner / El protector", "bedliner,protector,batea"],
  ["PKP-004", "Carrocería", "Enganche", "Bola de remolque", "La bola / El gancho", "bola,gancho,remolque"],
  // Fluidos y Lubricantes
  ["FLU-001", "Aceites y Filtros", "Motor", "Aceite de motor", "El aceite (de motor)", "aceite,motor"],
  ["FLU-002", "Aceites y Filtros", "Motor", "Refrigerante", "El coolant / El refrigerante / El anticongelante", "coolant,refrigerante,anticongelante"],
  ["FLU-003", "Aceites y Filtros", "Transmisión", "Aceite de caja manual", "El aceite de la caja", "aceite,caja"],
  ["FLU-004", "Aceites y Filtros", "Transmisión", "Aceite ATF", "El aceite de la caja automática / ATF", "aceite,atf,caja,automatica"],
  ["FLU-005", "Aceites y Filtros", "Frenos", "Líquido de frenos", "El líquido de frenos", "liquido,frenos"],
  ["FLU-006", "Aceites y Filtros", "Dirección", "Líquido de dirección", "El aceite de la dirección", "aceite,direccion"],
  ["FLU-007", "Aceites y Filtros", "Diferencial", "Aceite de diferencial", "El aceite de la corona / Del diferencial", "aceite,corona,diferencial"],
  ["FLU-008", "Aceites y Filtros", "A/C", "Gas refrigerante A/C", "El gas del aire", "gas,aire,refrigerante"],
  // Filtros
  ["FIL-001", "Aceites y Filtros", "Motor", "Filtro de aceite", "El filtro de aceite", "filtro,aceite"],
  ["FIL-002", "Aceites y Filtros", "Motor", "Filtro de aire", "El filtro de aire", "filtro,aire"],
  ["FIL-003", "Aceites y Filtros", "Combustible", "Filtro de gasolina", "El filtro de gasolina", "filtro,gasolina"],
  ["FIL-004", "Aceites y Filtros", "Transmisión", "Filtro de caja automática", "El filtro de la caja", "filtro,caja"],
  // Correas y Cadenas
  ["COR-001", "Correas y Cadenas", "Distribución", "Correa de distribución", "La correa de tiempo", "correa,tiempo,distribucion"],
  ["COR-002", "Correas y Cadenas", "Distribución", "Cadena de distribución", "La cadena de tiempo", "cadena,tiempo,distribucion"],
  ["COR-003", "Correas y Cadenas", "Distribución", "Tensor de correa de tiempo", "El tensor", "tensor,correa,tiempo"],
  ["COR-004", "Correas y Cadenas", "Distribución", "Polea loca de distribución", "La polea loca", "polea,loca"],
  ["COR-005", "Correas y Cadenas", "Accesorios", "Correa de accesorios", "La correa múltiple / La serpentina", "correa,multiple,serpentina"],
  ["COR-006", "Correas y Cadenas", "Accesorios", "Tensor de accesorios", "El tensor de la serpentina", "tensor,serpentina"],
  // Sensores y Electrónica
  ["SEN-001", "Sensores y Electrónica", "Motor", "Sensor CKP (posición cigüeñal)", "El sensor del cigüeñal / El CKP", "sensor,ciguenal,ckp"],
  ["SEN-002", "Sensores y Electrónica", "Motor", "Sensor CMP (posición árbol levas)", "El sensor del árbol / El CMP", "sensor,arbol,levas,cmp"],
  ["SEN-003", "Sensores y Electrónica", "Motor", "Sensor ECT (temperatura motor)", "El sensor de temperatura / El bulbo", "sensor,temperatura,bulbo,ect"],
  ["SEN-004", "Sensores y Electrónica", "Motor", "Sensor MAF (flujo de aire)", "El sensor MAF", "sensor,maf,flujo,aire"],
  ["SEN-005", "Sensores y Electrónica", "Motor", "Sensor TPS (acelerador)", "El sensor TPS / El sensor de la mariposa", "sensor,tps,mariposa,acelerador"],
  ["SEN-006", "Sensores y Electrónica", "Motor", "Sensor de oxígeno", "El sensor de oxígeno / La sonda lambda", "sensor,oxigeno,sonda,lambda"],
  ["SEN-007", "Sensores y Electrónica", "Motor", "Sensor de presión de aceite", "El manocontacto / El sensor de aceite", "manocontacto,sensor,aceite,presion"],
  ["SEN-008", "Sensores y Electrónica", "Computadora", "ECU / PCM", "La computadora del carro / La ECU", "computadora,ecu,pcm"],
  ["SEN-009", "Sensores y Electrónica", "Computadora", "TCU (computadora transmisión)", "La computadora de la caja", "computadora,tcu,caja"],
  // Sistema de Gas
  ["GAS-001", "Sistema de Gas", "Tanque", "Cilindro GNV", "La bombona / El cilindro de gas", "bombona,cilindro,gas,gnv"],
  ["GAS-002", "Sistema de Gas", "Regulador", "Regulador de presión GNV", "El regulador de gas", "regulador,gas"],
  ["GAS-003", "Sistema de Gas", "Inyección", "Riel de inyectores de gas", "El riel de gas / Los inyectores de gas", "riel,inyectores,gas"],
  ["GAS-004", "Sistema de Gas", "Switch", "Conmutador gas-gasolina", "El switch de gas", "switch,gas,conmutador"],
  // Audio
  ["AUD-001", "Accesorios", "Radio", "Radio / Head unit", "El reproductor / La radio / El estéreo", "radio,reproductor,estereo"],
  ["AUD-002", "Accesorios", "Parlantes", "Parlante de puerta", "La corneta / El parlante", "corneta,parlante"],
  ["AUD-003", "Accesorios", "Parlantes", "Subwoofer", "El bajo / El subwoofer", "bajo,subwoofer"],
  ["AUD-004", "Accesorios", "Corneta", "Corneta / Bocina (claxon)", "La corneta del pito / El pito", "corneta,pito,bocina,claxon"],
];

// Parse raw data into structured PartEntry objects
export const PARTS_CATALOG: PartEntry[] = PARTS_RAW.map(([id, category, subcategory, technicalName, venezuelanName, tags]) => ({
  id,
  category,
  subcategory,
  technicalName,
  venezuelanName,
  searchTags: tags.split(","),
}));

export { PART_CATEGORIES } from "./partCategories";

/**
 * Builds a compact summary of the parts catalog for AI prompts.
 * Groups by category and lists Venezuelan name → Technical name mappings.
 */
export function getPartsSummaryForPrompt(): string {
  const lines: string[] = [];

  // Group parts by category
  const byCategory = new Map<string, PartEntry[]>();
  for (const part of PARTS_CATALOG) {
    const list = byCategory.get(part.category) || [];
    list.push(part);
    byCategory.set(part.category, list);
  }

  for (const [category, parts] of Array.from(byCategory.entries())) {
    lines.push(`\n## ${category}`);
    for (const p of parts) {
      lines.push(`- ${p.venezuelanName} → ${p.technicalName} [${p.searchTags.join(", ")}]`);
    }
  }

  // Add glossary
  lines.push("\n## GLOSARIO VENEZOLANO (término → significado técnico)");
  for (const g of VENEZUELAN_GLOSSARY) {
    lines.push(`- "${g.term}" → ${g.technicalMeaning}`);
  }

  return lines.join("\n");
}
