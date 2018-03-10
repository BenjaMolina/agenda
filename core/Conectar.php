<?php

    class Conectar
    {
        private $driver;
        private $host, $user, $pass, $database, $charset;

        public function __construct()
        {            
            $db_config = require_once 'conf/database.php';

            $this->driver = $db_config["driver"];
            $this->host = $db_config["host"];
            $this->user = $db_config["user"];
            $this->pass = $db_config["pass"];
            $this->database = $db_config["database"];
            $this->charset = $db_config["charset"];
        }

        public function conexion()
        {
            if($this->driver == "mysql" || $this->driver == null){
                $con = new mysqli($this->host, $this->user, $this->pass, $this->database);
                $con->query("SET NAMES '".$this->charset."'");
            }

            return $con;
        }
    }

?>