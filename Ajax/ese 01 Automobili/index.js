"option strict"

const URL = "http://localhost:3000"

$(document).ready(function () {
    let _lstMarche = $("#lstMarche");
    let _lstModelli = $("#lstModelli");
	let _table= $("table")
	let _dettagli=$(".row").eq(2).children("div").eq(1)
  
    _dettagli.hide()
       
    let request = inviaRichiesta("GET", URL+"/marche");
    console.log(request)
    request.done(function(data){
        console.log(data)
        for (const item of data) {
            $("<option>",{
                'html': item.nome,
                'val': item.id,
                
                'appendTo': _lstMarche
            })
        }
    })
    request.fail(errore);
		

    _lstMarche.on("change",function(){
        caricaModelli(this)
    });

    function caricaModelli(sender){
        let id = _lstMarche.val();

        let request = inviaRichiesta("GET", URL+"/modelli?" + {codMarca:id});
        request.done(function(data){
            _lstModelli.html("");
            for (const item of data) {
                $("<option>",{
                    'html': item.nome + " " + item.alimentazione,
                    'val': item.id,
                    "prop": {"modello": item},
                    
                    'appendTo': _lstModelli
                })
            }
        })
    }   

    _lstModelli.on("change", function(){
        caricaAutomobili(this);
    })

    function caricaAutomobili(sender){
        let id = _lstModelli.val();
        //let name = _lstModelli.children("option:selected").html();
        let name = _lstModelli.children("option:selected").prop(nome)
        let alimentazione = _lstModelli.children("option:selected").prop("modello").alimentazione;
        let headers = ["nome", "alimentazione","colore","anno","img","dettagli","elimina"];
        let request = inviaRichiesta("GET", URL+"/automobili?"+{codModello: _lstModelli.val()})
        request.fail(errore)
        request.done(function(data){
            /*let thead = $("<thead>",{
                'append':[
                    $("<tr>",{'appendTo': this})
                ]

                'appendTo': _table
            })*/
            let thead = $("<thead>").appendTo(_table);
            let tr = $("<tr>").appendTo(thead);
            for (const [i,head] of headers.entries()) {
                $("<th>").appendTo(tr).html(headers[i])
            }
            for (const item of data) {
                let tr=$("<tr>");

            }
        })
    }


});



