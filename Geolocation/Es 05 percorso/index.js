"use strict";

const URL = "https://maps.googleapis.com/maps/api"

window.onload = async function () {
// $(async function(){ jqueryOnloadNotWorking

	// creazione dinamica del CDN di accesso alle google maps
	//per non mettere la chiave dentro HTML
	await loadGoogleApi()

	let header = $("#header")
	let wrapper = $("#wrapper")
	let divMap = wrapper.children(".map")[0]     // js
	let panel = wrapper.children(".panel")[0]   // js
	let msg = wrapper.children(".msg")

	loadMap();
	$('input[type=button]').on('click', function () {
		loadMap();
	})

	function loadMap(){let partenza = $('input[type=text]').eq(0).val();
	let arrivo = header.find('input').eq(1).val();

	let directionsService = new google.maps.DirectionsService();
	let routesOptions = {
		origin: partenza,
		destination: arrivo,
		travelMode: google.maps.TravelMode.DRIVING, // default
		provideRouteAlternatives: true, // default=false
		avoidTolls: false, // default (pedaggi)
	};



	//Soluzione con promise --> senza callBack
	let promise = directionsService.route(routesOptions)
	promise.then(function (directionsRoutes) {
		let mapOptions = {
			/*'zoom': 15,
			'mapTypeId': google.maps.MapTypeId.ROADMAP*/
		};
		let mappa = new google.maps.Map(divMap, mapOptions);
		if (directionsRoutes.status == google.maps.DirectionsStatus.OK) {
			console.log(directionsRoutes.routes[0])
			let i = 1;

			for (const route of directionsRoutes.routes) {
				let color;


				if (i == 1) {
					color = "#44F";
				}
				else {
					color = `rgb(${60 * i}, ${60 * i}, ${60 * i})`
				}
				let renderOptions = {
					polylineOptions: {
						strokeColor: color, // colore del percorso
						strokeWeight: 6, // spessore
						zIndex: 100 - i // posizionamento
					}
				}

				let directionRenderer = new google.maps.DirectionsRenderer(renderOptions);

				directionRenderer.setMap(mappa);
				directionRenderer.setRouteIndex(i - 1);
				directionRenderer.setDirections(directionsRoutes);


				//prima di scrivere nel panel bisogna sempre cancellare prima il contenuto
				if (i == 1) {
					panel.innerHTML = "";
					directionRenderer.setPanel(panel);
				}

				let distanza = route.legs[0].distance.text;
				let tempo = route.legs[0].duration.text;
				msg.html(msg.html() + `<b>Percorso ${i}: </b>Distanza: <b>${distanza}</b>
			Tempo di percorrenza: <b>${tempo}</b><br>`);

				//perparo i colori per la route successiva

				i++;
			}

		}
	});
	promise.catch(function () {
		console.log('errore');
	})

	//Soluzione senza promise --> con callBack
	/*directionsService.route(routesOptions, function(directionsRoutes){
		let mapOptions = {};
		let mappa = new google.maps.Map(map, mapOptions);
		if (directionsRoutes.status == google.maps.DirectionsStatus.OK)
			console.log(directionsRoutes.routes[0]);
	})*/}
}
//})

function loadGoogleApi() {
	return new Promise((resolve, reject) => {
		var script = document.createElement('script');
		document.body.appendChild(script);
		//img.src = src
		script.type = 'text/javascript';
		script.src = URL + '/js?v=3&key=' + MAP_KEY;
		script.onload = () => resolve()
		script.onerror = reject
	})
}