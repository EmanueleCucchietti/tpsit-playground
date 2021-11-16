"use strict"
const nBox = 36;
$(document).ready(function(){
    for(let i=0;i<nBox;i++)
        creaBox();

    setInterval(animaBox, 33);

    function creaBox(){
        $("<div>").addClass("box").appendTo($("#wrapper"));
    }
    function animaBox(){
        let rnd = generaNumero(0,35);
        let div = $("#wrapper").children().eq(rnd);
        div.animate({'opacity':0.3},400);
        div.animate({'opacity':0.6},400);
        div.animate({'opacity':0.1},400);
    }


})

function generaNumero(a,b){
    //estremi inlcusi
    return Math.floor((b-a+1)*Math.random())+a;
}