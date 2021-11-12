$(document).ready(function() {

    $("#btnGet").on("click", function() {
        var request = inviaRichiesta("GET", "/api/richiestaGet", { "nome": "pippo", "eta": 16  });
        request.done(function(data) {
            console.log(data);
        });
        request.fail(errore)
    });

    $("#btnPost").on("click", function() {
        var request = inviaRichiesta("POST", "/api/richiestaPost", { "nome": "pippo", "eta": 16 });
        request.done(function(data) {
            console.log(data);
        });
        request.fail(errore)
    });

	
});