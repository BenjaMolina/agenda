<div class="container">
    <div class="col-sm-8 col-md-6 col-lg-6">
        <button id="nuevoContact" type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalContacto">Nuevo Contacto</button>
        <center>
            <h2><label class="label label-info">CONTACTOS</label></h2>
        </center>
        <table class="table table-responsive">
            <tr>
                <td>ID</td>
                <td>Nombre</td>
                <td>Apellidos</td>
                <td>Email</td>
                <td>Telefono</td>
                <td>Estado</td>
                <td>Municipio</td>
                <td ></td>
            </tr>

            <?php
                foreach ($contactos as $contacto) {
                    echo "<tr>
                            <td>$contacto->id</td>
                            <td>$contacto->nombre</td>
                            <td>$contacto->apellidos</td>
                            <td>$contacto->email</td>
                            <td>$contacto->telefono</td>
                            <td>$contacto->estado</td>
                            <td>$contacto->municipio</td>
                        </tr>";
                }
            ?>
        </table>
    </div>
</div>

<div class="modal fade" id="modalContacto" tabindex="-1" role="dialog" aria-labelledby="modalContactoLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalContactoLabel">Nuevo Contacto</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">   
            <div class="alert alert-danger"></div>               
            <form>                
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="inputNombre">Nombre</label>
                        <input type="text" class="form-control" id="inputNombre" placeholder="Nombre">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="inputApellidos">Apellidos</label>
                        <input type="text" class="form-control" id="inputApellidos" placeholder="Apellidos">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="inputEmail">Email</label>
                        <input type="email" class="form-control" id="inputEmail" placeholder="Email">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="inputTelefono">Telefono</label>
                        <input type="phone" class="form-control" id="inputTelefono" placeholder="Telefono">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="inputEstado">Estado</label>
                        <select id="inputEstado" class="form-control"></select>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="inputMunicipio">Municipio</label>
                        <select id="inputMunicipio" class="form-control"></select>
                    </div>
                </div>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-primary" id="guardarContacto">Guardar</button>
            </form>        
      </div>
    </div>
  </div>
</div>