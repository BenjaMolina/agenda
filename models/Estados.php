<?php
    class Estados extends Model
    {
        private $id, $estado;

        public function __construct(){
            $table= "estados";
            parent::__construct($table);
        }

        public function getId()
        {
            return $this->id;
        }

        public function getEstado() {
            return $this->estado;
        }

        public function setId($id)
        {
            $this->id = $id;
        }

        public function setEstado($estado) {
            $this->estado = $estado;
            
        }
    }

?>