# Cotizador de Seguros Vehiculares

Propuesta de solución del reto técnico para Indra.

# Detalles de la solución
## Librerías
Además de las librerías `react`, `react-dom` y `react-scripts`, que vienen por defecto al crear el proyecto usando `create-react-app`, se utilizaron las siguientes librerías:

- `axios`: Con esta librería hago las consultas al REST API de datos de Persona (`https://jsonplaceholder.typicode.com`).
- `minireset.css`: Reset de CSS ligero, permite maquetar sobre una base común de estilos por defecto de navegador.
- `sass`: Preprocesador de CSS, permite escribir CSS usando una sintaxis más amigable, además que habilita más funciones y operadores.
- `react-router-dom`: Permite asociar componentes de React a rutas de navegador, con esta librería realizo los cambios de pantalla de la solución.
- `redux`: Contenedor de estado reactivo global, esta librería me permite almacenar los datos obtenidos de los diferentes endpoints en esta solución.
- `redux-thunk`: Middleware para Redux, permite el uso de acciones de respuesta asíncrona, uso esta librería para hacer la solicitud de datos a los diferentes endpoints de la solución.
- `react-redux`: Integración de Redux con componentes de React.
- `prop-types`: Permite validar las propiedades enviadas a los componentes de React.
- `lodash`: Libreria de utilitarios para arrays y objetos, puntualmente uso una función llamada `lodash/clone`, para clonar estados de componentes de React.



## Estrategia de desarrollo
Comencé maquetando las vistas en mobile, fijándome en la vista desktop para poder crear los elementos necesarios para cuando la pantalla escale.

Luego de esto fue implementado redux y redux-thunk para comenzar con la parte de manejo de datos globales, puntualmente hablando de los request a REST API desde la capa de datos.

Culminado esto, adapte las vistas mobile a vistas desktop.


## Iniciar el proyecto en local
Luego de descargar el repositorio, ejecutar los siguientes comandos en una terminal.

- `npm i`: Instalar las librerías y dependencias del proyecto.
- `npm start`: Inicia un servidor local en el puerto 3000 y compila el proyecto para habilitarlo en esta ruta.

## Compilar el proyecto para producción

- `npm i`: Instalar las librerías y dependencias del proyecto.
- `npm run build`: Compila el proyecto y lo envía a la carpeta `dist`

En la carpeta `dist` se pueden encontrar los archivos compilados listos para ser cargados a un servidor.