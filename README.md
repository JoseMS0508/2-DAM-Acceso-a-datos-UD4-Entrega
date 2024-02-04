# 2-DAM-Acceso-a-datos-UD4-Entrega
Entrega de la unidad 4



# Inventario de Productos

## 1. Introducción

**Descripción del proyecto:** Inventario de productos en el que podemos dar de alta, baja, modificar o buscar los productos que tengamos guardados. Implementamos tanto backend como frontend.

## 2. Configuración y Despliegue

Para instalar el proyecto, se deben abrir las dos carpetas que forman el proyecto, correspondientes al frontend y al backend. Se abren con un IDE, y el backend se ejecuta primero corriendo la clase `UD4TareaAplicacion`, y luego en el frontend solo tenemos que abrir la carpeta en un IDE como Visual Studio y previsualizar la página `index.html`. También habría que ejecutar la base de datos, ya que estamos ejecutando el proyecto en local, lo que hará que necesitemos tener la base de datos en nuestra máquina.

Una vez hecho eso, ya podremos ejecutar la aplicación sin problemas.

## 3. Arquitectura y Diseño

El patrón de diseño utilizado es el MVC, con paquetes para cada una de las estructuras. Tenemos el paquete del modelo, el paquete de la aplicación (donde solo está la clase con un par de líneas de código que ejecuta y levanta todo el backend), el paquete del servicio, el paquete del repositorio y el paquete de seguridad (donde está la clase que configura la seguridad de Spring Boot).

En el frontend, solo tenemos la carpeta del proyecto y dentro tenemos los dos archivos de JavaScript, los dos de HTML, y luego una hoja de estilos.

## 4. Guía de Código

**Estructura del Proyecto:**

El proyecto `ud4Tarea` sigue una estructura modular dentro de un entorno de desarrollo basado en Java, específicamente utilizando el framework Spring Boot. La estructura del proyecto está diseñada para separar las responsabilidades y facilitar el mantenimiento y la escalabilidad del código.

- `src/main/java`: Contiene el código fuente principal del proyecto, subdividido en diferentes paquetes.
- `com.example.demo`: Paquete raíz que contiene las clases principales para ejecutar la aplicación.
  - `ControladorProducto.java`: Clase que actúa como controlador para las operaciones relacionadas con productos.
  - `Ud4TareaApplication.java`: Clase principal que inicia la aplicación de Spring Boot.
- `com.example.demo.models`: Incluye las clases que definen la estructura de los datos (modelos).
  - `Producto.java`: Define la estructura de datos y la lógica de negocio para los productos.
  - `Usuario.java`: Define la estructura de datos y la lógica de negocio para los usuarios.
- `com.example.demo.repository`: Contiene interfaces para el acceso a datos, generalmente a través de JPA.
  - `ProductoRepository.java`: Interfaz para la persistencia y consulta de datos de productos.
  - `UsuarioRepository.java`: Interfaz para la persistencia y consulta de datos de usuarios.
- `com.example.demo.security`: Encapsula las configuraciones de seguridad.
  - `SecurityConfig.java`: Configuración de seguridad y autenticación.
- `com.example.demo.service`: Provee clases de servicio que contienen la lógica de negocio.
  - `ProductoService.java`: Clase de servicio para operaciones relacionadas con productos.
  - `UsuarioService.java`: Clase de servicio para operaciones relacionadas con usuarios.

**Explicación de los Componentes Clave:**

Los componentes clave en un proyecto de Spring Boot como este son los Modelos, Vistas, y Controladores, comúnmente conocidos por su sigla en inglés MVC.

- **Modelos** (`com.example.demo.models`): Los modelos son entidades Java que representan las estructuras de datos para la aplicación, directamente mapeadas a las tablas de la base de datos utilizando Jakarta Persistence.

- **Vistas** (`UD4Tarea-frontend`): Las vistas están organizadas de manera sencilla y funcional, con una clara separación entre la estructura (HTML), el diseño (CSS), y la funcionalidad interactiva (JavaScript).

- **Controladores y API Rest** (`com.example.demo`): Dentro de todo el proyecto, únicamente tenemos un controlador y por lo tanto es fundamental en la gestión de los datos relacionados con los productos.

## 5. Base de Datos

La base de datos `ud4tareainventario` ha sido generada automáticamente a través de Hibernate en el marco de Spring Boot, aprovechando las anotaciones de JPA. El esquema se compone de dos tablas principales que reflejan las entidades de Producto y Usuario.

## 6. Problemas y Soluciones

Los problemas que han surgido han sido con la autenticación, solucionados tras deshabilitar el CSRF, lo que permitió que las llamadas a los endpoints de la API funcionaran correctamente.

## 7. Referencias

- [Tutorial de YouTube 1](https://www.youtube.com/watch?v=nwqQYCM4YT8&t=1091s)
- [Tutorial de YouTube 2](https://www.youtube.com/watch?v=ksLYIavT2L0)
- [Documentación de Spring Security](https://docs.spring.io/spring-security/reference/index.html)

