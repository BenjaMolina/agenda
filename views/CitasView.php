<div class="container">
    <h2>CITAS</h2>
    <br>
    <div class="col-lg-8">
        <div class="alert alert-danger" role="alert"></div>
        <div class="alert alert-success" role="alert"></div>
        <form>                
            <div class="form-row idDisable">
                <div class="form-group col-md-12">
                    <label for="citaID">ID</label>
                    <input type="text" class="form-control" id="citaID" placeholder="ID" disabled>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="citaNombre">Asunto</label>
                    <input type="text" class="form-control" id="citaAsunto" placeholder="Asunto">
                </div>
                <div class="form-group col-md-6">
                    <label for="citaApellidos">Fecha</label>
                    <input type="date" class="form-control" id="citaFecha" value="<?php echo date("Y-m-d");?>">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="citaHora">Hora</label>
                    <input type="time" class="form-control" id="citaHora" value="<?php echo getHora();?>">
                </div>
                <div class="form-group col-md-6">
                    <label for="citaContacto">Contacto</label>
                    <select id="inputContactos" class="form-control"></select>
                </div>
            </div>
            <button type="button" class="btn btn-primary" id="guardarCita">Guardar</button>
            <button type="button" class="btn btn-primary" id="editarCita">Editar</button>
            <button type="button" class="btn btn-danger" onclick="iniciarFormCitas()">Cancelar</button>
        </form>        

    </div>

    <div class="col-lg-12" style="margin-top:30px">
        <!--<button id="nuevoContact" type="button" class="btn btn-primary btnmodalContacto" data-toggle="modal" data-target="#modalContacto">Nuevo Contacto</button>-->
        <center>
            <div class="col-sm-12 col-md-12 col-lg-4">
                <h2><label class="label label-info">LISTA DE CITAS</label></h2> 
            </div>
            <div class="col-sm-12 col-md-12 col-lg-8">
                <div class="form-row">
                    <div class="form-group col-md-4 col-xs-2">
                        <div class="checkbox">
                            <label><input type="checkbox" id="check" value="">Filtrar por Fecha</label>
                        </div>
                    </div>
                    <div class="form-group col-md-4 col-xs-5">
                        <label for="citaHora">fecha de incio</label>
                        <input type="date" class="form-control" id="searchInicio" value="<?php echo date("Y-m-d");?>" onchange="filtroFecha()">
                    </div>
                    <div class="form-group col-md-4 col-xs-5">
                        <label for="citaContacto">fecha final</label>
                        <input type="date" class="form-control" id="searchFinals" value="<?php echo date("Y-m-d");?>" onchange="filtroFecha()">
                    </div>
                </div>
            </div>
                   
            
        </center>
        <table class="table table-responsive tabla-citas">
            <tr>
                <!--<td>ID</td>-->
                <td>Asunto</td>
                <td>Estatus</td>
                <td>Fecha</td>
                <td>Hora</td>
                <td>Contacto</td>
                <td colspan="2">Opciones</td>
            </tr>
        </table>
    </div>
</div>