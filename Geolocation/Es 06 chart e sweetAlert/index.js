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
		let canvas = $("#canvas").children("canvas").eq(0);
		console.log(canvas)
		let myChart = new Chart(canvas, {
			type: 'bar',
			data: {
				labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
				datasets: [{
					label: '# of Votes',
					data: [12, 19, 3, 5, 2, 3],
					backgroundColor: [
						'rgba(255, 99, 132, 0.2)',
						'rgba(54, 162, 235, 0.2)',
						'rgba(255, 206, 86, 0.2)',
						'rgba(75, 192, 192, 0.2)',
						'rgba(153, 102, 255, 0.2)',
						'rgba(255, 159, 64, 0.2)'
					],
					borderColor: [
						'rgba(255, 99, 132, 1)',
						'rgba(54, 162, 235, 1)',
						'rgba(255, 206, 86, 1)',
						'rgba(75, 192, 192, 1)',
						'rgba(153, 102, 255, 1)',
						'rgba(255, 159, 64, 1)'
					],
					borderWidth: 1
				}]
			},
			options: {
				scales: {
					y: {
						beginAtZero: true
					}
				}
			}
		});
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
