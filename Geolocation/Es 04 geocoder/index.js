"use strict";

const URL = "https://maps.googleapis.com/maps/api"

$(document).ready(function(){
	// creazione dinamica del CDN di accesso alle google maps
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = URL + '/js?v=3&key='+ MAP_KEY +'&callback=documentReady';
	document.body.appendChild(script);
})	


function documentReady () {	
 	let wrapper =$("#wrapper")[0];
    
	convertiIndirizzo();
    $("#btnVisualizza").on("click", convertiIndirizzo)

	function convertiIndirizzo(){
		let address = $('#txtIndirizzo').val();
		let geocoder = new google.maps.Geocoder();
		geocoder.geocode({'address': address}, function(results, status) {
			if(status != google.maps.GeocoderStatus.OK){
				alert('Indirizzo non valido');
			}
			else
				disegnaMappa(results[0]);
		});
	}

	function disegnaMappa(result) {
		let mapOptions = {
			'center':result.geometry.location,
			'zoom': 16
		};
		let map = new google.maps.Map(wrapper, mapOptions);

		let markerOptions = {
			'map': map,
			'position': result.geometry.location,
			'title': 'IIS Vallauri'
		}

		let marcatore = new google.maps.Marker(markerOptions)

		let infoWindowOptions = {
			'content': `<div id="infoWindow">
				<h2>IIS Vallauri</h2>
				<p>
					<span>Indirizzo:</span><br>
					<span>${result.formatted_address}</span>
				</p>
				<p>
					<span>Coordinate GPS:</span><br>
					<span>${result.geometry.location.toString()}</span>
				</p>
			</div>`,
			'width': 150
		}

		let infoWindow = new google.maps.InfoWindow(infoWindowOptions);

		marcatore.addListener('click', function () {
			infoWindow.open(map, marcatore);
		})
	}
}