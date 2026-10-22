/**
 * CUESTIONARIOS AUTOCORREGIDOS · COMPUTACIÓN Y ROBÓTICA · 1º ESO
 * Autor: Manuel Romero Fraidía (IES Murillo, Sevilla) · CC BY-NC-SA 4.0
 *
 * Un único proyecto de Apps Script con VARIOS cuestionarios. Cada uno
 * tiene su propio enlace (el mismo /exec con un "?q=" al final):
 *
 *    Entorno de trabajo ........ <URL_APP>                       (como hasta ahora)
 *    1.1 Ciberseguridad ........ <URL_APP>?q=ciberseguridad
 *    1.2 Propiedad intelectual . <URL_APP>?q=propiedad
 *    2 IoT y herramientas ...... <URL_APP>?q=unidad2
 *    3.1 El ordenador .......... <URL_APP>?q=ordenador
 *    3.2 Algoritmos, lenguajes y binario ... <URL_APP>?q=algoritmos
 *    4 Programación con Scratch ... <URL_APP>?q=scratch
 *    5 Control y robótica con micro:bit ... <URL_APP>?q=microbit
 *
 *  PANEL DEL PROFESOR (solo tú): <URL_APP> a secas te lleva directo al panel
 *    (también <URL_APP>?page=panel). El alumnado, con ese mismo enlace, ve
 *    el cuestionario de Entorno. Para probarlo tú: <URL_APP>?q=entorno
 *
 * El alumnado se identifica con su cuenta del centro
 * (Session.getActiveUser().getEmail(), despliegue "Ejecutar como: Yo").
 * Todas las respuestas van a UNA hoja de cálculo de tu Drive, con una
 * pestaña por cuestionario. La nota se vuelca como CALIFICACIÓN EN
 * BORRADOR en la tarea de Classroom de ese cuestionario, que crea el script (las
 * notas solo se pueden volcar en tareas creadas por el script).
 *
 * Archivos del proyecto:
 *   Code.gs      este archivo (motor + cuestionario "Entorno de trabajo" + panel)
 *   Unidad1.gs   preguntas de los cuestionarios 1.1 y 1.2
 *   Unidad2.gs   preguntas del cuestionario de la Unidad 2
 *   Unidad3.gs   preguntas de los cuestionarios 3.1 y 3.2
 *   Unidad4.gs   preguntas del cuestionario de la Unidad 4 (Scratch)
 *   Unidad5.gs   preguntas del cuestionario de la Unidad 5 (micro:bit)
 *   Unidad4.gs incluye también las imágenes de bloques de Scratch
 *   Bloques5.gs  imágenes del cuestionario 5
 *   Index.html   pantalla que ve el alumnado
 *   Panel.html   panel de control del profesor (?page=panel)
 *
 * ============================================================
 *  PASOS (resumen; los detalles están en el README y en la página de instalación)
 * ============================================================
 *  1. Pega Code.gs, Unidad1.gs a Unidad5.gs, Bloques5.gs, Index.html, Panel.html
 *     y appsscript.json, cada uno en su archivo del proyecto.
 *  2. Servicios (+): añade "Google Classroom API" (si no la trae el manifiesto).
 *  3. Rellena COURSE_ID (abajo) y ejecuta autorizarPanel (una vez): Google te
 *     pedirá permisos (incluida la lista de la clase). Acéptalos.
 *  4. Implementar → Nueva implementación → Aplicación web (Ejecutar como: Yo;
 *     acceso: usuarios de tu dominio). Copia la URL /exec en URL_APP y, tras
 *     cambiar cualquier archivo, Gestionar implementaciones → lápiz → Nueva versión.
 *  5. Abre el panel (la URL de la aplicación, sin nada más), pestaña
 *     "Tareas de Classroom": ahí creas y publicas las tareas con botones.
 *     (Alternativa desde el editor: crearTareaMicrobit, etc.)
 *  6. Publica cada tarea en Classroom cuando quieras que el alumnado
 *     haga ese cuestionario.
 * ============================================================
 */

// ======================= CONFIGURACIÓN =======================

var COURSE_ID = ''; // <-- CAMBIA ESTO: id numérico de tu clase de Classroom (el texto de la URL está en base64: usa decodificarCourseId)

// URL de la aplicación web (la que termina en /exec). Se rellena DESPUÉS del primer despliegue.
var URL_APP = ''; // <-- CAMBIA ESTO tras implementar: la dirección de la aplicación web, la que termina en /exec

var MAX_POINTS = 10; // nota máxima que verá Classroom

// Deja SHEET_ID vacío: se usa la hoja que ya creó el script (guardada
// en las propiedades del script) o, si no hay, se crea una nueva.
var SHEET_ID = '';
var NOMBRE_HOJA_CALCULO = 'Cuestionarios Computación y Robótica 1º ESO - Respuestas';

var QUIZ_ORDER = ['entorno', 'ciberseguridad', 'propiedad', 'unidad2', 'ordenador', 'algoritmos', 'scratch', 'microbit'];

// Además de ti (el dueño del proyecto), correos de otros profesores que pueden
// abrir el panel. Déjalo vacío si solo quieres entrar tú.
var PROFESORES_EXTRA = [];

// ======================= REGISTRO DE CUESTIONARIOS =======================
// scoring: 'units'     -> cada apartado cuenta como un punto (cuestionario original)
//          'questions' -> cada pregunta vale lo mismo, con puntuación parcial
// cols: posición (desde 0) de cada dato en la pestaña de respuestas (para el Resumen)

function getQuizzes_() {
  return {
    entorno: {
      id: 'entorno',
      titulo: 'Entorno de trabajo',
      subtitulo: 'Pasen / iPasen · Google Classroom · Atajos de teclado',
      icono: '📝',
      hoja: 'Respuestas',
      legacy: true,
      scoring: 'units',
      blocks: [
        { id: 'pasen', label: 'Pasen e iPasen' },
        { id: 'classroom', label: 'Google Classroom' },
        { id: 'teclado', label: 'Atajos de teclado' }
      ],
      questions: QUESTIONS,
      plan: null,
      cols: { email: 1, nombre: 2, apellidos: 3, grupo: 4, nota: 5 },
      tarea: {
        titulo: 'Cuestionario: Entorno de trabajo',
        descripcion: 'Cuestionario sobre Pasen/iPasen, Google Classroom y atajos de teclado.'
      }
    },
    ciberseguridad: quizCiberseguridad_(),
    propiedad: quizPropiedad_(),
    unidad2: quizUnidad2_(),
    ordenador: quizOrdenador_(),
    algoritmos: quizAlgoritmos_(),
    scratch: quizScratch_(),
    microbit: quizMicrobit_()
  };
}

// ======================= PREGUNTAS: ENTORNO DE TRABAJO =======================
// type:
//   'tf'    -> verdadero/falso            correct: true/false
//   'mc'    -> opción múltiple (1 buena)  correct: texto exacto de la opción
//   'multi' -> casillas (varias buenas)   correct: array de textos (todo o nada; con partial:true, puntuación parcial)
//   'order' -> ordenar pasos              correct: array en el orden correcto
//   'short' / 'short-multi' / 'char-multi' -> respuestas cortas
//   'match' -> emparejar (desplegables)   items:[{label|icon, correct}], choices:[...]
//   'gaps'  -> rellenar huecos [[0]],[[1]]  gaps:[{correct}], bank:[...]

var QUESTIONS = [

  // ---------- BLOQUE 1: PASEN E IPASEN ----------
  {
    id: 'p1', block: 'pasen', type: 'tf',
    prompt: 'Tu usuario de iPASEN es el mismo que el de tus padres, madres o tutores.',
    correct: false
  },
  {
    id: 'p2', block: 'pasen', type: 'mc',
    prompt: 'Si no consigues recuperar tu contraseña de ninguna manera, ¿quién puede generarte una nueva?',
    options: [
      'El tutor o tutora de mi grupo',
      'Cualquier profesor o profesora que me dé clase',
      'Cualquier profesor o profesora del instituto',
      'Cualquier persona de conserjería'
    ],
    correct: 'El tutor o tutora de mi grupo'
  },
  {
    id: 'p3', block: 'pasen', type: 'multi',
    prompt: 'Para recuperar tu contraseña tú mismo/a desde la app, ¿qué datos te va a pedir?',
    options: ['Tu usuario', 'Tu DNI', 'Tu correo electrónico', 'Tu número de teléfono', 'Tu nombre y apellidos'],
    correct: ['Tu usuario', 'Tu DNI']
  },
  {
    id: 'p4a', block: 'pasen', type: 'short',
    prompt: 'Como máximo, ¿cuántos intentos fallidos de contraseña se permiten antes de que se bloquee tu usuario?',
    correct: '3'
  },
  {
    id: 'p4b', block: 'pasen', type: 'short',
    prompt: '¿Cuántos minutos dura ese bloqueo?',
    correct: '20'
  },
  {
    id: 'p4c', block: 'pasen', type: 'tf',
    prompt: 'Si consigues recuperar la contraseña durante ese bloqueo, ¿tu usuario se desbloquea en ese momento?',
    correct: true
  },
  {
    id: 'p5', block: 'pasen', type: 'mc',
    prompt: 'Para recuperar tu contraseña tú mismo/a desde la app o la web de iPasen, ¿qué tienes que pulsar primero?',
    options: ['"¿Has olvidado tu contraseña?"', '"Registrarse"', '"Comunicaciones"', '"Recuperar contraseña"'],
    correct: '"¿Has olvidado tu contraseña?"'
  },
  {
    id: 'p6', block: 'pasen', type: 'tf',
    prompt: 'Puedes recuperar tu contraseña tú mismo/a desde la app o la web de iPasen, sin pedírsela a tu tutor o tutora.',
    correct: true
  },

  // ---------- BLOQUE 2: GOOGLE CLASSROOM ----------
  {
    id: 'c1', block: 'classroom', type: 'order',
    prompt: 'Ordena los pasos para entregar una tarea en Classroom:',
    steps: [
      "Abrir la tarea desde \"Trabajo de clase\"",
      "Añadir tu archivo o tu trabajo en \"Tu trabajo\"",
      "Pulsar el botón \"Entregar\""
    ],
    correct: [0, 1, 2] // orden correcto por índice
  },

  // ---------- BLOQUE 3: ATAJOS DE TECLADO ----------
  {
    id: 't1', block: 'teclado', type: 'short-multi',
    prompt: 'Escribe la combinación de teclas (ej: Ctrl+C):',
    items: [
      { label: 'Copiar', correct: 'ctrl+c' },
      { label: 'Cortar', correct: 'ctrl+x' },
      { label: 'Pegar', correct: 'ctrl+v' },
      { label: 'Deshacer', correct: 'ctrl+z' },
      { label: 'Buscar', correct: 'ctrl+f' }
    ]
  },
  {
    id: 't2', block: 'teclado', type: 'char-multi',
    prompt: 'Escribe el símbolo (usa Alt Gr):',
    items: [
      { label: 'Arroba', correct: '@' },
      { label: 'Almohadilla', correct: '#' },
      { label: 'Virgulilla', correct: '~' },
      { label: 'Euro', correct: '€' },
      { label: 'Barra vertical', correct: '|' }
    ]
  },
  {
    id: 't3', block: 'teclado', type: 'char-multi',
    prompt: 'Escribe el símbolo:',
    items: [
      { label: '¡ (exclamación de apertura)', correct: '¡' },
      { label: '! (exclamación de cierre)', correct: '!' },
      { label: '¿ (interrogación de apertura)', correct: '¿' },
      { label: '? (interrogación de cierre)', correct: '?' },
      { label: ': (dos puntos)', correct: ':' },
      { label: '; (punto y coma)', correct: ';' },
      { label: '" (comillas dobles)', correct: '"' },
      { label: "' (comilla simple)", correct: "'" }
    ]
  },
  {
    id: 't4', block: 'teclado', type: 'char-multi',
    prompt: 'Escribe estas igualdades matemáticas tal cual:',
    items: [
      { label: '(7-3)*2=8', correct: '(7-3)*2=8' },
      { label: '[3+(5-2)]^2=36', correct: '[3+(5-2)]^2=36' }
    ]
  },
  {
    id: 't5', block: 'teclado', type: 'char-multi',
    prompt: 'Escribe estas letras con su tilde o acento:',
    items: [
      { label: 'á', correct: 'á' },
      { label: 'è', correct: 'è' },
      { label: 'ü', correct: 'ü' },
      { label: 'ô', correct: 'ô' }
    ]
  }
];

// ======================= IDENTIDAD DEL VISITANTE =======================

function getUsuario() {
  try { return Session.getActiveUser().getEmail() || ''; } catch (e) { return ''; }
}

// ======================= SERVIDOR WEB =======================

function doGet(e) {
  var p = (e && e.parameter) ? e.parameter : {};
  if (p.page === 'panel') { return panelPage_(); }
  // Sin nada al final del enlace: si quien entra es el profesorado, va directo al panel
  // (el alumnado sigue viendo el cuestionario "Entorno de trabajo", como siempre).
  // Para probar tú ese cuestionario: <URL_APP>?q=entorno
  if (!p.q && !p.page && esProfesor_()) { return panelPage_(); }
  var qid = (e && e.parameter && e.parameter.q) ? String(e.parameter.q) : 'entorno';
  var data = getQuizData_(qid);
  var t = HtmlService.createTemplateFromFile('Index');
  t.email = getUsuario();
  t.quizJson = safeJson_(data);
  return t.evaluate()
    .setTitle(data.error ? 'Cuestionario' : 'Cuestionario: ' + data.titulo)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// JSON seguro para incrustarlo dentro de <script>
function safeJson_(obj) {
  return JSON.stringify(obj)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .split(String.fromCharCode(8232)).join('\\u2028')
    .split(String.fromCharCode(8233)).join('\\u2029');
}

/**
 * Datos de un cuestionario para el navegador (SIN respuestas correctas),
 * con las preguntas ya elegidas al azar según una semilla nueva.
 * También la llama el cliente (google.script.run.getQuiz) para "otro intento".
 */
function getQuiz(qid) {
  return getQuizData_(qid);
}

function getQuizData_(qid) {
  var quiz = getQuizzes_()[qid];
  if (!quiz) {
    return { error: 'No existe el cuestionario "' + qid + '". Comprueba el enlace que te ha dado tu profesor.' };
  }
  var seed = newSeed_();
  var selected = selectQuestions_(quiz, seed);
  var usados = {};
  selected.forEach(function (q) { usados[q.block] = true; });
  return {
    id: quiz.id,
    titulo: quiz.titulo,
    subtitulo: quiz.subtitulo,
    icono: quiz.icono,
    blocks: quiz.blocks.filter(function (b) { return usados[b.id]; }),
    seed: seed,
    questions: selected.map(stripQuestion_)
  };
}

function stripQuestion_(q) {
  var c = JSON.parse(JSON.stringify(q));
  delete c.correct;
  delete c.accept;
  delete c.pool;
  delete c.gen;
  delete c.nota;
  if (c.items) {
    c.items = c.items.map(function (it) {
      var o = { label: it.label };
      if (it.icon) { o.icon = it.icon; }
      if (it.svg) { o.svg = it.svg; }
      return o;
    });
  }
  if (c.gaps) {
    c.gaps = c.gaps.map(function () { return {}; });
  }
  return c;
}

// ---------- selección al azar (reproducible a partir de la semilla) ----------
// Generador de Park-Miller: solo aritmética normal, sin operaciones de bits.

function newSeed_() {
  return 1 + Math.floor(Math.random() * 2147483646);
}

function makeRng_(seed) {
  var s = Number(seed) % 2147483647;
  if (s <= 0) { s += 2147483646; }
  return function () {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function shuffleWith_(arr, rng) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(rng() * (i + 1));
    var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
  }
  return arr;
}

function copyOf_(obj) {
  var c = {};
  for (var k in obj) { if (obj.hasOwnProperty(k)) { c[k] = obj[k]; } }
  return c;
}

/**
 * Una pregunta puede ser una "plantilla" con gen: function(rng) que fabrica
 * la pregunta concreta (datos al azar, figura SVG...). Se usa el mismo
 * generador con la misma semilla al corregir, así sale idéntica.
 */
function materialize_(q, rng) {
  if (typeof q.gen !== 'function') { return copyOf_(q); }
  var g = q.gen(rng);
  g.id = q.id;
  g.pool = q.pool;
  return g;
}

/**
 * Sin "plan": se usan todas las preguntas, tal cual (cuestionario original).
 * Con "plan": lista de pasos, en orden:
 *   { b: 'bloque', q: 'idPregunta' }          -> una pregunta fija
 *   { b: 'bloque', pool: 'nombre', n: 3 }     -> n preguntas al azar de ese banco
 */
function selectQuestions_(quiz, seed) {
  if (!quiz.plan) { return quiz.questions.slice(); }
  var rng = makeRng_(seed);
  var out = [];
  quiz.plan.forEach(function (step) {
    if (step.q) {
      var found = null;
      quiz.questions.forEach(function (q) { if (q.id === step.q) { found = q; } });
      if (!found) { throw new Error('Pregunta no encontrada en el banco: ' + step.q); }
      var c1 = materialize_(found, rng); c1.block = step.b; out.push(c1);
    } else {
      var pool = quiz.questions.filter(function (q) { return q.pool === step.pool; });
      var idx = pool.map(function (_, i) { return i; });
      shuffleWith_(idx, rng);
      var n = Math.min(step.n, pool.length);
      for (var i = 0; i < n; i++) {
        var c2 = materialize_(pool[idx[i]], rng); c2.block = step.b; out.push(c2);
      }
    }
  });
  return out;
}

/**
 * Llamada desde el cliente al pulsar "Enviar".
 * payload = { quiz, seed, nombre, apellidos, grupo, answers: { [id]: valor } }
 */
function submitQuiz(payload) {
  var email = getUsuario();
  if (!email) {
    throw new Error('No se ha podido identificar tu cuenta. Abre este cuestionario desde tu cuenta del centro.');
  }
  payload = payload || {};
  var quiz = getQuizzes_()[payload.quiz || 'entorno'];
  if (!quiz) { throw new Error('Cuestionario desconocido. Vuelve a abrir el enlace de tu profesor.'); }
  var seed = Number(payload.seed);
  if (quiz.plan && !(seed >= 1 && seed <= 2147483646)) {
    throw new Error('Esta página ha caducado. Vuelve a abrir el enlace del cuestionario.');
  }

  var selected = selectQuestions_(quiz, seed);
  var result = gradeAnswers_(quiz, selected, payload.answers || {});

  var scoreOn10 = result.totalUnits > 0
    ? Math.round((result.correctUnits / result.totalUnits) * MAX_POINTS * 10) / 10
    : 0;

  logToSheet_(quiz, email, payload, selected, result, scoreOn10);

  // Se puede repetir las veces que haga falta: en la hoja queda un registro
  // de cada intento, pero en Classroom solo se sube la nota si es mejor.
  var gradeMessage;
  try {
    var r = setDraftGrade_(quiz, email, scoreOn10);
    if (r.actualizada) {
      gradeMessage = 'Tu nota se ha enviado a Classroom. Tu profesor la revisará antes de publicarla.';
    } else {
      gradeMessage = 'Esta vez has sacado ' + scoreOn10 + '/10, pero ya tenías una nota mejor guardada (' + r.notaGuardada + '/10), así que se mantiene esa en Classroom. Puedes volver a intentarlo cuando quieras.';
    }
  } catch (err) {
    gradeMessage = 'Tus respuestas se han guardado correctamente, pero no se pudo enviar la nota a Classroom de forma automática (tu profesor la pondrá a mano). Motivo técnico: ' + err.message;
    logError_(quiz, email, payload, err);
  }

  var perBlock = {};
  Object.keys(result.perBlock).forEach(function (b) {
    perBlock[b] = {
      correct: Math.round(result.perBlock[b].correct * 10) / 10,
      total: Math.round(result.perBlock[b].total * 10) / 10
    };
  });

  return { score: scoreOn10, max: MAX_POINTS, perBlock: perBlock, message: gradeMessage };
}

// ======================= CORRECCIÓN =======================

function gradeAnswers_(quiz, selected, answers) {
  var totalUnits = 0;
  var correctUnits = 0;
  var perBlock = {};
  quiz.blocks.forEach(function (b) { perBlock[b.id] = { correct: 0, total: 0 }; });
  var detalle = [];

  selected.forEach(function (q) {
    var u = gradeOne_(q, answers[q.id]);
    var tot, cor;
    if (quiz.scoring === 'units') {
      tot = u.total; cor = u.correct;
    } else {
      tot = 1; cor = u.total > 0 ? u.correct / u.total : 0;
    }
    totalUnits += tot;
    correctUnits += cor;
    if (!perBlock[q.block]) { perBlock[q.block] = { correct: 0, total: 0 }; }
    perBlock[q.block].total += tot;
    perBlock[q.block].correct += cor;
    var frac = u.total > 0 ? u.correct / u.total : 0;
    detalle.push((frac >= 0.999 ? '✓ ' : (frac <= 0.001 ? '✗ ' : '~ ')) + q.id + (frac > 0.001 && frac < 0.999 ? ' (' + (Math.round(frac * 100) / 100) + ')' : ''));
  });

  return { totalUnits: totalUnits, correctUnits: correctUnits, perBlock: perBlock, detalle: detalle };
}

function norm_(s) {
  return String(s === undefined || s === null ? '' : s)
    .toLowerCase()
    .replace(/[áàä]/g, 'a').replace(/[éèë]/g, 'e').replace(/[íìï]/g, 'i')
    .replace(/[óòö]/g, 'o').replace(/[úùü]/g, 'u')
    .replace(/\s+/g, ' ')
    .trim();
}

function acceptList_(correct) {
  return (correct instanceof Array) ? correct : [correct];
}

function gradeOne_(q, given) {
  switch (q.type) {
    case 'tf':
      return { total: 1, correct: (given === q.correct) ? 1 : 0 };

    case 'mc':
      return { total: 1, correct: (given === q.correct) ? 1 : 0 };

    case 'multi': {
      var g = (given || []).slice().sort();
      var c = q.correct.slice().sort();
      if (q.partial) {
        var hits = 0;
        (given || []).forEach(function (v) { if (q.correct.indexOf(v) !== -1) { hits++; } });
        var wrongs = (given || []).length - hits;
        return { total: q.correct.length, correct: Math.max(0, hits - wrongs) };
      }
      var match = g.length === c.length && g.every(function (v, i) { return v === c[i]; });
      return { total: 1, correct: match ? 1 : 0 };
    }

    case 'order': {
      var g2 = given || [];
      var c2 = q.correct;
      var match2 = g2.length === c2.length && g2.every(function (v, i) { return Number(v) === c2[i]; });
      return { total: 1, correct: match2 ? 1 : 0 };
    }

    case 'short': {
      var givenShort = norm_(given);
      var ok = false;
      acceptList_(q.correct).concat(q.accept || []).forEach(function (a) { if (norm_(a) === givenShort && givenShort !== '') { ok = true; } });
      return { total: 1, correct: ok ? 1 : 0 };
    }

    case 'short-multi': {
      var okCount = 0;
      q.items.forEach(function (it, i) {
        var val = normalizeCombo_((given || [])[i] || '');
        if (val === normalizeCombo_(it.correct)) { okCount++; }
      });
      return { total: q.items.length, correct: okCount };
    }

    case 'char-multi': {
      var okCount2 = 0;
      q.items.forEach(function (it, i) {
        var val2 = String((given || [])[i] || '').trim();
        if (val2 === it.correct) { okCount2++; }
      });
      return { total: q.items.length, correct: okCount2 };
    }

    case 'match': {
      var okM = 0;
      q.items.forEach(function (it, i) {
        if (((given || [])[i] || '') === it.correct) { okM++; }
      });
      return { total: q.items.length, correct: okM };
    }

    case 'gaps': {
      var okG = 0;
      q.gaps.forEach(function (gp, i) {
        var v = ((given || [])[i] || '');
        if (v !== '' && acceptList_(gp.correct).indexOf(v) !== -1) { okG++; }
      });
      return { total: q.gaps.length, correct: okG };
    }

    default:
      return { total: 0, correct: 0 };
  }
}

function normalizeCombo_(s) {
  return String(s || '')
    .replace(/[\u2212\u2013]/g, '-')
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace('alt gr', 'altgr');
}

// ======================= HOJA DE CÁLCULO =======================

function getSpreadsheet_() {
  var props = PropertiesService.getScriptProperties();
  var id = SHEET_ID || props.getProperty('SHEET_ID');
  var ss = null;
  if (id) {
    try { ss = SpreadsheetApp.openById(id); } catch (e) { ss = null; }
  }
  if (!ss) {
    ss = SpreadsheetApp.create(NOMBRE_HOJA_CALCULO);
    props.setProperty('SHEET_ID', ss.getId());
  } else if (String(ss.getName()).indexOf('Cuestionario Entorno de trabajo') === 0) {
    // la hoja se creó con el primer cuestionario: le damos un nombre general
    try { ss.rename(NOMBRE_HOJA_CALCULO); } catch (e2) { /* sin importancia */ }
  }
  return ss;
}

function headersFor_(quiz) {
  if (quiz.legacy) {
    // Formato original (no se cambia, para no romper lo ya guardado)
    return ['Fecha', 'Correo', 'Nombre', 'Apellidos', 'Grupo', 'Nota /10',
      'Pasen (aciertos/total)', 'Classroom (aciertos/total)', 'Teclado (aciertos/total)', 'Respuestas (JSON)'];
  }
  var h = ['Fecha', 'Cuestionario', 'Correo', 'Nombre', 'Apellidos', 'Grupo', 'Nota /10'];
  quiz.blocks.forEach(function (b) { h.push(b.label + ' (puntos)'); });
  h.push('Preguntas que le han salido', 'Detalle (✓ bien · ✗ mal · ~ a medias)', 'Respuestas (JSON)');
  return h;
}

function getSheetFor_(quiz) {
  var ss = getSpreadsheet_();
  var sheet = ss.getSheetByName(quiz.hoja);
  if (!sheet) {
    sheet = ss.insertSheet(quiz.hoja);
    var h = headersFor_(quiz);
    sheet.appendRow(h);
    sheet.getRange(1, 1, 1, h.length).setFontWeight('bold');
    try { sheet.setFrozenRows(1); } catch (e) { /* sin importancia */ }
  }
  return sheet;
}

function logToSheet_(quiz, email, payload, selected, result, scoreOn10) {
  var sheet = getSheetFor_(quiz);
  var pb = result.perBlock;
  var row;
  if (quiz.legacy) {
    row = [
      new Date(), email, payload.nombre || '', payload.apellidos || '', payload.grupo || '', scoreOn10,
      pb.pasen.correct + '/' + pb.pasen.total,
      pb.classroom.correct + '/' + pb.classroom.total,
      pb.teclado.correct + '/' + pb.teclado.total,
      JSON.stringify(payload.answers || {})
    ];
  } else {
    row = [new Date(), quiz.titulo, email, payload.nombre || '', payload.apellidos || '', payload.grupo || '', scoreOn10];
    quiz.blocks.forEach(function (b) {
      var x = pb[b.id] || { correct: 0, total: 0 };
      // "3,5 de 5" y no "3,5/5": Sheets convertiría un texto con barra en fecha
      row.push((Math.round(x.correct * 10) / 10) + ' de ' + (Math.round(x.total * 10) / 10));
    });
    row.push(selected.map(function (q) { return q.id; }).join(', '));
    row.push(result.detalle.join(' · '));
    row.push(JSON.stringify(payload.answers || {}));
  }
  sheet.appendRow(row);
}

function logError_(quiz, email, payload, err) {
  try {
    var ss = getSpreadsheet_();
    var errSheet = ss.getSheetByName('Errores') || ss.insertSheet('Errores');
    errSheet.appendRow([new Date(), quiz.titulo, email, err.message, JSON.stringify(payload)]);
  } catch (e) { /* no romper el flujo si falla el log de errores */ }
}

/**
 * OPCIONAL: ejecútala cuando quieras para tener en la pestaña "Resumen" una
 * fila por alumno/a con su MEJOR nota y su número de intentos en cada
 * cuestionario. La pestaña se rehace entera cada vez (no escribas en ella).
 */
function actualizarResumen() {
  var quizzes = getQuizzes_();
  var ss = getSpreadsheet_();
  var alumnos = {};
  var usados = [];

  QUIZ_ORDER.forEach(function (id) {
    var quiz = quizzes[id];
    var sh = ss.getSheetByName(quiz.hoja);
    if (!sh) { return; }
    usados.push(quiz);
    var rows = sh.getDataRange().getValues();
    for (var i = 1; i < rows.length; i++) {
      var r = rows[i];
      var em = String(r[quiz.cols.email] || '').toLowerCase();
      if (!em) { continue; }
      var a = alumnos[em] || (alumnos[em] = { email: em, nombre: '', apellidos: '', grupo: '', q: {} });
      a.nombre = r[quiz.cols.nombre] || a.nombre;
      a.apellidos = r[quiz.cols.apellidos] || a.apellidos;
      a.grupo = r[quiz.cols.grupo] || a.grupo;
      var nota = Number(r[quiz.cols.nota]);
      var s = a.q[id] || (a.q[id] = { best: null, n: 0 });
      s.n++;
      if (!isNaN(nota) && (s.best === null || nota > s.best)) { s.best = nota; }
    }
  });

  var head = ['Grupo', 'Apellidos', 'Nombre', 'Correo'];
  usados.forEach(function (quiz) { head.push(quiz.titulo + ' · mejor nota', quiz.titulo + ' · intentos'); });
  var lista = Object.keys(alumnos).map(function (k) { return alumnos[k]; });
  lista.sort(function (x, y) {
    return (String(x.grupo) + String(x.apellidos) + String(x.nombre)).localeCompare(String(y.grupo) + String(y.apellidos) + String(y.nombre));
  });
  var data = [head];
  lista.forEach(function (a) {
    var row = [a.grupo, a.apellidos, a.nombre, a.email];
    usados.forEach(function (quiz) {
      var s = a.q[quiz.id];
      row.push(s && s.best !== null ? s.best : '', s ? s.n : 0);
    });
    data.push(row);
  });

  var out = ss.getSheetByName('Resumen') || ss.insertSheet('Resumen');
  out.clear();
  out.getRange(1, 1, data.length, head.length).setValues(data);
  out.getRange(1, 1, 1, head.length).setFontWeight('bold');
  try { out.setFrozenRows(1); } catch (e) { /* sin importancia */ }
  Logger.log('Resumen actualizado: ' + lista.length + ' alumnos/as.');
}

// ======================= CLASSROOM =======================

/**
 * AYUDA: el texto de la URL de una clase justo después de "/c/" está en
 * base64; esta función lo decodifica (pega el texto abajo, ejecuta y mira
 * Ver → Registros).
 */
function decodificarCourseId() {
  var textoDeLaUrl = 'PEGA_AQUI_EL_TEXTO_DESPUES_DE_/c/';
  var real = Utilities.newBlob(Utilities.base64Decode(textoDeLaUrl.replace(/-/g, '+').replace(/_/g, '/'))).getDataAsString();
  Logger.log('COURSE_ID real: ' + real);
  return real;
}

// Avisa con un mensaje claro si falta configurar algo.
function comprobarConfig_(necesitaUrl) {
  if (!COURSE_ID) {
    throw new Error('Falta configurar COURSE_ID en Code.gs (id numérico de tu clase de Classroom). Ayuda: función decodificarCourseId.');
  }
  if (necesitaUrl && !URL_APP) {
    throw new Error('Falta configurar URL_APP en Code.gs (la dirección de la aplicación web, que termina en /exec). Implementa primero la aplicación.');
  }
}

function enlaceDe_(quiz) {
  comprobarConfig_(true);
  return quiz.legacy ? URL_APP : URL_APP + '?q=' + quiz.id;
}

// El cuestionario original conserva su clave de siempre; los nuevos tienen la suya.
function courseworkKey_(quiz) {
  return quiz.legacy ? 'COURSEWORK_ID_' + COURSE_ID : 'COURSEWORK_ID_' + quiz.id + '_' + COURSE_ID;
}

/**
 * Crea EN BORRADOR la tarea de Classroom de un cuestionario: una tarea con
 * puntuación máxima 10 y el enlace del cuestionario en la descripción. La
 * nota se vuelca (en borrador) en esa misma tarea. Si ya existe para esta
 * clase, no la duplica.
 *
 * IMPORTANTE: la API de Classroom no deja consultar entregas de una tarea
 * en borrador, así que publícala antes de que nadie haga el cuestionario.
 * El enlace va solo en el texto, nunca como material.
 */
function crearTareaDe_(qid) {
  var quiz = getQuizzes_()[qid];
  if (!quiz) { throw new Error('Cuestionario desconocido: ' + qid); }
  comprobarConfig_(true);
  var props = PropertiesService.getScriptProperties();
  var idNota = props.getProperty(courseworkKey_(quiz));
  if (idNota) {
    Logger.log('[' + quiz.titulo + '] La tarea ya existía (ID ' + idNota + '). No se crea otra.');
    return idNota;
  }
  var enlace = enlaceDe_(quiz);
  var descripcion = quiz.legacy
    ? quiz.tarea.descripcion + '\n\nEntra desde aquí: ' + enlace
    : quiz.tarea.descripcionAlumnado + '\n\nEntra con tu cuenta del centro desde este enlace:\n' + enlace +
      '\n\nPuedes repetirlo las veces que quieras: se guarda tu mejor nota.';
  var cw = {
    title: quiz.tarea.titulo,
    description: descripcion,
    workType: 'ASSIGNMENT', maxPoints: MAX_POINTS, state: 'DRAFT'
  };
  var creada = Classroom.Courses.CourseWork.create(cw, COURSE_ID);
  props.setProperty(courseworkKey_(quiz), creada.id);
  Logger.log('[' + quiz.titulo + '] Tarea creada en BORRADOR (ID ' + creada.id + '). Publícala en Classroom antes de que el alumnado haga el cuestionario.');
  return creada.id;
}

// --- Funciones para ejecutar desde el editor (desplegable → ▶ Ejecutar) ---

// Cuestionario original (se mantiene el nombre de siempre)
function crearTarea() { return crearTareaDe_('entorno'); }

function crearTareaCiberseguridad() { return crearTareaDe_('ciberseguridad'); }
function crearTareaPropiedad() { return crearTareaDe_('propiedad'); }
function crearTareaUnidad2() { var id = crearTareaDe_('unidad2'); verEnlaces(); return id; }
function crearTareaOrdenador() { return crearTareaDe_('ordenador'); }
function crearTareaAlgoritmos() { return crearTareaDe_('algoritmos'); }
function crearTareaScratch() { var id = crearTareaDe_('scratch'); verEnlaces(); return id; }
function crearTareaMicrobit() { var id = crearTareaDe_('microbit'); verEnlaces(); return id; }

// Las dos de la Unidad 3 de una vez
function crearTareasUnidad3() {
  crearTareaDe_('ordenador');
  crearTareaDe_('algoritmos');
  verEnlaces();
}

// Las dos de la Unidad 1 de una vez
function crearTareasUnidad1() {
  crearTareaDe_('ciberseguridad');
  crearTareaDe_('propiedad');
  verEnlaces();
}

// Muestra en Ver → Registros el enlace de cada cuestionario
function verEnlaces() {
  var quizzes = getQuizzes_();
  QUIZ_ORDER.forEach(function (id) {
    Logger.log(quizzes[id].titulo + '  →  ' + enlaceDe_(quizzes[id]));
  });
  Logger.log('PANEL DEL PROFESOR  →  ' + URL_APP + '   (a secas: te reconoce y te lleva al panel)');
}

// Devuelve { actualizada, notaGuardada }. Solo sobrescribe la nota si la
// nueva es mejor (o si no había ninguna).
function setDraftGrade_(quiz, email, scoreOn10) {
  var courseworkId = PropertiesService.getScriptProperties().getProperty(courseworkKey_(quiz)) || '';
  if (!courseworkId) {
    throw new Error('Todavía no se ha creado la tarea de nota en Classroom. Ejecuta la función de crear tarea de este cuestionario una vez desde el editor.');
  }
  var resp = Classroom.Courses.CourseWork.StudentSubmissions.list(COURSE_ID, courseworkId, { userId: email });
  var subs = resp.studentSubmissions;
  if (!subs || subs.length === 0) {
    throw new Error('No se encontró la entrega de ' + email + ' en esa tarea de Classroom (comprueba que el alumno/a esté matriculado/a en el curso y que la tarea esté publicada).');
  }
  var submission = subs[0];
  var notaActual = (submission.draftGrade === undefined || submission.draftGrade === null) ? null : submission.draftGrade;

  if (notaActual !== null && notaActual >= scoreOn10) {
    return { actualizada: false, notaGuardada: notaActual };
  }

  Classroom.Courses.CourseWork.StudentSubmissions.patch({ draftGrade: scoreOn10 }, COURSE_ID, courseworkId, submission.id, { updateMask: 'draftGrade' });
  return { actualizada: true, notaGuardada: scoreOn10 };
}

// Utilidad de inclusión de archivos HTML (por si algún día se separa CSS/JS)
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}


// ======================= PANEL DEL PROFESOR =======================
// Se abre con <URL_APP>?page=panel y solo lo ve el dueño del proyecto (y los
// correos que pongas en PROFESORES_EXTRA). Lee la hoja de cálculo: no toca
// nada de Classroom ni de las respuestas.

function esProfesor_() {
  var em = String(getUsuario() || '').toLowerCase();
  if (!em) { return false; }
  var dueno = '';
  try { dueno = String(Session.getEffectiveUser().getEmail() || '').toLowerCase(); } catch (e) { dueno = ''; }
  if (dueno && em === dueno) { return true; }
  return PROFESORES_EXTRA.some(function (x) { return String(x).toLowerCase() === em; });
}

function panelPage_() {
  var t = HtmlService.createTemplateFromFile('Panel');
  t.permitido = esProfesor_();
  t.email = getUsuario();
  return t.evaluate()
    .setTitle('Panel del profesor · Computación y Robótica 1º ESO')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// Texto de ejemplo de cada pregunta (para la lista de "más falladas")
function textoPregunta_(q) {
  try {
    if (typeof q.gen === 'function') {
      var m = q.gen(makeRng_(12345));
      return '(pregunta con datos al azar) ' + String(m.prompt || '').substring(0, 140);
    }
    return String(q.prompt || '').substring(0, 150);
  } catch (e) { return ''; }
}

function numeroDe_(v) {
  var n = Number(String(v).replace(',', '.'));
  return isNaN(n) ? null : n;
}

/**
 * Datos para el panel: por cada cuestionario, todos los intentos guardados
 * en su pestaña. El navegador hace las cuentas (medias, filtros, etc.).
 */
function getPanelData() {
  if (!esProfesor_()) { throw new Error('Esta pantalla es solo para el profesorado.'); }
  var quizzes = getQuizzes_();
  var ss = getSpreadsheet_();
  var tz = Session.getScriptTimeZone() || 'Europe/Madrid';
  var salida = [];

  QUIZ_ORDER.forEach(function (id) {
    var quiz = quizzes[id];
    var info = {
      id: id, titulo: quiz.titulo, icono: quiz.icono, legacy: !!quiz.legacy,
      blocks: quiz.blocks.map(function (b) { return { id: b.id, label: b.label }; }),
      intentos: [], preguntas: {}
    };
    var sh = ss.getSheetByName(quiz.hoja);
    if (sh && sh.getLastRow() > 1) {
      var rows = sh.getDataRange().getValues();
      var nb = quiz.blocks.length;
      var c0 = quiz.legacy ? 6 : 7;                 // primera columna de bloques
      var cDet = quiz.legacy ? -1 : 7 + nb + 1;     // columna "Detalle"
      for (var i = 1; i < rows.length; i++) {
        var r = rows[i];
        var em = String(r[quiz.cols.email] || '').trim().toLowerCase();
        if (!em) { continue; }
        var f = r[0];
        var fecha = (f instanceof Date) ? Utilities.formatDate(f, tz, 'dd/MM/yyyy HH:mm') : String(f);
        var ts = (f instanceof Date) ? f.getTime() : 0;
        var bl = [];
        for (var k = 0; k < nb; k++) {
          var vb = r[c0 + k];
          // si Sheets convirtió un «3/5» en fecha (cuestionario original), se ignora
          bl.push((vb === undefined || vb instanceof Date) ? '' : String(vb));
        }
        info.intentos.push({
          e: em, n: String(r[quiz.cols.nombre] || ''), a: String(r[quiz.cols.apellidos] || ''), g: String(r[quiz.cols.grupo] || ''),
          nota: numeroDe_(r[quiz.cols.nota]), f: fecha, t: ts, b: bl,
          d: cDet >= 0 ? String(r[cDet] || '') : ''
        });
      }
    }
    if (!quiz.legacy) {
      quiz.questions.forEach(function (q) { info.preguntas[q.id] = textoPregunta_(q); });
    }
    salida.push(info);
  });

  return { quizzes: salida, hoja: ss.getUrl(), generado: Utilities.formatDate(new Date(), tz, 'dd/MM/yyyy HH:mm') };
}

/**
 * Lista del alumnado de la clase de Classroom, para saber quién falta por
 * hacer cada cuestionario. Es opcional: si Classroom no devuelve los correos
 * o falta el permiso, lo dice y el panel sigue funcionando.
 */
function getAlumnadoClase() {
  if (!esProfesor_()) { throw new Error('Esta pantalla es solo para el profesorado.'); }
  comprobarConfig_(false);
  var lista = [];
  var token = null;
  do {
    var resp = Classroom.Courses.Students.list(COURSE_ID, { pageSize: 100, pageToken: token || undefined });
    (resp.students || []).forEach(function (s) {
      var p = s.profile || {};
      var nom = p.name || {};
      lista.push({
        e: String(p.emailAddress || '').toLowerCase(),
        n: nom.givenName || '', a: nom.familyName || ''
      });
    });
    token = resp.nextPageToken || null;
  } while (token);
  if (lista.length === 0) { throw new Error('Classroom no ha devuelto ningún alumno o alumna de esta clase.'); }
  var conCorreo = lista.filter(function (x) { return x.e; }).length;
  if (conCorreo === 0) {
    throw new Error('Classroom no ha devuelto los correos del alumnado (falta el permiso de ver direcciones de correo). Ejecuta autorizarPanel desde el editor y acepta los permisos.');
  }
  return lista;
}

// ---- Tareas de Classroom desde el panel ----

function tareaInfo_(quiz) {
  var id = PropertiesService.getScriptProperties().getProperty(courseworkKey_(quiz)) || '';
  var info = { id: quiz.id, titulo: quiz.titulo, icono: quiz.icono, enlace: quiz.legacy ? URL_APP + '?q=' + quiz.id : enlaceDe_(quiz), cw: id, estado: id ? 'DESCONOCIDO' : 'SIN_CREAR', url: '', error: '' };
  if (id) {
    try {
      var cw = Classroom.Courses.CourseWork.get(COURSE_ID, id);
      info.estado = cw.state || 'DESCONOCIDO';
      info.url = cw.alternateLink || '';
    } catch (e) {
      info.error = 'No se ha podido consultar la tarea en Classroom (¿la borraste?): ' + (e && e.message ? e.message : e);
    }
  }
  return info;
}

function quizPanel_(qid) {
  if (!esProfesor_()) { throw new Error('Esta pantalla es solo para el profesorado.'); }
  if (QUIZ_ORDER.indexOf(qid) === -1) { throw new Error('Cuestionario desconocido.'); }
  return getQuizzes_()[qid];
}

// Estado de la tarea de Classroom de cada cuestionario
function getTareasClassroom() {
  if (!esProfesor_()) { throw new Error('Esta pantalla es solo para el profesorado.'); }
  var quizzes = getQuizzes_();
  return QUIZ_ORDER.map(function (id) { return tareaInfo_(quizzes[id]); });
}

// Crea (en BORRADOR) la tarea de un cuestionario; si ya existe, no la duplica
function crearTareaDesdePanel(qid) {
  var quiz = quizPanel_(qid);
  crearTareaDe_(qid);
  return tareaInfo_(quiz);
}

// Publica la tarea (pasa de BORRADOR a PUBLICADA): desde ese momento el alumnado la ve
function publicarTareaDesdePanel(qid) {
  var quiz = quizPanel_(qid);
  var id = PropertiesService.getScriptProperties().getProperty(courseworkKey_(quiz));
  if (!id) { throw new Error('Esa tarea todavía no está creada.'); }
  Classroom.Courses.CourseWork.patch({ state: 'PUBLISHED' }, COURSE_ID, id, { updateMask: 'state' });
  return tareaInfo_(quiz);
}

// Ejecútala UNA vez desde el editor (▶) para dar el permiso de ver la lista de la clase.
function autorizarPanel() {
  comprobarConfig_(false);
  var r = Classroom.Courses.Students.list(COURSE_ID, { pageSize: 5 });
  var n = (r.students || []).length;
  var algunCorreo = (r.students || []).some(function (s) { return s.profile && s.profile.emailAddress; });
  Logger.log('Classroom responde: ' + n + ' alumnos/as en la muestra. Correos visibles: ' + (algunCorreo ? 'sí' : 'NO'));
  Logger.log('Hoja de respuestas: ' + getSpreadsheet_().getUrl());
  Logger.log('Panel: ' + (URL_APP ? URL_APP + '?page=panel' : '(rellena URL_APP tras implementar)'));
}