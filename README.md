# 2-DAM-Acceso-a-datos-UD4-Entrega
Entrega de la unidad 4

VIDEO FUNCIONAMIENTRO DE LA APLICACION: https://www.loom.com/share/7a4ae9cb072a45988f300c47b2076034?sid=12664e3c-04b0-46b2-ab1d-10b582788fe0


# Inventario de Productos

# 1.Introduccion
Descripcion del proyecto:
Inventario de productos, en el que podemos dar de alta, baja, modificar o buscar los productos que tengamos guardados. Implementamos tanto backend como front end.


# 2.Configuracion y despliegue
Para instalar el proyecto se deben abrir las dos carpetas que forman el proyecto, que corresponde a front end y back end. Se abren con un IDE y el back end lo ejecutamos primero runeando la clase UD4TareaAplicacion, y luego en el front end solo tenemos que abrir la carpeta en un IDE como visual studio y previsualizar la pagina index. Tambien habria que ejecutar la base de datos, desde los tests que tiene la aplicacion en el back end, para crear los usuarios que queramos. Cuenta ya dentro de src/test/java con una clase que crea usuarios. Ahi podemos crear nuestro usuario que se deja indicado, ejecutando dicha clase. Hay que crear el usuario que esta indicado para que funcione el front end. NOTA: si se cambia el usuario o no se crea el que ya esta en la clase test se debe modificar en el front end la llamada a la API, ya que ahi el usuario que se utiliza es el de la clase test: jose / 6824.

Una vez hecho eso ya podremos ejecutar la aplicacion sin problemas.


# 3.Arquitectura y diseño
El patron de diseño utilizado es el MVC, con paquetes para cada una de las estructuras. Tenemos el paquete del modelo, el paquete de la aplicacion (donde solo esta la clase con un par de lineas de codigo que ejecuta y levanta todo el back end), el paquete del servicio, el paquete del repositorio y el paquete de seguridad (que es donde esta la clase que configura la seguridad de spring boot).

En el front end, solo tenemos la carpeta del proyecto y dentro tenemos los dos archivos de javascript y los dos de html, y luego una hoja de estilos.


# 4.Guia de codigo.
Estructura del Proyecto

El proyecto ud4Tarea sigue una estructura modular dentro de un entorno de desarrollo basado en Java, específicamente utilizando el framework Spring Boot. La estructura del proyecto está diseñada para separar las responsabilidades y facilitar el mantenimiento y la escalabilidad del código. A continuación, se detalla la estructura general del proyecto:

- src/main/java: Contiene el código fuente principal del proyecto, que está subdividido en diferentes paquetes.
- com.example.demo: Es el paquete raíz y contiene las clases principales para ejecutar la aplicación.
ControladorProducto.java: Clase que actúa como controlador para las operaciones relacionadas con productos.
Ud4TareaApplication.java: Clase principal que inicia la aplicación de Spring Boot.
- com.example.demo.models: Este paquete incluye las clases que definen la estructura de los datos (modelos).
Producto.java: Define la estructura de datos y la lógica de negocio para los productos.
Usuario.java: Define la estructura de datos y la lógica de negocio para los usuarios.
- com.example.demo.repository: Contiene interfaces para el acceso a datos, generalmente a través de JPA (Java Persistence API).
ProductoRepository.java: Interfaz para la persistencia y consulta de datos de productos.
UsuarioRepository.java: Interfaz para la persistencia y consulta de datos de usuarios.
- com.example.demo.security: Encapsula las configuraciones de seguridad.
SecurityConfig.java: Configuración de seguridad y autenticación.
- com.example.demo.service: Provee clases de servicio que contienen la lógica de negocio.
ProductoService.java: Clase de servicio para operaciones relacionadas con productos.
UsuarioService.java: Clase de servicio para operaciones relacionadas con usuarios.

## Explicación de los Componentes Clave

Los componentes clave en un proyecto de Spring Boot como este son los Modelos, Vistas y Controladores, comúnmente conocidos por su sigla en inglés MVC.

### => Modelos (com.example.demo.models):
Los modelos en el paquete com.example.demo.models son entidades Java que representan las estructuras de datos para la aplicación, directamente mapeadas a las tablas de la base de datos utilizando Jakarta Persistence (anteriormente conocida como Java Persistence API, JPA).

#### Clase Producto:
La clase Producto está anotada con @Entity, indicando que es una entidad JPA que se mapeará a una tabla en la base de datos con el mismo nombre. Los atributos de la clase Producto incluyen:

- id: El identificador único para cada producto, marcado con @Id para denotar que es la clave primaria. Se genera automáticamente con la estrategia GenerationType.IDENTITY, lo que significa que la base de datos se encargará de incrementar este valor.
- nombre: Una cadena que representa el nombre del producto.
- precio: Un objeto Double que representa el precio del producto.
- cantidad: Un entero que indica la cantidad de productos disponibles en inventario.
- categoria: Una cadena que representa la categoría a la que pertenece el producto.

Cada uno de estos atributos está mapeado a una columna en la tabla de la base de datos. Los métodos getters y setters correspondientes permiten acceder y modificar estos atributos, respetando el principio de encapsulamiento.

#### Clase Usuario:
La clase Usuario también está anotada con @Entity, lo que significa que es una entidad JPA. Sus atributos incluyen:

- id: El identificador único para cada usuario, marcado con @Id. En este caso, no se especifica una estrategia de generación automática, lo que sugiere que los identificadores deben ser gestionados o asignados manualmente.
nombre: Una cadena que representa el nombre del usuario.
- clave: Una cadena que representa la contraseña del usuario.

Como con la clase Producto, la clase Usuario proporciona métodos getters y setters para sus atributos, permitiendo la manipulación de sus valores mientras se mantiene la integridad de los datos.

Estos modelos juegan un papel crucial en la arquitectura de la aplicación, ya que definen la estructura de datos sobre la cual operan todas las demás capas del sistema, como los repositorios y los servicios. 

### => Vistas(UD4Tarea-frontend)

Las vistas están organizadas de manera sencilla y funcional, con una clara separación entre la estructura (HTML), el diseño (CSS) y la funcionalidad interactiva (JavaScript), organizados dentro de una carpeta aparte del backend.En ellas se definen la interfaz de usuario y las interacciones del lado del cliente. Están diseñadas para interactuar con una API del backend, permitiendo realizar operaciones CRUD sobre los productos que maneje la aplicación.

## Descripción de Archivos de Vistas y su Funcionalidad

- index.html: Sirve como la página principal de la aplicación. Contiene un formulario para la entrada de datos y una tabla para la visualización de los productos. Este archivo maneja la interactividad inicial del usuario con la aplicación, como buscar, añadir, eliminar y seleccionar productos para modificar.

- modificar.html: Proporciona una interfaz para editar los detalles de un producto existente. Incluye un formulario prerrellenado con los datos del producto seleccionado y permite guardar los cambios realizados.

- estilos.css: Define los estilos CSS para las páginas HTML.

## Interacciones con la API
Los archivos JavaScript scriptIndex.js y scriptModificar.js son esenciales para la lógica del lado del cliente y las interacciones con la API del backend. Estos scripts gestionan las siguientes acciones:

- scriptIndex.js:
Carga inicial de productos: Al cargar la página, se realiza una petición GET a la API para recuperar y mostrar la lista de productos que hay en la base de datos.
Búsqueda de productos: Envia peticiones GET con parámetros de búsqueda para filtrar productos.
Añadir producto: Realiza una petición POST para crear un nuevo producto con los datos ingresados en el formulario.
Eliminar producto: Envía una petición DELETE para eliminar un producto seleccionado.
Modificar producto: Almacena los datos del producto seleccionado y redirige a modificar.html para su edición.
- scriptModificar.js:
Carga de datos para modificación: Al cargar la página, se recuperan los datos del producto a modificar del almacenamiento local y se llenan en el formulario.
Actualizar producto: Envía una petición PUT con los datos modificados para actualizar el producto en el backend.



# 5.Base de datos.
La base de datos ud4tareainventario ha sido generada automáticamente a través de Hibernate en el marco de Spring Boot, aprovechando las anotaciones de JPA. El esquema se compone de dos tablas principales que reflejan las entidades de Producto y Usuario.

## Tablas y Descripciones

### Tabla producto:

Esta tabla almacena información sobre los productos del inventario. Las columnas y sus tipos de datos se generan a partir de la clase Producto anotada con @Entity.

- id (INT, PRIMARY KEY, AUTO_INCREMENT): Identificador único para cada producto. Es autoincremental y sirve como clave primaria de la tabla.
- nombre (VARCHAR): Almacena el nombre del producto. Es un campo obligatorio debido a la falta de la anotación nullable=false.
- precio (DOUBLE): Representa el precio del producto. Acepta valores decimales para mayor precisión en el coste del producto.
- cantidad (INT): Refleja la cantidad del producto disponible en el inventario.
- categoria (VARCHAR): Indica la categoría a la que pertenece el producto, lo que podría utilizarse para agrupar productos de naturaleza similar.

### Tabla usuario:

Contiene los datos de los usuarios que pueden interactuar con la aplicación. Se define por la clase Usuario también anotada con @Entity.

- id (INT, PRIMARY KEY): Es el identificador único para cada usuario, asumido como gestionado manualmente o proporcionado por alguna lógica externa.
- nombre (VARCHAR): El nombre del usuario. Este campo es utilizado probablemente para el inicio de sesión o identificación dentro de la aplicación.
- clave (VARCHAR): Campo destinado a almacenar la clave del usuario, que, por las prácticas de seguridad observadas, parece estar almacenada en un formato hash.


# 6.Problemas y soluciones
Los problemas que han surgido han sido con la autenticacion, ya que segui videos y tutoriales online y al ser estos más antiguos y no estar actulizados, utilizaban métodos deprecados, y entonces aunque tras crear toda la API hice que funcionase perfectamente, comprobándolo con POSTMAN, tras aplicar la securización, me funcionaba sólo un método, el get, para obtener todos los productos que se muestran en la tabla nada más iniciar la aplicacion. Pero al hacer llamadas a los otros endpoints de la API, con el mismo usuario y contraseña que sí obtienía respuesta, (el GET de todos los productos de la tabla), no funcionaba. Tras varias comeduras de cabeza y demás, acabe averiguando que era porque no tenia deshabilitado el csrf. Y tras deshabilitarlo finalmente me acabaron funcionando el resto de llamadas a los otros endpoints de la API.


# 7. Referencias

- [Tutorial de YouTube 1](https://www.youtube.com/watch?v=nwqQYCM4YT8&t=1091s)
- [Tutorial de YouTube 2](https://www.youtube.com/watch?v=ksLYIavT2L0)
- [Documentación de Spring Security](https://docs.spring.io/spring-security/reference/index.html)

