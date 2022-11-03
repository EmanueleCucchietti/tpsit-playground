"use strict"

$(document).ready(function() {
    let wrapper = $("#wrapper");
    let newsWrapper = $("#news");

    /************FUNCTIONS AND REQUEST *************/
    let request = inviaRichiesta("POST", "/api/elenco");
    request.fail(errore);
    request.done((data) => {
        console.log(data["ris"]);
        let id = 0;
        if(data["ris"] !== undefined){
            for (let news of data.ris) {
                $("<span>")
                .appendTo(wrapper)
                .addClass("titolo")
                .text(news["titolo"] + " ");
                $("<a>")
                .appendTo(wrapper)
                .prop({
                    "href" : "#",
                    "id" : id,
                    "file" : news["file"]
                })
                .text("Leggi ")
                .on("click", leggiNews);
                $("<span>")
                .appendTo(wrapper)
                .addClass("nVis")
                .text("[visualizzato "+ news["visualizzazioni"] + " volte] ")
                $("<br>").appendTo(wrapper);                
                id++;
            }
        }
    });


    function leggiNews() {
        let nameFile = $(this).prop("file");
        let idFile = $(this).prop("id");
        let request = inviaRichiesta("POST", "/api/dettagli", {idFile, nameFile});
        request.fail(errore);
        request.done((data) => {
            console.log(data);
            if(data["ris"] === "Errore")
                throw new Error("Errore nella lettura del file");
            else{
                wrapper.children(".nVis").eq(idFile).text("[visualizzato "+ data["nVis"] + " volte]" )
                newsWrapper.html(data["file"]);
            }    
        });
    }
});