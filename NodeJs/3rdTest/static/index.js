$(document).ready(function() {
    let wrapperCurrencysCryptoSelect = $("#cmbBoxSelectCryptoCurrencys");
    let wrapperCurrencysFiatSelect = $("#cmbBoxSelectFiatCurrencys");

    let Currencys;

    $.ajax({
        type: "GET",
        url: '/api/richiestaCryptoCurrency',
        //url: '/api/richiestaCryptoCurrency?currency=USD',
        dataType: "json",
        success: function(jsonCurrency){
            CurrencysCrypto = jsonCurrency;
            // è necessario riempire qua il wrapper perchè è asincrona?
            caricaWrapperCryptoSelect(CurrencysCrypto, wrapperCurrencysCryptoSelect);
            caricaWrapperFiatSelect(CurrencysCrypto, wrapperCurrencysFiatSelect);
        },
        error: function(msg){
            console.log(msg) 
        }
    })

    function caricaWrapperCryptoSelect(jsonCurrency, wrapper){
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
    function caricaWrapperFiatSelect(jsonCurrency, wrapper){
        let firstCryptoProperty;
        for (const keyBtc in CurrencysCrypto) {
            if (Object.hasOwnProperty.call(CurrencysCrypto, keyBtc)) {
                firstCryptoProperty = keyBtc;
                break ;
            }
        }
        console.log(firstCryptoProperty)
        for (const key in CurrencysCrypto[firstCryptoProperty].prices) {
            if (Object.hasOwnProperty.call(CurrencysCrypto[firstCryptoProperty].prices, key)) {
                $("<option>", {
                    'appendTo': wrapper,
                    'html': key,
                    'value': key
                })
            }
        }

        for (const key in jsonCurrency) {
            if (Object.hasOwnProperty.call(jsonCurrency, key)) {
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
        let fiatSelected = $("#cmbBoxSelectFiatCurrencys").prop("value");
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

        convertedValue = cryptoLabel.prop("value") * CurrencysCrypto[cryptoSelected].prices[fiatSelected];
        if(!isNaN(convertedValue))
            fiatLabel.prop("value",convertedValue)
        else
            fiatLabel.prop("value","Selezionare entrambi i campi e definire valori corretti")
    }

    // EVENT HANDLER    
    $("#cmbBoxSelectCryptoCurrencys").on("change",setPlaceHolderCmbCrypto && convertiCrypto)
    $("#cmbBoxSelectFiatCurrencys").on("change",setPlaceHolderCmbFiat && convertiCrypto)
    $("#inputCrypto").on("input", convertiCrypto);

});