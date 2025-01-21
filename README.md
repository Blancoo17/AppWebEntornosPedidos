# AppWebEntornosPedidos
Aplicación web para Entornos de Desarrollo (gestión de pedidos de una tienda)

Primer paso: BBDD

Estoy utilizando el programa DB Browser for SQLite para la generación de la BBDD. He creado un esquema con 3 tablas para simular la parte de gestión de pedidos de una tienda.

Tendremos las tablas cliente, comercial y pedido. Se relacionarán entre ellas de la siguinete manera:

Un cliente tiene varios campos, pero un ID que es su clave primaria. Un comercial también tiene otros campos, y otro ID como clave primaria. 
Un pedido está relacionado con un cliente y un comercial, a través de los correspondientes ID's de ambos (que aquí son claves foráneas).

Segundo paso: Backend básico

He implementado un backend básico por ahora, para representar el modelo con las tres entidades en tres ficheros diferentes (cliente.java, 
pedido.java y comercial.java). Tenemos una clase ClienteRepository.java para manejar las querys que se hagan mediante JPA y unos endpoints en 
la clase ClienteController.java. He puesto la configuración de conexión al fichero de BBDD en el fichero application.properties y en el POM.xml 
están las dependencias que estoy usando para que la aplicación pueda funcionar. Tuve bastantes problemas encontrando la combinación precisa de artifacts para que compilara y pudiera usar la clase SQLiteDialect sin problemas.

Por ahora estoy lanzando el backend desde el Visual Studio Code, haciendo click derecho sobre la clase TiendawebappApplication (que es la que tiene el método main) y seleccionando la opción "Run Java". Más adelante probaré a lanzar la aplicación directamente desde consola con la orden de "mvn spring-boot:run" desde el directorio en el que la tengo.

Tercer paso: Frontend básico

Ya hay un frontend básico que permite ver el contenido de la tabla de clientes. El html se carga por defecto al entrar en la dirección "http:localhost:8080". De hecho, en el navegador se puede ver que la api ya responde en la direccion "http://localhost:8080/api/clientes" devolviendo en formato json todos los clientes de la tabla.
