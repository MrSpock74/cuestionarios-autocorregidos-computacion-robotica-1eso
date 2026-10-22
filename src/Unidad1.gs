/**
 * UNIDAD 1 · CIBERSEGURIDAD Y PROPIEDAD INTELECTUAL
 * Bancos de preguntas de los cuestionarios 1.1 y 1.2.
 *
 * CÓMO FUNCIONAN LOS BANCOS (igual que en Moodle):
 *  - "plan" es la lista de lo que verá el alumnado, en orden.
 *      { b:'bloque', q:'id' }               -> esa pregunta, siempre.
 *      { b:'bloque', pool:'banco', n:3 }    -> 3 preguntas al azar del banco.
 *  - Cada pregunta del banco lleva pool:'nombre' si es de un banco.
 *  - Para añadir una pregunta a un banco: copia una existente, cambia el
 *    id (único) y el texto, y deja el mismo pool.
 *  - Cada pregunta vale lo mismo (1 punto) y las de emparejar, huecos y
 *    casillas puntúan de forma parcial.
 *
 * Las preguntas basadas en el libro de teoría están al lado de su apartado.
 * REVISAR: las marcadas así dependen de la fecha (leyes en tramitación).
 */

// ----- Ayudas para escribir preguntas con menos código -----
function mc_(id, pool, prompt, correct, wrongs, noShuffle) {
  var q = { id: id, pool: pool, type: 'mc', prompt: prompt, options: [correct].concat(wrongs), correct: correct };
  if (noShuffle) { q.noShuffle = true; }
  return q;
}
// Opciones en orden fijo (por ejemplo, números de menor a mayor)
function mcFixed_(id, pool, prompt, options, correct) {
  return { id: id, pool: pool, type: 'mc', noShuffle: true, prompt: prompt, options: options, correct: correct };
}
function tf_(id, pool, prompt, correct) {
  return { id: id, pool: pool, type: 'tf', prompt: prompt, correct: correct };
}
function multi_(id, pool, prompt, correct, wrongs) {
  return { id: id, pool: pool, type: 'multi', partial: true, prompt: prompt, options: correct.concat(wrongs), correct: correct };
}
function match_(id, pool, prompt, pairs, choices) {
  // pairs: [[etiqueta, respuesta], ...]  (etiqueta puede ser {icon:'i-by'})
  return {
    id: id, pool: pool, type: 'match', prompt: prompt,
    items: pairs.map(function (p) {
      return (typeof p[0] === 'object') ? { icon: p[0].icon, label: p[0].label || '', correct: p[1] } : { label: p[0], correct: p[1] };
    }),
    choices: choices
  };
}
function gaps_(id, pool, prompt, text, answers, bank) {
  return { id: id, pool: pool, type: 'gaps', prompt: prompt, text: text, gaps: answers.map(function (a) { return { correct: a }; }), bank: bank };
}

var SI_NO_PUBLICAR = ['Puedo publicarlo', 'No debo publicarlo'];
var SI_NO_AMISTAD = ['Puedo agregarla si quiero', 'No la agrego'];
var OPC_NOTICIA = [
  'Puedo compartirla: parece fiable',
  'Lo pienso dos veces antes de compartirla: podría ofender a alguien',
  'No la comparto mientras no pueda confirmar que es cierta',
  'No la comparto: todo indica que es un bulo'
];

// ======================================================================
//  CUESTIONARIO 1.1 · CIBERSEGURIDAD
// ======================================================================

function quizCiberseguridad_() {
  return {
    id: 'ciberseguridad',
    titulo: '1.1 Ciberseguridad',
    subtitulo: 'Peligros de internet · Medidas · Tú y las redes sociales · Decide tú',
    icono: '🛡️',
    hoja: 'Ciberseguridad',
    legacy: false,
    scoring: 'questions',
    blocks: [
      { id: 'peligros', label: 'Peligros de internet' },
      { id: 'medidas', label: 'Medidas de seguridad' },
      { id: 'redes', label: 'Tú y las redes sociales' },
      { id: 'decide', label: 'Decide tú en las redes' }
    ],
    cols: { email: 2, nombre: 3, apellidos: 4, grupo: 5, nota: 6 },
    tarea: {
      titulo: 'Cuestionario 1.1 Ciberseguridad',
      descripcionAlumnado: 'Cuestionario de la Unidad 1 (parte 1.1): peligros de internet, medidas de seguridad, redes sociales y decisiones al publicar. 22 preguntas.'
    },
    plan: [
      { b: 'peligros', pool: 'peligros_match', n: 1 },
      { b: 'peligros', pool: 'peligros_caso', n: 4 },
      { b: 'medidas', pool: 'medidas_match', n: 1 },
      { b: 'medidas', pool: 'medidas_q', n: 3 },
      { b: 'redes', q: 'r_edad' },
      { b: 'redes', pool: 'redes_q', n: 4 },
      { b: 'decide', pool: 'sc_noticias', n: 2 },
      { b: 'decide', pool: 'sc_amistad', n: 1 },
      { b: 'decide', pool: 'sc_publicar', n: 1 },
      { b: 'decide', pool: 'gaps_bulos', n: 1 },
      { b: 'decide', q: 'gaps_troll' },
      { b: 'decide', q: 'piensa_match' },
      { b: 'decide', pool: 'piensa_caso', n: 1 }
    ],
    questions: BANCO_CIBER_
  };
}

var BANCO_CIBER_ = [

  // ---------- PELIGROS: emparejar (2 variantes; sale 1) ----------
  match_('pm1', 'peligros_match', 'Une cada descripción con el peligro de internet que le corresponde:', [
    ['Programa que se instala en tu dispositivo y borra tus datos o estropea el sistema.', 'Virus'],
    ['Mensajes masivos que nadie ha pedido y que llegan a tu correo o a tu móvil.', 'Spam'],
    ['Alguien se hace pasar por otra persona para engañar a los demás.', 'Suplantación de identidad'],
    ['Engaños para quedarse con el dinero de la víctima: falsos premios, tiendas que no existen…', 'Fraude'],
    ['Grupos de chat de personas dedicadas a actividades peligrosas o ilegales.', 'Comunidad peligrosa'],
    ['Contenido que no es apto para tu edad, como pornografía o consejos dañinos para la salud.', 'Contenido inapropiado']
  ], ['Virus', 'Spam', 'Suplantación de identidad', 'Fraude', 'Comunidad peligrosa', 'Contenido inapropiado', 'Grooming']),

  match_('pm2', 'peligros_match', 'Une cada descripción con el peligro de internet que le corresponde:', [
    ['Proteger tus datos personales para que no los usen empresas ni delincuentes.', 'Privacidad'],
    ['Pasar tantas horas con juegos o redes sociales que te quita sueño, estudio y vida real.', 'Tecnoadicción'],
    ['Acoso a una persona a través de internet, muchas veces escondiéndose en el anonimato.', 'Ciberacoso'],
    ['Un adulto se hace pasar por una persona joven para ganarse la confianza de un menor.', 'Grooming'],
    ['Enviar por internet mensajes, fotos o vídeos de carácter sexual.', 'Sexting'],
    ['Mensaje falso que imita a un banco o empresa y te lleva a una web falsa para robarte la contraseña.', 'Phishing']
  ], ['Privacidad', 'Tecnoadicción', 'Ciberacoso', 'Grooming', 'Sexting', 'Phishing', 'Virus']),

  // ---------- PELIGROS: casos (salen 4 de 10) ----------
  mc_('pc1', 'peligros_caso',
    'Te llega un mensaje de tu "banco" con un enlace para "verificar tu cuenta". La web a la que lleva es falsa y te pide usuario y contraseña. Es un caso de…',
    'Phishing', ['Virus', 'Sexting', 'Tecnoadicción']),
  mc_('pc2', 'peligros_caso',
    'Un perfil con la foto de un chico de 13 años te escribe todos los días por un juego en línea, te pide fotos y que no se lo cuentes a nadie. Después descubres que es un adulto. Es un caso de…',
    'Grooming', ['Spam', 'Fraude', 'Privacidad']),
  mc_('pc3', 'peligros_caso',
    'En el grupo de clase publican cada día burlas sobre una compañera, y alguien crea un perfil anónimo para insultarla. Es un caso de…',
    'Ciberacoso', ['Spam', 'Virus', 'Tecnoadicción']),
  mc_('pc4', 'peligros_caso',
    'Instalas un juego "gratis" desde una web desconocida y, al abrirlo, el móvil va muy lento y desaparecen tus fotos. Lo más probable es que sea un…',
    'Virus', ['Phishing', 'Grooming', 'Sexting']),
  mc_('pc5', 'peligros_caso',
    'Alguien crea un perfil con el nombre y las fotos de tu amigo y pide dinero a sus contactos. Es un caso de…',
    'Suplantación de identidad', ['Tecnoadicción', 'Spam', 'Ciberacoso']),
  mc_('pc6', 'peligros_caso',
    'Te llega un mensaje: "¡Has ganado un móvil! Paga 3 € de envío para recibirlo". Pagas y nunca llega nada. Es un…',
    'Fraude', ['Virus', 'Grooming', 'Ciberacoso']),
  mc_('pc7', 'peligros_caso',
    'Llevas semanas durmiendo poco porque no puedes dejar de jugar y de mirar el móvil, y cada vez rindes menos en clase. Es una señal de…',
    'Tecnoadicción', ['Fraude', 'Suplantación de identidad', 'Spam']),
  mc_('pc8', 'peligros_caso',
    'Te llega por un grupo una foto comprometida de otra persona de tu clase, y te piden que la reenvíes. ¿Qué haces?',
    'No la reenvío, la borro y se lo cuento a una persona adulta', [
      'La reenvío solo a mis mejores amistades',
      'La publico en mi perfil para que la vea más gente',
      'La guardo por si me hace falta más adelante']),
  mc_('pc9', 'peligros_caso',
    'Una app de colorear te pide acceso a tu ubicación en tiempo real, a tu agenda y a tus fotos. Lo más sensato es…',
    'Revisar los permisos y no darle los que no necesita', [
      'Aceptarlo todo, total, es gratis',
      'Darle la ubicación y publicarla en mis redes',
      'Dejar que la instale otra persona que no conozco']),
  mc_('pc10', 'peligros_caso',
    'Alguien que has conocido en un juego en línea te propone quedar en persona y que no se lo cuentes a tu familia. ¿Qué haces?',
    'No quedo, corto la conversación y se lo cuento a una persona adulta', [
      'Quedo, pero llevo el móvil cargado',
      'Quedo si me pide que sea un secreto',
      'Le doy mi dirección para que me recoja']),

  // ---------- MEDIDAS: emparejar activa/pasiva (2 variantes; sale 1) ----------
  match_('mm1', 'medidas_match',
    'Las medidas ACTIVAS te protegen para evitar el peligro. Las PASIVAS reducen los daños cuando ya ha pasado algo. Clasifica cada medida:', [
      ['Mantener el dispositivo actualizado', 'Activa'],
      ['Utilizar un antivirus', 'Activa'],
      ['Usar contraseñas seguras y no dárselas a nadie', 'Activa'],
      ['Hacer copias de seguridad de tus fotos y archivos', 'Pasiva'],
      ['Guardar capturas de pantalla como prueba cuando te acosan', 'Pasiva'],
      ['Contárselo a una persona adulta cuando te ha pasado algo malo', 'Pasiva']
    ], ['Activa', 'Pasiva']),
  match_('mm2', 'medidas_match',
    'Las medidas ACTIVAS te protegen para evitar el peligro. Las PASIVAS reducen los daños cuando ya ha pasado algo. Clasifica cada medida:', [
      ['No aceptar solicitudes de amistad de desconocidos', 'Activa'],
      ['No dar datos personales por internet', 'Activa'],
      ['Cerrar la sesión al terminar en un ordenador compartido', 'Activa'],
      ['Recuperar tus archivos desde una copia de seguridad tras una avería', 'Pasiva'],
      ['Cambiar tu contraseña cuando sospechas que alguien la conoce', 'Pasiva'],
      ['Avisar al banco y a tu familia si te han robado dinero con un fraude', 'Pasiva']
    ], ['Activa', 'Pasiva']),

  // ---------- MEDIDAS: preguntas (salen 3 de 8) ----------
  mc_('mq1', 'medidas_q', '¿Cuál de estas contraseñas es la más segura?',
    'Mi-gato-come-pescado-3-veces!', ['123456', 'maria2013', 'Ciberseguridad']),
  multi_('mq2', 'medidas_q', 'Una contraseña segura es… (marca todas las respuestas correctas)',
    ['Larga (mejor 12 caracteres o más)', 'Distinta en cada cuenta', 'Sin datos fáciles de adivinar, como tu nombre o tu fecha de nacimiento'],
    ['La misma en todas mis cuentas, para no olvidarla', 'Una que conoce mi mejor amigo o amiga, por si la olvido']),
  tf_('mq3', 'medidas_q', 'Si una web tiene un candado junto a su dirección, ya puedes fiarte de ella al 100 %.', false),
  mc_('mq4', 'medidas_q', 'Terminas de usar un ordenador del aula. Antes de irte debes…',
    'Cerrar la sesión', ['Dejarla abierta para la siguiente clase', 'Apagar solo la pantalla', 'Guardar mi contraseña en el navegador']),
  multi_('mq5', 'medidas_q', 'Alguien te molesta por internet. ¿Qué debes hacer? (marca todas las respuestas correctas)',
    ['Guardar capturas de pantalla como prueba', 'Contárselo a una persona adulta de confianza', 'Bloquearlo y denunciarlo en la propia red'],
    ['Responderle con insultos', 'Borrar todo y no decírselo a nadie']),
  mc_('mq6', 'medidas_q', '¿A qué teléfono gratuito del INCIBE puedes llamar para pedir ayuda en ciberseguridad?',
    '017', ['010', '060', '118']),
  mc_('mq7', 'medidas_q', 'Hay un peligro inmediato (por ejemplo, alguien te amenaza de verdad). ¿A qué teléfono de emergencias debes llamar?',
    '112', ['017', '010', '060']),
  mc_('mq8', 'medidas_q', 'Una medida de seguridad ACTIVA es la que…',
    'Te protege para evitar que ocurra el peligro', [
      'Usas solo cuando el daño ya está hecho',
      'Hace automáticamente tu operadora de internet',
      'Solo necesitan las personas adultas']),

  // ---------- REDES: edad (siempre sale) ----------
  mcFixed_('r_edad', null,
    'En España, ¿a partir de qué edad puedes dar tú mismo/a tu consentimiento para que una empresa use tus datos personales (por ejemplo, al abrir un perfil en una red social)?',
    ['12 años', '13 años', '14 años', '16 años'], '14 años'),

  // ---------- REDES: preguntas (salen 4 de 10) ----------
  mc_('rq1', 'redes_q',
    'Tienes 13 años y quieres abrir un perfil en una red social. Según la ley española actual, ¿qué hace falta?',
    'El consentimiento de tu madre, padre o tutores', [
      'Nada: a los 13 ya puedo hacerlo yo solo/a',
      'Que lo apruebe un amigo o amiga mayor',
      'Poner una edad falsa al registrarme']),
  // REVISAR: fecha. Si la ley que sube el límite a 16 años se aprueba, cambiar esta pregunta y la del libro.
  tf_('rq2', 'redes_q', 'La ley que subiría a 16 años la edad mínima para tener redes sociales ya está aprobada y es la norma actual.', false),
  mc_('rq3', 'redes_q', '¿Qué pasa si pones una edad falsa al registrarte en una red social?',
    'La red te tratará como si fueras mayor y perderás las protecciones que activa para menores', [
      'Nada: la red comprueba tu edad real y te la corrige',
      'Te protege más, porque nadie sabe cuántos años tienes',
      'Se avisa automáticamente a tu familia']),
  mc_('rq4', 'redes_q', 'Las redes sociales casi siempre son gratis para ti. ¿Cómo ganan dinero?',
    'Con publicidad a medida, gracias a tu atención y a tus datos', [
      'Cobrando una cuota secreta a tu familia',
      'Con las donaciones de otros usuarios',
      'No ganan dinero: lo hacen por diversión']),
  mc_('rq5', 'redes_q', 'El algoritmo de una red social decide…',
    'Qué vídeos y publicaciones ves, según lo que más te engancha', [
      'Qué notas sacas en clase',
      'Quién es tu amistad de verdad',
      'Cuándo se actualiza tu móvil']),
  tf_('rq6', 'redes_q', 'Si un mensaje o una foto son temporales (se borran tras verlos), ya no se pueden guardar ni reenviar.', false),
  mc_('rq7', 'redes_q', '¿Qué es tu huella digital?',
    'Todo lo que publicas, comentas o reenvías, que puede quedar en internet durante años', [
      'La marca que deja tu dedo al desbloquear el móvil',
      'Tu contraseña de la red social',
      'Un tipo de virus']),
  multi_('rq8', 'redes_q', 'Para dejar bien configurado tu perfil, ¿qué es buena idea? (marca todas las respuestas correctas)',
    ['Poner la cuenta en privado', 'Aprobar las etiquetas antes de que aparezcan en tu perfil', 'Apagar la ubicación en tiempo real'],
    ['Poner el nombre de tu instituto y tu dirección en la descripción', 'Aceptar a todo el mundo para tener más seguidores']),
  mc_('rq9', 'redes_q', 'Publicar la imagen de otra persona sin su permiso…',
    'Puede ser ilegal, porque existe el derecho a la propia imagen', [
      'Es legal siempre que lo hagas como una broma',
      'Solo es ilegal si lo hacen las personas adultas',
      'Está permitido si la foto es de gente de tu clase']),
  tf_('rq10', 'redes_q', 'Insultar o amenazar a alguien por internet no es delito si "solo es una broma".', false),

  // ---------- DECIDE: noticias (salen 2 de 8) ----------
  { id: 'sn1', pool: 'sc_noticias', type: 'mc', noShuffle: true,
    prompt: 'Has leído una noticia que no es de humor y cuya fuente no sabes si es fiable. El titular no es exagerado y, tras contrastarla con otras fuentes, descartas que sea un bulo. ¿Qué haces?',
    options: OPC_NOTICIA, correct: OPC_NOTICIA[0] },
  { id: 'sn2', pool: 'sc_noticias', type: 'mc', noShuffle: true,
    prompt: 'Has leído una noticia que no es de humor y cuya fuente es fiable. Tras contrastarla con otras fuentes, descartas que sea un bulo. ¿Qué haces?',
    options: OPC_NOTICIA, correct: OPC_NOTICIA[0] },
  { id: 'sn3', pool: 'sc_noticias', type: 'mc', noShuffle: true,
    prompt: 'Has leído una noticia de humor que no crees que pueda ofender a nadie. Tras contrastarla, no puedes descartar que sea un bulo. ¿Qué haces?',
    options: OPC_NOTICIA, correct: OPC_NOTICIA[2] },
  { id: 'sn4', pool: 'sc_noticias', type: 'mc', noShuffle: true,
    prompt: 'Has leído una noticia de humor que no crees que pueda ofender a nadie. Tras contrastarla con otras fuentes, descartas que sea un bulo. ¿Qué haces?',
    options: OPC_NOTICIA, correct: OPC_NOTICIA[0] },
  { id: 'sn5', pool: 'sc_noticias', type: 'mc', noShuffle: true,
    prompt: 'Has leído una noticia de humor y crees que puede ofender a alguien. ¿Qué haces?',
    options: OPC_NOTICIA, correct: OPC_NOTICIA[1] },
  { id: 'sn6', pool: 'sc_noticias', type: 'mc', noShuffle: true,
    prompt: 'Has leído una noticia que no es de humor y cuya fuente es fiable. Tras contrastarla con otras fuentes, no puedes descartar que sea un bulo. ¿Qué haces?',
    options: OPC_NOTICIA, correct: OPC_NOTICIA[2] },
  { id: 'sn7', pool: 'sc_noticias', type: 'mc', noShuffle: true,
    prompt: 'Has leído una noticia que no es de humor y cuya fuente no sabes si es fiable. El titular es demasiado llamativo para ser real. ¿Qué haces?',
    options: OPC_NOTICIA, correct: OPC_NOTICIA[3] },
  { id: 'sn8', pool: 'sc_noticias', type: 'mc', noShuffle: true,
    prompt: 'Has leído una noticia que no es de humor y cuya fuente no sabes si es fiable. El titular no es exagerado y, tras contrastarla con otras fuentes, no puedes descartar que sea un bulo. ¿Qué haces?',
    options: OPC_NOTICIA, correct: OPC_NOTICIA[2] },

  // ---------- DECIDE: peticiones de amistad (sale 1 de 10) ----------
  { id: 'sa1', pool: 'sc_amistad', type: 'mc', noShuffle: true,
    prompt: 'Alguien que NO conoces en la vida real te envía una petición de amistad en una de tus redes sociales. ¿Qué haces?',
    options: SI_NO_AMISTAD, correct: SI_NO_AMISTAD[1] },
  { id: 'sa2', pool: 'sc_amistad', type: 'mc', noShuffle: true,
    prompt: 'Alguien que conoces en la vida real te envía una petición de amistad. Su perfil es público y sus publicaciones buscan crear polémica. ¿Qué haces?',
    options: SI_NO_AMISTAD, correct: SI_NO_AMISTAD[1] },
  { id: 'sa3', pool: 'sc_amistad', type: 'mc', noShuffle: true,
    prompt: 'Alguien que conoces te envía una petición de amistad. Su perfil es público y no busca crear polémica. Tenéis amistades en común y, al preguntarles, confirman que el perfil es verídico. ¿Qué haces?',
    options: SI_NO_AMISTAD, correct: SI_NO_AMISTAD[0] },
  { id: 'sa4', pool: 'sc_amistad', type: 'mc', noShuffle: true,
    prompt: 'Alguien que conoces te envía una petición de amistad. Su perfil es público y no busca crear polémica. Tenéis amistades en común, pero al preguntarles no pueden confirmar que el perfil sea verídico. ¿Qué haces?',
    options: SI_NO_AMISTAD, correct: SI_NO_AMISTAD[1] },
  { id: 'sa5', pool: 'sc_amistad', type: 'mc', noShuffle: true,
    prompt: 'Alguien que conoces te envía una petición de amistad. Su perfil es público y no busca crear polémica. No tenéis amistades en común, pero contactas con esa persona por otro medio y confirmas que el perfil es real. ¿Qué haces?',
    options: SI_NO_AMISTAD, correct: SI_NO_AMISTAD[0] },
  { id: 'sa6', pool: 'sc_amistad', type: 'mc', noShuffle: true,
    prompt: 'Alguien que conoces te envía una petición de amistad. Su perfil es público y no busca crear polémica. No tenéis amistades en común y, al contactar con esa persona por otro medio, descubres que el perfil no es real. ¿Qué haces?',
    options: SI_NO_AMISTAD, correct: SI_NO_AMISTAD[1] },
  { id: 'sa7', pool: 'sc_amistad', type: 'mc', noShuffle: true,
    prompt: 'Alguien que conoces te envía una petición de amistad. Su perfil es privado y tenéis amistades en común que confirman que es verídico. ¿Qué haces?',
    options: SI_NO_AMISTAD, correct: SI_NO_AMISTAD[0] },
  { id: 'sa8', pool: 'sc_amistad', type: 'mc', noShuffle: true,
    prompt: 'Alguien que conoces te envía una petición de amistad. Su perfil es privado y tenéis amistades en común, pero no pueden confirmar que sea verídico. ¿Qué haces?',
    options: SI_NO_AMISTAD, correct: SI_NO_AMISTAD[1] },
  { id: 'sa9', pool: 'sc_amistad', type: 'mc', noShuffle: true,
    prompt: 'Alguien que conoces te envía una petición de amistad. Su perfil es privado y no tenéis amistades en común, pero contactas con esa persona por otro medio y confirmas que es un perfil real. ¿Qué haces?',
    options: SI_NO_AMISTAD, correct: SI_NO_AMISTAD[0] },
  { id: 'sa10', pool: 'sc_amistad', type: 'mc', noShuffle: true,
    prompt: 'Alguien que conoces te envía una petición de amistad. Su perfil es privado y no tenéis amistades en común. Al contactar con esa persona por otro medio, descubres que el perfil no es real. ¿Qué haces?',
    options: SI_NO_AMISTAD, correct: SI_NO_AMISTAD[1] },

  // ---------- DECIDE: publicar (sale 1 de 10) ----------
  { id: 'sp1', pool: 'sc_publicar', type: 'mc', noShuffle: true,
    prompt: 'Vas a publicar una imagen o un vídeo en el que salen otras personas a las que no has pedido permiso. ¿Qué haces?',
    options: SI_NO_PUBLICAR, correct: SI_NO_PUBLICAR[1] },
  { id: 'sp2', pool: 'sc_publicar', type: 'mc', noShuffle: true,
    prompt: 'Vas a publicar una imagen o un vídeo en el que salen otras personas que sí te han dado permiso. Pensándolo bien, crees que podría perjudicarte en el futuro. ¿Qué haces?',
    options: SI_NO_PUBLICAR, correct: SI_NO_PUBLICAR[1] },
  { id: 'sp3', pool: 'sc_publicar', type: 'mc', noShuffle: true,
    prompt: 'Vas a publicar una imagen o un vídeo en el que salen otras personas que sí te han dado permiso. No estás seguro/a de que no pueda perjudicarte en el futuro. ¿Qué haces?',
    options: SI_NO_PUBLICAR, correct: SI_NO_PUBLICAR[1] },
  { id: 'sp4', pool: 'sc_publicar', type: 'mc', noShuffle: true,
    prompt: 'Vas a publicar una imagen o un vídeo en el que salen otras personas que sí te han dado permiso. Estás totalmente seguro/a de que no puede perjudicarte en el futuro y de que no compartes información sin darte cuenta. ¿Qué haces?',
    options: SI_NO_PUBLICAR, correct: SI_NO_PUBLICAR[0] },
  { id: 'sp5', pool: 'sc_publicar', type: 'mc', noShuffle: true,
    prompt: 'Vas a publicar una imagen o un vídeo en el que no sale nadie más. Pensándolo bien, crees que podría perjudicarte en el futuro. ¿Qué haces?',
    options: SI_NO_PUBLICAR, correct: SI_NO_PUBLICAR[1] },
  { id: 'sp6', pool: 'sc_publicar', type: 'mc', noShuffle: true,
    prompt: 'Vas a publicar una imagen o un vídeo en el que no sale nadie más. No estás seguro/a de que no pueda perjudicarte en el futuro. ¿Qué haces?',
    options: SI_NO_PUBLICAR, correct: SI_NO_PUBLICAR[1] },
  { id: 'sp7', pool: 'sc_publicar', type: 'mc', noShuffle: true,
    prompt: 'Vas a publicar una imagen o un vídeo en el que no sale nadie más. Estás totalmente seguro/a de que no puede perjudicarte en el futuro y de que no compartes información sin darte cuenta. ¿Qué haces?',
    options: SI_NO_PUBLICAR, correct: SI_NO_PUBLICAR[0] },
  { id: 'sp8', pool: 'sc_publicar', type: 'mc', noShuffle: true,
    prompt: 'Vas a publicar un texto. Pensándolo bien, crees que podría perjudicarte en el futuro. ¿Qué haces?',
    options: SI_NO_PUBLICAR, correct: SI_NO_PUBLICAR[1] },
  { id: 'sp9', pool: 'sc_publicar', type: 'mc', noShuffle: true,
    prompt: 'Vas a publicar un texto. No estás seguro/a de que no pueda perjudicarte en el futuro. ¿Qué haces?',
    options: SI_NO_PUBLICAR, correct: SI_NO_PUBLICAR[1] },
  { id: 'sp10', pool: 'sc_publicar', type: 'mc', noShuffle: true,
    prompt: 'Vas a publicar un texto. Estás totalmente seguro/a de que no puede perjudicarte en el futuro y de que no compartes información sin darte cuenta. ¿Qué haces?',
    options: SI_NO_PUBLICAR, correct: SI_NO_PUBLICAR[0] },

  // ---------- DECIDE: huecos (bulos: sale 1 de 1 → fijo en banco; troll: fijo) ----------
  gaps_('gb1', 'gaps_bulos', 'Completa el texto con las palabras del desplegable:',
    'Los [[0]], o noticias [[1]], suelen tener [[2]] llamativos, sorprendentes o [[3]] creíbles. Para comprobarlos puedes usar [[4]] como Maldita.es, Newtral o EFE Verifica.',
    ['bulos', 'falsas', 'títulos', 'poco', 'verificadores'],
    ['bulos', 'falsas', 'títulos', 'poco', 'verificadores', 'muy', 'colores', 'bloqueadores']),
  gaps_('gaps_troll', null, 'Completa el texto con las palabras del desplegable:',
    'Un [[0]] es un usuario cuyo único objetivo es crear [[1]] con sus publicaciones. Revisar el [[2]] de un usuario puede ayudarte a comprobar si se trata de un perfil [[3]] o de una identidad [[4]].',
    ['troll', 'controversia', 'perfil', 'falso', 'robada'],
    ['troll', 'controversia', 'perfil', 'falso', 'robada', 'influencer', 'verídico']),

  // ---------- DECIDE: código PIENSA ----------
  match_('piensa_match', null, 'Código PIENSA para publicar con cabeza. Une cada letra con su norma:', [
    ['P', 'Pide permiso'],
    ['I', 'Información personal, fuera'],
    ['E', 'Empatía y respeto'],
    ['N', 'No difundas bulos'],
    ['S', 'Seguridad y privacidad'],
    ['A', 'Atribuye y actúa']
  ], ['Pide permiso', 'Información personal, fuera', 'Empatía y respeto', 'No difundas bulos', 'Seguridad y privacidad', 'Atribuye y actúa']),

  mc_('pz1', 'piensa_caso',
    'Has hecho una foto de grupo en el recreo y quieres subirla a tu red. ¿Qué debes hacer primero?',
    'Pedir permiso a las personas que salen', [
      'Etiquetarlas a todas para que se enteren',
      'Subirla rápido, antes de que se pase la gracia',
      'Esperar a ver cuántos "me gusta" tiene']),
  mc_('pz2', 'piensa_caso',
    'Un amigo te manda un meme que humilla a un compañero y te dice que lo reenvíes. ¿Qué haces?',
    'No lo reenvío y le digo que no me parece bien', [
      'Lo reenvío: solo es un meme',
      'Lo publico en mi perfil, pero sin etiquetar a nadie',
      'Lo reenvío, pero borro el nombre del compañero']),
  mc_('pz3', 'piensa_caso',
    'Quieres subir una foto con el uniforme de tu instituto, delante de la puerta del centro. ¿Qué norma del código PIENSA te dice que no lo hagas?',
    'Información personal, fuera', ['Pide permiso', 'No difundas bulos', 'Atribuye y actúa']),
  mc_('pz4', 'piensa_caso',
    'Un vídeo dice que "mañana cierran todos los institutos" y lo reenvía todo el mundo. Antes de compartirlo, ¿qué haces?',
    'Contrasto con medios fiables o con un verificador', [
      'Lo reenvío por si es verdad',
      'Lo reenvío solo a mi familia',
      'Lo comparto si tiene muchos "me gusta"']),
  mc_('pz5', 'piensa_caso',
    'Ves en el chat de tu clase que están acosando a un compañero. ¿Qué haces?',
    'No lo ignoro: guardo pruebas, denuncio y aviso a una persona adulta', [
      'No digo nada: no es asunto mío',
      'Me río para no ser el siguiente',
      'Reenvío los mensajes para que todos lo vean']),
  mc_('pz6', 'piensa_caso',
    'El "test de las tres miradas" consiste en imaginar, antes de publicar, que lo ven…',
    'Tu familia, tu profesorado y tú mismo/a dentro de cinco años', [
      'Tus amistades, tus seguidores y tus rivales',
      'Un desconocido, un famoso y un robot',
      'Solo las personas que salen en la publicación'])
];

// ======================================================================
//  CUESTIONARIO 1.2 · PROPIEDAD INTELECTUAL
// ======================================================================

function quizPropiedad_() {
  return {
    id: 'propiedad',
    titulo: '1.2 Propiedad intelectual',
    subtitulo: 'Obra y autoría · Tipos de licencias · Creative Commons',
    icono: '©',
    hoja: 'Propiedad intelectual',
    legacy: false,
    scoring: 'questions',
    blocks: [
      { id: 'obra', label: 'Obra y autoría' },
      { id: 'tipos', label: 'Tipos de licencias' },
      { id: 'cc', label: 'Creative Commons' }
    ],
    cols: { email: 2, nombre: 3, apellidos: 4, grupo: 5, nota: 6 },
    tarea: {
      titulo: 'Cuestionario 1.2 Propiedad intelectual',
      descripcionAlumnado: 'Cuestionario de la Unidad 1 (parte 1.2): obra y autoría, tipos de licencias y Creative Commons. 14 preguntas.'
    },
    plan: [
      { b: 'obra', pool: 'obra_q', n: 4 },
      { b: 'tipos', q: 'tm_desc' },
      { b: 'tipos', q: 'tm_logos' },
      { b: 'tipos', pool: 'tipos_q', n: 2 },
      { b: 'cc', q: 'cc_simbolos' },
      { b: 'cc', pool: 'cc_q', n: 5 }
    ],
    questions: BANCO_PROP_
  };
}

var BANCO_PROP_ = [

  // ---------- OBRA Y AUTORÍA (salen 4 de 9) ----------
  mc_('oq1', 'obra_q', '¿Cuándo nace el derecho de autor de un dibujo que acabas de hacer?',
    'En el mismo momento de crearlo, sin hacer ningún trámite', [
      'Cuando lo registras en un registro oficial',
      'Cuando lo publicas en internet',
      'Cuando alguien te lo compra']),
  tf_('oq2', 'obra_q', 'Si una imagen está en internet, puedes usarla como quieras porque es gratis.', false),
  multi_('oq3', 'obra_q', 'Para hacer un trabajo con contenidos de otras personas, ¿qué debes hacer? (marca todas las respuestas correctas)',
    ['Comprobar la licencia de lo que uses', 'Mencionar a las personas autoras', 'Añadir una licencia a tu propio trabajo'],
    ['Quitar el nombre del autor para que quede más limpio', 'Copiar y pegar sin decir de dónde sale']),
  { id: 'oq4', pool: 'obra_q', type: 'order',
    prompt: 'Ordena los pasos para usar una imagen de otra persona en tu trabajo:',
    steps: [
      'Buscarla en un banco de recursos con licencias libres',
      'Comprobar su licencia',
      'Usarla respetando las condiciones de esa licencia',
      'Mencionar título, autoría, fuente y licencia'
    ],
    correct: [0, 1, 2, 3] },
  mc_('oq5', 'obra_q', '¿Cuál de estas es una buena mención de una imagen?',
    '"Atardecer en el Guadalquivir", foto de Ana Pérez, vía Wikimedia Commons, licencia CC BY-SA 4.0', [
      'Imagen sacada de Google',
      'Foto: internet',
      '© Mi trabajo']),
  mc_('oq6', 'obra_q', '¿Dónde puedes encontrar imágenes, sonidos y vídeos con licencias libres?',
    'En bancos como Wikimedia Commons u Openverse', [
      'En cualquier resultado de Google Imágenes, sin mirar la licencia',
      'En capturas de pantalla de redes sociales',
      'En la web de cualquier marca comercial']),
  mc_('oq7', 'obra_q', 'Si usas en tu trabajo una imagen creada con inteligencia artificial, debes…',
    'Indicar qué herramienta la ha generado', [
      'Decir que la has dibujado tú',
      'No decir nada: no tiene autor',
      'Quitarle la marca de agua y ya está']),
  mcFixed_('oq8', 'obra_q', 'En España, ¿cuántos años después de la muerte de su autor o autora pasa una obra a ser de dominio público?',
    ['20 años', '50 años', '70 años', '100 años'], '70 años'),
  gaps_('og1', 'obra_q', 'Completa el texto con las palabras del desplegable:',
    'Antes de usar una obra ajena debes [[0]] su licencia. Después tienes que [[1]] a su autor o autora y [[2]] una licencia a tu propio trabajo.',
    ['comprobar', 'mencionar', 'añadir'],
    ['comprobar', 'mencionar', 'añadir', 'ignorar', 'borrar', 'copiar']),

  // ---------- TIPOS DE LICENCIAS ----------
  match_('tm_desc', null, 'Une cada descripción con el tipo de licencia:', [
    ['No se puede usar sin permiso de la persona autora.', 'Copyright'],
    ['Se puede usar bajo ciertas condiciones.', 'Copyleft'],
    ['Se puede usar sin restricciones.', 'Dominio público']
  ], ['Copyright', 'Copyleft', 'Dominio público']),
  match_('tm_logos', null, 'Une cada símbolo con el tipo de licencia:', [
    [{ icon: 'i-copyright' }, 'Copyright'],
    [{ icon: 'i-copyleft' }, 'Copyleft'],
    [{ icon: 'i-pd' }, 'Dominio público'],
    [{ icon: 'i-cc' }, 'Creative Commons']
  ], ['Copyright', 'Copyleft', 'Dominio público', 'Creative Commons']),

  // salen 2 de 6
  mc_('tq1', 'tipos_q', '"Todos los derechos reservados" es el lema de una licencia…',
    'Copyright', ['Copyleft', 'Dominio público', 'Creative Commons BY']),
  mc_('tq2', 'tipos_q', '¿Qué tipo de licencia es Creative Commons?',
    'Copyleft', ['Copyright', 'Dominio público', 'Ninguna de ellas']),
  tf_('tq3', 'tipos_q', 'Una obra en dominio público se puede usar sin restricciones.', true),
  tf_('tq4', 'tipos_q', 'Una obra con copyright se puede usar libremente mientras no ganes dinero con ella.', false),
  { id: 'tq5', pool: 'tipos_q', type: 'order',
    prompt: 'Ordena estas licencias de la más cerrada a la más abierta:',
    steps: ['Copyright', 'Copyleft', 'Dominio público'],
    correct: [0, 1, 2] },
  mc_('tq6', 'tipos_q', 'Una licencia con "algunos derechos reservados", que permite usar la obra bajo ciertas condiciones, es…',
    'Copyleft', ['Copyright', 'Dominio público', 'Ninguna: todas las obras son libres']),

  // ---------- CREATIVE COMMONS ----------
  match_('cc_simbolos', null, 'Une cada símbolo de Creative Commons con lo que significa:', [
    [{ icon: 'i-by' }, 'Mencionar a la persona autora'],
    [{ icon: 'i-nc' }, 'No permite uso comercial'],
    [{ icon: 'i-sa' }, 'Compartir con la misma licencia'],
    [{ icon: 'i-nd' }, 'No permite modificarla']
  ], ['Mencionar a la persona autora', 'No permite uso comercial', 'Compartir con la misma licencia', 'No permite modificarla']),

  // salen 5 de 10
  mc_('cq1', 'cc_q', '¿Qué significa NC en una licencia Creative Commons?',
    'No se puede usar con fines comerciales (para ganar dinero)', [
      'Se puede copiar sin límites',
      'Hay que pedir permiso por escrito',
      'No hay que mencionar a la persona autora']),
  mc_('cq2', 'cc_q', 'Siempre mencionando a la persona autora, la licencia CC BY-NC permite…',
    'Modificar la obra, pero no usarla con fines comerciales', [
      'Usarla con fines comerciales, pero sin modificarla',
      'Usarla sin mencionar a la persona autora',
      'Solo mirarla, sin usarla para nada']),
  mc_('cq3', 'cc_q', 'Siempre mencionando a la persona autora, la licencia CC BY-ND permite…',
    'Usar la obra, incluso con fines comerciales, pero sin modificarla', [
      'Modificar la obra y venderla',
      'Modificar la obra, pero no venderla',
      'Usar la obra solo en el centro educativo']),
  mc_('cq4', 'cc_q', 'La licencia CC BY-SA obliga a…',
    'Compartir tus modificaciones con la misma licencia', [
      'Pagar a la persona autora',
      'No modificar la obra',
      'Pedir permiso antes de cada uso']),
  tf_('cq5', 'cc_q', 'En todas las licencias Creative Commons hay que mencionar a la persona autora.', true),
  mc_('cq6', 'cc_q', 'Los símbolos SA y ND no se pueden combinar. ¿Por qué?',
    'Porque SA permite modificar la obra y ND lo prohíbe', [
      'Porque los dos son de pago',
      'Porque los dos prohíben el uso comercial',
      'Porque ND solo existe en inglés']),
  multi_('cq7', 'cc_q', 'Con una obra CC BY-NC-SA, y mencionando siempre a su autor o autora, ¿qué puedes hacer? (marca todas las respuestas correctas)',
    ['Modificarla', 'Compartir tu versión con la misma licencia', 'Usarla en un trabajo de clase'],
    ['Usarla en un cartel que vendes', 'Compartir tu versión con una licencia más abierta, como CC BY']),
  mc_('cq8', 'cc_q', 'Usas una obra CC BY-NC y la modificas. Tu trabajo final puede tener…',
    'Una licencia que también prohíba el uso comercial', [
      'Una licencia que permita vender el trabajo',
      'Dominio público',
      'Cualquiera: la licencia original ya no importa']),
  mc_('cq9', 'cc_q', '¿Dónde puedes elegir una licencia Creative Commons para tu propio trabajo?',
    'En la web creativecommons.org (apartado "elegir licencia")', [
      'En la web de Séneca',
      'Pagando en un registro oficial',
      'En una red social']),
  mc_('cq10', 'cc_q', '¿Cuál de estas licencias Creative Commons es la más restrictiva (la que menos permite)?',
    'CC BY-NC-ND', ['CC BY', 'CC BY-SA', 'CC BY-NC'])
];
