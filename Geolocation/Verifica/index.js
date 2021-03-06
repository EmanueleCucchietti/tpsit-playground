const URL = "http://maps.googleapis.com/maps/api"
const URLWEATHER = "http://api.openweathermap.org/data/2.5/weather?units=metric&lang=it";
const URLDB = "http://localhost:3000";
const mesi = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];

window.onload = async function () {
	await loadGoogleApi();
	let wrapperMappa = $("#mappa")[0]
	let btnGrafico = $("#button");
	let canvas = $("#grafico")
	let titleDate = $("#titleDate")[0];

	setDateTitle(titleDate);

	try { await loadGoogleApi(); }
	catch (e) { alert("Error"); console.log(e); return; }


	geocoder = new google.maps.Geocoder();

	let myItalyMap = await getMapByGeocode("Roma", wrapperMappa)
	let citta = await richiediCitta();
	for (const city of citta) {
		let req = $.ajax(URLWEATHER + "&APPID=" + WEATHER_KEY + "&q=" + city.nome + ",it");
		req.done((data) => {
			city.info = data
			setMarkerByLatLng(city, myItalyMap);
		})
	}

	btnGrafico.on("click", function(){
		loadGrafico(citta,canvas)
	});
}
function getMapByGeocode(address, mapWrapper) {
	return new Promise((resolve, reject) => {
		geocoder.geocode({ "address": address }, async function (result, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				let mapOptions = {
					"center": result[0].geometry.location,
					"zoom": 6
				}
				let map = new google.maps.Map(mapWrapper, mapOptions);
				resolve(map)
			}
		})
	})
}
function setMarkerOnGeocode(address, destinationMap) {
	geocoder.geocode({
		"address": address
	}, function (result, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			let position = new google.maps.LatLng(result[0].geometry.location)
			let markeroption = {
				"map": destinationMap,
				"position": position,

			}
			let marker = new google.maps.Marker(markeroption);

			let infoWindowOption = {
				"content":
					"<p>Test</p><button style='float: right'>vedi percorso</button>",
				"width": 150
			}
			let infoWindow = new google.maps.InfoWindow(infoWindowOption);
			marker.addListener("click", function () {
				infoWindow.open(destinationMap, marker);
			})
		}
	})
}
function getRouteMap(partenza, arrivo, mapWrapper, panelRoute, msg) {
	let msgRoute = $(msg)
	let directionsService = new google.maps.DirectionsService();
	let routesOptions = {
		origin: partenza,
		destination: arrivo,
		travelMode: google.maps.TravelMode.DRIVING, // default
		provideRouteAlternatives: true, // default=false
		avoidTolls: false, // default (pedaggi)
	};
	let req = directionsService.route(routesOptions);
	let promise = directionsService.route(routesOptions)
	req.then(function (directionsRoutes) {
		let mapOptions = {
			'zoom': 15,
			'mapTypeId': google.maps.MapTypeId.ROADMAP
		};
		let mappa = new google.maps.Map(mapWrapper, mapOptions);
		if (directionsRoutes.status == google.maps.DirectionsStatus.OK) {
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
					panelRoute.innerHTML = "";
					directionRenderer.setPanel(panelRoute);
				}

				let distanza = route.legs[0].distance.text;
				let tempo = route.legs[0].duration.text;
				msgRoute.html(msgRoute.html() + `<b>Percorso ${i}: </b>Distanza: <b>${distanza}</b>
			Tempo di percorrenza: <b>${tempo}</b><br>`);

				//perparo i colori per la route successiva

				i++;
			}

		}
	});
	req.catch(function (e) {
		console.log(e);
	})
}
function richiediCitta() {
	return new Promise((resolve, reject) => {
		let req = $.ajax(URLDB + "/citta");
		req.done((data) => {
			resolve(data);
		})
		req.fail((e) => reject(e));
	})
}
function setMarkerByLatLng(city, destinationMap) {
	let lat = city.info.coord.lat;
	let lng = city.info.coord.lon
	let position = new google.maps.LatLng(lat, lng);
	let markeroption = {
		"map": destinationMap,
		"position": position,
		"title": city.nome

	}
	let marker = new google.maps.Marker(markeroption);

	let infoWindowOption = {
		"content":
			`			
				<div class="infoWindow" style="background-image : url('img/${city.info.weather[0].description}.jpg');">
					<h3>${city.nome}</h3>
					<br>
					<span>Temperatura</span>
					<h3>${city.info.main.temp}</h3>
					<br>
					<span>Cielo</span>
					<h3>${city.info.weather[0].description}</h3>
					<br>
					<span>Umidità</span>
					<h3>${city.info.main.humidity}</h3>
					<br>
					<span>Pressione</span>
					<h3>${city.info.main.pressure}</h3>
					<br>
				</div>
			`,
	}
	let infoWindow = new google.maps.InfoWindow(infoWindowOption);
	marker.addListener("click", function () {
		infoWindow.open(destinationMap, marker);
	})
}
function loadGrafico(citta, canvas) {
	let labels = [];
	let values = [];
	let backgroundColor = [];
	for (const city of citta) {
		labels.push(city.nome)	
		values.push(city.info.main.temp)
		backgroundColor.push(generaColore());
	}
	let data = {
		type: 'bar',
		data: {
			labels: labels, // keys
			datasets: [{
				label: 'Grafico Temperatura', // solo per diagramma a barre
				data: values, // values
				backgroundColor: backgroundColor,
				borderColor: 'rgba(100, 100, 100, 0.8)',
				borderWidth: 1 /* default 2 */
			}]
		}
	}
	chart = new Chart(canvas[0], data);
}
function setDateTitle(h1){
	let date = new Date();
	let day = date.getDate();
	let month = date.getMonth();
	let year = date.getFullYear();
	let str = `Temperature del ${day} ${mesi[month]} ${year} in Italia `
	h1.innerHTML = str
}
function loadGoogleApi() {
	return new Promise((resolve, reject) => {
		var script = document.createElement('script');
		document.body.appendChild(script);
		//img.src = src
		script.type = 'text/javascript';
		script.src = URL + '/js?v=3&key=' + MAP_KEY;
		script.onload = () => resolve()
		script.onerror = function() {reject(new Error("errore sul caricamento"))}
	})
}