<?php
    
    class ContactosController extends Controller
    {
        private $action;

        public function __construct($action)
        {
            $this->action = $action;
            parent::__construct($this->action); //Llamamos al padre para ejecutar la accion
        }

        public function index()
        {
            $contactos = new Contacto();

            $todos = $contactos->getAll();

            $viewContactos = new View("Contactos", array(
                "contactos" =>$todos
            ));

        }

        public function crear()
        {
            if(isset($_POST["telefono"]))
            {
                $contacto= new Contacto();

                $nombre = $_POST["nombre"];
                $apellidos = $_POST["apellidos"];
                $email = $_POST["email"];
                $telefono = $_POST["telefono"];
                $estado = $_POST["municipio"];
                $municipio = $_POST["estado"];

                $contacto->setNombre($nombre);
                $contacto->setApellidos($apellidos);
                $contacto->setEmail($email);
                $contacto->setTelefono($telefono);
                $contacto->setEstado($estado);
                $contacto->setMunicipio($municipio);

                echo ($contacto->save());
            }
            else
            {
                echo 0;
            }
        }
    }
    

?>