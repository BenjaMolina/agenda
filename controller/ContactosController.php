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
        public function contactos()
        {
            $contactos = new Contacto();
            $todos = $contactos->getAll();

            echo json_encode($todos);

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
                $estado = $_POST["estado"];
                $municipio = $_POST["municipio"];

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

        public function find()
        {
            if(isset($_POST["id"]))
            {
                $id = $_POST["id"];

                $c = new Contacto();
                $contacto = $c->getById($id);

                echo json_encode($contacto);
                
                
            }
        }

        public function update()
        {
            if(isset($_GET["id"]))
            {
                $id = (int) $_GET["id"];                

                $c = new Contacto();
                $find = $c->getById($id);
                
                
                if(count($find) > 0)
                {
                    $contacto = new Contacto();
                    $nombre = $_POST["nombre"];
                    $apellidos = $_POST["apellidos"];
                    $email = $_POST["email"];
                    $telefono = $_POST["telefono"];
                    $estado = $_POST["estado"];
                    $municipio = $_POST["municipio"];

                    $contacto->setId($id);
                    $contacto->setNombre($nombre);
                    $contacto->setApellidos($apellidos);
                    $contacto->setEmail($email);
                    $contacto->setTelefono($telefono);
                    $contacto->setEstado($estado);
                    $contacto->setMunicipio($municipio);

                    echo ($contacto->update());
                }

            }
        }

        public function delete()
        {
            if(isset($_GET["id"]))
            {
                $id = (int)$_GET["id"];

                $c = new Contacto();
                $contacto = $c->deletById($id);

                echo ($contacto);
                
            }
        }
    }
    

?>