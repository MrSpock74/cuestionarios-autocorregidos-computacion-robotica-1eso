/**
 * UNIDAD 3 · EL ORDENADOR, ALGORITMOS Y LENGUAJES
 * Dos cuestionarios (en vez de los cuatro de Moodle), cada uno con unas 20
 * preguntas al azar de un banco grande:
 *
 *   3.1 El ordenador ........................ <URL_APP>?q=ordenador
 *   3.2 Algoritmos, lenguajes y binario ..... <URL_APP>?q=algoritmos
 *
 * Funciona igual que los de la Unidad 1 y 2 (ver Unidad1.gs y Unidad2.gs).
 * Aquí hay preguntas "generadas": fabrican el dibujo o los números al azar
 * (puertos, piezas, diagramas de flujo, conversiones a binario...). Usan
 * siempre el rng que reciben, así al corregir sale exactamente lo mismo.
 *
 * Los dibujos de piezas, puertos y símbolos son los mismos del libro de la
 * Unidad 3. Usa las ayudas mc_, mcFixed_, tf_, multi_, match_, gaps_ de
 * Unidad1.gs y esc_, pick_ de Unidad2.gs.
 */

var ICONOS3_ = {"placa": {"vb": [90, 90], "inner": "<circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"#e0f2fe\"/><rect x=\"20\" y=\"20\" width=\"50\" height=\"50\" rx=\"5\" fill=\"#fff\" stroke=\"#0891b2\" stroke-width=\"4\"/><rect x=\"31\" y=\"31\" width=\"14\" height=\"14\" rx=\"2\" fill=\"#0891b2\"/><g fill=\"#0891b2\"><rect x=\"52\" y=\"28\" width=\"12\" height=\"4\"/><rect x=\"52\" y=\"36\" width=\"12\" height=\"4\"/><rect x=\"52\" y=\"44\" width=\"12\" height=\"4\"/><rect x=\"28\" y=\"54\" width=\"34\" height=\"5\"/></g>"}, "micro": {"vb": [90, 90], "inner": "<circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"#fce7f3\"/><rect x=\"26\" y=\"26\" width=\"38\" height=\"38\" rx=\"5\" fill=\"#fff\" stroke=\"#be185d\" stroke-width=\"4\"/><rect x=\"36\" y=\"36\" width=\"18\" height=\"18\" rx=\"2\" fill=\"#be185d\"/><g stroke=\"#be185d\" stroke-width=\"4\" stroke-linecap=\"round\"><path d=\"M36 17v6M45 17v6M54 17v6M36 67v6M45 67v6M54 67v6M17 36h6M17 45h6M17 54h6M67 36h6M67 45h6M67 54h6\"/></g>"}, "ram": {"vb": [90, 90], "inner": "<circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"#fef3c7\"/><rect x=\"14\" y=\"30\" width=\"62\" height=\"26\" rx=\"3\" fill=\"#fff\" stroke=\"#c2660a\" stroke-width=\"4\"/><g fill=\"#c2660a\"><rect x=\"21\" y=\"36\" width=\"10\" height=\"14\" rx=\"1\"/><rect x=\"36\" y=\"36\" width=\"10\" height=\"14\" rx=\"1\"/><rect x=\"51\" y=\"36\" width=\"10\" height=\"14\" rx=\"1\"/></g><path d=\"M22 56v8M32 56v8M42 56v8M52 56v8M62 56v8\" stroke=\"#c2660a\" stroke-width=\"3\"/>"}, "tarjeta": {"vb": [90, 90], "inner": "<circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"#fee2e2\"/><rect x=\"14\" y=\"26\" width=\"62\" height=\"32\" rx=\"4\" fill=\"#fff\" stroke=\"#b91c1c\" stroke-width=\"4\"/><circle cx=\"33\" cy=\"42\" r=\"9\" fill=\"none\" stroke=\"#b91c1c\" stroke-width=\"4\"/><circle cx=\"57\" cy=\"42\" r=\"9\" fill=\"none\" stroke=\"#b91c1c\" stroke-width=\"4\"/><path d=\"M22 58v7M32 58v7M42 58v7M52 58v7\" stroke=\"#b91c1c\" stroke-width=\"3\"/>"}, "puertos": {"vb": [90, 90], "inner": "<circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"#dcfce7\"/><rect x=\"22\" y=\"30\" width=\"46\" height=\"30\" rx=\"5\" fill=\"#fff\" stroke=\"#15803d\" stroke-width=\"4\"/><rect x=\"31\" y=\"42\" width=\"28\" height=\"8\" rx=\"2\" fill=\"#15803d\"/>"}, "hdd": {"vb": [90, 90], "inner": "<circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"#dcfce7\"/><rect x=\"19\" y=\"21\" width=\"52\" height=\"48\" rx=\"6\" fill=\"#fff\" stroke=\"#15803d\" stroke-width=\"4\"/><circle cx=\"45\" cy=\"45\" r=\"15\" fill=\"none\" stroke=\"#15803d\" stroke-width=\"4\"/><circle cx=\"45\" cy=\"45\" r=\"4\" fill=\"#15803d\"/><path d=\"M60 29l-9 12\" stroke=\"#15803d\" stroke-width=\"4\" stroke-linecap=\"round\"/>"}, "ssd": {"vb": [90, 90], "inner": "<circle cx=\"45\" cy=\"45\" r=\"45\" fill=\"#ede9fe\"/><rect x=\"20\" y=\"24\" width=\"50\" height=\"42\" rx=\"6\" fill=\"#fff\" stroke=\"#4f46e5\" stroke-width=\"4\"/><g fill=\"#4f46e5\"><rect x=\"28\" y=\"33\" width=\"14\" height=\"10\" rx=\"1\"/><rect x=\"46\" y=\"33\" width=\"14\" height=\"10\" rx=\"1\"/></g><path d=\"M28 55h34\" stroke=\"#4f46e5\" stroke-width=\"4\" stroke-linecap=\"round\"/>"}, "usbA": {"vb": [120, 70], "inner": "<rect width=\"120\" height=\"70\" rx=\"12\" fill=\"#f4f5fb\"/><rect x=\"28\" y=\"20\" width=\"64\" height=\"30\" rx=\"3\" fill=\"#fff\" stroke=\"#334\" stroke-width=\"3\"/><rect x=\"34\" y=\"32\" width=\"52\" height=\"9\" fill=\"#334\"/><rect x=\"34\" y=\"26\" width=\"52\" height=\"3\" fill=\"#bfc6d6\"/>"}, "usbC": {"vb": [120, 70], "inner": "<rect width=\"120\" height=\"70\" rx=\"12\" fill=\"#f4f5fb\"/><rect x=\"32\" y=\"24\" width=\"56\" height=\"22\" rx=\"11\" fill=\"#fff\" stroke=\"#334\" stroke-width=\"3\"/><rect x=\"40\" y=\"31\" width=\"40\" height=\"8\" rx=\"4\" fill=\"#334\"/>"}, "hdmi": {"vb": [120, 70], "inner": "<rect width=\"120\" height=\"70\" rx=\"12\" fill=\"#f4f5fb\"/><path d=\"M26 22H94V38L86 48H34L26 38Z\" fill=\"#fff\" stroke=\"#334\" stroke-width=\"3\" stroke-linejoin=\"round\"/><path d=\"M38 30H82\" stroke=\"#334\" stroke-width=\"5\" stroke-linecap=\"round\"/>"}, "eth": {"vb": [120, 70], "inner": "<rect width=\"120\" height=\"70\" rx=\"12\" fill=\"#f4f5fb\"/><path d=\"M40 16H80V54H40Z\" fill=\"#fff\" stroke=\"#334\" stroke-width=\"3\"/><rect x=\"52\" y=\"10\" width=\"16\" height=\"8\" fill=\"#fff\" stroke=\"#334\" stroke-width=\"3\"/><g stroke=\"#334\" stroke-width=\"3\"><path d=\"M47 40v10M53 40v10M59 40v10M65 40v10M71 40v10\"/></g>"}, "jack": {"vb": [120, 70], "inner": "<rect width=\"120\" height=\"70\" rx=\"12\" fill=\"#f4f5fb\"/><circle cx=\"60\" cy=\"35\" r=\"20\" fill=\"#fff\" stroke=\"#334\" stroke-width=\"3\"/><circle cx=\"60\" cy=\"35\" r=\"7\" fill=\"#334\"/>"}, "vga": {"vb": [120, 70], "inner": "<rect width=\"120\" height=\"70\" rx=\"12\" fill=\"#f4f5fb\"/><path d=\"M22 22H98L90 48H30Z\" fill=\"#fff\" stroke=\"#334\" stroke-width=\"3\" stroke-linejoin=\"round\"/><g fill=\"#334\"><circle cx=\"36\" cy=\"28\" r=\"2.2\"/><circle cx=\"48\" cy=\"28\" r=\"2.2\"/><circle cx=\"60\" cy=\"28\" r=\"2.2\"/><circle cx=\"72\" cy=\"28\" r=\"2.2\"/><circle cx=\"84\" cy=\"28\" r=\"2.2\"/><circle cx=\"36\" cy=\"36\" r=\"2.2\"/><circle cx=\"48\" cy=\"36\" r=\"2.2\"/><circle cx=\"60\" cy=\"36\" r=\"2.2\"/><circle cx=\"72\" cy=\"36\" r=\"2.2\"/><circle cx=\"84\" cy=\"36\" r=\"2.2\"/><circle cx=\"36\" cy=\"44\" r=\"2.2\"/><circle cx=\"48\" cy=\"44\" r=\"2.2\"/><circle cx=\"60\" cy=\"44\" r=\"2.2\"/><circle cx=\"72\" cy=\"44\" r=\"2.2\"/><circle cx=\"84\" cy=\"44\" r=\"2.2\"/></g>"}, "ps2": {"vb": [120, 70], "inner": "<rect width=\"120\" height=\"70\" rx=\"12\" fill=\"#f4f5fb\"/><circle cx=\"60\" cy=\"35\" r=\"21\" fill=\"#fff\" stroke=\"#334\" stroke-width=\"3\"/><rect x=\"54\" y=\"12\" width=\"12\" height=\"7\" fill=\"#334\"/><g fill=\"#334\"><circle cx=\"48\" cy=\"36\" r=\"2.6\"/><circle cx=\"72\" cy=\"36\" r=\"2.6\"/><circle cx=\"53\" cy=\"46\" r=\"2.6\"/><circle cx=\"67\" cy=\"46\" r=\"2.6\"/><circle cx=\"53\" cy=\"27\" r=\"2.6\"/><circle cx=\"67\" cy=\"27\" r=\"2.6\"/></g>"}, "par": {"vb": [120, 70], "inner": "<rect width=\"120\" height=\"70\" rx=\"12\" fill=\"#f4f5fb\"/><path d=\"M12 24H108L102 48H18Z\" fill=\"#fff\" stroke=\"#334\" stroke-width=\"3\" stroke-linejoin=\"round\"/><g fill=\"#334\"><circle cx=\"26\" cy=\"31\" r=\"2\"/><circle cx=\"33\" cy=\"31\" r=\"2\"/><circle cx=\"40\" cy=\"31\" r=\"2\"/><circle cx=\"47\" cy=\"31\" r=\"2\"/><circle cx=\"54\" cy=\"31\" r=\"2\"/><circle cx=\"61\" cy=\"31\" r=\"2\"/><circle cx=\"68\" cy=\"31\" r=\"2\"/><circle cx=\"75\" cy=\"31\" r=\"2\"/><circle cx=\"82\" cy=\"31\" r=\"2\"/><circle cx=\"89\" cy=\"31\" r=\"2\"/><circle cx=\"96\" cy=\"31\" r=\"2\"/><circle cx=\"103\" cy=\"31\" r=\"2\"/><circle cx=\"26\" cy=\"40\" r=\"2\"/><circle cx=\"33\" cy=\"40\" r=\"2\"/><circle cx=\"40\" cy=\"40\" r=\"2\"/><circle cx=\"47\" cy=\"40\" r=\"2\"/><circle cx=\"54\" cy=\"40\" r=\"2\"/><circle cx=\"61\" cy=\"40\" r=\"2\"/><circle cx=\"68\" cy=\"40\" r=\"2\"/><circle cx=\"75\" cy=\"40\" r=\"2\"/><circle cx=\"82\" cy=\"40\" r=\"2\"/><circle cx=\"89\" cy=\"40\" r=\"2\"/><circle cx=\"96\" cy=\"40\" r=\"2\"/><circle cx=\"103\" cy=\"40\" r=\"2\"/></g>"}, "s_term": {"vb": [90, 44], "inner": "<rect x=\"8\" y=\"8\" width=\"74\" height=\"28\" rx=\"14\" fill=\"#e0f2fe\" stroke=\"#0891b2\" stroke-width=\"2.5\"/>"}, "s_io": {"vb": [90, 44], "inner": "<polygon points=\"22,8 84,8 68,36 6,36\" fill=\"#ede9fe\" stroke=\"#4f46e5\" stroke-width=\"2.5\"/>"}, "s_proc": {"vb": [90, 44], "inner": "<rect x=\"8\" y=\"8\" width=\"74\" height=\"28\" rx=\"3\" fill=\"#fff4dc\" stroke=\"#c2660a\" stroke-width=\"2.5\"/>"}, "s_dec": {"vb": [90, 44], "inner": "<polygon points=\"45,3 84,22 45,41 6,22\" fill=\"#fce7f3\" stroke=\"#be185d\" stroke-width=\"2.5\"/>"}, "s_flecha": {"vb": [90, 44], "inner": "<line x1=\"8\" y1=\"22\" x2=\"70\" y2=\"22\" stroke=\"#334\" stroke-width=\"2.5\"/><path d=\"M68 14L82 22L68 30z\" fill=\"#334\"/>"}};

// ======================================================================
//  REGISTRO DE LOS DOS CUESTIONARIOS
// ======================================================================

function quizOrdenador_() {
  return {
    id: 'ordenador',
    titulo: '3.1 El ordenador',
    subtitulo: 'Hardware y software · Unidad central · Periféricos y puertos · Sistema operativo',
    icono: '💻',
    hoja: 'Unidad 3.1 Ordenador',
    legacy: false,
    scoring: 'questions',
    blocks: [
      { id: 'conceptos', label: 'Qué es un ordenador' },
      { id: 'central', label: 'La unidad central' },
      { id: 'perif', label: 'Periféricos y puertos' },
      { id: 'so', label: 'Sistema operativo y aplicaciones' }
    ],
    cols: { email: 2, nombre: 3, apellidos: 4, grupo: 5, nota: 6 },
    tarea: {
      titulo: 'Cuestionario 3.1 El ordenador',
      descripcionAlumnado: 'Cuestionario de la Unidad 3 (parte 3.1): hardware y software, unidad central, memoria, periféricos, puertos y sistema operativo. 20 preguntas.'
    },
    plan: [
      { b: 'conceptos', pool: 'ord_q', n: 2 },
      { b: 'conceptos', pool: 'ord_hwsw', n: 1 },
      { b: 'conceptos', q: 'ord_flow' },
      { b: 'central', pool: 'u_pieza', n: 2 },
      { b: 'central', pool: 'u_q', n: 2 },
      { b: 'central', pool: 'u_ram', n: 2 },
      { b: 'central', pool: 'u_disco', n: 1 },
      { b: 'perif', pool: 'p_clasif', n: 1 },
      { b: 'perif', pool: 'p_q', n: 1 },
      { b: 'perif', pool: 'p_puerto', n: 2 },
      { b: 'perif', pool: 'p_uso', n: 1 },
      { b: 'so', pool: 'so_q', n: 2 },
      { b: 'so', pool: 'so_func', n: 1 },
      { b: 'so', pool: 'so_apps', n: 1 }
    ],
    questions: bancoOrdenador_()
  };
}

function quizAlgoritmos_() {
  return {
    id: 'algoritmos',
    titulo: '3.2 Algoritmos, lenguajes y binario',
    subtitulo: 'Algoritmos · Diagramas de flujo · Lenguajes de programación · Sistema binario',
    icono: '🔀',
    hoja: 'Unidad 3.2 Algoritmos',
    legacy: false,
    scoring: 'questions',
    blocks: [
      { id: 'alg', label: 'Algoritmos' },
      { id: 'flujo', label: 'Diagramas de flujo' },
      { id: 'leng', label: 'Lenguajes de programación' },
      { id: 'bin', label: 'Sistema binario' }
    ],
    cols: { email: 2, nombre: 3, apellidos: 4, grupo: 5, nota: 6 },
    tarea: {
      titulo: 'Cuestionario 3.2 Algoritmos, lenguajes y binario',
      descripcionAlumnado: 'Cuestionario de la Unidad 3 (partes 3.2 y 3.3): algoritmos, diagramas de flujo, lenguajes de programación y sistema binario. 21 preguntas.'
    },
    plan: [
      { b: 'alg', pool: 'alg_q', n: 2 },
      { b: 'alg', pool: 'alg_ord', n: 1 },
      { b: 'flujo', pool: 'f_simbolo', n: 2 },
      { b: 'flujo', pool: 'f_usos', n: 1 },
      { b: 'flujo', pool: 'f_reglas', n: 1 },
      { b: 'flujo', pool: 'f_valida', n: 1 },
      { b: 'flujo', pool: 'f_traza_dec', n: 1 },
      { b: 'flujo', pool: 'f_traza_bucle', n: 1 },
      { b: 'flujo', pool: 'f_bucle_tipo', n: 1 },
      { b: 'leng', pool: 'l_q', n: 2 },
      { b: 'leng', pool: 'l_codigo', n: 1 },
      { b: 'leng', pool: 'l_x', n: 1 },
      { b: 'bin', pool: 'b_q', n: 2 },
      { b: 'bin', pool: 'b_dec2bin', n: 1 },
      { b: 'bin', pool: 'b_bin2dec', n: 1 },
      { b: 'bin', pool: 'b_ascii', n: 1 },
      { b: 'bin', pool: 'b_unid', n: 1 }
    ],
    questions: bancoAlgoritmos_()
  };
}

// ======================================================================
//  AYUDAS PARA DIBUJOS
// ======================================================================

// Un icono dentro de un grupo <g> (sin <svg> anidados: la página los estira)
function iconoG_(ic, x, y, w) {
  var it = ICONOS3_[ic];
  var sc = Math.round(w / it.vb[0] * 10000) / 10000;
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + sc + ')">' + it.inner + '</g>';
}

// Un icono suelto, centrado, a tamaño w
function iconoFig_(ic, w, h, etiqueta) {
  var it = ICONOS3_[ic];
  var ih = w * it.vb[1] / it.vb[0];
  var W = w + 24, H = h + 12;
  return '<svg viewBox="0 0 ' + W + ' ' + H + '" style="max-width:' + (w + 60) + 'px" role="img" aria-label="' + esc_(etiqueta) + '">' +
    '<rect width="' + W + '" height="' + H + '" fill="#ffffff"/>' +
    iconoG_(ic, 12, Math.round((H - ih) / 2 * 10) / 10, w) + '</svg>';
}

// Cuatro iconos rotulados A, B, C y D
function cuatroFig_(lista, etiqueta) {
  var letras = ['A', 'B', 'C', 'D'];
  var svg = '<svg viewBox="0 0 560 130" role="img" aria-label="' + esc_(etiqueta) + '"><rect width="560" height="130" fill="#ffffff"/>';
  lista.forEach(function (ic, i) {
    var it = ICONOS3_[ic];
    var w = 120, h = w * it.vb[1] / it.vb[0];
    var x = 10 + i * 136;
    svg += iconoG_(ic, x, Math.round(((92 - h) / 2 + 2) * 10) / 10, w) +
      '<circle cx="' + (x + 60) + '" cy="110" r="11" fill="#1a73e8"/>' +
      '<text x="' + (x + 60) + '" y="115.5" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="15" fill="#ffffff">' + letras[i] + '</text>';
  });
  return svg + '</svg>';
}

// ---------- diagramas de flujo dibujados con código ----------
var FLUJO_DEFS_ = '<defs><marker id="ahq" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#334"/></marker></defs>';

function ftxt_(cx, cy, text, fs) {
  var lines = String(text).split('|');
  var out = '';
  var lh = fs + 2;
  var y0 = cy - (lines.length - 1) * lh / 2 + fs * 0.35;
  lines.forEach(function (l, i) {
    out += '<text x="' + cx + '" y="' + Math.round((y0 + i * lh) * 10) / 10 + '" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="' + fs + '" fill="#181c34">' + esc_(l) + '</text>';
  });
  return out;
}

// kind: term | proc | io | dec
function fnodo_(kind, cx, cy, w, h, text) {
  var x = cx - w / 2, y = cy - h / 2, s = '';
  if (kind === 'term') {
    s = '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (h / 2) + '" fill="#e0f2fe" stroke="#0891b2" stroke-width="2"/>';
  } else if (kind === 'proc') {
    s = '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="3" fill="#fff4dc" stroke="#c2660a" stroke-width="2"/>';
  } else if (kind === 'io') {
    var d = 12;
    s = '<polygon points="' + (x + d) + ',' + y + ' ' + (x + w) + ',' + y + ' ' + (x + w - d) + ',' + (y + h) + ' ' + x + ',' + (y + h) + '" fill="#ede9fe" stroke="#4f46e5" stroke-width="2"/>';
  } else {
    s = '<polygon points="' + cx + ',' + y + ' ' + (x + w) + ',' + cy + ' ' + cx + ',' + (y + h) + ' ' + x + ',' + cy + '" fill="#fce7f3" stroke="#be185d" stroke-width="2"/>';
  }
  return s + ftxt_(cx, cy, text, 12.5);
}

function flecha_(pts) {
  var d = 'M' + pts.map(function (p) { return p[0] + ' ' + p[1]; }).join(' L');
  return '<path d="' + d + '" fill="none" stroke="#334" stroke-width="2" marker-end="url(#ahq)"/>';
}

function rotulo_(x, y, t) {
  return '<text x="' + x + '" y="' + y + '" font-family="Arial,sans-serif" font-weight="700" font-size="12" fill="#be185d">' + esc_(t) + '</text>';
}

// Decisión con dos salidas: entrada -> rombo -> (No / Sí) -> FIN
function flujoDecisionFig_(entrada, pregunta, textoSi, textoNo) {
  var s = '<svg viewBox="0 0 400 340" style="max-width:420px" role="img" aria-label="Diagrama de flujo con una decisión que tiene dos caminos, Sí y No">' +
    '<rect width="400" height="340" fill="#ffffff"/>' + FLUJO_DEFS_;
  s += flecha_([[200, 36], [200, 58]]) + flecha_([[200, 96], [200, 114]]);
  s += flecha_([[100, 160], [80, 160], [80, 231]]) + flecha_([[300, 160], [320, 160], [320, 231]]);
  s += flecha_([[80, 269], [80, 312], [155, 312]]) + flecha_([[320, 269], [320, 312], [245, 312]]);
  s += fnodo_('term', 200, 20, 110, 32, 'INICIO');
  s += fnodo_('io', 200, 77, 230, 38, entrada);
  s += fnodo_('dec', 200, 160, 200, 92, pregunta);
  s += fnodo_('proc', 80, 250, 140, 38, textoNo);
  s += fnodo_('proc', 320, 250, 140, 38, textoSi);
  s += fnodo_('term', 200, 312, 90, 32, 'FIN');
  s += rotulo_(70, 148, 'No') + rotulo_(318, 148, 'Sí');
  return s + '</svg>';
}

// Bucle con contador: se repite hasta que contador = N
function flujoBucleFig_(accion, n) {
  var s = '<svg viewBox="0 0 360 372" style="max-width:380px" role="img" aria-label="Diagrama de flujo con un bucle: una flecha vuelve a un paso anterior mientras la respuesta sea No">' +
    '<rect width="360" height="372" fill="#ffffff"/>' + FLUJO_DEFS_;
  s += flecha_([[160, 36], [160, 52]]) + flecha_([[160, 90], [160, 106]]) + flecha_([[160, 144], [160, 160]]) + flecha_([[160, 198], [160, 214]]);
  s += flecha_([[160, 290], [160, 336]]);
  s += flecha_([[245, 252], [325, 252], [325, 125], [237, 125]]);
  s += fnodo_('term', 160, 20, 110, 32, 'INICIO');
  s += fnodo_('proc', 160, 71, 150, 38, 'veces = 0');
  s += fnodo_('proc', 160, 125, 150, 38, accion);
  s += fnodo_('proc', 160, 179, 170, 38, 'veces = veces + 1');
  s += fnodo_('dec', 160, 252, 170, 76, '¿veces = ' + n + '?');
  s += fnodo_('term', 160, 352, 90, 32, 'FIN');
  s += rotulo_(172, 316, 'Sí') + rotulo_(270, 244, 'No');
  return s + '</svg>';
}

// Un bloque de código (lenguajes de texto) o dos bloques de Scratch
function codigoFig_(lineas) {
  var h = 22 + lineas.length * 26;
  var s = '<svg viewBox="0 0 420 ' + h + '" style="max-width:440px" role="img" aria-label="Un fragmento de programa"><rect width="420" height="' + h + '" fill="#ffffff"/>' +
    '<rect x="4" y="4" width="412" height="' + (h - 8) + '" rx="10" fill="#1f2937"/>';
  lineas.forEach(function (l, i) {
    s += '<text x="20" y="' + (32 + i * 26) + '" font-family="Consolas,\'Courier New\',monospace" font-size="17" fill="#e5e7eb" xml:space="preserve">' + esc_(l) + '</text>';
  });
  return s + '</svg>';
}

function scratchFig_(mensaje) {
  return '<svg viewBox="0 0 320 150" style="max-width:340px" role="img" aria-label="Dos bloques encajados de un programa de bloques"><rect width="320" height="150" fill="#ffffff"/>' +
    '<path d="M12 62 Q14 24 62 24 L166 24 Q214 24 216 62 Z" fill="#ffbf00" stroke="#cc9900" stroke-width="2"/>' +
    '<rect x="12" y="60" width="204" height="36" fill="#ffbf00" stroke="#cc9900" stroke-width="2"/>' +
    '<text x="24" y="84" font-family="Arial,sans-serif" font-weight="700" font-size="14" fill="#ffffff">cuando se pulse</text>' +
    '<path d="M152 68 L152 88 M152 68 L180 77 L152 86" fill="#4ade80" stroke="#15803d" stroke-width="2"/>' +
    '<rect x="12" y="96" width="204" height="36" rx="4" fill="#9966ff" stroke="#774dcb" stroke-width="2"/>' +
    '<text x="24" y="120" font-family="Arial,sans-serif" font-weight="700" font-size="14" fill="#ffffff">decir ' + esc_(mensaje) + '</text></svg>';
}

// ======================================================================
//  DATOS PARA LAS PREGUNTAS GENERADAS
// ======================================================================

var NOMBRE_PUERTO_ = {
  usbA: 'USB-A', usbC: 'USB-C', hdmi: 'HDMI', eth: 'Red (Ethernet)', jack: 'Jack de 3,5 mm',
  vga: 'VGA', ps2: 'PS/2', par: 'Paralelo'
};
var PUERTOS_ACTUALES_ = ['usbA', 'usbC', 'hdmi', 'eth', 'jack'];
var PUERTOS_VETERANOS_ = ['vga', 'ps2', 'par'];

var NOMBRE_PIEZA_ = {
  placa: 'Placa base', micro: 'Microprocesador', ram: 'Memoria RAM', tarjeta: 'Tarjeta de expansión', puertos: 'Puertos'
};
var PIEZAS_ = ['placa', 'micro', 'ram', 'tarjeta', 'puertos'];

var NOMBRE_SIMBOLO_ = {
  s_term: 'Inicio / fin', s_flecha: 'Línea de flujo', s_io: 'Entrada / salida', s_proc: 'Proceso', s_dec: 'Decisión'
};
var SIMBOLOS_ = ['s_term', 's_flecha', 's_io', 's_proc', 's_dec'];

var PERIF_ENTRADA_ = ['Teclado', 'Ratón', 'Escáner', 'Micrófono', 'Cámara web', 'Joystick', 'Lector de código de barras'];
var PERIF_SALIDA_ = ['Monitor', 'Impresora', 'Altavoces', 'Proyector', 'Auriculares'];
var PERIF_ES_ = ['Pantalla táctil', 'Memoria USB', 'Router o módem', 'Tarjeta de memoria', 'Auriculares con micrófono'];

var CONTEXTOS_DECISION_ = [
  { entrada: 'Leer un número N', pregunta: '¿N es mayor|que 10?', si: 'Escribir: GRANDE', no: 'Escribir: PEQUEÑO', desde: 3, hasta: 18, evitar: 10, nombre: 'N', cmp: function (v) { return v > 10; } },
  { entrada: 'Leer la temperatura T', pregunta: '¿T es menor|que 15 grados?', si: 'Escribir: Coge abrigo', no: 'Escribir: Sin abrigo', desde: 4, hasta: 29, evitar: 15, nombre: 'la temperatura', cmp: function (v) { return v < 15; } },
  { entrada: 'Leer la nota N', pregunta: '¿N es mayor o|igual que 5?', si: 'Escribir: Aprobado', no: 'Escribir: Suspenso', desde: 0, hasta: 10, evitar: -1, nombre: 'la nota', cmp: function (v) { return v >= 5; } }
];

var ACCIONES_BUCLE_ = ['Dar una palmada', 'Saltar una vez', 'Dar un paso', 'Encender el LED'];

var MENSAJES_CODIGO_ = ['¡Hola!', 'Buenos días', '¡Bien hecho!', 'Hasta luego'];

function pad_(s, n) { s = String(s); while (s.length < n) { s = '0' + s; } return s; }

// Un número binario de entre 4 y 6 cifras (empieza siempre por 1)
function numeroBinario_(rng) {
  var cifras = 4 + Math.floor(rng() * 3);
  var base = Math.pow(2, cifras - 1);
  return base + Math.floor(rng() * base);
}

// ======================================================================
//  GENERADORES
// ======================================================================

function genPiezas_() {
  function plantilla(id, subconjunto) {
    return {
      id: id, pool: 'u_pieza',
      gen: function (rng) {
        var k = pick_(subconjunto, rng);
        var q = mcFixed_('x', 'x', '¿Qué pieza de la unidad central representa este dibujo?',
          PIEZAS_.map(function (p) { return NOMBRE_PIEZA_[p]; }), NOMBRE_PIEZA_[k]);
        q.fig = iconoFig_(k, 110, 110, 'Dibujo de una pieza de la unidad central');
        return q;
      }
    };
  }
  return [plantilla('g_pieza_a', ['placa', 'micro', 'ram']), plantilla('g_pieza_b', ['tarjeta', 'puertos'])];
}

function genClasifPerif_() {
  return {
    id: 'g_clasif', pool: 'p_clasif',
    gen: function (rng) {
      var e = shuffleWith_(PERIF_ENTRADA_.slice(), rng).slice(0, 2);
      var s = shuffleWith_(PERIF_SALIDA_.slice(), rng).slice(0, 2);
      var m = shuffleWith_(PERIF_ES_.slice(), rng).slice(0, 2);
      var pares = [];
      e.forEach(function (x) { pares.push([x, 'Entrada']); });
      s.forEach(function (x) { pares.push([x, 'Salida']); });
      m.forEach(function (x) { pares.push([x, 'Entrada y salida']); });
      shuffleWith_(pares, rng);
      return match_('x', 'x', 'Clasifica cada periférico:', pares, ['Entrada', 'Salida', 'Entrada y salida']);
    }
  };
}

function genPuertos_() {
  var nombres = function (lista) { return lista.map(function (k) { return NOMBRE_PUERTO_[k]; }); };
  return [
    {
      id: 'g_puerto1', pool: 'p_puerto',
      gen: function (rng) {
        var k = pick_(PUERTOS_ACTUALES_, rng);
        var q = mcFixed_('x', 'x', '¿Qué puerto es este? (es un esquema simplificado)', nombres(PUERTOS_ACTUALES_), NOMBRE_PUERTO_[k]);
        q.fig = iconoFig_(k, 150, 88, 'Dibujo de un puerto de un ordenador');
        return q;
      }
    },
    {
      id: 'g_puerto_vet', pool: 'p_puerto',
      gen: function (rng) {
        var k = pick_(PUERTOS_VETERANOS_, rng);
        var q = mcFixed_('x', 'x', 'Este puerto aparece en equipos antiguos. ¿Cuál es? (es un esquema simplificado)', nombres(PUERTOS_VETERANOS_), NOMBRE_PUERTO_[k]);
        q.fig = iconoFig_(k, 150, 88, 'Dibujo de un puerto de un ordenador antiguo');
        return q;
      }
    },
    {
      id: 'g_puerto4', pool: 'p_puerto',
      gen: function (rng) {
        var todos = PUERTOS_ACTUALES_.concat(PUERTOS_VETERANOS_);
        var cuatro = shuffleWith_(todos.slice(), rng).slice(0, 4);
        var objetivo = Math.floor(rng() * 4);
        var letras = ['A', 'B', 'C', 'D'];
        var q = mcFixed_('x', 'x', '¿Cuál de estos puertos es el ' + NOMBRE_PUERTO_[cuatro[objetivo]] + '? (son esquemas simplificados)', letras, letras[objetivo]);
        q.fig = cuatroFig_(cuatro, 'Cuatro puertos rotulados A, B, C y D');
        return q;
      }
    }
  ];
}

function genSimbolos_() {
  function plantilla(id, subconjunto) {
    return {
      id: id, pool: 'f_simbolo',
      gen: function (rng) {
        var k = pick_(subconjunto, rng);
        var q = mcFixed_('x', 'x', '¿Cómo se llama este símbolo de los diagramas de flujo?',
          SIMBOLOS_.map(function (p) { return NOMBRE_SIMBOLO_[p]; }), NOMBRE_SIMBOLO_[k]);
        q.fig = iconoFig_(k, 120, 58, 'Un símbolo de diagrama de flujo');
        return q;
      }
    };
  }
  return [plantilla('g_simbolo_a', ['s_term', 's_flecha', 's_io']), plantilla('g_simbolo_b', ['s_proc', 's_dec'])];
}

function genTrazaDecision_() {
  return {
    id: 'g_traza_dec', pool: 'f_traza_dec',
    gen: function (rng) {
      var c = pick_(CONTEXTOS_DECISION_, rng);
      var v;
      do { v = c.desde + Math.floor(rng() * (c.hasta - c.desde + 1)); } while (v === c.evitar);
      var correcta = c.cmp(v) ? c.si : c.no;
      var q = mcFixed_('x', 'x',
        'Observa este diagrama de flujo. Si el valor que se lee es ' + v + ', ¿qué ocurre al ejecutarlo?',
        [c.si, c.no, 'No escribe nada', 'Escribe los dos mensajes'], correcta);
      q.fig = flujoDecisionFig_(c.entrada, c.pregunta, c.si, c.no);
      return q;
    }
  };
}

function genTrazaBucle_() {
  return {
    id: 'g_traza_bucle', pool: 'f_traza_bucle',
    gen: function (rng) {
      var accion = pick_(ACCIONES_BUCLE_, rng);
      var n = 3 + Math.floor(rng() * 4);
      var opciones = [n - 1, n, n + 1, n + 2].map(String);
      var q = mcFixed_('x', 'x',
        'Observa este diagrama de flujo con un bucle. Sigue las flechas: ¿cuántas veces se ejecuta el bloque «' + accion + '»?',
        opciones, String(n));
      q.fig = flujoBucleFig_(accion, n);
      return q;
    }
  };
}

function genCodigo_() {
  return {
    id: 'g_codigo', pool: 'l_codigo',
    gen: function (rng) {
      var m = pick_(MENSAJES_CODIGO_, rng);
      var opciones = ['Scratch (bloques)', 'Python', 'Java', 'C++'];
      var k = Math.floor(rng() * 4);
      var fig;
      if (k === 0) { fig = scratchFig_('«' + m + '»'); }
      else if (k === 1) { fig = codigoFig_(['print("' + m + '")']); }
      else if (k === 2) { fig = codigoFig_(['System.out.println("' + m + '");']); }
      else { fig = codigoFig_(['std::cout << "' + m + '";']); }
      var q = mcFixed_('x', 'x', 'Este programa muestra un mensaje en pantalla. ¿En qué lenguaje está escrito?', opciones, opciones[k]);
      q.fig = fig;
      return q;
    }
  };
}

function genDecABin_() {
  return {
    id: 'g_dec2bin', pool: 'b_dec2bin',
    gen: function (rng) {
      var n = numeroBinario_(rng);
      var b = n.toString(2);
      var q = { id: 'x', pool: 'x', type: 'short', prompt: 'Escribe el número ' + n + ' en binario (solo con ceros y unos).', correct: b };
      var acepta = [pad_(b, 8), pad_(b, Math.ceil(b.length / 4) * 4)];
      // también con espacio entre grupos de 4 cifras
      var p8 = pad_(b, 8);
      acepta.push(p8.substring(0, 4) + ' ' + p8.substring(4));
      var p4 = pad_(b, Math.ceil(b.length / 4) * 4);
      var partes = [];
      for (var i = 0; i < p4.length; i += 4) { partes.push(p4.substring(i, i + 4)); }
      acepta.push(partes.join(' '));
      q.accept = acepta;
      return q;
    }
  };
}

function genBinADec_() {
  return {
    id: 'g_bin2dec', pool: 'b_bin2dec',
    gen: function (rng) {
      var n = numeroBinario_(rng);
      return { id: 'x', pool: 'x', type: 'short', prompt: '¿Qué número decimal es ' + n.toString(2) + ' en binario? Escribe solo el número.', correct: String(n) };
    }
  };
}

function genAscii_() {
  return {
    id: 'g_ascii', pool: 'b_ascii',
    gen: function (rng) {
      var letras = ['B', 'C', 'D', 'E', 'F', 'G', 'H'];
      var i = Math.floor(rng() * letras.length);
      var codigo = 66 + i;
      var opciones = [codigo - 2, codigo - 1, codigo, codigo + 1, codigo + 2].map(String);
      return mcFixed_('x', 'x',
        'En la tabla ASCII, a la letra A le corresponde el número 65, a la B el 66, a la C el 67… ¿Qué número le corresponde a la letra ' + letras[i] + '?',
        opciones, String(codigo));
    }
  };
}

// ======================================================================
//  BANCO · 3.1 EL ORDENADOR
// ======================================================================

function bancoOrdenador_() {
  return [].concat(genPiezas_(), [genClasifPerif_()], genPuertos_(), [

  // ================= BLOQUE 1 · QUÉ ES UN ORDENADOR =================

  mc_('ord1', 'ord_q', '¿Qué hace un ordenador con la información?',
    'La recibe, la procesa (hace cálculos con ella) y muestra un resultado',
    ['Solo la guarda, pero no puede trabajar con ella', 'Solo la muestra en la pantalla', 'La borra cuando termina de usarla']),
  tf_('ord2', 'ord_q', 'Todo ordenador sigue el mismo camino: entra información, se procesa y sale un resultado.', true),
  mc_('ord3', 'ord_q', 'Escribes un mensaje en el ordenador. ¿Qué es la salida?',
    'El texto que te muestra la pantalla',
    ['Las teclas que pulsas', 'El programa que usas para escribir', 'El cable del teclado']),
  tf_('ord4', 'ord_q', 'Un ordenador sin software es una caja de piezas que no sabe qué hacer.', true),
  tf_('ord5', 'ord_q', 'Los ordenadores solo existen en forma de portátil o de ordenador de sobremesa.', false),
  mc_('ord6', 'ord_q', '¿Para qué se inventó el ordenador?',
    'Para hacer cuentas larguísimas con rapidez (censos, cálculos científicos…)',
    ['Para jugar a videojuegos', 'Para sustituir a los teléfonos', 'Para imprimir documentos']),
  mc_('ord7', 'ord_q', '¿Qué es el hardware?',
    'Las piezas físicas del ordenador: todo lo que puedes ver y tocar',
    ['Los programas y los datos guardados', 'Solo la pantalla y el teclado', 'Un tipo de sistema operativo']),
  mc_('ord8', 'ord_q', '¿Qué es el software?',
    'La parte lógica: los programas y los datos guardados',
    ['Las piezas que se pueden tocar', 'Solo el sistema operativo', 'La caja del ordenador']),
  tf_('ord9', 'ord_q', 'Un programa necesita un hardware donde ejecutarse y donde guardar sus datos.', true),

  match_('ord_hw1', 'ord_hwsw', '¿Hardware o software?',
    [['Teclado', 'Hardware'], ['Sistema operativo', 'Software'], ['Procesador', 'Hardware'], ['Presentaciones de Google', 'Software'], ['Ratón', 'Hardware'], ['Un videojuego', 'Software']],
    ['Hardware', 'Software']),
  match_('ord_hw2', 'ord_hwsw', '¿Hardware o software?',
    [['Memoria RAM', 'Hardware'], ['El navegador Chrome', 'Software'], ['Monitor', 'Hardware'], ['Un documento guardado en tu Drive', 'Software'], ['Impresora', 'Hardware'], ['Scratch', 'Software']],
    ['Hardware', 'Software']),

  {
    id: 'ord_flow', pool: 'ord_flow', type: 'order',
    prompt: 'Ordena el camino que sigue la información en un ordenador:',
    steps: [
      'Entrada: tú das los datos (por ejemplo, con el teclado)',
      'Proceso: el ordenador hace los cálculos con esos datos',
      'Salida: el ordenador te muestra el resultado (por ejemplo, en la pantalla)'
    ],
    correct: [0, 1, 2]
  },

  // ================= BLOQUE 2 · LA UNIDAD CENTRAL =================

  mc_('u1', 'u_q', 'En esta unidad llamamos «unidad central» a…',
    'La caja entera con todas sus piezas (placa base, procesador, RAM, almacenamiento…)',
    ['Solo al microprocesador', 'Al monitor y al teclado', 'Al sistema operativo']),
  mc_('u2', 'u_q', '¿Qué pieza se considera el «cerebro» del ordenador?',
    'El microprocesador',
    ['La placa base', 'La memoria RAM', 'Los puertos']),
  mc_('u3', 'u_q', '¿Qué pieza es el soporte donde se conectan todas las demás y por donde viajan los datos entre ellas?',
    'La placa base',
    ['El microprocesador', 'El disco duro', 'La tarjeta gráfica']),
  tf_('u4', 'u_q', 'Si un ordenador tiene poca RAM y abres muchos programas a la vez, irá muy lento.', true),
  mc_('u5', 'u_q', '¿Para qué sirven las tarjetas de expansión?',
    'Para ampliar las capacidades del equipo (por ejemplo, gráficos, sonido o red)',
    ['Para guardar los archivos para siempre', 'Para enchufar los periféricos', 'Para enfriar el procesador']),
  tf_('u6', 'u_q', 'Hoy los CD y los DVD se usan más que las memorias USB y la nube.', false),
  mc_('u7', 'u_q', '¿Por qué el microprocesador lleva ventilador o disipador?',
    'Porque se calienta mucho cuando trabaja',
    ['Porque hace mucho ruido', 'Porque guarda los archivos', 'Porque se conecta a internet']),
  mc_('u8', 'u_q', '¿Qué son los puertos de un ordenador?',
    'Las conexiones por donde se enchufan los periféricos',
    ['Los programas que abren los archivos', 'Las piezas que guardan los datos', 'Los botones del teclado']),
  tf_('u9', 'u_q', 'En un portátil o en un móvil las piezas son más pequeñas y a veces están juntas en un solo chip, pero siguen siendo las mismas ideas.', true),
  tf_('u10', 'u_q', 'En otros sitios, la palabra CPU se usa para hablar solo del procesador.', true),

  match_('ram1', 'u_ram', 'Une cada frase con la memoria a la que se refiere:',
    [['Se borra al apagar el ordenador', 'Memoria RAM'], ['Guarda tus archivos aunque apagues el equipo', 'Almacenamiento'], ['Es la más rápida de las dos', 'Memoria RAM'], ['Suele tener cientos de GB o incluso 1 TB', 'Almacenamiento']],
    ['Memoria RAM', 'Almacenamiento']),
  match_('ram2', 'u_ram', 'Une cada frase con la memoria a la que se refiere:',
    [['Aquí se cargan los programas que estás usando ahora', 'Memoria RAM'], ['Una unidad SSD es de este tipo', 'Almacenamiento'], ['Un portátil actual suele tener 8 o 16 GB', 'Memoria RAM'], ['Es como el armario donde guardas las cosas', 'Almacenamiento']],
    ['Memoria RAM', 'Almacenamiento']),
  mc_('ram3', 'u_ram', 'Abres un documento para trabajar con él. ¿Dónde se carga mientras lo usas?',
    'En la memoria RAM',
    ['En el microprocesador', 'En la placa base', 'En el puerto USB']),
  mc_('ram4', 'u_ram', 'Si comparas el ordenador con tu mesa de estudio, ¿qué sería la memoria RAM?',
    'La mesa: cabe lo que estás usando y es rapidísima de alcanzar',
    ['El armario donde guardas todo', 'El bolígrafo', 'La mochila']),
  tf_('ram5', 'u_ram', 'La memoria RAM conserva los datos aunque se apague el ordenador.', false),

  match_('disco1', 'u_disco', 'Une cada frase con el tipo de unidad:',
    [['Guarda los datos en discos magnéticos que giran', 'Disco duro (HDD)'], ['No tiene piezas móviles', 'Unidad SSD'], ['Es más rápida, silenciosa y resistente', 'Unidad SSD'], ['Es más sensible a los golpes', 'Disco duro (HDD)']],
    ['Disco duro (HDD)', 'Unidad SSD']),
  mc_('disco2', 'u_disco', '¿Qué tipo de unidad de almacenamiento llevan casi todos los portátiles actuales?',
    'Una unidad SSD, que guarda los datos en chips de memoria flash',
    ['Un disquete', 'Un CD o un DVD', 'Un disco duro con muchos discos que giran']),
  tf_('disco3', 'u_disco', 'Un disco duro (HDD) es más rápido que una unidad SSD.', false),

  // ================= BLOQUE 3 · PERIFÉRICOS Y PUERTOS =================

  mc_('per1', 'p_q', '¿Qué es un periférico?',
    'Un dispositivo que está fuera de la unidad central y permite que el ordenador se comunique con el exterior',
    ['Una pieza que está dentro de la caja del ordenador', 'Un programa que se instala en el ordenador', 'Un tipo de memoria']),
  tf_('per2', 'p_q', 'Una impresora es un periférico de entrada.', false),
  mc_('per3', 'p_q', 'La pantalla táctil es un periférico…',
    'De entrada y salida a la vez',
    ['Solo de entrada', 'Solo de salida', 'No es un periférico']),
  mc_('per4', 'p_q', 'Una memoria USB, ¿de qué tipo de periférico es?',
    'De entrada y salida: puedes guardar datos en ella y leerlos de ella',
    ['Solo de entrada', 'Solo de salida', 'De ninguno: es una pieza interna']),
  mc_('per5', 'p_q', 'El micrófono es un periférico…',
    'De entrada: mete sonido en el ordenador',
    ['De salida: saca sonido del ordenador', 'De entrada y salida', 'Interno de la unidad central']),

  mc_('uso1', 'p_uso', 'Quieres conectar el portátil a un proyector moderno para ver imagen y sonido. ¿Qué puerto usas?',
    'HDMI', ['Red (Ethernet)', 'Jack de 3,5 mm', 'PS/2']),
  mc_('uso2', 'p_uso', 'Quieres conectar el ordenador a internet con un cable de red. ¿Qué puerto usas?',
    'Red (Ethernet)', ['HDMI', 'USB-C', 'VGA']),
  mc_('uso3', 'p_uso', 'Quieres conectar unos auriculares con cable. ¿Qué puerto usas?',
    'Jack de 3,5 mm', ['HDMI', 'Red (Ethernet)', 'Paralelo']),
  mc_('uso4', 'p_uso', 'Un puerto pequeño y reversible (se enchufa por cualquier lado) sirve para cargar y conectar datos y pantallas. ¿Cuál es?',
    'USB-C', ['USB-A', 'VGA', 'PS/2']),
  mc_('uso5', 'p_uso', 'En un ordenador antiguo quieres conectar una impresora que tiene un cable muy ancho. ¿Qué puerto es?',
    'Paralelo', ['HDMI', 'USB-C', 'Jack de 3,5 mm']),

  // ================= BLOQUE 4 · SISTEMA OPERATIVO Y APLICACIONES =================

  mc_('so1', 'so_q', '¿Qué es el sistema operativo?',
    'Un programa imprescindible que hace funcionar la máquina: sin él, el ordenador no arranca',
    ['Una aplicación para escribir documentos', 'La pieza que guarda los archivos', 'Un periférico de entrada']),
  mc_('so2', 'so_q', 'EducaAndOS, el sistema de los portátiles del centro, está basado en…',
    'Linux', ['Windows', 'macOS', 'Android']),
  mc_('so3', 'so_q', '¿Qué sistema operativo llevan los Chromebooks y se apoya mucho en la nube y en el navegador?',
    'ChromeOS', ['Windows', 'macOS', 'iOS']),
  mc_('so4', 'so_q', '¿Qué dos sistemas operativos son los de los móviles y las tabletas más conocidos?',
    'Android e iOS', ['Windows y Linux', 'macOS y ChromeOS', 'Linux y Android']),
  mc_('so5', 'so_q', 'macOS es el sistema operativo de…',
    'Apple, y funciona en los ordenadores Mac', ['Google, y funciona en los Chromebooks', 'Microsoft, y funciona en los PC', 'Los móviles Android']),
  mc_('so6', 'so_q', 'Linux es un sistema operativo…',
    'Gratuito y de código abierto: se puede ver cómo está hecho', ['De pago y cerrado', 'Solo para móviles', 'Que solo funciona en ordenadores de Apple']),
  tf_('so7', 'so_q', 'El sistema operativo es el que pone en marcha las aplicaciones.', true),

  multi_('sof1', 'so_func', '¿Cuáles son funciones del sistema operativo? (puede haber varias)',
    ['Repartir los recursos del equipo entre los programas', 'Organizar la información en archivos y carpetas', 'Dejarte manejar el equipo (abrir programas, mover o borrar archivos…)'],
    ['Fabricar las piezas del ordenador', 'Conectar el equipo a la corriente eléctrica']),

  match_('app1', 'so_apps', 'Une cada programa con el tipo de aplicación al que pertenece:',
    [['Documentos de Google', 'Procesador de texto'], ['Chrome', 'Navegador'], ['Tinkercad', 'Diseño técnico y 3D'], ['Scratch', 'Programación']],
    ['Procesador de texto', 'Navegador', 'Diseño técnico y 3D', 'Programación', 'Multimedia', 'Comunicación']),
  match_('app2', 'so_apps', 'Une cada programa con el tipo de aplicación al que pertenece:',
    [['Excel', 'Hoja de cálculo'], ['VLC', 'Multimedia'], ['Gmail', 'Comunicación'], ['GIMP', 'Imagen y diseño']],
    ['Hoja de cálculo', 'Multimedia', 'Comunicación', 'Imagen y diseño', 'Navegador', 'Programación'])
  ]);
}

// ======================================================================
//  BANCO · 3.2 ALGORITMOS, LENGUAJES Y BINARIO
// ======================================================================

function bancoAlgoritmos_() {
  return [].concat(genSimbolos_(), [genTrazaDecision_(), genTrazaBucle_(), genCodigo_(), genDecABin_(), genBinADec_(), genAscii_()], [

  // ================= BLOQUE 1 · ALGORITMOS =================

  mc_('alg1', 'alg_q', '¿Qué es un algoritmo?',
    'Una lista ordenada de pasos que resuelve un problema',
    ['Un tipo de ordenador', 'Un lenguaje de programación', 'Una pieza de la unidad central']),
  mc_('alg2', 'alg_q', '¿Cuál de estos es un ejemplo de algoritmo de la vida diaria?',
    'Una receta de cocina', ['Un teclado', 'La pantalla del móvil', 'Una memoria USB']),
  mc_('alg3', 'alg_q', 'Un buen algoritmo es ordenado, claro y…',
    'Finito: acaba en algún momento y consigue su objetivo', ['Larguísimo', 'Secreto', 'Escrito solo con números']),
  tf_('alg4', 'alg_q', 'Si echas el cacao en el vaso antes de coger el vaso, el algoritmo funciona igual: el orden de los pasos no importa.', false),
  mc_('alg5', 'alg_q', '¿Qué es un programa informático?',
    'Uno o varios algoritmos escritos para que un ordenador los ejecute', ['Un dibujo con flechas', 'El teclado y el ratón', 'La memoria del ordenador']),
  mc_('alg6', 'alg_q', '¿Cuál de estas NO es una forma de representar un algoritmo?',
    'Con una pieza de hardware', ['Con frases', 'Con un diagrama de flujo', 'Con un lenguaje de programación']),
  tf_('alg7', 'alg_q', 'Cuando un algoritmo se complica con decisiones, un diagrama de flujo lo hace más fácil de entender que una lista de frases.', true),

  {
    id: 'ord_leche', pool: 'alg_ord', type: 'order',
    prompt: 'Ordena los pasos del algoritmo para preparar un vaso de leche con cacao:',
    steps: [
      'Sacamos la leche de la nevera',
      'Cogemos un vaso y una cuchara',
      'Cogemos el cacao',
      'Echamos leche y cacao en el vaso',
      'Removemos con la cuchara'
    ],
    correct: [0, 1, 2, 3, 4]
  },
  {
    id: 'ord_correo', pool: 'alg_ord', type: 'order',
    prompt: 'Ordena los pasos del algoritmo para enviar un correo electrónico:',
    steps: [
      'Abrir la aplicación de correo',
      'Pulsar «Redactar» para crear un mensaje nuevo',
      'Escribir la dirección de la persona que lo recibe',
      'Escribir el mensaje',
      'Pulsar «Enviar»'
    ],
    correct: [0, 1, 2, 3, 4]
  },

  // ================= BLOQUE 2 · DIAGRAMAS DE FLUJO =================

  match_('fu1', 'f_usos', 'Une cada elemento con el símbolo del diagrama de flujo que le corresponde:',
    [['INICIO', 'Inicio / fin'], ['Echamos cacao en el vaso', 'Proceso'], ['¿Hay suficiente cacao?', 'Decisión'], ['Pedir un número al usuario', 'Entrada / salida'], ['La flecha que une dos bloques', 'Línea de flujo']],
    ['Inicio / fin', 'Línea de flujo', 'Entrada / salida', 'Proceso', 'Decisión']),
  match_('fu2', 'f_usos', 'Une cada elemento con el símbolo del diagrama de flujo que le corresponde:',
    [['FIN', 'Inicio / fin'], ['Mostrar un mensaje en pantalla', 'Entrada / salida'], ['Remover con la cuchara', 'Proceso'], ['¿Es mayor de 12 años?', 'Decisión']],
    ['Inicio / fin', 'Línea de flujo', 'Entrada / salida', 'Proceso', 'Decisión']),

  tf_('fr1', 'f_reglas', 'Todo diagrama de flujo empieza en INICIO y termina en FIN, salvo un bucle «para siempre», que no termina nunca.', true),
  tf_('fr2', 'f_reglas', 'Para que el diagrama sea más corto, cada bloque de proceso puede llevar varias órdenes a la vez.', false),
  tf_('fr3', 'f_reglas', 'Un rombo de decisión puede tener una sola salida.', false),
  mc_('fr4', 'f_reglas', '¿Qué símbolo usas para una orden como «Echamos cacao»?',
    'Un rectángulo (proceso)', ['Un rombo', 'Un óvalo', 'Un paralelogramo']),
  mc_('fr5', 'f_reglas', 'Un diagrama de flujo se lee…',
    'De arriba abajo, siguiendo las flechas', ['De derecha a izquierda', 'De abajo arriba', 'Sin ningún orden']),
  tf_('fr6', 'f_reglas', 'Un bucle «para siempre» no tiene bloque FIN.', true),
  mc_('fr7', 'f_reglas', 'Un texto bien escrito para un bloque de proceso es…',
    'Corto y que empiece por un verbo: «Echamos cacao»', ['Largo, con todos los detalles posibles', 'Una pregunta que se contesta con sí o no', 'Solo un número']),

  mc_('fv1', 'f_valida', '¿Cuál de estas preguntas puede ir dentro de un rombo de decisión?',
    '¿Está enchufada la lámpara?', ['¿Cuánto cacao hay?', '¿Qué hora es?', '¿Cuántos años tienes?']),
  mc_('fv2', 'f_valida', '¿Cuál de estas preguntas puede ir dentro de un rombo de decisión?',
    '¿Hay suficiente cacao?', ['¿Cuántos vasos hay?', '¿Qué color es la leche?', '¿De qué marca es la leche?']),
  mc_('fv3', 'f_valida', 'Un rombo de decisión plantea una pregunta que se contesta…',
    'Solo con Sí o con No, y de él salen dos caminos', ['Con un número cualquiera', 'Con una frase larga', 'No hace falta contestarla']),

  match_('fb1', 'f_bucle_tipo', 'Une cada situación con el tipo de repetición:',
    [['Una luz que parpadea sin parar', 'Para siempre'], ['Parpadear exactamente 10 veces', 'Un número de veces'], ['Esperar un minuto y mirar si el agua hierve; si no, esperar otro minuto', 'Hasta que se cumpla algo']],
    ['Para siempre', 'Un número de veces', 'Hasta que se cumpla algo']),
  mc_('fb2', 'f_bucle_tipo', 'En un bucle «hasta que se cumpla algo», ¿cómo se dibuja la repetición?',
    'Con una decisión cuya respuesta «No» vuelve con una flecha a un paso anterior',
    ['Con un bloque FIN en medio', 'Con un rectángulo sin flechas', 'Con un óvalo dentro de otro']),
  mc_('fb3', 'f_bucle_tipo', '¿Qué tipo de repetición no tiene bloque FIN porque nunca termina?',
    'Para siempre', ['Un número de veces', 'Hasta que se cumpla algo', 'Ninguno: todos terminan']),

  // ================= BLOQUE 3 · LENGUAJES DE PROGRAMACIÓN =================

  mc_('l1', 'l_q', '¿Qué es lo único que entiende directamente un ordenador?',
    'El código máquina, hecho solo de ceros y unos', ['El español', 'El inglés', 'Los diagramas de flujo']),
  mc_('l2', 'l_q', '¿Qué es un lenguaje de alto nivel?',
    'El que escriben las personas: se parece más a nuestro idioma, pero hay que traducirlo a código máquina',
    ['El que solo tiene ceros y unos', 'El que entiende el ordenador sin traducir', 'El que se escribe con el teclado numérico']),
  mc_('l3', 'l_q', '¿Qué hace un compilador o un intérprete?',
    'Traduce el programa escrito por una persona a código máquina', ['Dibuja el diagrama de flujo', 'Guarda el programa en la nube', 'Enciende el ordenador']),
  mc_('l4', 'l_q', '¿Qué diferencia hay entre un compilador y un intérprete?',
    'El compilador traduce el programa entero antes de ejecutarlo; el intérprete lo va traduciendo mientras se ejecuta',
    ['El compilador es de bloques y el intérprete de texto', 'No hay ninguna diferencia', 'El intérprete traduce de código máquina a español']),
  mc_('l5', 'l_q', '¿Cuál de estos lenguajes es de bloques?',
    'Scratch', ['Python', 'Java', 'C++']),
  mc_('l6', 'l_q', '¿Cuál de estos lenguajes es de texto?',
    'Python', ['Scratch', 'MakeCode con bloques', 'Ninguno de los tres']),
  tf_('l7', 'l_q', 'Los lenguajes de bloques son útiles para empezar porque evitan faltas de sintaxis.', true),
  mc_('l8', 'l_q', '¿Con qué programarás la placa micro:bit en la Unidad 6?',
    'Con MakeCode', ['Con Java', 'Con código máquina escrito a mano', 'Con Excel']),
  mc_('l9', 'l_q', 'Python se usa mucho para…',
    'Aprender a programar, ciencia de datos, inteligencia artificial y automatizar tareas', ['Solo para dibujar diagramas de flujo', 'Solo para móviles Android', 'Solo para fabricar piezas']),

  gaps_('lg1', 'l_x', 'Completa el texto sobre cómo funciona un programa:',
    'La persona programadora escribe en un lenguaje de [[0]] nivel. Un [[1]] o un intérprete lo traduce a código [[2]], que es lo único que entiende el ordenador.',
    ['alto', 'compilador', 'máquina'], ['alto', 'bajo', 'compilador', 'máquina', 'texto']),
  match_('lm1', 'l_x', 'Une cada lenguaje con su tipo:',
    [['Python', 'De texto'], ['Scratch', 'De bloques'], ['Java', 'De texto'], ['MakeCode (bloques)', 'De bloques'], ['C++', 'De texto']],
    ['De texto', 'De bloques']),

  // ================= BLOQUE 4 · SISTEMA BINARIO =================

  mc_('b1', 'b_q', '¿Cuántas cifras distintas usa el sistema binario?',
    'Dos: el 0 y el 1', ['Diez: del 0 al 9', 'Ocho', 'Tres']),
  mc_('b2', 'b_q', '¿Qué es un bit?',
    'Cada 0 o cada 1 del código binario', ['Un grupo de ocho unidades', 'Un tipo de memoria', 'Una letra del alfabeto']),
  mcFixed_('b3', 'b_q', '¿Cuántos bits forman un byte?', ['2', '4', '8', '16'], '8'),
  mc_('b4', 'b_q', 'Con un byte se pueden escribir los números…',
    'Del 0 al 255', ['Del 0 al 8', 'Del 1 al 100', 'Del 0 al 1.000']),
  mc_('b5', 'b_q', '¿Por qué los ordenadores usan solo el 0 y el 1?',
    'Porque sus circuitos tienen interruptores minúsculos con solo dos estados: pasa corriente (1) o no pasa (0)',
    ['Porque los números del 2 al 9 son difíciles de escribir', 'Porque así ocupan más memoria', 'Porque lo decidió el sistema operativo']),
  mc_('b6', 'b_q', 'En binario, cada posición vale…',
    'El doble que la anterior, empezando por 1 a la derecha', ['10 veces más que la anterior', 'Lo mismo que la anterior', 'La mitad que la anterior']),
  mcFixed_('b7', 'b_q', 'En un byte, ¿qué valor tiene la posición situada más a la izquierda?', ['16', '64', '128', '255'], '128'),
  mcFixed_('b8', 'b_q', '¿Qué número decimal es el 10 en binario?', ['1', '2', '10', '100'], '2'),
  tf_('b9', 'b_q', 'Todo lo que guarda un ordenador (textos, imágenes, música, programas) se almacena como ceros y unos.', true),
  mc_('b10', 'b_q', 'Para guardar texto, a cada letra se le asigna un número en una tabla. ¿Cómo se llama?',
    'ASCII', ['Binaria', 'Decimal', 'Compilador']),
  mcFixed_('b11', 'b_q', '¿Cuál es el número más grande que se puede escribir con 4 bits?', ['4', '8', '15', '16'], '15'),

  {
    id: 'bu1', pool: 'b_unid', type: 'order',
    prompt: 'Ordena estas unidades de medida de la información, de la más pequeña a la más grande:',
    steps: ['Byte (B)', 'Kilobyte (KB)', 'Megabyte (MB)', 'Gigabyte (GB)', 'Terabyte (TB)'],
    correct: [0, 1, 2, 3, 4]
  },
  match_('bu2', 'b_unid', 'Une cada cosa con la unidad que mejor se le ajusta:',
    [['Una letra de texto', '1 byte'], ['Un mensaje de texto corto', '1 kilobyte (KB)'], ['Una foto o una canción corta', '1 megabyte (MB)'], ['Una película en calidad normal', '1 gigabyte (GB)']],
    ['1 byte', '1 kilobyte (KB)', '1 megabyte (MB)', '1 gigabyte (GB)', '1 terabyte (TB)']),
  mcFixed_('bu3', 'b_unid', 'Cada unidad de medida (KB, MB, GB…) es, aproximadamente, ¿cuántas veces mayor que la anterior?',
    ['10 veces', '100 veces', '1.000 veces', '1.000.000 de veces'], '1.000 veces')
  ]);
}
