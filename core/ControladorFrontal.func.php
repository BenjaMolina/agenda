<?php

    function cargarControlador($controller, $action) 
    {   
        $controlador = ucwords($controller).'Controller';
        $strFileController = 'controller/'.$controlador.'.php';

        if(!is_file($strFileController))
        {
            $strFileController = 'controller/'.ucwords(CONTROLADOR_DEFECTO).'Controller.php';
            $controlador = ucwords(CONTROLADOR_DEFECTO).'Controller';
        }

        require_once $strFileController;
        
        $controllerObj = new $controlador($action);
        return $controllerObj;
    }
    

    /*function cargarAccion($controllerObj, $action)
    {
        $accion = $action;
        $controllerObj->$accion();
    }*/

    /*function lanzarAccion($controllerObj) 
    {
        if(isset($_GET["action"]) && method_exists($controllerObj, $_GET["action"]))
        {
            cargarAccion($controllerObj, $_GET["action"]);
        }
        else
        {
            cargarAccion($controllerObj, ACCION_DEFECTO);
        }
    }*/
?>