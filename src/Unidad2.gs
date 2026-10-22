/**
 * UNIDAD 2 · INTERNET DE LAS COSAS Y HERRAMIENTAS DE GOOGLE
 * Un solo cuestionario (fusiona los dos de Moodle): 24 preguntas al azar
 * de un banco de unas 85, en tres bloques.
 *
 * Funciona igual que los de la Unidad 1 (ver los comentarios de Unidad1.gs)
 * y añade dos cosas:
 *  - fig: dibujo SVG propio que se muestra bajo el enunciado.
 *  - gen: function(rng) que FABRICA la pregunta con datos al azar (por
 *    ejemplo, las búsquedas). Usa siempre el rng que recibe (no Math.random)
 *    para que al corregir salga exactamente la misma pregunta.
 *
 * Usa las ayudas mc_, mcFixed_, tf_, multi_, match_, gaps_ de Unidad1.gs.
 * REVISAR cada curso: los operadores del buscador y los nombres de los
 * menús de Google pueden cambiar.
 */

function quizUnidad2_() {
  return {
    id: 'unidad2',
    titulo: '2 Internet de las cosas y herramientas de Google',
    subtitulo: 'IoT · Buscar bien · Drive, Documentos, Presentaciones, Hojas, Formularios y Calendar',
    icono: '📡',
    hoja: 'Unidad 2',
    legacy: false,
    scoring: 'questions',
    blocks: [
      { id: 'iot', label: 'Internet de las cosas' },
      { id: 'busq', label: 'Buscar bien' },
      { id: 'herr', label: 'Herramientas de Google' }
    ],
    cols: { email: 2, nombre: 3, apellidos: 4, grupo: 5, nota: 6 },
    tarea: {
      titulo: 'Cuestionario de la Unidad 2',
      descripcionAlumnado: 'Cuestionario de la Unidad 2: Internet de las cosas, búsquedas en internet y herramientas de Google (Drive, Documentos, Presentaciones, Hojas de cálculo, Formularios y Calendar). 24 preguntas.'
    },
    plan: [
      { b: 'iot', pool: 'iot_q', n: 2 },
      { b: 'iot', q: 'iot_flow' },
      { b: 'iot', pool: 'iot_match', n: 1 },
      { b: 'iot', pool: 'iot_caso', n: 1 },
      { b: 'iot', pool: 'iot_priv', n: 1 },
      { b: 'busq', pool: 'gen_busq', n: 4 },
      { b: 'busq', pool: 'busq_q', n: 1 },
      { b: 'busq', pool: 'busq_op', n: 1 },
      { b: 'herr', pool: 'drive_q', n: 2 },
      { b: 'herr', pool: 'docs_q', n: 1 },
      { b: 'herr', pool: 'docs_tb', n: 1 },
      { b: 'herr', pool: 'docs_align', n: 1 },
      { b: 'herr', pool: 'slides_q', n: 2 },
      { b: 'herr', pool: 'sheets_q', n: 1 },
      { b: 'herr', pool: 'sheets_gaps', n: 1 },
      { b: 'herr', pool: 'forms_q', n: 1 },
      { b: 'herr', pool: 'forms_tipo', n: 1 },
      { b: 'herr', pool: 'cal_q', n: 1 }
    ],
    questions: bancoU2_()
  };
}

// ======================================================================
//  AYUDAS PARA DIBUJOS Y PREGUNTAS GENERADAS
// ======================================================================

function esc_(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function pick_(arr, rng) {
  return arr[Math.floor(rng() * arr.length)];
}

// Barra de búsqueda con un texto escrito dentro
function barFig_(text) {
  return '<svg viewBox="0 0 400 64" style="max-width:420px" role="img" aria-label="Barra de búsqueda con el texto: ' + esc_(text) + '">' +
    '<rect width="400" height="64" fill="#ffffff"/>' +
    '<rect x="3" y="7" width="394" height="50" rx="25" fill="#ffffff" stroke="#bfc6cf" stroke-width="2"/>' +
    '<circle cx="35" cy="31" r="9" fill="none" stroke="#5f6b7a" stroke-width="3"/>' +
    '<path d="M42 38l8 8" stroke="#5f6b7a" stroke-width="3" stroke-linecap="round"/>' +
    '<text x="66" y="39" font-family="Arial,Helvetica,sans-serif" font-size="21" fill="#202124">' + esc_(text) + '</text>' +
    '</svg>';
}

// Iconos de la barra de herramientas de Documentos (caja de 24 x 24)
var ICONOS_DOCS_ = {
  undo: '<path d="M9 14 4 9l5-5M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',
  redo: '<path d="M15 14l5-5-5-5M20 9H9.5a5.5 5.5 0 0 0 0 11H13"/>',
  print: '<rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 9V3h10v6M7 14h10v7H7z"/>',
  bold: '<text x="12" y="19" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="20" fill="#3c4043" stroke="none">B</text>',
  italic: '<text x="12" y="19" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="20" fill="#3c4043" stroke="none">I</text>',
  underline: '<text x="12" y="17" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#3c4043" stroke="none">U</text><path d="M5 21.5h14"/>',
  color: '<text x="12" y="17" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="18" fill="#3c4043" stroke="none">A</text><rect x="4" y="19.5" width="16" height="3.5" fill="#d93025" stroke="none"/>',
  left: '<path d="M3 5h18M3 10h12M3 15h18M3 20h12"/>',
  center: '<path d="M3 5h18M6 10h12M3 15h18M6 20h12"/>',
  right: '<path d="M3 5h18M9 10h12M3 15h18M9 20h12"/>',
  bullets: '<circle cx="5" cy="6" r="1.6" fill="#3c4043"/><circle cx="5" cy="12" r="1.6" fill="#3c4043"/><circle cx="5" cy="18" r="1.6" fill="#3c4043"/><path d="M10 6h11M10 12h11M10 18h11"/>',
  image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M3 18l6-5 4 3 3-2 5 4"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>'
};

// Barra de herramientas con 6 botones rotulados A-F
function toolbarFig_(names) {
  var letras = ['A', 'B', 'C', 'D', 'E', 'F'];
  var out = '<svg viewBox="0 0 480 96" style="max-width:520px" role="img" aria-label="Barra de herramientas de Documentos con seis botones rotulados de la A a la F">' +
    '<rect width="480" height="96" fill="#ffffff"/>' +
    '<rect x="4" y="30" width="472" height="58" rx="29" fill="#edf2fa"/>';
  names.forEach(function (n, i) {
    var cx = 44 + i * 78;
    out += '<rect x="' + (cx - 27) + '" y="38" width="54" height="42" rx="10" fill="#ffffff" stroke="#c7ccd4"/>' +
      '<g transform="translate(' + (cx - 14) + ',45) scale(1.17)" fill="none" stroke="#3c4043" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + ICONOS_DOCS_[n] + '</g>' +
      '<circle cx="' + cx + '" cy="15" r="12" fill="#1a73e8"/>' +
      '<text x="' + cx + '" y="20.5" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="15" fill="#ffffff">' + letras[i] + '</text>';
  });
  return out + '</svg>';
}

// Un bloque de texto de mentira alineado de cuatro formas posibles
var ALINEACIONES_ = ['izquierda', 'centro', 'derecha', 'justificada'];
function textoFig_(x, y, w, modo) {
  var anchos = [1, 0.72, 0.92, 0.62, 0.84, 0.5];
  var out = '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="104" rx="6" fill="#ffffff" stroke="#bfc6cf" stroke-width="1.5"/>';
  var inner = w - 20;
  for (var i = 0; i < anchos.length; i++) {
    var ancho = anchos[i] * inner;
    if (modo === 'justificada' && i < anchos.length - 1) { ancho = inner; }
    var lx = x + 10;
    if (modo === 'centro') { lx = x + 10 + (inner - ancho) / 2; }
    if (modo === 'derecha') { lx = x + 10 + (inner - ancho); }
    if (modo === 'justificada' && i === anchos.length - 1) { ancho = anchos[i] * inner; }
    out += '<rect x="' + Math.round(lx * 10) / 10 + '" y="' + (y + 10 + i * 15) + '" width="' + Math.round(ancho * 10) / 10 + '" height="7" rx="3.5" fill="#8a94a3"/>';
  }
  return out;
}
var NOMBRE_ALINEACION_ = {
  izquierda: 'alineado a la izquierda',
  centro: 'centrado',
  derecha: 'alineado a la derecha',
  justificada: 'justificado'
};

// ======================================================================
//  PLANTILLAS DE BÚSQUEDAS (se fabrican con datos al azar)
// ======================================================================

var TEMAS_FRASE_ = ['robot aspirador económico', 'casa inteligente barata', 'sensor de temperatura casero', 'riego automático para huerto', 'cámara de seguridad wifi'];
var PAREJAS_MENOS_ = [
  ['jaguar', 'coche', 'el animal'], ['java', 'café', 'el lenguaje de programación'],
  ['python', 'serpiente', 'el lenguaje de programación'], ['apple', 'iphone', 'la fruta'],
  ['mercurio', 'planeta', 'el metal'], ['tesla', 'coche', 'el científico']
];
var TEMAS_WEB_ = [
  ['teclado', 'mediamarkt.es'], ['tiempo en Sevilla', 'aemet.es'], ['noticias de robótica', 'rtve.es'],
  ['seguridad en internet', 'incibe.es'], ['sensor', 'wikipedia.org']
];
var TEMAS_ARCHIVO_ = [
  ['energía solar', 'pdf', 'un documento PDF'], ['historia de internet', 'pptx', 'una presentación (pptx)'],
  ['horario de estudio', 'xlsx', 'una hoja de cálculo (xlsx)'], ['reciclaje', 'docx', 'un documento de Word (docx)']
];
var PAREJAS_OR_ = [
  ['alexa', '"google home"'], ['bicicleta', 'patinete'], ['arduino', '"micro:bit"'],
  ['placa solar', '"energía eólica"'], ['router', 'repetidor']
];
var PALABRAS_LEE_ = [['robot', 'educativo'], ['energía', 'solar'], ['casa', 'inteligente'], ['sensor', 'temperatura'], ['domótica', 'seguridad']];
var WEBS_LEE_ = ['wikipedia.org', 'rtve.es', 'aemet.es', 'incibe.es'];
var TIPOS_LEE_ = [['pdf', 'PDF'], ['pptx', 'presentaciones (pptx)'], ['docx', 'documentos de Word (docx)']];

function opcionesBusqueda_(correcta, falsas, rng, id, pool, prompt) {
  var q = mc_(id, pool, prompt, correcta, falsas);
  q.mono = true;
  return q;
}

var GEN_BUSQUEDAS_ = [
  {
    id: 'gen_frase', pool: 'gen_busq',
    gen: function (rng) {
      var t = pick_(TEMAS_FRASE_, rng);
      var palabras = t.split(' ');
      return opcionesBusqueda_('"' + t + '"',
        [t, '"' + palabras.join('" "') + '"', '(' + t + ')'], rng, 'x', 'x',
        'Quieres encontrar páginas que contengan exactamente la frase «' + t + '», con las palabras juntas y en ese orden. ¿Qué escribes en el buscador?');
    }
  },
  {
    id: 'gen_menos', pool: 'gen_busq',
    gen: function (rng) {
      var p = pick_(PAREJAS_MENOS_, rng);
      return opcionesBusqueda_(p[0] + ' -' + p[1],
        [p[0] + ' - ' + p[1], '-' + p[0] + ' ' + p[1], p[0] + ' +' + p[1]], rng, 'x', 'x',
        'Buscas información sobre ' + p[2] + ' «' + p[0] + '», pero te salen muchas páginas que mencionan «' + p[1] + '». ¿Cómo las excluyes de la búsqueda?');
    }
  },
  {
    id: 'gen_site', pool: 'gen_busq',
    gen: function (rng) {
      var p = pick_(TEMAS_WEB_, rng);
      return opcionesBusqueda_(p[0] + ' site:' + p[1],
        [p[0] + ' ' + p[1], p[0] + ' @' + p[1], p[0] + ' -' + p[1]], rng, 'x', 'x',
        'Quieres buscar «' + p[0] + '» pero solo dentro de la web ' + p[1] + '. ¿Qué escribes?');
    }
  },
  {
    id: 'gen_filetype', pool: 'gen_busq',
    gen: function (rng) {
      var p = pick_(TEMAS_ARCHIVO_, rng);
      return opcionesBusqueda_(p[0] + ' filetype:' + p[1],
        [p[0] + ' filetype ' + p[1], p[0] + ' type:' + p[1], 'filetype:' + p[0] + ' ' + p[1]], rng, 'x', 'x',
        'Quieres que el buscador te muestre solo ' + p[2] + ' sobre «' + p[0] + '». ¿Qué escribes?');
    }
  },
  {
    id: 'gen_or', pool: 'gen_busq',
    gen: function (rng) {
      var p = pick_(PAREJAS_OR_, rng);
      return opcionesBusqueda_(p[0] + ' OR ' + p[1],
        [p[0] + ' or ' + p[1], p[0] + ' ' + p[1], p[0] + ' -' + p[1]], rng, 'x', 'x',
        'Quieres ver páginas que hablen de «' + p[0].replace(/"/g, '') + '» o de «' + p[1].replace(/"/g, '') + '» (basta con que aparezca una de las dos cosas). ¿Qué escribes?');
    }
  },
  {
    id: 'gen_lee', pool: 'gen_busq',
    gen: function (rng) {
      var w = pick_(PALABRAS_LEE_, rng);
      var web = pick_(WEBS_LEE_, rng);
      var tipo = pick_(TIPOS_LEE_, rng);
      var kinds = [
        { q: '"' + w[0] + ' ' + w[1] + '"', d: 'Solo páginas que contienen exactamente la frase «' + w[0] + ' ' + w[1] + '»' },
        { q: w[0] + ' -' + w[1], d: 'Páginas sobre «' + w[0] + '» que NO contienen la palabra «' + w[1] + '»' },
        { q: w[0] + ' site:' + web, d: 'Páginas sobre «' + w[0] + '» únicamente dentro de la web ' + web },
        { q: w[0] + ' filetype:' + tipo[0], d: 'Solo archivos de tipo ' + tipo[1] + ' sobre «' + w[0] + '»' },
        { q: w[0] + ' OR ' + w[1], d: 'Páginas que hablan de «' + w[0] + '» o de «' + w[1] + '» (basta con una)' }
      ];
      var objetivo = Math.floor(rng() * kinds.length);
      var otras = [];
      kinds.forEach(function (k, i) { if (i !== objetivo) { otras.push(k); } });
      shuffleWith_(otras, rng);
      var q = mc_('x', 'x', '¿Qué resultados mostrará el buscador con esta búsqueda?',
        kinds[objetivo].d, [otras[0].d, otras[1].d, otras[2].d]);
      q.fig = barFig_(kinds[objetivo].q);
      return q;
    }
  }
];

// ======================================================================
//  PLANTILLAS DE DIBUJOS DE DOCUMENTOS (alineación)
// ======================================================================

var GEN_ALINEACION_ = [
  {
    id: 'al_una', pool: 'docs_align',
    gen: function (rng) {
      var modo = pick_(ALINEACIONES_, rng);
      var q = mcFixed_('x', 'x', '¿Qué alineación tiene este texto?',
        ['Izquierda', 'Centrada', 'Derecha', 'Justificada'],
        { izquierda: 'Izquierda', centro: 'Centrada', derecha: 'Derecha', justificada: 'Justificada' }[modo]);
      q.fig = '<svg viewBox="0 0 260 124" style="max-width:300px" role="img" aria-label="Un texto de ejemplo con una alineación concreta"><rect width="260" height="124" fill="#ffffff"/>' + textoFig_(20, 10, 220, modo) + '</svg>';
      return q;
    }
  },
  {
    id: 'al_cuatro', pool: 'docs_align',
    gen: function (rng) {
      var modos = shuffleWith_(ALINEACIONES_.slice(), rng);
      var objetivo = Math.floor(rng() * 4);
      var letras = ['A', 'B', 'C', 'D'];
      var svg = '<svg viewBox="0 0 560 150" role="img" aria-label="Cuatro textos de ejemplo rotulados A, B, C y D"><rect width="560" height="150" fill="#ffffff"/>';
      modos.forEach(function (m, i) {
        var x = 8 + i * 138;
        svg += textoFig_(x, 8, 126, m) +
          '<circle cx="' + (x + 63) + '" cy="132" r="11" fill="#1a73e8"/>' +
          '<text x="' + (x + 63) + '" y="137.5" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="15" fill="#ffffff">' + letras[i] + '</text>';
      });
      svg += '</svg>';
      var q = mcFixed_('x', 'x', '¿Cuál de estos textos está ' + NOMBRE_ALINEACION_[modos[objetivo]] + '?', letras, letras[objetivo]);
      q.fig = svg;
      return q;
    }
  }
];

// ======================================================================
//  BANCO DE PREGUNTAS
// ======================================================================

var TIPOS_FORM_ = ['Fecha', 'Varias opciones', 'Casillas', 'Desplegable', 'Párrafo'];

function bancoU2_() {
  return [].concat(GEN_BUSQUEDAS_, GEN_ALINEACION_, [

  // ================= BLOQUE 1 · INTERNET DE LAS COSAS =================

  // ---------- Ideas básicas (2 de 8) ----------
  mc_('iot1', 'iot_q', '¿Qué es el Internet de las cosas (IoT)?',
    'La red de objetos cotidianos con sensores que se conectan a internet e intercambian datos',
    ['Una red social para compartir fotos de objetos', 'Un tipo de ordenador muy potente', 'Un internet que solo funciona dentro de casa']),
  tf_('iot2', 'iot_q', 'Un sistema IoT puede intercambiar datos sin que una persona tenga que escribirlos.', true),
  mc_('iot3', 'iot_q', '¿Qué significan las siglas IoT?',
    'Internet of Things (Internet de las cosas)',
    ['Input of Technology', 'Internal Online Tools', 'Intelligent Operating Terminal']),
  mc_('iot4', 'iot_q', 'En un sistema IoT, ¿qué pasa justo después de que el sensor mide el dato?',
    'Se envía por una conexión (Wi-Fi, Bluetooth o una pasarela)',
    ['Se enciende el actuador directamente', 'Se borra el dato', 'Lo escribe una persona en la aplicación']),
  mc_('iot5', 'iot_q', '¿Qué papel tiene la nube en un sistema IoT?',
    'Un servidor guarda y analiza los datos',
    ['Mide la temperatura o el movimiento', 'Es el cable que une los aparatos', 'Es la aplicación del móvil']),
  tf_('iot6', 'iot_q', 'Una rutina es una regla del tipo «si pasa esto, haz aquello».', true),
  mc_('iot7', 'iot_q', '¿Qué es el IoT industrial (IIoT)?',
    'El IoT usado en fábricas, campos, hospitales o ciudades, con miles de sensores a la vez',
    ['Un tipo de bombilla inteligente', 'Un asistente de voz de Amazon', 'Una red wifi más rápida']),
  mc_('iot8', 'iot_q', '¿Para qué sirve Matter?',
    'Es un estándar común para que dispositivos de distintas marcas funcionen juntos',
    ['Es una marca de altavoces inteligentes', 'Es un sensor de movimiento', 'Es un lenguaje de programación para robots']),
  tf_('iot9', 'iot_q', 'La domótica es el IoT aplicado a una vivienda o a un edificio.', true),
  tf_('iot10', 'iot_q', 'El IoT solo se usa en casas: no sirve en agricultura ni en medicina.', false),

  // ---------- Camino del dato (fija) ----------
  {
    id: 'iot_flow', pool: 'iot_flow', type: 'order',
    prompt: 'Ordena el camino que sigue la información en un sistema IoT:',
    steps: [
      'Sensor: mide algo (movimiento, temperatura, luz…)',
      'Conexión: Wi-Fi, Bluetooth o una pasarela envían el dato',
      'Nube: un servidor guarda y analiza los datos',
      'Aplicación: tú ves los datos y decides, o lo decide una regla',
      'Actuador: hace algo (enciende, abre, riega, suena…)'
    ],
    correct: [0, 1, 2, 3, 4]
  },

  // ---------- Emparejar (1 de 3) ----------
  match_('iot_m1', 'iot_match', 'Clasifica cada elemento: ¿es un sensor o un actuador?', [
    ['Detector de movimiento', 'Sensor'],
    ['Persiana que sube sola', 'Actuador'],
    ['Sonda de humedad del suelo', 'Sensor'],
    ['Cerradura que se abre con el móvil', 'Actuador'],
    ['Sirena de una alarma', 'Actuador'],
    ['Termómetro de la calefacción', 'Sensor']
  ], ['Sensor', 'Actuador']),
  match_('iot_m2', 'iot_match', 'Une cada ámbito del IoT con un ejemplo:', [
    ['Transporte', 'Semáforos inteligentes y aparcamientos que avisan de las plazas libres'],
    ['Agricultura', 'Sensores de humedad que riegan solo cuando hace falta'],
    ['Medicina', 'Pulseras que miden el pulso y avisan al personal sanitario'],
    ['Industria', 'Máquinas que detectan que una pieza se va a romper'],
    ['Medio ambiente', 'Estaciones que miden la calidad del aire o el nivel de un río']
  ], [
    'Semáforos inteligentes y aparcamientos que avisan de las plazas libres',
    'Sensores de humedad que riegan solo cuando hace falta',
    'Pulseras que miden el pulso y avisan al personal sanitario',
    'Máquinas que detectan que una pieza se va a romper',
    'Estaciones que miden la calidad del aire o el nivel de un río'
  ]),
  match_('iot_m3', 'iot_match', 'Une cada palabra de activación con su asistente:', [
    ['«Hey Google»', 'Google Home'],
    ['«Alexa»', 'Alexa (Amazon)'],
    ['«Siri»', 'Casa (HomeKit, de Apple)']
  ], ['Google Home', 'Alexa (Amazon)', 'Casa (HomeKit, de Apple)', 'Matter']),

  // ---------- Casos (1 de 5) ----------
  mc_('iot_c1', 'iot_caso', 'En un invernadero, una sonda mide la humedad de la tierra y, cuando está seca, abre una válvula de riego. ¿Qué es la válvula?',
    'Un actuador', ['Un sensor', 'La nube', 'Una aplicación']),
  mc_('iot_c2', 'iot_caso', 'Una luz del pasillo se enciende sola cuando un detector nota que entras. ¿Qué es el detector?',
    'Un sensor', ['Un actuador', 'La nube', 'Una rutina']),
  mc_('iot_c3', 'iot_caso', 'Regla de casa: «Si se abre la puerta y no estoy en casa, entonces suena la alarma y me llega un aviso al móvil». ¿Cuál es el sensor?',
    'El detector de puerta abierta', ['La alarma', 'El aviso del móvil', 'La nube']),
  mc_('iot_c4', 'iot_caso', 'Quieres que la calefacción se encienda cuando la temperatura baje de 18 °C. ¿Qué rutina es la correcta?',
    'SI la temperatura baja de 18 °C ENTONCES se enciende la calefacción',
    ['SI se enciende la calefacción ENTONCES la temperatura baja de 18 °C', 'SI abro la ventana ENTONCES se enciende la calefacción', 'SI la temperatura sube de 18 °C ENTONCES se apaga el sensor']),
  multi_('iot_c5', 'iot_caso', 'Marca los elementos que son ACTUADORES:',
    ['Persiana motorizada', 'Riego automático', 'Altavoz que suena'],
    ['Sensor de luz', 'Detector de humo']),

  // ---------- Privacidad y sostenibilidad (1 de 6) ----------
  multi_('iot_p1', 'iot_priv', 'Marca las medidas que mejoran la seguridad de un aparato conectado:',
    ['Cambiar la contraseña de fábrica', 'Mantener actualizados los aparatos y las aplicaciones', 'Desactivar el micrófono o la cámara cuando no se necesiten'],
    ['Dejar la contraseña de fábrica para no olvidarla', 'Ignorar las actualizaciones, que dan problemas']),
  mc_('iot_p2', 'iot_priv', 'Acabas de instalar una cámara wifi en casa. ¿Qué haces en cuanto la conectas?',
    'Cambiar la contraseña de fábrica',
    ['Nada: ya viene segura de fábrica', 'Compartir la contraseña con mis amistades', 'Desactivar las actualizaciones']),
  tf_('iot_p3', 'iot_priv', 'Una cámara o un altavoz con micrófono en casa solo afecta a la persona que lo instala.', false),
  mc_('iot_p4', 'iot_priv', 'Una amiga viene a tu casa, donde hay un asistente de voz que escucha siempre. ¿Qué es lo más adecuado?',
    'Avisarle de que existe y de que puede recoger lo que se diga',
    ['No decirle nada para no incomodarla', 'Esconder el altavoz debajo de un cojín', 'Dejar que lo descubra ella sola']),
  mc_('iot_p5', 'iot_priv', '¿Por qué hay que mantener actualizados los aparatos conectados?',
    'Porque las actualizaciones corrigen fallos de seguridad',
    ['Para que consuman más energía', 'Para que cambien de color', 'Para que dejen de conectarse a internet']),
  mc_('iot_p6', 'iot_priv', 'Un sistema IoT riega solo cuando hace falta. Pensando en la sostenibilidad, ¿qué debes preguntarte también?',
    '¿Ahorra más recursos de los que gastan los sensores y los servidores?',
    ['¿Cuántos sensores caben en una maceta?', '¿Es de color verde?', '¿Funciona sin electricidad?']),

  // ================= BLOQUE 2 · BUSCAR BIEN =================
  // (las búsquedas con datos al azar están arriba: GEN_BUSQUEDAS_)

  // ---------- Criterio (1 de 8) ----------
  mc_('bq1', 'busq_q', '¿Qué pasa con trucos antiguos como @instagram o $50 en el buscador?',
    'Ya no son fiables: para buscar dentro de una web se usa site:',
    ['Siguen siendo la mejor forma de buscar en redes sociales', 'Solo funcionan en el móvil', 'Son operadores nuevos de este año']),
  tf_('bq2', 'busq_q', 'El primer resultado del buscador siempre es el más fiable.', false),
  tf_('bq3', 'busq_q', 'Un resumen generado por inteligencia artificial encima de los resultados puede equivocarse o inventar datos.', true),
  mc_('bq4', 'busq_q', 'Para comprobar si una información es fiable lo más recomendable es…',
    'contrastarla con al menos dos fuentes distintas y fiables',
    ['fiarse de la primera página que salga', 'compartirla y esperar a que alguien la desmienta', 'buscar solo vídeos sobre el tema']),
  multi_('bq5', 'busq_q', 'Marca las preguntas que debes hacerte ante un resultado:',
    ['¿Quién lo dice? (autoría o institución)', '¿De qué fecha es?', '¿Lo confirman otras fuentes?'],
    ['¿Tiene muchas imágenes?', '¿Sale en primer lugar?']),
  mc_('bq6', 'busq_q', 'Un resultado lleva la etiqueta «Patrocinado». ¿Qué significa?',
    'Que es un anuncio: no por eso es mejor ni más fiable',
    ['Que es la página más fiable', 'Que la ha verificado el instituto', 'Que es una página peligrosa']),
  mc_('bq7', 'busq_q', 'En tecnología, un artículo de hace cinco años…',
    'puede estar anticuado: conviene mirar la fecha',
    ['siempre sigue siendo válido', 'es mejor cuanto más antiguo sea', 'nunca tiene fecha']),
  tf_('bq8', 'busq_q', 'Si un operador del buscador no te funciona, lo adecuado es comprobarlo tú en vez de fiarte de un tutorial antiguo.', true),

  // ---------- Operadores (1 de 2) ----------
  match_('bop1', 'busq_op', 'Une cada operador con lo que hace:', [
    ['"frase"', 'Busca esas palabras exactamente y en ese orden'],
    ['-palabra', 'Excluye las páginas que contienen esa palabra'],
    ['site:', 'Busca solo dentro de una web'],
    ['filetype:', 'Busca solo un tipo de archivo (pdf, docx…)'],
    ['OR', 'Muestra páginas con una palabra o con la otra']
  ], [
    'Busca esas palabras exactamente y en ese orden',
    'Excluye las páginas que contienen esa palabra',
    'Busca solo dentro de una web',
    'Busca solo un tipo de archivo (pdf, docx…)',
    'Muestra páginas con una palabra o con la otra',
    'Sustituye una palabra que no recuerdas'
  ]),
  match_('bop2', 'busq_op', 'Une cada descripción con el operador que corresponde:', [
    ['Comodín: sustituye una palabra que no recuerdas', '*'],
    ['La palabra debe aparecer en el título de la página', 'intitle:'],
    ['Busca solo dentro de una web', 'site:'],
    ['Busca solo un tipo de archivo', 'filetype:'],
    ['Muestra páginas con una palabra o con la otra', 'OR']
  ], ['*', 'intitle:', 'site:', 'filetype:', 'OR', '-']),

  // ================= BLOQUE 3 · HERRAMIENTAS DE GOOGLE =================

  // ---------- Drive (2 de 8) ----------
  mc_('dr1', 'drive_q', '¿Qué es Google Drive?',
    'Un espacio en internet donde guardas, organizas y compartes tus archivos',
    ['Un programa para editar vídeos', 'Un navegador web', 'Un disco duro que se conecta por USB']),
  mc_('dr2', 'drive_q', '¿Cómo creas una carpeta nueva en Drive?',
    'Con + Nuevo → Carpeta nueva',
    ['Con Archivo → Imprimir', 'Con Insertar → Carpeta', 'Con Compartir → Carpeta']),
  tf_('dr3', 'drive_q', 'Si se estropea tu ordenador, los archivos que tienes guardados en Drive se pierden.', false),
  mc_('dr4', 'drive_q', 'Antes de entregar el enlace de un documento, ¿qué conviene hacer?',
    'Abrirlo en otra pestaña para comprobar que se ve',
    ['Nada: siempre se ve bien', 'Enviar también tu contraseña', 'Borrarlo y volver a crearlo']),
  mc_('dr5', 'drive_q', '¿Qué nombre es adecuado para el resumen del IoT en Drive?',
    'Resumen IoT',
    ['Documento sin título', 'asdf', 'Sin título (2)']),
  mc_('dr6', 'drive_q', 'Llamar a las carpetas «Unidad 1», «Unidad 2»… ayuda porque Drive las ordena…',
    'alfabéticamente', ['por color', 'por tamaño', 'por el orden en que las abriste']),
  tf_('dr7', 'drive_q', 'Los formularios de Google también se guardan en Drive y deben tener un nombre claro.', true),
  mc_('dr8', 'drive_q', 'En los portátiles del centro (EducaAndOS), ¿qué tecla abre la herramienta de captura de pantalla?',
    'Impr Pant', ['F5', 'Bloq Mayús', 'Ctrl+Z']),

  // ---------- Documentos (1 de 6) ----------
  mc_('dc1', 'docs_q', 'En Documentos, ¿cómo das el mismo formato a todos los títulos de un mismo nivel?',
    'Definiendo el estilo (por ejemplo, Título 1) y actualizándolo',
    ['Cambiando cada título a mano', 'Escribiéndolos todos en mayúsculas', 'Imprimiéndolos y coloreándolos']),
  mc_('dc2', 'docs_q', 'El índice automático de un documento se genera a partir de…',
    'los títulos con estilos (Título 1, Título 2…)',
    ['las palabras en negrita', 'las imágenes', 'el número de páginas']),
  tf_('dc3', 'docs_q', 'Conviene dar formato al índice cuando todo lo demás esté terminado, porque al actualizarlo puede perder el formato.', true),
  mc_('dc4', 'docs_q', '¿Qué atajo pone el texto seleccionado en negrita?',
    'Ctrl+B', ['Ctrl+I', 'Ctrl+U', 'Ctrl+K']),
  mc_('dc5', 'docs_q', '¿Qué atajo centra el texto?',
    'Ctrl+Mayús+E', ['Ctrl+Mayús+L', 'Ctrl+Mayús+R', 'Ctrl+Mayús+J']),
  tf_('dc6', 'docs_q', 'Si pones en la portada una imagen que no es tuya, debes tener en cuenta su licencia y citar la autoría.', true),

  // ---------- Barra de herramientas (1 de 2): dibujo ----------
  (function () {
    var q = match_('tb1', 'docs_tb', 'Mira la barra de herramientas de Documentos y une cada botón con su función:', [
      ['Botón A', 'Deshacer'], ['Botón B', 'Imprimir'], ['Botón C', 'Negrita'],
      ['Botón D', 'Cursiva'], ['Botón E', 'Subrayado'], ['Botón F', 'Lista con viñetas']
    ], ['Deshacer', 'Imprimir', 'Negrita', 'Cursiva', 'Subrayado', 'Lista con viñetas', 'Rehacer', 'Insertar imagen']);
    q.fig = toolbarFig_(['undo', 'print', 'bold', 'italic', 'underline', 'bullets']);
    return q;
  })(),
  (function () {
    var q = match_('tb2', 'docs_tb', 'Mira la barra de herramientas de Documentos y une cada botón con su función:', [
      ['Botón A', 'Rehacer'], ['Botón B', 'Color del texto'], ['Botón C', 'Alinear al centro'],
      ['Botón D', 'Insertar imagen'], ['Botón E', 'Insertar enlace'], ['Botón F', 'Alinear a la izquierda']
    ], ['Rehacer', 'Color del texto', 'Alinear al centro', 'Insertar imagen', 'Insertar enlace', 'Alinear a la izquierda', 'Deshacer', 'Alinear a la derecha']);
    q.fig = toolbarFig_(['redo', 'color', 'center', 'image', 'link', 'left']);
    return q;
  })(),

  // ---------- Presentaciones (2 de 7) ----------
  tf_('sl1', 'slides_q', 'Animación y transición son lo mismo.', false),
  mc_('sl2', 'slides_q', 'En Presentaciones, la transición es el efecto que se aplica…',
    'al pasar de una diapositiva a la siguiente',
    ['a un objeto dentro de una diapositiva', 'solo al título de la presentación', 'solo a las imágenes']),
  mc_('sl3', 'slides_q', 'Quieres que una imagen aparezca con un efecto dentro de una diapositiva. ¿Qué usas?',
    'Una animación', ['Una transición', 'Un tema', 'La diapositiva maestra']),
  mc_('sl4', 'slides_q', 'Para cambiar la fuente de todas las diapositivas a la vez, editas…',
    'la diapositiva maestra (Diapositiva → Editar tema)',
    ['cada cuadro de texto uno a uno', 'el nombre del archivo', 'la transición']),
  mc_('sl5', 'slides_q', 'Al elegir un tema para tu presentación, ¿qué es lo más importante?',
    'Que haya buen contraste entre el fondo y el texto',
    ['Que tenga muchos adornos', 'Que el texto sea del mismo color que el fondo', 'Que sea el más colorido']),
  mc_('sl6', 'slides_q', '¿Qué es lo mejor para el texto de una diapositiva?',
    'Pocas palabras: frases cortas y una imagen o una tabla',
    ['Párrafos enteros copiados del resumen', 'Todo el texto posible en letra pequeña', 'Solo texto, sin imágenes']),
  mc_('sl7', 'slides_q', 'Si una animación tiene el inicio «Al hacer clic», el efecto ocurre…',
    'cuando haces clic mientras presentas', ['solo al abrir el archivo', 'cuando pasa un minuto', 'a la vez que la transición']),

  // ---------- Hojas de cálculo (1 de 8) ----------
  tf_('sh1', 'sheets_q', 'Las fórmulas de una hoja de cálculo empiezan siempre por el signo =', true),
  mc_('sh2', 'sheets_q', '¿Qué verás en la celda si escribes =3+4?',
    '7', ['3+4', '=3+4', '34']),
  mc_('sh3', 'sheets_q', '¿Qué verás en la celda si escribes 3+4 sin el signo igual?',
    '3+4 (la hoja lo toma como texto)', ['7', 'Un error', '12']),
  mc_('sh4', 'sheets_q', 'La celda B2 es la que está en…',
    'la columna B, fila 2', ['la fila B, columna 2', 'la segunda columna y la segunda hoja', 'la posición número 2 de la hoja']),
  mc_('sh5', 'sheets_q', 'En D2 quieres el total: cantidad (B2) por precio (C2). ¿Qué escribes?',
    '=B2*C2', ['B2*C2', '=B2+C2', '=B2xC2']),
  mc_('sh6', 'sheets_q', '¿Qué fórmula suma todas las celdas desde D2 hasta D8?',
    '=SUMA(D2:D8)', ['=SUMA(D2,D8)', 'SUMA(D2:D8)', '=D2:D8']),
  mc_('sh7', 'sheets_q', 'Cambias una cantidad y el total NO se actualiza. ¿Qué ha pasado seguramente?',
    'Escribiste el total a mano en lugar de una fórmula',
    ['La hoja está rota', 'Hay que recargar el navegador', 'Tienes que borrar la columna']),
  mc_('sh8', 'sheets_q', 'Para copiar una fórmula hacia las filas de abajo, arrastras…',
    'el cuadradito azul de la esquina de la celda',
    ['el nombre de la hoja', 'la barra de fórmulas', 'el borde de la columna']),
  gaps_('sh_gaps1', 'sheets_gaps', 'Completa con el símbolo que se usa en una fórmula:',
    'Para sumar se usa [[0]], para restar [[1]], para multiplicar [[2]], para dividir [[3]] y para elevar a una potencia [[4]].',
    ['+', '-', '*', '/', '^'], ['+', '-', '*', '/', '^', '=']),
  gaps_('sh_gaps2', 'sheets_gaps', 'Completa la fórmula con el símbolo que falta:',
    'Si en la celda B2 hay una cantidad y en C2 un precio, el total se calcula con [[0]]B2[[1]]C2. Para elevar B2 al cuadrado escribiríamos =B2[[2]]2.',
    ['=', '*', '^'], ['=', '*', '^', '+', '/', '-']),

  // ---------- Formularios (1 de 5) y tipos de pregunta (1 de 5) ----------
  mc_('fo1', 'forms_q', 'Con Formularios de Google, las respuestas…',
    'se recogen automáticamente y pueden ir a una hoja de cálculo',
    ['hay que copiarlas a mano una a una', 'solo las ve quien responde', 'se borran al cerrar el formulario']),
  mc_('fo2', 'forms_q', 'Para obligar a marcar exactamente 3 casillas usas…',
    'Validación de respuestas → Seleccionar exactamente → 3',
    ['Limitar a 1 respuesta', 'Mostrar barra de progreso', 'Cambiar el mensaje de confirmación']),
  mc_('fo3', 'forms_q', '¿Para qué sirve «Limitar a 1 respuesta»?',
    'Para que cada persona solo pueda responder una vez',
    ['Para que el formulario tenga una sola pregunta', 'Para que cada respuesta tenga una sola palabra', 'Para que solo una persona vea el formulario']),
  tf_('fo4', 'forms_q', 'Si marcas una pregunta como «Obligatoria», no se puede enviar el formulario sin contestarla.', true),
  mc_('fo5', 'forms_q', '¿Cómo compartes un formulario para que otras personas lo respondan?',
    'Enviar → icono del enlace → copiar el enlace',
    ['Archivo → Imprimir', 'Pasándolo en un USB', 'Compartiendo tu contraseña']),
  mcFixed_('ft1', 'forms_tipo', 'Quieres que la persona elija su día de nacimiento en un calendario. ¿Qué tipo de pregunta usas?', TIPOS_FORM_, 'Fecha'),
  mcFixed_('ft2', 'forms_tipo', 'Quieres que cada persona pueda marcar varias asignaturas favoritas. ¿Qué tipo de pregunta usas?', TIPOS_FORM_, 'Casillas'),
  mcFixed_('ft3', 'forms_tipo', 'Quieres que cuenten con sus palabras, en un texto largo, qué opinan del IoT. ¿Qué tipo de pregunta usas?', TIPOS_FORM_, 'Párrafo'),
  mcFixed_('ft4', 'forms_tipo', 'Quieres que elijan su grupo entre doce, con la lista escondida en un menú para ocupar poco espacio. ¿Qué tipo de pregunta usas?', TIPOS_FORM_, 'Desplegable'),
  mcFixed_('ft5', 'forms_tipo', 'Quieres que elijan una sola opción entre «Sí», «No» y «No lo sé», con todas visibles. ¿Qué tipo de pregunta usas?', TIPOS_FORM_, 'Varias opciones'),

  // ---------- Calendar (1 de 4) ----------
  mc_('ca1', 'cal_q', 'Quieres que Calendar te avise dos días antes de un examen. ¿Qué configuras?',
    'Una notificación personalizada de 2 días antes',
    ['El color del evento', 'La descripción del evento', 'La vista Mes']),
  mc_('ca2', 'cal_q', 'Para distinguir las asignaturas a simple vista en Calendar, ¿qué haces?',
    'Usar un color distinto para cada asignatura',
    ['Usar el mismo color para todo', 'Escribir títulos larguísimos', 'No se puede distinguir']),
  mc_('ca3', 'cal_q', '¿Qué título es el más claro para un evento de Calendar?',
    'Examen de Matemáticas', ['Cosa', 'Evento 1', 'Sin título']),
  mc_('ca4', 'cal_q', 'Para ver todo el mes de un vistazo, cambias la vista a…',
    'Mes', ['Día', 'Semana', 'Cuatro días'])
]);
}
