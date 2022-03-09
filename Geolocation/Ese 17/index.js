"use strict";

const URL = "https://maps.googleapis.com/maps/api"

$(document).ready(function () {
	// creazione dinamica del CDN di accesso alle google maps
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = URL + '/js?v=3&key=' + MAP_KEY + '&callback=documentReady';
	document.body.appendChild(script);
})


function documentReady() {
	let geocoder = new google.maps.Geocoder();
	let jsonCitta;
	let _elencocitta = $("#elencoCitta");
	let divMappa = $("#mappa");
	let mappaId = null;
	let request = inviaRichiesta("get", "/citta");
	request.fail(errore)
	request.done(function (data) {

		for (const citta of data) {
			$("<option>").text(citta["nome"]).appendTo(_elencocitta).val(citta["nome"]);
		}
		//console.log(data);
		_elencocitta.prop("selectedIndex", -1);
		_elencocitta.on("change", function () {
			if (mappaId != null)
				divMappa.empty();
			for (const item of data) {
				if (item.nome == _elencocitta.val())
					jsonCitta = item;
			}
			
			geocoder.geocode({
				"address": jsonCitta.geocode
			}, function (result, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					let mapOptions = {
						"center": result[0].geometry.location,
						"zoom": 14
					}
					mappaId = new google.maps.Map(divMappa.get(0), mapOptions);
				}
			})
			//let posizione = new google.maps.LatLng(jsonCitta.lat, jsonCitta.lon);

			let requestRistoranti = inviaRichiesta("get", "/ristoranti", { "citta": _elencocitta.val() });
			requestRistoranti.fail(errore);
			requestRistoranti.done(function (ristoranti) {

				//console.log(ristoranti);
				for (const ristorante of ristoranti) {
					geocoder.geocode({
						"address": ristorante.indirizzo
					}, function (result, status) {
						if (status == google.maps.GeocoderStatus.OK) {
							let position = new google.maps.LatLng(result[0].geometry.location)
							let markeroption = {
								"map": mappaId,
								"position": position,

							}
							console.log(result[0]);
							let marker = new google.maps.Marker(markeroption);
							

							let infoWindowOption = {
								"content": `
									<p>${ristorante.indirizzo}</p>
									<p>${ristorante.desc}</p>
									<button style='float: right'">vedi percorso</button>`,
								"width": 150
							}
							let infoWindow = new google.maps.InfoWindow(infoWindowOption);
							marker.addListener("click", function () {
								//console.log(marcatori);
								//console.log(ristoranti.length % ristorante.id);
								infoWindow.open(mappaId, marker);
							})


						}


					});


				}


			});
		});
	})
}

