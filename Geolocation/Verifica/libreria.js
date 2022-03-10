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
function generaColore() {
	let R = generaNumero(0, 255);
	let G = generaNumero(0, 255);
	let B = generaNumero(0, 255);
	return (`rgba(${R}, ${G}, ${B}, 0.8)`);
}
function generaNumero(a, b){
	return Math.floor((b-a+1)*Math.random()) + a;
}
