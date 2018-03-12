# Agenda
agenda MVC

## Configuracion
### Configiracion de la Base de Datos
#### conf/database.php

Hacer los cambios correspondientes de los datos anteriores de acuerdo sus configuraciones de la base de datos

* "host"=> "localhost",
*  "user"      => "root",
*  "pass"      => "",
*  "database"  => "agenda",

### Configiracion de variables globales
#### conf/globales.php

Variables que definen por defecto a la hora de iniciar el sitio o cuando algun controlador o accion no se encuentra

* define("CONTROLADOR_DEFECTO","Contactos");
* define("ACCION_DEFECTO","index");

Variables que definen por defecto a la hora de iniciar el sitio o cuando algun controlador o accion no se encuentra
* define("HEADER","header");
* define("FOOTER","footer");
* define("CARPETA","agenda/");

    function urlBase()
    {
        return $_SERVER['REQUEST_SCHEME']. '://' .$_SERVER['SERVER_NAME']. '/'.CARPETA;
    }