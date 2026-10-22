/**
 * UNIDAD 5 · CONTROL Y ROBÓTICA CON MICRO:BIT
 * Un único cuestionario de 20 preguntas al azar de un banco grande:
 *
 *   5. Control y robótica con micro:bit ... <URL_APP>?q=microbit
 *
 * Funciona igual que los de las unidades anteriores. Las imágenes (programas
 * de MakeCode y placa micro:bit V2) están en IMG5_ (archivo Bloques5.gs).
 * Las preguntas "generadas" usan siempre el rng que reciben, así al corregir
 * sale exactamente lo mismo que vio el alumno.
 *
 * Usa las ayudas mc_, mcFixed_, tf_, multi_, match_ de Unidad1.gs y pick_ de
 * Unidad2.gs.
 */

// ======================================================================
//  REGISTRO DEL CUESTIONARIO
// ======================================================================

function quizMicrobit_() {
  return {
    id: 'microbit',
    titulo: '5. Control y robótica con micro:bit',
    subtitulo: 'Máquinas y robots · Sistemas de control · Placa micro:bit V2 · Leer programas de MakeCode',
    icono: '🤖',
    hoja: 'Unidad 5 micro:bit',
    legacy: false,
    scoring: 'questions',
    blocks: [
      { id: 'teoria', label: 'Control y robótica' },
      { id: 'placa', label: 'La placa micro:bit V2' },
      { id: 'prog', label: 'Programar con MakeCode' }
    ],
    cols: { email: 2, nombre: 3, apellidos: 4, grupo: 5, nota: 6 },
    tarea: {
      titulo: 'Cuestionario 5. Control y robótica con micro:bit',
      descripcionAlumnado: 'Cuestionario de la Unidad 5: máquinas y robots, sistemas de control, la placa micro:bit V2 y lectura de programas de MakeCode. 20 preguntas.'
    },
    plan: [
      { b: 'teoria', pool: 't_def', n: 1 },
      { b: 'teoria', pool: 't_etapa', n: 1 },
      { b: 'teoria', pool: 't_partes', n: 1 },
      { b: 'teoria', pool: 't_lazo', n: 1 },
      { b: 'teoria', pool: 't_lazo2', n: 1 },
      { b: 'teoria', pool: 't_sens', n: 1 },
      { b: 'teoria', pool: 't_tf', n: 1 },
      { b: 'placa', pool: 'p_comp', n: 1 },
      { b: 'placa', pool: 'p_v2', n: 1 },
      { b: 'placa', pool: 'p_sensor', n: 1 },
      { b: 'placa', pool: 'p_dato', n: 1 },
      { b: 'placa', pool: 'p_rango', n: 1 },
      { b: 'prog', pool: 'm_ini', n: 1 },
      { b: 'prog', pool: 'm_temp', n: 1 },
      { b: 'prog', pool: 'm_luz', n: 1 },
      { b: 'prog', pool: 'm_dado', n: 1 },
      { b: 'prog', pool: 'm_brujula', n: 1 },
      { b: 'prog', pool: 'm_radio', n: 1 },
      { b: 'prog', pool: 'm_servo', n: 1 },
      { b: 'prog', pool: 'm_orden', n: 1 }
    ],
    questions: bancoMicrobit_()
  };
}

// ======================================================================
//  AYUDAS
// ======================================================================

function mez5_(arr, rng) { return shuffleWith_(arr.slice(), rng); }

// Imagen de un programa de MakeCode (dentro de un SVG para que se ajuste al ancho)
function imgFig5_(key, w, h, maxw, alt) {
  return '<svg viewBox="0 0 ' + w + ' ' + h + '" style="max-width:' + maxw + 'px" role="img" aria-label="' + alt + '"><image href="' + IMG5_[key] + '" width="' + w + '" height="' + h + '"/></svg>';
}

// Placa micro:bit V2 con un aro naranja sobre un componente
var COMP5_ = {
  led:     { n: 'La matriz de 25 LED (la pantalla)', cara: 'f', z: ['rect', 150, 128, 225, 232, 14] },
  btn:     { n: 'Los botones A y B', cara: 'f', z: ['circ', 46, 237, 44, 484, 237] },
  logo:    { n: 'El logo táctil (solo V2)', cara: 'f', z: ['rect', 205, 62, 115, 66, 32] },
  acc:     { n: 'El acelerómetro', cara: 'b', z: ['circ', 104, 284, 40] },
  brujula: { n: 'La brújula (magnetómetro)', cara: 'b', z: ['circ', 80, 326, 36] },
  mic:     { n: 'El micrófono (solo V2)', cara: 'b', z: ['circ', 480, 164, 34] },
  alt:     { n: 'El altavoz (solo V2)', cara: 'b', z: ['elip', 430, 300, 66, 40] }
};

function placaFig_(id) {
  var c = COMP5_[id], f = c.cara === 'f';
  var w = f ? 547 : 597, h = f ? 462 : 450;
  var st = 'fill="rgba(245,158,11,.25)" stroke="#f59e0b" stroke-width="6"';
  var z = c.z, s;
  if (z[0] === 'rect') {
    s = '<rect x="' + z[1] + '" y="' + z[2] + '" width="' + z[3] + '" height="' + z[4] + '" rx="' + z[5] + '" ' + st + '/>';
  } else if (z[0] === 'circ') {
    s = '<circle cx="' + z[1] + '" cy="' + z[2] + '" r="' + z[3] + '" ' + st + '/>';
    if (z.length > 4) { s += '<circle cx="' + z[4] + '" cy="' + z[5] + '" r="' + z[3] + '" ' + st + '/>'; }
  } else {
    s = '<ellipse cx="' + z[1] + '" cy="' + z[2] + '" rx="' + z[3] + '" ry="' + z[4] + '" ' + st + '/>';
  }
  return '<svg viewBox="0 0 ' + w + ' ' + h + '" style="max-width:380px" role="img" aria-label="Placa micro:bit V2 con un aro naranja sobre un componente"><rect width="' + w + '" height="' + h + '" rx="14" fill="#e0f2fe"/><image href="' + IMG5_[f ? 'pf' : 'pb'] + '" width="' + w + '" height="' + h + '"/>' + s + '</svg>';
}

// Esquema entrada -> control -> salida, con o sin realimentación
function lazoFig5_(cerrado, e, c, s, r) {
  var W = 760, H = cerrado ? 220 : 150;
  function box(x, t1, t2, fill, stroke) {
    return '<rect x="' + x + '" y="34" width="190" height="78" rx="14" fill="' + fill + '" stroke="' + stroke + '" stroke-width="3"/>' +
      '<text x="' + (x + 95) + '" y="68" text-anchor="middle" font-family="Arial,sans-serif" font-size="19" font-weight="700" fill="#181c34">' + t1 + '</text>' +
      '<text x="' + (x + 95) + '" y="92" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" fill="#4c5170">' + t2 + '</text>';
  }
  function arr(x1, x2) {
    return '<line x1="' + x1 + '" y1="73" x2="' + (x2 - 8) + '" y2="73" stroke="#475569" stroke-width="3.5" stroke-linecap="round"/><polygon points="' + x2 + ',73 ' + (x2 - 12) + ',66 ' + (x2 - 12) + ',80" fill="#475569"/>';
  }
  var o = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Esquema de un sistema de control con entrada, control y salida"><rect width="' + W + '" height="' + H + '" rx="18" fill="#f8fafc"/>';
  o += box(24, 'ENTRADA', e, '#e0f2fe', '#0891b2') + box(285, 'CONTROL', c, '#ede9fe', '#4f46e5') + box(546, 'SALIDA', s, '#fef3c7', '#c2660a') + arr(214, 285) + arr(475, 546);
  if (cerrado) {
    o += '<path d="M641 112 V190 H119 V122" fill="none" stroke="#be185d" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="2 8"/>';
    o += '<polygon points="119,114 112,128 126,128" fill="#be185d"/>';
    o += '<rect x="215" y="168" width="330" height="38" rx="19" fill="#fce7f3" stroke="#be185d" stroke-width="2.5"/>';
    o += '<text x="380" y="192" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" font-weight="700" fill="#9d174d">' + r + '</text>';
  }
  return o + '</svg>';
}

// ======================================================================
//  BANCO DE PREGUNTAS
// ======================================================================

function bancoMicrobit_() {
  var bank = [];

  // ================================================================ TEORÍA
  // ---- Máquina, autómata, robot (definiciones)
  bank.push(mc_('t_def1', 't_def', 'Un autómata repite siempre el mismo trabajo sin que nadie lo dirija. ¿Qué añade un robot?', 'Toma decisiones según lo que detecta a su alrededor con sensores',
    ['Necesita que una persona lo dirija en todo momento', 'Solo funciona mientras se mantiene pulsado un botón', 'Siempre es más rápido que un autómata']));
  bank.push(mc_('t_def2', 't_def', '¿Cuál de estas frases describe a una máquina, la primera etapa?', 'Hace un trabajo, pero una persona la dirige en todo momento',
    ['Hace siempre lo mismo sin que nadie la dirija', 'Decide según lo que detectan sus sensores', 'Se programa con bloques en un ordenador']));
  bank.push(mcFixed_('t_def3', 't_def', 'Un horno se programa para apagarse solo a los 30 minutos, haga lo que haga la comida. ¿En qué etapa está?', ['Mecanización', 'Automatización', 'Robotización'], 'Automatización'));
  bank.push(mcFixed_('t_def4', 't_def', 'Un jardinero abre y cierra a mano unos aspersores. Se añade un sensor que los abre solo cuando la tierra está seca. ¿Qué etapa se ha alcanzado?', ['Mecanización', 'Automatización', 'Robotización'], 'Robotización'));

  // ---- Une cada ejemplo con máquina, autómata o robot
  bank.push({
    id: 'g_etapa', pool: 't_etapa',
    gen: function (rng) {
      var maq = ['Una batidora que solo funciona mientras mantienes pulsado el botón', 'Unos aspersores que el jardinero abre y cierra a mano'];
      var aut = ['Un horno programado para apagarse a los 30 minutos', 'Unos aspersores con temporizador que riegan todos los días a la misma hora'];
      var rob = ['Un robot aspirador que cambia de rumbo al chocar con un obstáculo', 'Unos aspersores que se abren solo cuando un sensor mide la tierra seca'];
      var pares = mez5_([[pick_(maq, rng), 'Máquina'], [pick_(aut, rng), 'Autómata'], [pick_(rob, rng), 'Robot']], rng);
      return match_('x', 'x', 'Une cada ejemplo con lo que es.', pares, ['Máquina', 'Autómata', 'Robot']);
    }
  });

  // ---- Entrada, control, salida
  bank.push({
    id: 'g_partes', pool: 't_partes',
    gen: function (rng) {
      var ent = ['Pulsar el botón A', 'La temperatura que mide el sensor', 'La luz que llega a la placa', 'Agitar la micro:bit'];
      var con = ['El programa de la micro:bit', 'El microprocesador que toma las decisiones'];
      var sal = ['Encender los LED', 'Sonar el altavoz', 'Mover un servomotor', 'Mostrar un número en la pantalla'];
      var pares = mez5_([[pick_(ent, rng), 'Entrada'], [pick_(con, rng), 'Control'], [pick_(sal, rng), 'Salida']], rng);
      return match_('x', 'x', 'En un sistema de control, cada elemento hace de entrada, de control o de salida. Une cada uno con su función.', pares, ['Entrada', 'Control', 'Salida']);
    }
  });

  // ---- Lazo abierto / cerrado en un esquema
  bank.push({
    id: 'g_lazo', pool: 't_lazo',
    gen: function (rng) {
      var cerrado = pick_([true, false], rng);
      var q = mcFixed_('x', 'x', '¿Qué tipo de sistema de control representa este esquema?', ['Lazo abierto (sin realimentación)', 'Lazo cerrado (con realimentación)'],
        cerrado ? 'Lazo cerrado (con realimentación)' : 'Lazo abierto (sin realimentación)');
      if (cerrado) {
        var v = pick_([['temperatura deseada', 'comparar y decidir', 'encender la calefacción', 'sensor de temperatura (realimentación)'],
                       ['humedad deseada', 'comparar y decidir', 'abrir o cerrar el riego', 'sensor de humedad (realimentación)']], rng);
        q.fig = lazoFig5_(true, v[0], v[1], v[2], v[3]);
      } else {
        var u = pick_([['la hora', 'temporizador', 'abrir el riego'], ['pulsar un botón', 'programa', 'encender un LED']], rng);
        q.fig = lazoFig5_(false, u[0], u[1], u[2], '');
      }
      return q;
    }
  });

  // ---- Lazo abierto / cerrado en ejemplos
  bank.push({
    id: 'g_lazo2', pool: 't_lazo2',
    gen: function (rng) {
      var ab = ['Una farola que se enciende todos los días a las 20:00', 'Un riego que se abre a una hora fija aunque esté lloviendo', 'Una luz de escalera que se apaga a los 30 segundos, haya alguien o no'];
      var ce = ['Un termostato que apaga la calefacción al llegar a 21 °C', 'Una farola con sensor de luz que se enciende cuando oscurece de verdad', 'Un riego que se abre solo cuando el sensor mide la tierra seca'];
      var cerrado = pick_([true, false], rng);
      var txt = pick_(cerrado ? ce : ab, rng);
      return mcFixed_('x', 'x', '¿Qué tipo de control tiene este sistema? ' + txt + '.', ['Lazo abierto (sin realimentación)', 'Lazo cerrado (con realimentación)'],
        cerrado ? 'Lazo cerrado (con realimentación)' : 'Lazo abierto (sin realimentación)');
    }
  });

  // ---- Sensores y lo que miden
  bank.push({
    id: 'g_sens', pool: 't_sens',
    gen: function (rng) {
      var todos = [
        ['Sensor de contacto', 'Detecta un choque con un obstáculo'],
        ['Fotodetector', 'Mide la intensidad de la luz'],
        ['Sonda térmica', 'Mide la temperatura'],
        ['Sensor de humedad', 'Detecta si la tierra está seca o mojada'],
        ['Micrófono', 'Convierte el sonido en una señal eléctrica'],
        ['Acelerómetro', 'Detecta movimientos, golpes e inclinaciones']
      ];
      var sel = mez5_(todos, rng).slice(0, 4);
      var extra = mez5_(todos.filter(function (t) { return sel.indexOf(t) === -1; }), rng).slice(0, 1);
      return match_('x', 'x', 'Une cada sensor con lo que hace.', sel, mez5_(sel.concat(extra), rng).map(function (t) { return t[1]; }));
    }
  });

  bank.push(tf_('t_tf1', 't_tf', 'En un sistema de lazo cerrado, un sensor mide el resultado y el control lo tiene en cuenta.', true));
  bank.push(tf_('t_tf2', 't_tf', 'Casi todos los automatismos con temporizador son de lazo cerrado.', false));
  bank.push(tf_('t_tf3', 't_tf', 'Los sensores son los «sentidos» de un robot y los actuadores sus «músculos».', true));
  bank.push(tf_('t_tf4', 't_tf', 'Un servomotor es un sensor, porque mide el ángulo de un brazo.', false));
  bank.push(tf_('t_tf5', 't_tf', 'En un robot, la unidad de control es la que toma las decisiones.', true));

  // ================================================================ PLACA V2
  // ---- ¿Qué componente está marcado?
  bank.push({
    id: 'g_comp', pool: 'p_comp',
    gen: function (rng) {
      var ids = ['led', 'btn', 'logo', 'acc', 'brujula', 'mic', 'alt'];
      var id = pick_(ids, rng);
      var otros = mez5_(ids.filter(function (x) { return x !== id; }), rng).slice(0, 3);
      var q = mc_('x', 'x', '¿Qué componente de la micro:bit V2 está rodeado por el aro naranja?', COMP5_[id].n, otros.map(function (x) { return COMP5_[x].n; }));
      q.fig = placaFig_(id);
      return q;
    }
  });

  bank.push(multi_('p_v2', 'p_v2', '¿Cuáles de estos componentes son novedades de la micro:bit V2 respecto a la V1? (marca todas las respuestas correctas)',
    ['El micrófono', 'El altavoz integrado', 'El logo táctil'],
    ['La matriz de 25 LED', 'Los botones A y B', 'La brújula']));

  // ---- ¿Qué componente uso para…?
  bank.push({
    id: 'g_sensor', pool: 'p_sensor',
    gen: function (rng) {
      var ops = ['El acelerómetro', 'La brújula (magnetómetro)', 'El micrófono (solo V2)', 'El logo táctil (solo V2)'];
      var v = pick_([
        ['saber si alguien la está agitando', 0],
        ['saber hacia dónde está el norte', 1],
        ['saber si hay mucho ruido en el aula', 2],
        ['saber si alguien toca con el dedo su «cara» dorada', 3]
      ], rng);
      return mcFixed_('x', 'x', '¿Qué componente de la micro:bit usarías para ' + v[0] + '?', ops, ops[v[1]]);
    }
  });

  // ---- Cómo funcionan algunos componentes
  bank.push(mc_('p_dato1', 'p_dato', '¿Cómo mide la micro:bit el nivel de luz?', 'Con los propios LED de la pantalla, que también pueden medir la luz',
    ['Con un fotodiodo escondido en el logo', 'Con una cámara en la cara trasera', 'No puede medir la luz']));
  bank.push(mc_('p_dato2', 'p_dato', 'El sensor de temperatura de la micro:bit mide…', 'La temperatura del propio procesador, parecida a la del ambiente',
    ['La temperatura exacta del aire del aula', 'La temperatura de la persona que la sostiene', 'La humedad del ambiente']));
  bank.push(mc_('p_dato3', 'p_dato', '¿Por qué hay que calibrar la brújula la primera vez que se usa?', 'Porque el campo magnético del lugar la altera y necesita ajustarse',
    ['Porque viene sin pilas', 'Porque si no, la placa no se enciende', 'Porque así se conecta por radio']));
  bank.push(mc_('p_dato4', 'p_dato', '¿Qué contactos grandes del borde de la micro:bit se pueden agarrar con pinzas de cocodrilo?', '0, 1, 2, 3V y GND',
    ['A, B, 3V y GND', 'Los 25 contactos, todos por igual', 'Solo el 3V y el GND']));
  bank.push(mc_('p_dato5', 'p_dato', 'La micro:bit no tiene interruptor de encendido. ¿Cuándo empieza a ejecutar su programa?', 'En cuanto recibe alimentación, por USB o con pilas',
    ['Cuando se pulsa el botón A', 'Cuando se agita', 'Cuando se conecta por radio con otra placa']));

  // ---- Números de la placa
  bank.push({ id: 'p_r1', pool: 'p_rango', type: 'short', prompt: '¿Cuál es el valor máximo que devuelve el nivel de luz de la micro:bit? Escribe solo el número.', correct: '255' });
  bank.push({ id: 'p_r2', pool: 'p_rango', type: 'short', prompt: '¿Cuál es el valor más alto, en grados, que devuelve la brújula? Escribe solo el número.', correct: '359' });
  bank.push({ id: 'p_r3', pool: 'p_rango', type: 'short', prompt: '¿Cuántos LED tiene la pantalla de la micro:bit? Escribe solo el número.', correct: '25' });
  bank.push({ id: 'p_r4', pool: 'p_rango', type: 'short', prompt: '¿Cuántas milésimas de segundo (ms) hay en 1 segundo? Escribe solo el número (es lo que se pone en el bloque «pausa»).', correct: '1000' });

  // ================================================================ MAKECODE
  // ---- ¿Qué bloque uso?
  bank.push({
    id: 'g_ini', pool: 'm_ini',
    gen: function (rng) {
      var ops = ['al iniciar', 'para siempre', 'al presionarse el botón A', 'si agitado'];
      var v = pick_([
        ['Quieres que la micro:bit salude una sola vez, al encenderla.', 0],
        ['Quieres que la micro:bit mida la temperatura continuamente.', 1],
        ['Quieres que ocurra algo cada vez que se pulse el botón A.', 2],
        ['Quieres que la micro:bit lance un dado cada vez que la sacudas.', 3]
      ], rng);
      return mcFixed_('x', 'x', v[0] + ' ¿Qué bloque de evento pondrías para empezar?', ops, ops[v[1]]);
    }
  });

  // ---- Termómetro con alarma
  bank.push({
    id: 'g_temp', pool: 'm_temp',
    gen: function (rng) {
      var t = pick_([18, 22, 27, 29, 33, 36, 41], rng);
      var aviso = t > 30;
      var q = mc_('x', 'x', 'La micro:bit con este programa mide ' + t + ' °C. ¿Qué muestra?', aviso ? 'El símbolo de aviso dibujado con los LED' : 'El número ' + t,
        [aviso ? 'El número ' + t : 'El símbolo de aviso dibujado con los LED', 'La pantalla se queda apagada', 'El número 30']);
      q.fig = imgFig5_('a62', 400, 410, 300, 'Programa de MakeCode: para siempre, si temperatura mayor que 30 muestra un aviso con los LED y si no muestra la temperatura');
      return q;
    }
  });

  // ---- Linterna: 255 - nivel de luz
  bank.push({
    id: 'g_luz', pool: 'm_luz',
    gen: function (rng) {
      var l = pick_([0, 55, 100, 150, 200, 255], rng);
      var q = { id: 'x', pool: 'x', type: 'short', prompt: 'Con este programa, el nivel de luz es ' + l + '. ¿Qué valor de brillo se aplica a los LED? Escribe solo el número.', correct: String(255 - l) };
      q.fig = imgFig5_('a63', 340, 353, 280, 'Programa de MakeCode: fijar b a 255 menos nivel de luz, ajustar brillo a b y mostrar todos los LED');
      return q;
    }
  });

  // ---- Dado electrónico
  bank.push((function () {
    var q = mc_('m_dado1', 'm_dado', '¿Qué hace este programa?', 'Cada vez que se agita la placa, muestra un número al azar del 1 al 6 durante un segundo y borra la pantalla',
      ['Muestra siempre el número 6', 'Muestra los números del 1 al 6 uno tras otro, sin que haga falta agitarla', 'Muestra un número al azar cuando se pulsa el botón A']);
    q.fig = imgFig5_('a64', 380, 246, 340, 'Programa de MakeCode: si agitado, fijar n a un número al azar de 1 a 6, mostrar n, pausa de 1000 ms y borrar la pantalla');
    return q;
  })());
  bank.push((function () {
    var q = mc_('m_dado2', 'm_dado', 'En este programa, ¿qué pasaría si se quitara el bloque «borrar la pantalla»?', 'El número se quedaría en la pantalla hasta la siguiente sacudida',
      ['El número no se mostraría nunca', 'La placa no detectaría las sacudidas', 'Saldrían dos números a la vez']);
    q.fig = imgFig5_('a64', 380, 246, 340, 'Programa de MakeCode: si agitado, fijar n a un número al azar de 1 a 6, mostrar n, pausa de 1000 ms y borrar la pantalla');
    return q;
  })());
  bank.push((function () {
    var q = mc_('m_dado3', 'm_dado', 'En este programa, ¿para qué sirve la variable n?', 'Para guardar el número al azar y poder mostrarlo',
      ['Para contar cuántas veces se ha agitado la placa', 'Para fijar la duración de la pausa', 'Para elegir el icono que se muestra']);
    q.fig = imgFig5_('a64', 380, 246, 340, 'Programa de MakeCode: si agitado, fijar n a un número al azar de 1 a 6, mostrar n, pausa de 1000 ms y borrar la pantalla');
    return q;
  })());

  // ---- Brújula
  bank.push({
    id: 'g_bruj', pool: 'm_brujula',
    gen: function (rng) {
      var g = pick_([10, 20, 70, 100, 120, 160, 200, 240, 290, 330, 350], rng);
      var res = g < 45 ? 'Norte' : g < 135 ? 'Este' : g < 225 ? 'Sur' : g < 315 ? 'Oeste' : 'Norte';
      var q = mcFixed_('x', 'x', 'Con este programa, la brújula marca ' + g + ' grados. ¿Qué flecha muestra la pantalla?', ['Norte', 'Este', 'Sur', 'Oeste'], res);
      q.fig = imgFig5_('a65', 300, 420, 300, 'Programa de MakeCode: fijar rumbo a la dirección de la brújula y mostrar una flecha Norte, Este, Sur u Oeste según el valor');
      return q;
    }
  });

  // ---- Radio
  bank.push(mc_('m_rad1', 'm_radio', 'Dos micro:bit tienen que comunicarse por radio. ¿Qué tiene que ser igual en las dos?', 'El grupo de radio',
    ['El nombre del proyecto', 'El número de pilas', 'El color del icono que muestran']));
  bank.push(mc_('m_rad2', 'm_radio', 'Dos parejas de la clase usan el mismo grupo de radio. ¿Qué ocurre?', 'Las placas de una pareja también reciben los mensajes de la otra',
    ['Las placas no se pueden comunicar', 'Cada pareja solo recibe sus propios mensajes', 'Se borra el programa de las placas']));
  bank.push(mc_('m_rad3', 'm_radio', 'En la linterna a distancia, el mando envía el texto «POWER». ¿Para qué sirve?', 'Para dar la orden de encender o apagar la linterna',
    ['Para cambiar el grupo de radio', 'Para subir el brillo', 'Para calibrar la brújula']));
  bank.push(mc_('m_rad4', 'm_radio', 'El mando de la linterna envía el número -25 al pulsar el botón A. ¿Qué hace la linterna al recibirlo?', 'Suma -25 al brillo, es decir, lo baja',
    ['Se apaga por completo', 'Cambia de grupo de radio', 'Muestra el número 25 en la pantalla']));

  // ---- Servomotor
  bank.push(mc_('m_serv1', 'm_servo', '¿Qué hace un servomotor de 180°?', 'Gira hasta el ángulo que se le pide y se queda en esa posición',
    ['Gira sin parar a una velocidad fija', 'Solo puede estar encendido o apagado', 'Mide el ángulo en el que está']));
  bank.push(mc_('m_serv2', 'm_servo', 'La extensión Servo de MakeCode solo admite determinados pines. ¿A cuál puedes conectar la señal del servo?', 'A P0, P1 o P2',
    ['A cualquiera de los 25 contactos', 'Solo al GND', 'Solo al 3V']));
  bank.push(mc_('m_serv3', 'm_servo', 'En un sistema de control, ¿qué es un servomotor?', 'Un actuador (una salida)',
    ['Un sensor (una entrada)', 'La unidad de control', 'Una fuente de alimentación']));

  // ---- Orden de pasos
  bank.push({ id: 'm_ord1', pool: 'm_orden', type: 'order',
    prompt: 'Ordena los pasos para entregar una práctica de MakeCode:',
    steps: ['Probar que funciona en el simulador', 'Pulsar Compartir y Publicar proyecto', 'Copiar el enlace del proyecto', 'Pegar el enlace en la tarea de Classroom'],
    correct: [0, 1, 2, 3] });
  bank.push({ id: 'm_ord2', pool: 'm_orden', type: 'order',
    prompt: 'Ordena los pasos para pasar un programa a tu micro:bit:',
    steps: ['Conectar la micro:bit al ordenador con el cable USB', 'Pulsar Descargar en MakeCode', 'Esperar a que la luz amarilla de la placa deje de parpadear', 'Desconectar la placa'],
    correct: [0, 1, 2, 3] });

  return bank;
}