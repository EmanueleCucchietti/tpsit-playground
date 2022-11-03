"use strict";

function inviaRichiesta(method, url, parameters={}) {
	let contentType;
	if(method.toUpperCase()=="GET")
		contentType="application/x-www-form-urlencoded;charset=utf-8";
	else{
		contentType = "application/json; charset=utf-8"
        parameters = JSON.stringify(parameters);
	}
    return $.ajax({
        "url": url,
		"data": parameters,
		"type": method,   
		"contentType": contentType,  //serve esclusivamente a $ajax per il metodo post
        "dataType": "json",   // default      
        "timeout": 5000,      // default
        "headers": {"content-type": contentType} //intestazione standard che però non è richiesta, noi dal lato server la usiamo per gestire il metodo post (con una IF)
        //serve quindi per capire se i parametri attuali sono in formato JSON oppure in formato urlencoded
    });	
}

function errore(jqXHR, text_status, string_error) {
    if (jqXHR.status == 0)
        alert("Connection Refused or Server timeout");
	else if (jqXHR.status == 200)
        alert("Formato dei dati non corretto : " + jqXHR.responseText);
    else
        alert("Server Error: " + jqXHR.status + " - " + jqXHR.responseText);
}

function generaNumero(a, b){
	return Math.floor((b - a + 1) * Math.random()) + a;
}