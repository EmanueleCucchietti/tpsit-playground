"use strict";

const URL = "https://maps.googleapis.com/maps/api"
const mapType = ['roadmap', 'hybrid', 'satellite', 'terrain', 'streetview'];

const params = {
	// parametri comuni
	"key": MAP_KEY,
	"maptype": "",
	"size": "800x600",
	"zoom": 16,
	// parametri static_map
	"center": "via san michele 68, fossano",   // "44.5557763, 7.7347183",
	// parametri street_view
	"location": "via san michele 68, fossano",
	"heading": "-40", /* posizionamento destra / sinistra */
	"pitch": "7",     /* posizionamento alto / basso      */
	"fov": "45",      /* zoom */
	// markers
	"markers": "color:red|size:big|label:V|via san michele 68, fossano",
}


$(document).ready(function () {
	// creazione dinamica del CDN di accesso alle google maps
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = URL + '/js?v=3&key=' + MAP_KEY + '&callback=documentReady';
	document.body.appendChild(script);
})


function documentReady() {
	let imgBox = $("#imgBox");
	let btnBox = $("#btnBox");

	for (const item of mapType) {
		$('<button>').text(item).appendTo(btnBox).on('click', visualizzaMappa);
	}

	function visualizzaMappa() {
		let url = URL;
		if ($(this).text() == 'streetview')
			url += '/streetview?';
		else
			url += '/staticmap?';
		params['maptype'] = $(this).text();
		url += convertToQueryString(params);
		//console.log(url);
		imgBox.prop('src', url);
		btnBox.children().removeClass('active');
		$(this).addClass('active');
	}

	function convertToQueryString(params) {
		let queryString = '';
		for (const key in params) {
			queryString += key + '=' + params[key] + '&';
		}
		return queryString;
	}

}
