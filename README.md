# 2-DAM-Acceso-a-datos-UD4-Entrega
Entrega de la unidad 4



# Inventario de Productos

## 1. Introducción

### Descripción del proyecto:
Inventario de productos en el que podemos dar de alta, baja, modificar o buscar los productos que tengamos guardados. Implementamos tanto backend como frontend.

## 2. Configuración y Despliegue

Para instalar el proyecto, se deben abrir las dos carpetas que forman el proyecto, correspondientes al frontend y al backend. Se abren con un IDE, y el backend se ejecuta primero corriendo la clase `UD4TareaAplicacion`, y luego en el frontend solo tenemos que abrir la carpeta en un IDE como Visual Studio y previsualizar la página `index.html`. También habría que ejecutar la base de datos, ya que estamos ejecutando el proyecto en local, lo que hará que necesitemos tener la base de datos en nuestra máquina.

Una vez hecho eso, ya podremos ejecutar la aplicación sin problemas.

## 3. Arquitectura y Diseño

El patrón de diseño utilizado es el MVC, con paquetes para cada una de las estructuras. Tenemos:

- El paquete del modelo
- El paquete de la aplicación (donde solo está la clase con un par de líneas de código que ejecuta y levanta todo el backend)
- El paquete del servicio
- El paquete del repositorio
- El paquete de seguridad (donde está la clase que configura la seguridad de Spring Boot).

En el frontend, solo tenemos la carpeta del proyecto y dentro tenemos los dos archivos de JavaScript, los dos de HTML, y luego una hoja de estilos.

## 4. Guía de Código

### Estructura del Proyecto

El proyecto `ud4Tarea` sigue una estructura modular dentro de un entorno de desarrollo basado en Java, específicamente utilizando el framework Spring Boot. La estructura del proyecto está diseñada para separar las responsabilidades y facilitar el mantenimiento y la escalabilidad del código.

#### Explicación de los Componentes Clave

- **Modelos** (`com.example.demo.models`): Entidades Java que representan las estructuras de datos, directamente mapeadas a las tablas de la base de datos utilizando Jakarta Persistence.
- **Vistas** (`UD4Tarea-frontend`): Organizadas de manera sencilla y funcional, con una clara separación entre la estructura (HTML), el diseño (CSS) y la funcionalidad interactiva (JavaScript).
- **Controladores y API Rest** (`com.example.demo`): Clase crítica que actúa como el intermediario entre las operaciones HTTP que vienen desde el frontend y el servicio de la lógica de negocio asociado con los productos.

## 5. Base de Datos

La base de datos `ud4tareainventario` ha sido generada automáticamente a través de Hibernate en el marco de Spring Boot, aprovechando las anotaciones de JPA. El esquema se compone de dos tablas principales que reflejan las entidades de Producto y Usuario.

## 6. Problemas y Soluciones

Los problemas que han surgido han sido con la autenticación, solucionados tras deshabilitar el CSRF, lo que permitió que las llamadas a los endpoints de la API funcionaran correctamente.

## 7. Referencias

- [Tutorial de YouTube 1](https://www.youtube.com/watch?v=nwqQYCM4YT8&t=1091s)
- [Tutorial de YouTube 2](https://www.youtube.com/watch?v=ksLYIavT2L0)
- [Documentación de Spring Security](https://docs.spring.io/spring-security/reference/index.html)
