<!DOCTYPE html>
<html lang="en">
<head>
    <title>Agenda</title>
    <link rel="stylesheet" href="<?php echo urlBase(); ?>public/css/bootstrap.min.css">
    <link rel="stylesheet" href="<?php echo urlBase(); ?>public/css/bootstrap-theme.css">
    <link rel="stylesheet" href="<?php echo urlBase(); ?>public/css/style.css">

    <script src="<?php echo urlBase(); ?>public/js/jquery-3.3.1.min.js"></script>
    <script src="<?php echo urlBase(); ?>public/js/bootstrap.min.js"></script>
    <script src="<?php echo urlBase(); ?>public/js/edoMun.js"></script>
    <script src="<?php echo urlBase(); ?>public/js/script.js"></script>
    <script>
      var URL = "<?php echo urlBase(); ?>";
    </script>
</head>
<body>
<nav class="navbar navbar-default">
  <div class="container-fluid">

    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <!--<a class="navbar-brand" href="<?php echo urlBase(); ?>">INICIO</a>-->
    </div>
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li><a href="<?php echo urlBase(); ?>contactos">Contactos <span class="sr-only">(current)</span></a></li>
        <li><a href="<?php echo urlBase(); ?>citas">Citas</a></li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>


<!-- Modal -->
<div class="modal fade" id="aceptarCancel" tabindex="-1" role="dialog" aria-labelledby="aceptCancelLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="aceptCancelLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>¿Esta seguro de Eliminar el registro ?</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" id="aceptarEliminar">Aceptar</button>
      </div>
    </div>
  </div>
</div>
