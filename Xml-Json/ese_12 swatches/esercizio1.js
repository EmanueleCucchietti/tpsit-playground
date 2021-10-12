"use strict";

window.onload=function () {
    document.getElementsByTagName("input")[0].addEventListener("click",function(){
       localStorage.setItem("SwatchesJson",JSON.stringify(swatches));
       alert("Dati salvati correttamente");
    });
}