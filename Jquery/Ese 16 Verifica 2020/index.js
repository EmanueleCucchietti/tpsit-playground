"use strict";
 
$(document).ready(function () {
	let wrapper = $('#elencoArticoli');
	let details =$(".details")
	
	creaElencoArticoli();
		
	function creaElencoArticoli(){
		for (const [i,article] of articoli.entries()) {
			$("<div>",{
				'id': 'article'+i,
				'class': 'article',
				'appendTo': wrapper,
				'append': [
					$("<img>", {'src':'img/'+articoli[i].src+'.jpg', 'title':'Aggingi al carrello', 'class': 'image'}),
					$("<div>", {'class':'name'})
				],
				'on': {"mouseover": function(){

				}}
			})
		}
	}
});
