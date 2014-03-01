DOMAIN = {};

DOMAIN.datosSatelite = function(callback){
    $.ajax( 
        {url: "/services/satelite/dameDatos", 
        type: "POST",
        success: callback
    });
};