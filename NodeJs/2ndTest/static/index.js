$(document).ready(function() {
    let wrapperCurrencysCryptoSelect = $("#cmbBoxSelectCryptoCurrencys");
    let wrapperCurrencysFiatSelect = $("#cmbBoxSelectFiatCurrencys");

    let CurrencysCrypto;
    let CurrencysFiat;

    $.ajax({
        type: "GET",
        url: '/api/richiestaCryptoCurrency',
        //url: '/api/richiestaCryptoCurrency?currency=USD',
        dataType: "json",
        success: function(jsonCurrency){
            CurrencysCrypto = jsonCurrency
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
            CurrencysFiat = jsonCurrency;
            // è necessario riempire qua il wrapper perchè è asincrona?
            caricaWrapperCurrencySelect(jsonCurrency, wrapperCurrencysFiatSelect);
        },
        error: function(msg){
            console.log(msg) 
        }
    })

    
    

    function caricaWrapperCurrencySelect(jsonCurrency, wrapper){
        for (const key in jsonCurrency) {
            if (Object.hasOwnProperty.call(jsonCurrency, key)) {
                const element = jsonCurrency[key];
                $("<option>", {
                    'appendTo': wrapper,
                    'html': element.Name,
                    'value': element.Name
                })
            }
        }
    }
	
    // EVENT FUNCTION
    function setPlaceHolderCmbCrypto(){
        $("#inputCrypto").prop("placeholder", $(this).prop("value"));
    }
    function setPlaceHolderCmbFiat(){
        $("#inputFiat").prop("placeholder", $(this).prop("value"))
    }
    function convertiCrypto(){
        let cryptoLabel = $("#inputCrypto");
        let fiatLabel = $("#inputFiat");
        let cryptoSelected = $("#cmbBoxSelectCryptoCurrencys").prop("value");
        let convertedValue;

        for (const key in CurrencysCrypto) {
            if (Object.hasOwnProperty.call(CurrencysCrypto, key)) {
                const element = CurrencysCrypto[key];
                if(element.Name == cryptoSelected)
                {
                    cryptoSelected = key;
                    break ;
                }
            }
        }
        
        convertedValue = cryptoLabel.prop("value") * CurrencysCrypto[cryptoSelected].price;

        fiatLabel.prop("value",convertedValue)
    }

    // EVENT HANDLER    
    $("#cmbBoxSelectCryptoCurrencys").on("change",setPlaceHolderCmbCrypto && convertiCrypto)
    $("#cmbBoxSelectFiatCurrencys").on("change",setPlaceHolderCmbFiat)
    $("#inputCrypto").on("input", convertiCrypto);

});