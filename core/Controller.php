<?php
    class Controller
    {
        public function __construct($action)
        {
            foreach (glob("models/*.php") as $file) { //Cargamos los modelos
                require_once $file;
            }
            
            if($action && method_exists($this, $action))
            {
                $this->$action();            
            }
            else
            {
                $action = ACCION_DEFECTO;
                $this->$action(); 
            }
        }

    }
    
?>