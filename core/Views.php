<?php
    class View
    {
        function __construct($view, $data = null)
        {
            $fileView = './views/'.ucwords($view).'View.php';
            $fileHeader = './views/layout/'.HEADER.'.php';
            $fileFooter = './views/layout/'.FOOTER.'.php';

            if(file_exists($fileView))
            {
                file_exists($fileHeader) ? require_once $fileHeader : "";


                foreach($data as $id_assoc => $valor)
                {
                    ${$id_assoc} = $valor;
                }
                require_once $fileView;

                file_exists($fileFooter) ? require_once $fileFooter : "";
            }
            else
            {
                die("Sitio no encontrado");
            }
        }

    } 
?>