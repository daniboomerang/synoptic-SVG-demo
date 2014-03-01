APP = {};

APP.REFRESH_TIME = 1000;

APP.initialize = function(){
    $('#fetch-satelite-info-btn').on('click', function(){
        setInterval(APP.fetchSateliteData, APP.REFRESH_TIME);
    });
};

APP.fetchSateliteData = function(){
    DOMAIN.datosSatelite(function(data){
        APP.refreshColorClass();
        $('#grados-container').html(data.grados + "grados");
        $('#color-container').addClass(data.color);
    });
};

APP.refreshColorClass = function(){
    $('#color-container').removeClass("yellow");
    $('#color-container').removeClass("red");
    $('#color-container').removeClass("green");
};

$(function() {
  APP.initialize();
});
