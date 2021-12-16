"option strict"

$(document).ready(function () {
    let _lstMarche = $("#lstMarche");
    let _lstModelli = $("#lstModelli");
	let _table= $("table");
    let _dettagli=$(".row").eq(2).children("div").eq(1); //ricordo eq parte da 0 e il selettore nth-of-type inizia da 1
    _dettagli.hide();


    $("#btnAggiorna").on("click",aggiorna);

    //andiamo a inviare una richiesta ajax
    let request = inviaRichiesta("GET","/marche"); //chiamata get (alle marche) siccome ho bisogno dei dati generali senza parametri.
    //si deve sempre specificare una delle chiavi senno per tirare giù tutto bisogna fare tutte le richieste ajax
    request.catch(errore); //in caso di errore (fail)
    request.then(function(data){ //in caso di successo (done), si richiama function a cui vanno ad iniettrare i dati
        //console.log(data);          
        //data cioè marche è un vettore enumerativo quindi andiamo a scorrerlo con un forof
        for (let item of data) {
            $("<option>").appendTo(_lstMarche)
            .html(item.nome)
            .val(item.id); //andiamo a salvarci id che è la chiave esterna
        }
        _lstMarche.prop("selectedIndex",-1);
    });
    
    _lstMarche.on("change",function(){
        let idSelect = _lstMarche.val(); // il value del valore selezionato
        let request=inviaRichiesta("GET","/modelli",{"codMarca":idSelect}); //passiamo come parammetro solo i modelli che hanno marca il valore dlella marca selezionato
        request.catch(errore);
        request.then(function(data){
            //console.log(data);
            _lstModelli.empty(); //come html("");
            for (let item of data) {
                $("<option>").appendTo(_lstModelli)
                .html(item.nome+ " "+item.alimentazione)
                .val(item.id) //andiamo a salvarci id che è la chiave esterna
                .prop("modello", item); // ci salviamo tutto il json in caso dovesse servirci
            }
        });
        _lstModelli.prop("selectedIndex",-1);
    });

    _lstModelli.on("change",function(){
        let idSelect = _lstModelli.val();
        //let txt = _lstModelli.children("option:selected").html(); //id NON è sequenziale devo per forza usare il selected
        let nome = _lstModelli.children("option:selected").prop("modello").nome;
        let alimentazione =  _lstModelli.children("option:selected").prop("modello").alimentazione;
        let cilindrata =  _lstModelli.children("option:selected").prop("modello").cilindrata;


        let request = inviaRichiesta("GET","/automobili",{"codModello":idSelect});
        request.catch(errore);
        request.then(function(data){
            console.log(data);
            _table.empty();
            /* CREIAMO L'INTESTAZIONE DELLA TABELLA*/
            let thead = $("<thead>").appendTo(_table); //con bootstrap è obbligatorio il thead 
            let tr = $("<tr>").appendTo(thead);
            //inseriamo delle dimensioni
            $("<th>").appendTo(tr).html("nome").css("width","15%");
            $("<th>").appendTo(tr).html("alimentazione").css("width","15%");
            $("<th>").appendTo(tr).html("colore").css("width","15%");
            $("<th>").appendTo(tr).html("anno").css("width","10%");
            $("<th>").appendTo(tr).html("img").css("width","20%");
            $("<th>").appendTo(tr).html("dettagli").css("width","12.5%");
            $("<th>").appendTo(tr).html("elimina").css("width","12.5%");

            let tbody=$("<tbody>").appendTo(_table);
            for (const item of data) { //data --> automobili
                let tr=$("<tr>").appendTo(tbody);
                $("<td>").appendTo(tr).html(nome); //la variabile con il nome
                $("<td>").appendTo(tr).html(alimentazione);
                $("<td>").appendTo(tr).html(item.colore);
                $("<td>").appendTo(tr).html(item.anno);
                let td=$("<td>").appendTo(tr);
                $("<img>").appendTo(td).prop("src","img/"+item.img).addClass("img-fluid"); //oppure max-height che non fa sgranare ("max-height","65px")
                let tdDetails = $("<td>").appendTo(tr);
                $("<button>").appendTo(tdDetails).text("dettagli") //useremmo il value con input type button
                .on("click",dettagli).prop({
                    "id" : item.id,
                    "alimentazione" : alimentazione,
                    "nome":nome,
                    "cilindrata":cilindrata}); //gestiamo qui il click perchè tanto non passa due volte nella stessa procedura
                let tdElimina = $("<td>").appendTo(tr);
                $("<button>").appendTo(tdElimina).text("elimina")
                .on("click",elimina).prop("id",item.id); //creo questa proprietà a parte così evitiamo di mandare un parametro 
            }
        });
    });


/**************************************************FUNCTIONS  ********************************************/
    function dettagli(){
        let _this=this; //ci salviamo il this corrente (senno nella request NON lo vediamo)
        let request=inviaRichiesta("GET","/automobili/"+$(this).prop("id"));
        request.catch(errore);
        request.then(function(data){
            console.log(data);
            _dettagli.show();
            $("#txtId").val(data.id);
            $("#txtNome").val($(_this).prop("nome"));
            $("#txtAlimentazione").val($(_this).prop("alimentazione"));
            $("#txtCilindrata").val($(_this).prop("cilindrata"));
            $("#txtTarga").val(data.targa);
            $("#txtColore").val(data.colore);
            $("#txtAnno").val(data.anno);
            $("#txtKm").val(data.km);
            $("#txtPrezzo").val(data.prezzo);
            $("#imgLarge").prop("src","img/"+data.img).addClass("img-fluid");
        });
    }

    function elimina(){
        let request = inviaRichiesta("DELETE","/automobili/"+$(this).prop("id")); //l'id viene concatenato NON è passato come parametro
        request.catch(errore);
        request.then(function(){
            alert("Automobile cancellata correttamente !!");
            _lstModelli.trigger("change");
        });
    }

    function aggiorna(){
        // la PATCH cambia solo il campo modificato, passandoglilo per parametro
        // la PUT cambia tutto il record
        let prezzo = $("#prezzo").val();
        let km = $("#txtKm").val();


        let request = inviaRichiesta(
            "PATCH",
            "/automobili/"+$("#txtId").val(),
            {
                "prezzo":prezzo, 
                "km":km
            });
        request.catch(errore);
        request.then(function(){
            alert("Auto aggiornata correttamente");
            _dettagli.hide();
        });
    }
});


