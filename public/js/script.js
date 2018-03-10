$(document).ready(function(){
    //var URL = "http://localhost/agenda/";
    //$("#hah").text(estados[0]["estado"]);

    $("#nuevoContact").click(function(){  
        $('.alert').css('display','none');

        limpiarFormulario();
        optionEstados(0);
        optionMunicipios(1,0);   
        //$('.alert').alert();    
    });

    $("#inputEstado").change(function(){
        var dropDownList = $("#inputEstado option:selected");
        var id = dropDownList.val();

        optionMunicipios(id,0);

        //console.log(dropDownList.text());
        //console.log(dropDownList.val());
    });

    $("#guardarContacto").click(()=>{
        $(".table-responsiv").clear();
        $('#modalContacto').modal('hide');
        return;

        var nombre = $("#inputNombre").val();
        var apellidos = $("#inputApellidos").val();
        var email = $("#inputEmail").val();
        var telefono = $("#inputTelefono").val();
        var estado = $('#inputEstado option:selected').text();
        var municipio = $('#inputMunicipio option:selected').text();

        if(validar(nombre,apellidos,email,telefono,estado,municipio))
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
                $('#modalContacto').modal('hide');

            },
            error:(xhr, status) => {
                alert("Algo salio mal");
            },
        }); 
    }
    

    function validar(nombre,apellidos,email,telefono,estado,municipio)
    {
        if(!nombre)
        {
            $('.alert').html("Escriba un nombre porfavor");
            $('.alert').css('display','');
            return false; 
        }
        if(!apellidos)
        {
            $('.alert').html("Escriba sus apellidos");
            $('.alert').css('display','');
            return false; 
        }
        if(!email)
        {
            $('.alert').html("Escriba un email");
            $('.alert').css('display','');
            return false; 
        }
        if(!telefono)
        {
            $('.alert').html("Escriba un telefono");
            $('.alert').css('display','');
            return false; 
        }
        if(!municipio)
        {
            $('.alert').html("Elija un municipio");
            $('.alert').css('display','');
            return false; 
        }
        if(!estado)
        {
            $('.alert').html("Elija un estado");
            $('.alert').css('display','');
            return false; 
        }
        
        $('.alert').css('display','none');
        return true;
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
                        'value': response[i ].id,
                        'text':  response[i ].municipio,
                        'selected': (i == seleccionar ? true : false)
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
                        'value': response[i ].id,
                        'text':  response[i ].estado,
                        'selected': (i == seleccionar ? true : false)
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
        $("#inputNombre").val('');
        $('#inputEstado').empty();
    }
});
