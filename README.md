# AppWebEntornosPedidos
Aplicación web para Entornos de Desarrollo (gestión de pedidos de una tienda)

Estoy utilizando el programa DB Browser for SQLite para la generación de la BBDD. He creado un esquema con 3 tablas para simular la parte de gestión de pedidos de una tienda.

Tendremos las tablas cliente, comercial y pedido. Se relacionarán entre ellas de la siguinete manera:

Un cliente tiene varios campos, pero un ID que es su clave primaria. Un comercial también tiene otros campos, y otro ID como clave primaria. 
Un pedido está relacionado con un cliente y un comercial, a través de los correspondientes ID's de ambos (que aquí son claves foráneas).
