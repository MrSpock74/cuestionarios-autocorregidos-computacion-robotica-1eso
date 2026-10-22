# Cuestionarios autocorregidos para Google Classroom · Computación y Robótica 1º ESO

Una aplicación de **Google Apps Script** con **ocho cuestionarios** que se corrigen solos: el alumnado los hace desde un enlace con su cuenta educativa, recibe su nota al momento, y el profesorado ve los resultados en un **panel** y los vuelca a **Google Classroom**.

Creada por **Manuel Romero Fraidía** (Departamento de Tecnología, IES Murillo, Sevilla) para *Computación y Robótica* de 1º de ESO.

📖 **Instrucciones paso a paso, con explicaciones:** [`docs/index.html`](docs/index.html) · <https://mrspock74.github.io/cuestionarios-autocorregidos-computacion-robotica-1eso/>

## Qué hace

- **Corrección en el servidor:** las soluciones nunca llegan al navegador del alumnado.
- **Preguntas al azar** de un banco grande y opciones barajadas en cada intento.
- Tipos de pregunta: verdadero/falso, opción múltiple, casillas, ordenar, emparejar, rellenar huecos y respuesta corta, con bloques reales de Scratch y MakeCode.
- **Mejor nota** de todos los intentos; el alumnado puede repetir.
- Las tareas de Classroom se crean **en borrador** desde el panel y la nota se vuelca como **calificación en borrador**.
- Todo se guarda en una hoja de cálculo que la app crea en **tu** Drive.

## Los cuestionarios

| Cuestionario | Enlace (`<URL_APP>` + …) | Preguntas |
|---|---|---|
| Entorno de trabajo (Pasen/iPasen, Classroom, atajos) | *(nada)* o `?q=entorno` | 14 |
| 1.1 Ciberseguridad | `?q=ciberseguridad` | 22 |
| 1.2 Propiedad intelectual | `?q=propiedad` | 14 |
| 2 IoT y herramientas de Google | `?q=unidad2` | 24 |
| 3.1 El ordenador | `?q=ordenador` | 20 |
| 3.2 Algoritmos, lenguajes y binario | `?q=algoritmos` | 21 |
| 4 Programación con Scratch | `?q=scratch` | 20 |
| 5 Control y robótica con micro:bit | `?q=microbit` | 20 |

## Archivos (carpeta `src/`)

| Archivo | Para qué sirve |
|---|---|
| `Code.gs` | Motor, configuración (`COURSE_ID`, `URL_APP`), corrección, hoja de cálculo, Classroom y panel. Incluye el primer cuestionario. |
| `Unidad1.gs` … `Unidad5.gs` | Bancos de preguntas de cada unidad. |
| `Bloques5.gs` | Imágenes del cuestionario 5 (solo datos). |
| `Index.html` | Pantalla del alumnado. |
| `Panel.html` | Panel del profesorado. |
| `appsscript.json` | Manifiesto: servicio de Classroom, zona horaria y tipo de despliegue. |

> **Importante:** los dos archivos HTML deben llamarse exactamente `Index` y `Panel` (con mayúscula inicial) en Apps Script.

## Instalación (resumen; los detalles, en la [página de instalación](docs/index.html))

1. Crea un proyecto en [script.google.com](https://script.google.com) y pega cada archivo de `src/` con su nombre.
2. Sustituye el manifiesto `appsscript.json` (Configuración del proyecto → mostrar el manifiesto).
3. Obtén el id numérico de tu clase con `decodificarCourseId` y pégalo en `COURSE_ID`.
4. Ejecuta `autorizarPanel` y acepta los permisos.
5. **Implementar → Nueva implementación → Aplicación web.** Ejecutar como: **Yo**. Acceso: usuarios de tu dominio. Copia la dirección `/exec`.
6. Pega esa dirección en `URL_APP` y crea una **nueva versión** de la implementación.
7. Abre la dirección `/exec` a secas (vas directo al panel) y crea las tareas desde la pestaña **Tareas de Classroom**.
8. Publica cada tarea en Classroom cuando quieras que el alumnado la haga.

Cada vez que cambies un archivo: **Implementar → Gestionar implementaciones → lápiz → Nueva versión**.

## Requisitos y limitaciones

- Cuenta de Google Workspace for Education con **Classroom** y acceso a la **API de Classroom** (algunos centros la restringen).
- **La tarea de Classroom tiene que crearla la propia aplicación.** Una tarea creada a mano no se puede calificar desde la API (`ProjectPermissionDenied`).
- La API no deja consultar las entregas de una tarea en borrador: **publica la tarea antes** de que el alumnado haga el cuestionario.
- Cada docente tiene que autorizar y desplegar **su propia copia**; no se actualiza sola.
- El enlace del alumnado es la dirección que termina en `/exec`, no la `/dev`.

## Protección de datos

El código no contiene datos de alumnado. La hoja de resultados que crea la aplicación guarda **nombre, apellidos, grupo, correo, respuestas y nota**, y se crea en **tu** Drive: trátala como datos personales y no la subas a ningún repositorio.

## Licencia y créditos

© Manuel Romero Fraidía. Licencia [Creative Commons Atribución-NoComercial-CompartirIgual 4.0 (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es). Consulta el archivo `LICENSE`.

- Imágenes de bloques de Scratch (cuestionario 4): generadas con *scratch-blocks* (Apache-2.0, Scratch Foundation / MIT).
- Capturas de MakeCode y micro:bit (cuestionario 5): del curso «MICRO:BIT en el aula» de Juan Antonio Pérez Rodríguez y Manuel Romero Fraidía (CC BY-NC-SA 4.0).
- Scratch, MakeCode y micro:bit son marcas de sus titulares; este proyecto no está afiliado a ellos.
