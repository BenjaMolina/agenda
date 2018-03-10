<?php
    class Contacto extends Model
    {
        private $id, $nombre, $apellidos, $email, $telefono,$estado,$municipio,$table;

        public function __construct(){
            $this->table = "contactos";
            parent::__construct($this->table);
        }

        public function getId()
        {
            return $this->id;
        }

        public function getNombre() {
            return $this->nombre;
        }

        public function getApellidos() {
            return $this->apellidos;
        }

        public function getEmail() {
            return $this->email;
        }

        public function getTelefono() {
            return $this->telefono;
        }

        public function getEstado() {
            return $this->estado;
        }

        public function getMunicipio() {
            return $this->municipio;
        }

        public function setId($id)
        {
            $this->id = $id;
        }

        public function setNombre($nombre) {
            $this->nombre = $nombre;
            
        }

        public function setApellidos($apellidos) {
            $this->apellidos = $apellidos;
        }

        public function setEmail($email) {
            $this->email = $email;
        }

        public function setTelefono($telefono) {
            $this->telefono = $telefono;
        }

        public function setEstado($estado) {
            $this->estado = $estado;
        }
        public function setMunicipio($municipio) {
            $this->municipio = $municipio;
        }

        public function save()
        {
            $query = "INSERT INTO $this->table(id, nombre, apellidos,email,telefono,estado,municipio) "
                        ."VALUES (NULL,"
                        ."'".$this->nombre."',"
                        ."'".$this->apellidos."',"
                        ."'".$this->email."',"
                        ."'".$this->telefono."',"
                        ."'".$this->estado."',"
                        ."'".$this->municipio."'"
                        .");";

            $save = $this->db()->query($query);

            return $save;
        }

        public function update()
        {
            $query = "UPDATE $this->table SET "
                        ."nombre ='".$this->nombre."', "
                        ."apellidos = '".$this->apellidos."', "
                        ."email = '".$this->email."', "
                        ."telefono = '".$this->telefono."', "
                        ."estado = '".$this->estado."', "
                        ."municipio = '".$this->municipio."'  "
                        ."WHERE id = ".$this->id;
            

            $save = $this->db()->query($query);

            return $save;
        }

    }

?>