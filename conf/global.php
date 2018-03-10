<?php
    define("CONTROLADOR_DEFECTO","Contactos");
    define("ACCION_DEFECTO","index");
    define("HEADER","header");
    define("FOOTER","footer");
    define("CARPETA","agenda/");

    function urlBase()
    {
        return $_SERVER['REQUEST_SCHEME']. '://' .$_SERVER['SERVER_NAME']. '/'.CARPETA;
    }

    function getHora()
    {
        $tz = 'America/Mexico_City';
        $timestamp = time();
        $dt = new DateTime("now", new DateTimeZone($tz)); 
        $dt->setTimestamp($timestamp);
        
        return $dt->format('H:i');
    }
?>