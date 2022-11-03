$(document).ready(function() {

    $("#btnInvia1").on("click", function() {
        let request = inviaRichiesta("get", "/api/service1", {"nome":"pippo"})
        request.fail(errore);
        request.done(function(data) {
            alert(JSON.stringify(data));
        });
    });

    $("#btnInvia2").on("click", function() {
        let request = inviaRichiesta("post", "/api/service2", {"nome":"pluto"})
        request.fail(errore);
        request.done(function(data) {
            alert(JSON.stringify(data));
        });
    });
	
});