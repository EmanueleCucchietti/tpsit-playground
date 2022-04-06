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

	let wrapper = $("#wrapper")[0]
	// vallauri    // LatLng non accetta stringhe
	let position = new google.maps.LatLng(44.5557763, 7.7347183);
	console.log(position)
	let mapOptions = {
		"center": position,
		"zoom": 16,
		"mapTypeId": google.maps.MapTypeId.ROADMAP,

		// disabilito tutti i pulsanti di controllo
		disableDefaultUI: true,

		// Pulsanti switch ROADMAP/TERRAIN oppure HYBRID/SATELLITE (senza etichette)
		mapTypeControl: true,
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR, // default
			style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,  // verticale
			position: google.maps.ControlPosition.TOP_LEFT,
		},

		// Omino StreetView (che ha senso solo per le ROADMAP)
		streetViewControl: true,
		streetViewControlOptions: {
			position: google.maps.ControlPosition.RIGHT_CENTER
		},

		// Pulsanti di zoom + -
		zoomControl: true,
		zoomControlOptions: {
			// style: deprecata,
			position: google.maps.ControlPosition.RIGHT_CENTER
		},


		// Pulsante FullScreen
		fullscreenControl: true,
		fullscreenOptions: {
			// Non ha opzioni, utilizza una posizione fissa in alto a destra
		},

		// Visualizza nella riga di stato in basso a destra un fattore di scala
		// per default è disabilitato
		scaleControl: true,
		scaleControlOptions: {
			// Non ha opzioni
		}
		/* */
	};

	var mappa = new google.maps.Map(wrapper, mapOptions);

	//aggiunta di un marcatore
	let marcatore = new google.maps.Marker({
		'map': mappa,
		'position': position,
		'title': 'IIS Vallauri',
		'animation': google.maps.Animation.DROP,
		'icon': 'img/education/cramschool.png'
	})

	var infoWindow = new google.maps.InfoWindow({
		content:
		`<div id="infoWindow">
			<h2> 
				ITIS Vallauri
				<img src="img/vallauri.jpg" align="top">
			</h2>
			<p>indirizzo: Via San Michele 68, Fossano</p>
			<p>coordinate GPS: ${position.toString()} </p>
		</div>`,
		width: 150
	});

	marcatore.addListener('click', function () {
		infoWindow.open(mappa, marcatore);
	});
}