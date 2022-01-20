"use strict"

const X0 = 152
const Y0 = 109;

const VERDE = "rgba(0, 200, 0, 0.5)"
const ROSSO = "rgba(255, 0, 0, 0.5)"
const BLU  =  "rgba(0, 0, 255, 0.5)"

let nomeFila =["T","S","R","Q","P","O","N","M","L","I",  "H","G","F","E","D","C","B","A"]
let nomeColonna=[28,26,24,22,20,18,16,14,12,10,8,6,4,2,  1,3,5,7,9,11,13,15,17,19,21,23,25,27]

let inizioFine = [
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 

	{"inizio":1, "fine":26}, 
	{"inizio":2, "fine":25}, 
	{"inizio":2, "fine":25}, 
	{"inizio":3, "fine":24}, 
	{"inizio":3, "fine":24}, 
	{"inizio":4, "fine":23}, 
	{"inizio":4, "fine":23}, 
	{"inizio":4, "fine":23}, 
]


$(document).ready(function(){
	let wrapper = $("#wrapper")
	let divSpettacoli= $("#divSpettacoli")
	let divMappa= $("#divMappa")
	
	let mappa= divMappa.children("div").eq(0)
	let titolo = wrapper.children("h3")
	let sottotitolo = wrapper.children("p")
	let btnAcquista = divMappa.children("button")
			
	divMappa.hide();

	let request = inviaRichiesta("GET", "/spettacoli");
	request.fail(errore)
	request.done(function(data){
		let schema = divSpettacoli.children("div");
		for (const spettacolo of data) {
			let div = schema.clone()
			div.find("img").prop("src","img/"+spettacolo.titolo+".jpg")
			div.find("p").eq(0).text(spettacolo.titolo)
			div.find("p").eq(1).text(spettacolo.data)
			div.find("p").eq(2).text(spettacolo.autore)
			div.find("p").eq(3).text(spettacolo.prezzo)
			div.find("button").prop("spettacolo",spettacolo).on("click",prenotaBiglietti)
			div.appendTo(divSpettacoli)
		}
		schema.remove();
	})
	function prenotaBiglietti(){
		divSpettacoli.fadeOut(function(){
			divMappa.fadeIn();
			
		});
		wrapper.children("h3").text($(this).prop("spettacolo").titolo)
		wrapper.children("p").text($(this).prop("spettacolo").data)
		for(let i=0; i<inizioFine.length;i++){
			for(let j=inizioFine[i].inizio; j<=inizioFine[i].fine; j++){
				$("<div>").css({
					"top": Y0+i*17.5,
					"left": X0+j*16.5,
					"background-color": "green"
				}).appendTo(mappa)
			}
		}
	}

});