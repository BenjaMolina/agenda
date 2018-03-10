<?php
    require_once 'conf/global.php';
    require_once 'core/Controller.php';
    require_once 'core/ControladorFrontal.func.php';
    require_once 'core/Views.php';
    require_once 'core/Model.php';

    $url = isset($_GET['url']) ? $_GET['url'] : CONTROLADOR_DEFECTO.'/'.ACCION_DEFECTO;
    $url = explode('/',$url);

    isset($url[1]) ? $accion = $url[1] : $accion = ACCION_DEFECTO;

    if(isset($url[0]))
    {
       $controllerObj = cargarControlador($url[0],$accion);
    }
    else
    {
        $controllerObj = cargarControlador(CONTROLADOR_DEFECTO,$accion);
    }
    
?>