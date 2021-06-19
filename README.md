Hola.  
Con esta Api podrás administrar los pedidos de un restaurante.

Dentro de la carpeta "Resources" encontraras los siguientes archivos:
    CreateRestoDB. 
    contiene los queries para la creación de la base de datos. (puedes arrastrar el archivo a mySQL)

    defaultDataResto. 
    Agrega algunos productos y un usuario con rol de administrador a la base de datos antes creada

    Resto.postman_collection_V2-1. 
    Es la colección utilizada en postman solo debes importarla. Esta en la versión V2.1

    swagger. 
    Es el archivo swagger en donde podrás encontrar la documentación de la Api.

    Por  último este es el link al repositorio del proyecto en GitHub. (También se encuentra en la documentación). 
    https://github.com/poved4/Resto.git

Como ultima configuracion solo debes de editar ruta de coneccion a la base de datos. 
la ruta la encontrarás en el archivo ‘Network/queries.js’ en la línea cuatro. Encontrarás un ejemplo en la línea anterior.

user: Usuario de conexión 
password: Contraseña asignada 
host: Dominio o IP donde corre MySQL 
port: Puerto donde escucha MySQL 
database: Nombre de base de datos

Después de la configuración de la ruta iniciamos el servidor con los siguientes comandos en la terminal de visual studio code.

npm install || npm i
importa todas las dependencias necesarias (que están en el archivo  package.json).

node index.js || npm run start
hacer correr el archivo. ya podrás acceder al servidor