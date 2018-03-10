<div class="container">
    <div class="col-lg-8">
        <div class="alert alert-danger" role="alert"></div>
        <div class="alert alert-success" role="alert"></div>
        <form>                
            <div class="form-row idDisable">
                <div class="form-group col-md-12">
                    <label for="inputID">ID</label>
                    <input type="text" class="form-control" id="inputID" placeholder="ID" disabled>
                </div>
            </div>
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
            <button type="button" class="btn btn-primary" id="guardarContacto">Guardar</button>
            <button type="button" class="btn btn-primary" id="editarContacto">Editar</button>
            <button type="button" class="btn btn-danger" onclick="iniciarFormulario()">Limpiar</button>
        </form>        

    </div>

    <div class="col-lg-6">
        <!--<button id="nuevoContact" type="button" class="btn btn-primary btnmodalContacto" data-toggle="modal" data-target="#modalContacto">Nuevo Contacto</button>-->
        <center>
            <h2><label class="label label-info">LISTA DE CONTACTOS</label></h2>
        </center>
        <table class="table table-responsive tabla-contactos">
            <tr>
                <td>ID</td>
                <td>Nombre</td>
                <td>Apellidos</td>
                <td>Email</td>
                <td>Telefono</td>
                <td>Estado</td>
                <td>Municipio</td>
                <td colspan="2">Opciones</td>
            </tr>
        </table>
    </div>
</div>