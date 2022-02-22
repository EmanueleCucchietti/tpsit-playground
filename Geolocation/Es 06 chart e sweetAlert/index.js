"use strict";

$(document).ready(function () {
	const wrapper = $("#wrapper")
	const table = $("table");
	const canvas = $("canvas")

	const pulsanteSalva = creaPulsanteSalva()

	let chart;
	//let nazionalita = [];
	let nazionalita = {};

	$('#btnInvia').on('click', function(){
		Swal.fire({
			title: 'How many people?',
			icon: 'question',
			input: 'range',
			inputLabel: 'Insert a number',
			inputAttributes: {
				min: 50,
				max: 300,
				step: 1
			},
			inputValue: 100
		})
	
		let request = inviaRichiesta('GET', '/', { 'results': 100 });
		request.fail(errore);
		request.done(function (people) {
			people = people.results;
			//console.log(people);
			/*for (const person of people) {
				let nat = person.location.country;
				let index = esistenzaNazionalita(nat);
				if(index == -1){
					nazionalita.push({'nat': nat, 'qta': 0});
				}
				else{
					nazionalita[index].qta++;
				}
			}*/
			for (const person of people) {
				let nat = person.location.country;
				if (nat in nazionalita) {
					nazionalita[nat]++;
				}
				else
					nazionalita[nat] = 1;
			}
			//console.log(nazionalita);
	
		})
	})
	

	/*function esistenzaNazionalita(nat) {
		let trovato = false;
		let cont = 0;
		for (const item of nazionalita) {
			if (item.nat == nat) {
				trovato = true;
				break;
			}
			cont++;
		}
		if (trovato) {
			return cont;
		}
		else
			return -1;
	}*/

	function creaPulsanteSalva() {
		//
	}
})
