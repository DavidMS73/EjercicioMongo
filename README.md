
# EjercicioMongo

> Reto de Mongo del curso ISIS3710.

Para ejecutar se debe poner el comando: `npm start`

Luego, en el navegador entrar a la dirección localhost:3000. Se puede entrar al tiempo desde varias pestañas. En la página se pueden intercambiar mensajes usando un nombre de usuario, por defecto German Martinez.

Nombre de la base de datos: 

> chat

Nombre de la colección: 

> messages

La API del proyecto es:

`POST /chat/api/messages` -> envía un JSON para enviar un mensaje al chat. El JSON debe tener el siguiente formato:

> { "message": "Mensaje a enviar", "author": "Autor del mensaje" }

`GET /chat/api/messages` -> JSON con todos los mensajes que se han enviado.

`GET /chat/api/messages/{{ts}}` -> JSON del mensaje con timestamp (ts) dado.

`PUT /chat/api/messages/{{ts}}` -> envía un JSON para actualizar el mensaje con timestamp (ts) dado. El JSON debe tener el siguiente formato:

> { "message": "Mensaje a enviar", "author": "Autor del mensaje" }

`DELETE /chat/api/messages/{{ts}}` -> borra el mensaje con el timestamp (ts) dado.

Restricciones:

- Todos los campos (message, author) son requeridos
- El mensaje no puede tener menos de 5 caracteres
- El autor debe tener un nombre y un apellido separados por un espacio
