$(document).ready(function() {

    $("#btnInvia1").on("click", function() {
        let request = inviaRichiesta("GET", "/api/servizio1", { "nome": "pippo" });
        request.fail(errore);
        request.done(function(data) {
            alert(JSON.stringify(data));
        });
    });

    $("#btnInvia2").on("click", function() {
        let request = inviaRichiesta("GET", "/api/servizio2", { "nome": "pippo" }); //non lo gestiamo cosi andrà in errore e verrà gestito dal fail
        request.fail(errore); 
        request.done(function(data) {
            alert(JSON.stringify(data));
        });
    });
	
});