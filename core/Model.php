<?php
    //Clase de la cual heredaran los modelos que representen entidades de la base

    class Model {

        private $table, $db, $conectar;

        public function __construct($table) {
            
            $this->table = (string) $table;
            
            require_once 'Conectar.php';
            $this->conectar =  new Conectar();
            $this->db = $this->conectar->conexion();
        }

        public function getConectar(){
            return $this->conectar;
        }

        public function db(){
            return $this->db;
        }

        public function getAll(){
            $query=$this->db->query("SELECT * FROM $this->table ORDER BY id ASC");
            
            $resulSet = [];

            while($row = $query->fetch_object()){
                $resulSet[] = $row;
            }

            return $resulSet;
        }

        public function getById($id){
            $query=$this->db->query("SELECT * FROM $this->table WHERE id =$id");
            
            $resulSet;

            if($row = $query->fetch_object()){
                $resulSet = $row;
            }

            return $resulSet;
        }

        public function getBy($column, $value){
            $query=$this->db->query("SELECT * FROM $this->table WHERE $column='$value'");

            while($row = $query->fetch_object()){
                $resulSet[] = $row;
            }

            return $resulSet;
        }

        public function deletById($id) {
            $query = $this->db->query("DELETE FROM $this->table WHERE id=$id");

            return $query;
        }

        public function deleteBy($column,$value){
            $query=$this->db->query("DELETE FROM $this->table WHERE $column='$value'");

            return $query;

        }

        public function ejecutarSql($query)
        {
            $query = $this->db()->query($query);
            
            if($query)
            {
                if($query->num_rows > 1)
                {
                    while($row = $query->fetch_object())
                    {
                        $resulSet[] = $row;
                    }

                }
                else if($query->num_rows == 1)
                {
                    if($row = $query->fetch_object()){
                        $resulSet = $row;
                    }

                }
                else
                {
                    $resulSet = false;
                }
            }
            else
            {
                $resulSet = false;
            }

            return $resulSet;
        }
    }
?>