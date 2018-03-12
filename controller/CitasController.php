<?php
    
    class CitasController extends Controller
    {
        private $action;

        public function __construct($action)
        {
            $this->action = $action;
            parent::__construct($this->action); //Llamamos al padre para ejecutar la accion
        }

        public function index()
        {
            $citas = new Citas();

            $todos = $citas->getAll();

            $viewContactos = new View("Citas", array(
                "citas" =>$todos
            ));

        }
        public function citas()
        {
            $citas = new Citas();

            $query = "SELECT citas.id, citas.asunto, citas.estatus, citas.fecha, citas.hora, citas.id_contactos, contactos.nombre, contactos.apellidos 
                        FROM citas, contactos 
                        WHERE citas.id_contactos = contactos.id";

            $todos = $citas->ejecutarSql($query);

            echo json_encode($todos);

        }

        public function getContactos()
        {
            $contactos = new Contacto();
            $todos = $contactos->getAll();

            echo json_encode($todos);
        }

        public function crear()
        {
            if(isset($_POST["asunto"]))
            {
                $cita= new Citas();

                $asunto = $_POST["asunto"];
                $fecha = $_POST["fecha"];
                $hora = $_POST["hora"];
                $id_usaurio = $_POST["id_usuario"];

                $cita->setAsunto($asunto);
                $cita->setFecha($fecha);
                $cita->setHora($hora);
                $cita->setContacto($id_usaurio);

                echo ($cita->save());
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

                $c = new Citas();
                $cita = $c->getById($id);

                echo json_encode($cita);
                
            }
        }

        public function update()
        {
            if(isset($_POST["id"]))
            {
                $id = (int) $_POST["id"];               

                $cita= new Citas();

                $asunto = $_POST["asunto"];
                $fecha = $_POST["fecha"];
                $hora = $_POST["hora"];
                $id_usaurio = $_POST["id_usuario"];
                
                $cita->setId($id);
                $cita->setAsunto($asunto);
                $cita->setFecha($fecha);
                $cita->setHora($hora);
                $cita->setContacto($id_usaurio);

                //echo $cita->getAsunto();

                $response = $cita->actualizar();

                echo $response;
             

            }
        }

        public function delete()
        {
            if(isset($_GET["id"]))
            {
                $id = (int)$_GET["id"];

                $c = new Citas();
                $contacto = $c->deletById($id);

                echo ($contacto);
                
            }
        }

        public function filtroFecha()
        {
            if(isset($_POST['inicio']))
            {
                $inicio = $_POST['inicio'];
                $fin = $_POST['fin'];

                $citas = new Citas();

                $query = "SELECT citas.id, citas.asunto, citas.estatus, citas.fecha, citas.hora, citas.id_contactos, contactos.nombre, contactos.apellidos 
                        FROM citas, contactos 
                        WHERE citas.id_contactos = contactos.id
                        AND fecha  BETWEEN '$inicio' AND '$fin'";


                $citas = $citas->ejecutarSql($query);

                echo json_encode($citas);
            }

        }
    }
    

?>