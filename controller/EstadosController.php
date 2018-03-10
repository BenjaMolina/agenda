<?php
    
    class EstadosController extends Controller
    {
        private $action;

        public function __construct($action)
        {
            $this->action = $action;
            parent::__construct($this->action); //Llamamos al padre para ejecutar la accion
        }

        public function index()
        {
            $estados = new Estados();

            $allEstados = $estados->getAll();

            echo json_encode($allEstados);

        }

        public function getMunicipios()
        {
            if(isset($_GET["id"]))
            {
                $id = $_GET["id"];
                $municipios = new MunicipiosEstados();

                $query = "SELECT municipios.id, municipios.municipio FROM estados_municipios ".
                          "INNER JOIN municipios ON estados_municipios.municipios_id = municipios.id ".
                          "INNER JOIN estados ON estados_municipios.estados_id = estados.id WHERE estados.id = $id";

                $municipios = $municipios->ejecutarSql($query);

                echo json_encode($municipios);
                //var_dump($municipios);
            }
        }

        
    }
    

?>