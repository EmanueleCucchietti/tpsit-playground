"use strict";
const X_OFFSET = 180;
const Y_OFFSET = 210;
const RIGHE = 18;
const COLONNE = 37;
const MMG = 24*3600*1000 // msec in un giorno

let prenotazioni = [];

$(document).ready(function(){	
		
	let _wrapper = $("#wrapper");
	let _login = $("#login");
	let _mappa = $("#wrapper").children("div");
	let _btnVisualizzaMappa = $("#wrapper").children("button").eq(0);
	//  tag input sono NIPOTI di wrapper
	let _dataInizio = $("#wrapper").find("input").eq(0);
	let _dataFine = $("#wrapper").find("input").eq(1);
	let _msg = $("#wrapper").children("label").eq(2);
	

	_mappa.hide();
	_wrapper.hide();
	_login.show();

	_dataFine.prop("disabled",true);
	_btnVisualizzaMappa.prop("disabled",true);

	_login.children("div").eq(2).children("div").eq(1).on("click", function(){
		let username = _login.find("input").eq(0);
		let password = _login.find("input").eq(1);
		if(username.val()=="" || password.val() == "")
			_login.find("p").text("Inswerire Usewrname e password");
		else{
			let request = inviaRichiesta("GET", "/utenti", {"nome": username.val(), "password": password.val()})
			request.fail(errore);
			request.done(function(){
				if(data.length == 0)
					_login.find("p").text("Username o password non validi");
				else
				{
					_login.hide();
					_wrapper.show();
				}
			})
		}
	})

	_dataInizio.on("change",function(){
		_dataFine.prop("disabled",false);		
		_dataFine.prop("min",_dataInizio.val()); //impostiamo la data fine a quella scelta da dato inizio
		_dataFine.val("");//cancello val e modifico min
		_btnVisualizzaMappa.prop("disabled",true).removeClass("buttonEnabled");		
	});

	
	_dataFine.on("change",function(){
		_btnVisualizzaMappa.prop("disabled",false).addClass("buttonEnabled");
		
		//potevamo anche usare la libreria moment.js 
		let diff = new Date(_dataFine.val()) - new Date(_dataInizio.val());
		let nGiorni = Math.floor(diff/(MMG)+1); //+1 perchè senno con una sola giornata mi da 0
		_msg.html("Giorni richiesti: "+nGiorni);
	});

	
	_btnVisualizzaMappa.on("click",function(){
		//2 cicli FOR, per inserire gli ombrelloni
		_mappa.show();
		let request = inviaRichiesta("GET","/ombrelloni"); //chiediamo al server 
		request.fail(errore);
		request.done(function(ombrelloni){
			let id=1;
			for (let i = 0; i < RIGHE+1; i++) {
				for (let j = 0; j < COLONNE+1; j++) {
					if (!(i==9 || j==22)){
						let div=$("<div>").appendTo(_mappa).addClass("ombrellone")
						.css({
							"left" : (X_OFFSET) + (j*16) - (2*i), //-2 ogni volta
							"top" : (Y_OFFSET) + (i*16)
						})
						.prop("id",id);
						if(isOccupato(ombrelloni[id-1].stato)){
							div.addClass("red");
						}
						else{
							div.addClass("green");
							div.on("click",ombrelloneClick);
						} 
						id++;
					}
				}
			}

			//creazione del pulsante PRENOTA
			$("<a>").appendTo(_mappa)
			.html("prenota")
			//.prop("href","server/creaOmbrelloni.js")
			.addClass("button buttonEnabled prenota")
			.on("click",function(){
				prenota(ombrelloni);
			});
		})
	});

	/************************ FUNCTIONS ************************/

	function isOccupato(statoOmbrellone){
		//vettore enumerativo del numero di giorni 
		let data2 = new Date(_dataInizio.val());
		let data1 = new Date(_dataInizio.prop("min")); 
		let pos1 = (data2 - data1)/MMG;
		data2 = new Date (_dataFine.val());
		let pos2 = (data2 - data1)/MMG;

		for (let i = pos1; i <= pos2; i++) {
			if(statoOmbrellone[i]!=0) return true;
		}
		return false;
	}

	function ombrelloneClick(){
		if($(this).hasClass("blue")){
			$(this).removeClass("blue");
			let index = prenotazioni.indexOf($(this).prop("id"));
			prenotazioni.splice(index,1);
		}
		else{
			$(this).addClass("blue");
			prenotazioni.push($(this).prop("id"));
		} 
		console.log(prenotazioni);
	}

	function prenota(ombrelloni){
		//scorrere prenotazioni, aggiornare json struttore 
		let data1 = new Date(_dataInizio.val()).getDate();
		let data2 = new Date(_dataFine.val()).getDate();
		data1--;
		data2--;
		for (let i = 0; i < prenotazioni.length; i++) {
			let stato = ombrelloni[prenotazioni[i]-1].stato;
			for (let j = data1; j <= data2; j++) {
				stato[j]=1;
			}
		
			let request = inviaRichiesta(
				"PATCH",
				"/ombrelloni/"+prenotazioni[i],
				{
					"stato":stato, 
				});
			request.fail(errore);
			request.done(function(){
				alert("PRENOTAZIONE CONFERMATA !!");
				window.location.reload();
			});
		}

		
	}
})