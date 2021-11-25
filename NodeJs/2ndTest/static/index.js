$(document).ready(function() {
    let wrapperCurrencysCryptoSelect = $("#cardSelectCryptoCurrencys");
    let wrapperCurrencysFiatSelect = $("#cardSelectFiatCurrencys");

    $.ajax({
        type: "GET",
        url: '/api/richiestaCryptoCurrency',
        dataType: "json",
        success: function(jsonCurrency){
            // è necessario riempire qua il wrapper perchè è asincrona?
            caricaWrapperCurrencySelect(jsonCurrency, wrapperCurrencysCryptoSelect);
        },
        error: function(msg){
            console.log(msg) 
        }
    })

    $.ajax({
        type: "GET",
        url: '/api/richiestaFiatCurrency',
        dataType: "json",
        success: function(jsonCurrency){
            // è necessario riempire qua il wrapper perchè è asincrona?
            caricaWrapperCurrencySelect(jsonCurrency, wrapperCurrencysFiatSelect);
        },
        error: function(msg){
            console.log(msg) 
        }
    })


    $("#btnGet").on("click", function() {
        var request = inviaRichiesta("GET", "/api/richiestaGet", { "nome": "pippo", "eta": 16  });
        request.done(function(data) {
            console.log(data);
        });
        request.fail(errore)

        $.ajax({
            url: '/api/requestJson',
            dataType: 'json',
            success: function (data) {
                console.log(data);
            }
        });

    });

    $("#btnPost").on("click", function() {
        var request = inviaRichiesta("POST", "/api/richiestaPost", { "nome": "pippo", "eta": 16 });
        request.done(function(data) {
            console.log(data);
        });
        request.fail(errore)
    });

    function caricaWrapperCurrencySelect(jsonCurrency, wrapper){
        for (const key in jsonCurrency) {
            if (Object.hasOwnProperty.call(jsonCurrency, key)) {
                const element = jsonCurrency[key];
                $("<option>", {
                    'appendTo': wrapper,
                    'html': element.Name
                })
            }
        }
    }
	
});