"use strict"

const RIGHE = 6;
const COLONNE = 7;

const ROSSO = "rgb(255,0,0)";
const GIALLO = "rgb(255,255,0)";
const GRIGIO = "rgb(176, 176, 176)";

let turno = GIALLO;

$(document).ready(function(){
    let wrapper = $("#wrapper");
    let header = $("#header");

    creaIntestazione();
    for(let i=0;i<RIGHE;i++){
        for(let j=0;j<COLONNE;j++)
        {
            let div = creaBox(wrapper);
            div.prop("id",'btn-'+i+'-'+j);
        }
    }

    

    /* PAGE */
    function creaIntestazione(){
        for(let i=0;i<COLONNE;i++){
            let div = creaBox(header);
            div.on("mouseenter",function(){
                $(this).css("background-color", turno);
            })
            div.on("mouseleave",function(){
                $(this).css("background-color", GRIGIO);
            })
            div.on("click",function discesa(){
                let colonna = header.children().index($(this));
                let j=0;console.log(wrapper.children('#btn-'+j+'-'+colonna).css("background-color"))
                while(wrapper.children('#btn-'+j+'-'+colonna).css("background-color")==GRIGIO && j<RIGHE){
                    
                    j++;
                }
                j--;
                if(j==-1)
                    alert("Mossa non valida");
                else    
                    {
                        let color = turno
                        if(turno == GIALLO)
                            turno = ROSSO
                        else
                            turno = GIALLO
                        header.children().off("click");
                        let newPedina = $("<div>").addClass("pedina").appendTo(wrapper).css({'position': 'absolute','background-color': turno, 'top': -60, 'left' : colonna *60+5})
                        .animate({'top': j*60+5},200*(j+1),e=>{
                            $('#btn-'+j+'-'+colonna).css("background-color",color);
                            header.children().on("click",discesa);
                            $(this).css("background-color", color);
                        });
                    }
            })
        }
    }



    /* GENERIC FUNCTIONS */
    function creaBox(objAppend){
        return $("<div>").addClass("pedina").appendTo(objAppend).css('background-color',GRIGIO);
    }
});