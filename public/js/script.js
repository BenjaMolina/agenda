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

            optionEstados(response.estado);

            setTimeout(() => {
                var estadoID = $('#inputEstado option:selected').val();
                optionMunicipios(estadoID,response.municipio);
            }, 200);
            
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

function eliminar(id_contacto)
{
    var id = id_contacto;

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
    $(".table tr:not(:first-child)").remove();

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
            alert("Algo salio mal");
        },
    });
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

function optionMunicipios(id,seleccionar)
{
    var municipio = $('#inputMunicipio'); 
    municipio.empty();
    
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: URL+ 'estados/getMunicipios?id='+id,
        success: (response) =>{
            //alert("bien");
            console.log(response);

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

function optionEstados(seleccionar)
{
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: URL+ 'Estados/index',
        success: (response) =>{
            //alert("bien");
            console.log(response);
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


function limpiarFormulario()
{
    $("#inputNombre").val('');
    $("#inputApellidos").val('');
    $("#inputEmail").val('');
    $("#inputTelefono").val('');
    $("#inputMunicipio").empty();
    $('#inputEstado').empty();
}

$(document).ready(function(){

    cargarContactos();
    iniciarFormulario();

    $("#inputEstado").change(function(){
        var dropDownList = $("#inputEstado option:selected");
        var id = dropDownList.val();

        optionMunicipios(id,"Aguascalientes");

        //console.log(dropDownList.text());
        //console.log(dropDownList.val());
    });


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
                //cargarContactos();         
                //iniciarFormulario();     
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

    function guardarContactos(nombre,apellidos,email,telefono,estado,municipio)
    {
        $.ajax({
            type: 'POST',
            //dataType: 'json',
            url: URL+ 'contactos/crear',
            data:{nombre: nombre, apellidos: apellidos, email:email, telefono:telefono, estado:estado, municipio:municipio},
            success: (response) =>{
                console.log(response);
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