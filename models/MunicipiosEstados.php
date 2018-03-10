<?php
    class MunicipiosEstados extends Model
    {
        private $id, $municipio;

        public function __construct(){
            $table= "estados_municipios";
            parent::__construct($table);
        }

        public function getId()
        {
            return $this->id;
        }

        public function getMunicipio() {
            return $this->municipio;
        }

        public function setId($id)
        {
            $this->id = $id;
        }

        public function setMunicipio($municipio) {
            $this->municipio = $municipio;
            
        }
    }

?>