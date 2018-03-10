<?php
    class Citas extends Model
    {
        private $id, $asunto, $fecha, $hora, $id_contactos;

        public function __construct(){
            $this->table = "citas";
            parent::__construct($this->table);
        }

        public function getId()
        {
            return $this->id;
        }

        public function getAsunto() {
            return $this->asunto;
        }

        public function getFecha() {
            return $this->fecha;
        }

        public function getHora() {
            return $this->hora;
        }

        public function getContacto() {
            return $this->id_contactos;
        }

        public function setId($id)
        {
            $this->id = $id;
        }

        public function setAsunto($asunto) {
            $this->asunto = $asunto;
            
        }

        public function setFecha($fecha) {
            $this->fecha = $fecha;
        }

        public function setHora($hora) {
            $this->hora = $hora;
        }

        public function setContacto($id_contactos) {
            $this->id_contactos = $id_contactos;
        }


        public function save()
        {
            $query = "INSERT INTO $this->table (id, asunto,fecha,hora,id_contactos) "
                        ."VALUES (NULL,"
                        ."'".$this->asunto."',"
                        ."'".$this->fecha."',"
                        ."'".$this->hora."',"
                        ."'".$this->id_contactos."'"
                        .");";

            $save = $this->db()->query($query);

            return $save;
        }

        public function actualizar()
        {
                $query = "UPDATE citas SET "
                        ."asunto ='".$this->asunto."', "
                        ."fecha = '".$this->fecha."', "
                        ."hora = '".$this->hora."', "
                        ."id_contactos = '".$this->id_contactos."' "
                        ."WHERE id='".$this->id."'";
    
                $actualizar = $this->db()->query($query);

                if($actualizar)
                {
                    return true;
                }
                else{
                    return $this->db()->error;
                }
                //$afectados = $this->db()->affected_rows;

                //return $afectados;
            
        }

    }

?>