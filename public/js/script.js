var idContactos_eliminar = 0;
var idCitas_eliminar = 0;



function showModalContactos(id_contacto)
{
    idContactos_eliminar = id_contacto;    
    idCitas_eliminar = 0;
    
    $('#aceptarCancel').modal('show');
}
function showModalCitas(id_cita)
{
    idCitas_eliminar  = id_cita;    
    idContactos_eliminar = 0;
    
    $('#aceptarCancel').modal('show');
}


function filtroFecha()
{
    var inicio = $("#searchInicio").val();
    var fin = $("#searchFinals").val();
    

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: URL+ 'citas/filtroFecha',
        data: {inicio: inicio, fin:fin},
        success: (response) =>{
            console.log(response);

            $(".tabla-citas tr:not(:first-child)").remove();
            var tabla = $('.tabla-citas tr:last');         
                    
            response.map((citas)=>{
                //console.log(citas);
                var tr = $('<tr/>'); 
                var td = "<td>"+citas.id+"</td>"+
                            "<td>"+citas.asunto+"</td>"+
                            "<td>"+(citas.estatus == 0 ? 'Pendiente' : 'Finalizado')+"</td>"+
                            "<td>"+citas.fecha+"</td>"+
                            "<td>"+citas.hora+"</td>"+                            
                            "<td>"+citas.nombre+"</td>"+                            
                            '<td><button type="button" class="btn btn-primary" onclick="editarCita('+citas.id+')" >Editar</button></td>'+
                            '<td><button type="button" class="btn btn-danger"  onclick="eliminarCita('+citas.id+')">Eliminar</button></td>';
                tr.append(td);
                tabla.after(tr);
            });
        },                      
        error:(xhr, status) => {
            //alert("Algo salio mal");
            //console.log(status);
            mostrarError("Algo salio mal");
            setTimeout(() => {
                $('.alert').css('display','none');
            }, 2000);
            
        },
    });



}


function searchContact(buscar)
{   
    //var buscar = $(".buscarContact").val();
    var buscar = buscar;

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: URL+ 'contactos/search',
        data: {buscar: buscar},
        success: (response) =>{
            console.log(response);

            $(".tabla-contactos tr:not(:first-child)").remove();     
            var tabla = $('.tabla-contactos tr:last');                        
            response.map((contacto)=>{
                //console.log(contacto);
                var tr = $('<tr/>'); 
                var td = "<td>"+contacto.id+"</td>"+
                            "<td>"+contacto.nombre+"</td>"+
                            "<td>"+contacto.apellidos+"</td>"+
                            "<td>"+contacto.email+"</td>"+
                            "<td>"+contacto.telefono+"</td>"+
                            "<td>"+contacto.estado+"</td>"+
                            "<td>"+contacto.municipio+"</td>"+                            
                            '<td><button type="button" class="btn btn-primary" onclick="editar('+contacto.id+')" >Editar</button></td>'+
                            '<td><button type="button" class="btn btn-danger"  onclick="eliminar('+contacto.id+')">Eliminar</button></td>';
                tr.append(td);
                tabla.after(tr);
            });

            
        },
        error:(xhr, status) => {
            //alert("Algo salio mal");
            //console.log(status);
            mostrarError("Algo salio mal");
            setTimeout(() => {
                $('.alert').css('display','none');
            }, 2000);
            
        },
    });


}



function editar(id_contacto)
{
    $("#editarContacto").show();
    $("#guardarContacto").hide();
    $('.idDisable').show();

    var id = id_contacto;
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: URL+ 'contactos/find',
        data: {id: id},
        success: (response) =>{
            console.log(response);
            $("#inputID").val(response.id);
            $("#inputNombre").val(response.nombre);
            $("#inputApellidos").val(response.apellidos);
            $("#inputEmail").val(response.email);
            $("#inputTelefono").val(response.telefono);
            $("#inputMunicipio").empty();
            $('#inputEstado').empty();

            /*optionEstados(response.estado, false);
            
            var estadoID = $('#inputEstado option:selected').val();
            optionMunicipios(estadoID,response.municipio,false);*/

            optionEstadosEditar(response.estado, response.municipio);

            /*setTimeout(() => {
                console.log("SetTimeout");
                var estadoID = $('#inputEstado option:selected').val();
                optionMunicipios(estadoID,response.municipio);
            }, 1000);*/
            
        },
        error:(xhr, status) => {
            //alert("Algo salio mal");
            //console.log(status);
            mostrarError("Contacto no encontrado");
            setTimeout(() => {
                $('.alert').css('display','none');
            }, 2000);
            
        },
    });

}
function editarCita(idCita)
{
    $("#editarCita").show();
    $("#guardarCita").hide();
    $('.idDisable').show();

    var id = idCita;
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: URL+ 'citas/find',
        data: {id: id},
        success: (response) =>{
            console.log(response);
            $("#citaID").val(response.id);
            $("#citaAsunto").val(response.asunto);
            $("#citaFecha").val(response.fecha);
            $("#citaHora").val(response.hora);
            $("#inputContactos").empty();

            optionContactos(response.id_contactos);
            
        },
        error:(xhr, status) => {
            //alert("Algo salio mal");
            //console.log(status);
            mostrarError("Contacto no encontrado");
            setTimeout(() => {
                $('.alert').css('display','none');
            }, 2000);
            
        },
    });

}

function eliminarCita(id_contacto)
{
    var id = id_contacto;

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: URL+ 'citas/delete?id='+id,
        success: (response) =>{
            console.log(response);
            if(response)
            {                
                if(!$("#check").is(':checked')){
                    getCitas();
                }
                else{
                    filtroFecha();
                }                
                iniciarFormCitas(); 

                mostrarSucces("Cita Eliminada");
                setTimeout(() => {
                    $('.alert-success').css('display','none');
                }, 2000);
            }

            
        },
        error:(xhr, status) => {
            //alert("Algo salio mal");
            //console.log(status);
            mostrarError("No se pudo eliminar");
            setTimeout(() => {
                $('.alert').css('display','none');
            }, 2000);
            
        },
    });

}

function eliminar(id_contacto)
{
    var id =  id_contacto;

    console.log(id_contacto);

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: URL+ 'contactos/delete?id='+id,
        success: (response) =>{
            console.log(response);

            if(response)
            {                
                cargarContactos();         
                iniciarFormulario(); 

                mostrarSucces("Contacto Eliminado");
                setTimeout(() => {
                    $('.alert-success').css('display','none');
                }, 2000);
            }

            
        },
        error:(xhr, status) => {
            //alert("Algo salio mal");
            //console.log(status);
            mostrarError("No se pudo eliminar");
            setTimeout(() => {
                $('.alert').css('display','none');
            }, 2000);
            
        },
    });

}

function iniciarFormulario()
{
    $('.alert-danger').css('display','none');
    $('.alert-success').css('display','none');
    
    $('#editarContacto').hide();
    $('#guardarContacto').show();
    $('.idDisable').hide();
    

    limpiarFormulario();
    optionEstados("Aguascalientes");
    optionMunicipios(1,"Aguascalientes");
}

function cargarContactos()
{
    $(".tabla-contactos tr:not(:first-child)").remove();
    var buscar = document.getElementById('buscarContact');

    buscar ? buscar = buscar.value : buscar = "";

    if(!buscar)
    {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: URL+ 'contactos/contactos',
            success: (response) =>{
                //console.log(response);
                var tabla = $('.tabla-contactos tr:last');         
                        
                response.map((contacto)=>{
                    //console.log(contacto);
                    var tr = $('<tr/>'); 
                    var td = //"<td>"+contacto.id+"</td>"+
                                "<td>"+contacto.nombre+"</td>"+
                                "<td>"+contacto.apellidos+"</td>"+
                                "<td>"+contacto.email+"</td>"+
                                "<td>"+contacto.telefono+"</td>"+
                                "<td>"+contacto.estado+"</td>"+
                                "<td>"+contacto.municipio+"</td>"+                            
                                '<td><button type="button" class="btn btn-primary" onclick="editar('+contacto.id+')" >Editar</button></td>'+
                                '<td><button type="button" class="btn btn-danger"  onclick="showModalContactos('+contacto.id+')">Eliminar</button></td>';
                    tr.append(td);
                    tabla.after(tr);
                });
            },
            error:(xhr, status) => {
                alert("Algo salio mal");
            },
        });
    }
    else
    {
        searchContact(buscar);
    }
    
}

function mostrarError(mensaje)
{
    $('.alert-danger').html(mensaje);
    $('.alert-danger').css('display','');
}

function mostrarSucces(mensaje)
{
    $('.alert-success').html(mensaje);
    $('.alert-success').css('display','');
}

function optionMunicipios(id,seleccionar, async = true)
{
    var municipio = $('#inputMunicipio'); 
    municipio.empty();
    
    $.ajax({
        type: 'GET',
        async: async,
        dataType: 'json',
        url: URL+ 'estados/getMunicipios?id='+id,
        success: (response) =>{
            //alert("bien");
            //console.log(response);

            for (var i = 0; i< response.length ; ++i) {
                $('<option />', {
                    'value': response[i].id,
                    'text':  response[i].municipio,
                    'selected': (response[i].municipio == seleccionar ? true : (i==0 ? true: false))
                }).appendTo(municipio);
            }  
        },
        error:(xhr, status) => {
            alert("Algo salio mal");
        },
    }); 
}

function optionEstados(seleccionar,async = true)
{
    $.ajax({
        type: 'GET',
        async: async,
        dataType: 'json',
        url: URL+ 'Estados/index',
        success: (response) =>{
            //alert("bien");
            //console.log(response);
            var dropDownList = document.getElementById('inputEstado');
            for (var i = 0; i< response.length ; ++i) {
                $('<option />', {
                    'value': response[i].id,
                    'text':  response[i].estado,
                    'selected': (response[i].estado == seleccionar ? true : (i==0 ? true: false))
                }).appendTo(dropDownList);
            }  
        },
        error:(xhr, status) => {
            alert("Algo salio mal");
        },
    }); 
}


function optionEstadosEditar(seleccionar, municipio)
{
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: URL+ 'Estados/index',
        success: (response) =>{
            //alert("bien");
            //console.log(response);
            var dropDownList = document.getElementById('inputEstado');
            for (var i = 0; i< response.length ; ++i) {
                $('<option />', {
                    'value': response[i].id,
                    'text':  response[i].estado,
                    'selected': (response[i].estado == seleccionar ? true : (i==0 ? true: false))
                }).appendTo(dropDownList);
            }  

            var estadoID = $('#inputEstado option:selected').val();
            optionMunicipios(estadoID,municipio);
        },
        error:(xhr, status) => {
            alert("Algo salio mal");
        },
    }); 
}


function limpiarFormulario()
{
    $("#inputNombre").val('');
    $("#inputApellidos").val('');
    $("#inputEmail").val('');
    $("#inputTelefono").val('');
    $("#inputMunicipio").empty();
    $('#inputEstado').empty();

    $("#citaAsunto").val('');
    $("#inputContactos").empty();
    
    /*var hour = new Date().getHours() + ":" + + new Date().getMinutes();
    console.log(hour);*/
    //$("#citaHora").val(hour);
}


/*----------------------------
    CITAS
-----------------------*/

function getCitas()
{
    $(".tabla-citas tr:not(:first-child)").remove();

    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: URL+ 'citas/citas',
        success: (response) =>{
            console.log(response);
            var tabla = $('.tabla-citas tr:last');         
                    
            response.map((citas)=>{
                //console.log(citas);
                var tr = $('<tr/>'); 
                var td = //"<td>"+citas.id+"</td>"+
                            "<td>"+citas.asunto+"</td>"+
                            "<td>"+(citas.estatus == 0 ? 'Pendiente' : 'Finalizado')+"</td>"+
                            "<td>"+citas.fecha+"</td>"+
                            "<td>"+citas.hora+"</td>"+                            
                            "<td>"+citas.nombre+"</td>"+                            
                            '<td><button type="button" class="btn btn-primary" onclick="editarCita('+citas.id+')" >Editar</button></td>'+
                            '<td><button type="button" class="btn btn-danger"  onclick="showModalCitas('+citas.id+')">Eliminar</button></td>';
                tr.append(td);
                tabla.after(tr);
            });
        },
        error:(xhr, status) => {
            alert("Algo salio mal");
        },
    });

}

function iniciarFormCitas()
{
    $('.alert-danger').css('display','none');
    $('.alert-success').css('display','none');
    
    $('#editarCita').hide();
    $('#guardarCita').show();
    $('.idDisable').hide();

    if(!$("#check").is(':checked')){
        console.log("no checked");
        $('#searchInicio').attr('disabled','disabled');
        $('#searchFinals').attr('disabled','disabled');
    }
    
    //$('#searchFinals').removeAttr('disabled');
    
    limpiarFormulario();
    optionContactos(0);

}

function optionContactos(seleccionar)
{
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: URL+ 'citas/getContactos',
        success: (response) =>{
            console.log(response);
            var dropDownList = document.getElementById('inputContactos');

            for (var i = 0; i< response.length ; ++i) {
                $('<option />', {
                    'value': response[i].id,
                    'text':  response[i].nombre + " "+response[i].apellidos ,
                    'selected': (response[i].id==seleccionar ? true: false)
                }).appendTo(dropDownList);
            }  
        },
        error:(xhr, status) => {
            alert("Algo salio mal");
        },
    });
}






$(document).ready(function(){

    cargarContactos();
    iniciarFormulario();
    getCitas();
    iniciarFormCitas();

    

    $('#aceptarEliminar' ).click(function() {

       if(idContactos_eliminar)
       {
            console.log("Id contacbtos :" +idContactos_eliminar);
            eliminar(idContactos_eliminar);

       }
       if(idCitas_eliminar)
       {           
            console.log("Id citas :" +idCitas_eliminar);
            eliminarCita(idCitas_eliminar);
       }

       $('#aceptarCancel').modal('hide');

       idContactos_eliminar = 0;
       idCitas_eliminar = 0;
       
    });

    
    $('#check' ).on( 'click', function() {
        if( $(this).is(':checked') ){
            $('#searchFinals').removeAttr('disabled');
            $('#searchInicio').removeAttr('disabled'); 
            filtroFecha();
           
        } 
        else {
            $('#searchInicio').attr('disabled','disabled');
            $('#searchFinals').attr('disabled','disabled');
            getCitas(); 
        }
    });


    $("#inputEstado").change(function(){
        var dropDownList = $("#inputEstado option:selected");
        var id = dropDownList.val();

        optionMunicipios(id,"Aguascalientes");

        //console.log(dropDownList.text());
        //console.log(dropDownList.val());
    });


    $("#editarCita").click(()=>{

        var id = $("#citaID").val();
        var asunto = $("#citaAsunto").val();
        var fecha = $("#citaFecha").val();
        var hora = $("#citaHora").val();
        var id_usuario = $('#inputContactos option:selected').val();

        /*console.log(id);
        console.log(fecha);
        console.log(hora);
        console.log(id_usuario);
        return;*/

        if(validarCita(id,asunto,fecha,hora,id_usuario))
        {
            editarCita(id,asunto,fecha,hora,id_usuario);
        }
    });

    function editarCita(id,asunto,fecha,hora,id_usuario)
    {

        $.ajax({
            type: 'POST',
            //dataType: 'json',
            url: URL+ 'citas/update',
            data:{id:id,asunto: asunto, fecha: fecha, hora:hora, id_usuario:id_usuario},
            success: (response) =>{
                console.log(response);

                if(response)
                {
                    if(!$("#check").is(':checked')){
                        getCitas();
                    }
                    else{
                        filtroFecha();
                    }       

                    iniciarFormCitas(); 

                    mostrarSucces("Cita Editada");

                    setTimeout(() => {
                        $('.alert-success').css('display','none');
                    }, 2500);
                }
                
            },
            error:(xhr, status) => {
                alert("Algo salio mal");
            },
        }); 
    } 
    
    $("#editarContacto").click(()=>{

        var id = $("#inputID").val();
        var nombre = $("#inputNombre").val();
        var apellidos = $("#inputApellidos").val();
        var email = $("#inputEmail").val();
        var telefono = $("#inputTelefono").val();
        var estado = $('#inputEstado option:selected').text();
        var municipio = $('#inputMunicipio option:selected').text();

        if(validar(id,nombre,apellidos,email,telefono,estado,municipio))
        {
            editarContacto(id,nombre,apellidos,email,telefono,estado,municipio);
        }
    });

    function editarContacto(id,nombre,apellidos,email,telefono,estado,municipio)
    {
        $.ajax({
            type: 'POST',
            //dataType: 'json',
            url: URL+ 'contactos/update?id='+id,
            data:{nombre: nombre, apellidos: apellidos, email:email, telefono:telefono, estado:estado, municipio:municipio},
            success: (response) =>{
                console.log(response);
                cargarContactos();         
                iniciarFormulario();    
                
                mostrarSucces("Contacto editado");

                setTimeout(() => {
                    $('.alert-success').css('display','none');
                }, 2500);
            },
            error:(xhr, status) => {
                alert("NO Se puedo editar el contacto");
                //console.log(response);
            },
        }); 
    } 


    $("#guardarContacto").click(()=>{

        var nombre = $("#inputNombre").val();
        var apellidos = $("#inputApellidos").val();
        var email = $("#inputEmail").val();
        var telefono = $("#inputTelefono").val();
        var estado = $('#inputEstado option:selected').text();
        var municipio = $('#inputMunicipio option:selected').text();

        if(validar(0,nombre,apellidos,email,telefono,estado,municipio))
        {
            guardarContactos(nombre,apellidos,email,telefono,estado,municipio);
        }
    });

    $("#guardarCita").click(()=>{

        var asunto = $("#citaAsunto").val();
        var fecha = $("#citaFecha").val();
        var hora = $("#citaHora").val() + ":00";
        var id_usuario = $('#inputContactos option:selected').val();

        /*console.log(fecha);
        console.log(hora);
        console.log(id_usaurio);
        return;*/

        if(validarCita(0,asunto,fecha,hora,id_usuario))
        {
            guardarCita(asunto,fecha,hora,id_usuario);
        }
    });

    function guardarCita(asunto,fecha,hora,id_usuario)
    {
        $.ajax({
            type: 'POST',
            //dataType: 'json',
            url: URL+ 'citas/crear',
            data:{asunto: asunto, fecha: fecha, hora:hora, id_usuario:id_usuario},
            success: (response) =>{
                console.log(response);

                if(!$("#check").is(':checked')){
                    getCitas();
                }
                else{
                    filtroFecha();
                }

                iniciarFormCitas(); 

                mostrarSucces("Cita Guardada");

                setTimeout(() => {
                    $('.alert-success').css('display','none');
                }, 2500);
            },
            error:(xhr, status) => {
                alert("Algo salio mal");
            },
        }); 
    }    


    function guardarContactos(nombre,apellidos,email,telefono,estado,municipio)
    {
        $.ajax({
            type: 'POST',
            //dataType: 'json',
            url: URL+ 'contactos/crear',
            data:{nombre: nombre, apellidos: apellidos, email:email, telefono:telefono, estado:estado, municipio:municipio},
            success: (response) =>{
                //console.log(response);
                cargarContactos();         
                iniciarFormulario(); 

                mostrarSucces("Contacto Guardado");

                setTimeout(() => {
                    $('.alert-success').css('display','none');
                }, 2500);
            },
            error:(xhr, status) => {
                alert("Algo salio mal");
            },
        }); 
    }    

    function validarCita(id,asunto,fecha,hora,id_usuario)
    {
        if(!asunto)
        {
            mostrarError("Escriba el Asunto");
            return false; 
        }
        if(!fecha)
        {
            mostrarError("Escoja una fecha");
            return false; 
        }
        if(!hora)
        {
            mostrarError("Escoja la hora");
            return false; 
        }
        if(!id_usuario)
        {
            mostrarError("Escoja a un contacto");
            return false; 
        }
        
        $('.alert').css('display','none');
        return true;
    }

    function validar(id,nombre,apellidos,email,telefono,estado,municipio)
    {
        if(!nombre)
        {
            mostrarError("Escriba un nombre porfavor");
            return false; 
        }
        if(!apellidos)
        {
            mostrarError("Escriba sus apellidos");
            return false; 
        }
        if(!email)
        {
            mostrarError("Escriba un email");
            return false; 
        }
        if(!telefono)
        {
            mostrarError("Escriba un telefono");
            return false; 
        }
        if(!municipio)
        {
            mostrarError("Elija un municipio");
            return false; 
        }
        if(!estado)
        {
            mostrarError("Elija un estado");
            return false; 
        }
        
        $('.alert').css('display','none');
        return true;
    }
});



