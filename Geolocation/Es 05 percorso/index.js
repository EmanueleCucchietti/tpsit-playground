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
	let header =$("#header")
	let wrapper = $("#wrapper") 
	let map =  wrapper.children(".map")[0]     // js
	let panel= wrapper.children(".panel")[0]   // js
	let msg =  wrapper.children(".msg") 



}