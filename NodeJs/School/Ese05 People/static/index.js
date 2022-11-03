$(document).ready(function() {
    let _lstNazioni = $("#lstNazioni");
    let _tabStudenti = $("#tabStudenti");
    let _divDettagli = $("#divDettagli");

    let _divDettagliButtons = $("#divDettagli .card-body a");
    let posizioneCorrente = 0;

    _divDettagli.hide();

    let country; //variabile globale che si aggiorna ogni volta che cambio selezione sul listbox

    let people;

    let request = inviaRichiesta("GET", "/api/nations");
    request.fail(errore);
    request.done((nazioni) => {
        console.log(nazioni);
        if(nazioni.ris !== undefined) {    
            for (const nazione of nazioni.ris) {
                $("<a>")
                .appendTo(_lstNazioni)
                .text(nazione)
                .prop("href", "#")
                .addClass("dropdown-item")
                .on("click",function() {
                    //usiamo function perche' this deve puntare all'elemento cliccato e non si puo' usare arrow function
                    country = $(this).text();
                    caricaTabella();
                });
            }
        }
    });

    function visualizzaDettagli(person) {
        let request = inviaRichiesta("POST", "/api/details", {person})
        request.fail(errore);
        request.done((details) => {
            console.log(details);
            _divDettagli.show();
            _divDettagli.children("img").prop("src",details.picture["large"]);
            _divDettagli.find("h5").text(details.name.title + " " +  details.name.first + " " + details.name.last)
            let str = `
                <b>Gender: </b> ${details.gender} <br>
                <b>Address: </b> ${JSON.stringify(details.location)} <br>
                <b>Email: </b> ${details.email} <br>
                <b>Date of Birth: </b> ${JSON.stringify(details.dob)}    
            `;
            _divDettagli.find("p").html(str);
        }) 
    }

    function eliminaPersona(){
        Swal.fire({
            title: 'Vuoi cancellare la persona selezionata?',
            showCancelButton: true,
            confirmButtonText: 'Elimina',
            denyButtonText: `Non elimina`,
        }).then((result) => {
            if (result.isConfirmed) {
                let person = $(this).prev().children("button").prop("person");
                let request = inviaRichiesta("POST", "/api/deletePerson", {person});
                request.fail(errore);
                request.done((data) => {
                    console.log(data);
                    if(data["ris"] == "ok"){
                        caricaTabella();  
                        Swal.fire('Eliminata!', '', 'success');
                    } 
                })
            } else{
                Swal.fire("Non eliminata", "", "success");
            }
        })
        
    }

    let caricaTabella = () => {
        let i = 0;
        let request = inviaRichiesta("POST", "/api/persone", {country});
        request.fail(errore);
        request.done((persone) => {
            _tabStudenti.empty();
            _divDettagli.hide();
            people = persone;
            for (let person of persone) {
                let tr = $("<tr>").appendTo(_tabStudenti);
                for (const key in person) {
                    $("<td>").appendTo(tr).text(person[key]);    
                }
                let tdDettagli = $("<td>").appendTo(tr);
                $("<button>")
                .appendTo(tdDettagli)
                .text("Dettagli")
                .prop({
                    "person" : person,
                    "id" : i
                });
                tdDettagli.on("click", function(){
                    //bisogna usare il name di person (come chiave composta di tre campi in JSON)
                    let person = $(this).children("button").prop("person");
                    posizioneCorrente = $(this).children("button").prop("id");
                    visualizzaDettagli(person);
                }); 
                
                let tdElimina = $("<td>").appendTo(tr);
                $("<button>").appendTo(tdElimina).text("Elimina");
                tdElimina.on("click", eliminaPersona);
                i++;
            }
        });
    }

    /************* GESTIONE DEI PULSANTI ******************/
    _divDettagliButtons.eq(0).on("click", () => {
        //first button, that select first person in the list
        posizioneCorrente = 0;
        visualizzaDettagli(people[posizioneCorrente]);
    });

    _divDettagliButtons.eq(1).on("click", () =>{
        //second button, that select previous person in the list
        if(posizioneCorrente > 0)
            posizioneCorrente--;
        else posizioneCorrente = 0;
        visualizzaDettagli(people[posizioneCorrente]);
    });

    _divDettagliButtons.eq(2).on("click", () =>{
        //third button, that select next person in the list
        console.log("next");
        if(posizioneCorrente < people.length - 1)
            posizioneCorrente++;
        else posizioneCorrente = people.length - 1;
        visualizzaDettagli(people[posizioneCorrente]);
    });

    _divDettagliButtons.eq(3).on("click", () => {
        //fourth button, that select last person in the list
        posizioneCorrente = people.length - 1;
        visualizzaDettagli(people[posizioneCorrente]);
    });
})