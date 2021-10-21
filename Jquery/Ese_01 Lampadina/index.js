"use strict"

$(function()
{
    let lampadina = $("#lampadina");
    let btnSpegni = $("#btnSpegni");
    let btnAccendi = $("#btnAccendi");
    let descrizione = $("#descrizione");
    let contenuto = $("#contenuto");
    
    lampadina.hide();
    btnSpegni.hide();
    lampadina.addClass("lampadina")
    btnAccendi.on("click",function()
    {
        btnAccendi.hide(); 
        lampadina.fadeIn(2000,function(){
            btnSpegni.show();
        });
        lampadina.addClass("accesa");
    });
    btnSpegni.on("click",function(){
        btnSpegni.hide();
        lampadina.fadeOut(2000,function(){
            btnAccendi.show();
            lampadina.removeClass("accesa");
        })
    });
	
    descrizione.addClass("pulsanteDescrizione");
    contenuto.hide();

    descrizione.on("mouseover",function Visualizza(){
        descrizione.off("mouseover");
        contenuto.show(500,function(){
            descrizione.on("mouseover",Visualizza);
        });
    })
    descrizione.on("mouseout",function nonVisualizza(){
        descrizione.off("mouseout");
        contenuto.hide(500,function(){
            descrizione.on("mouseout",nonVisualizza);
        });
    })
    
    let stileContenuto = {
        "width" : "600px",
        "padding" : "5px",
        "border" : "1px solid black",
        "margin-left" : "140px",
        "margin-top" : "10px",
        "backgroundColor" : "#FFD"
    };
    contenuto.css(stileContenuto);
});

$(function(){
	/* Function called before dom creation */
});