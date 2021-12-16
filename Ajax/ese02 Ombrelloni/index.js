"use strict";
let X_OFFSET = 180
let Y_OFFSET = 210;
const MMG = 24*3600*1000 // msec in un giorno
$(document).ready(function(){	
		
	let _wrapper = $("#wrapper");
	let _mappa = $("#wrapper").children("div");
	let _btnVisualizzaMappa = $("#wrapper").children("button").eq(0);
	//  tag input sono NIPOTI di wrapper
	let _dataInizio = $("#wrapper").find("input").eq(0);
	let _dataFine = $("#wrapper").find("input").eq(1);
	let _msg = $("#wrapper").children("label").eq(2);
	

	_mappa.hide();

	_dataFine.prop("disabled",true);
	_btnVisualizzaMappa.prop("disabled",true);

	_dataInizio.on("change",function(){
		_dataFine.prop("disabled",false);		
		_dataFine.prop("min",_dataInizio.val()); //impostiamo la data fine a quella scelta da dato inizio
		_dataFine.val("");//cancello val e modifico min
		_btnVisualizzaMappa.prop("disabled",true).removeClass("buttonEnabled");		
	});

	
	_dataFine.on("change",function(){
		_btnVisualizzaMappa.prop("disabled",false).addClass("buttonEnabled");
		let diff = new Date(_dataFine.val()) - new Date(_dataInizio.val());
		let nGiorni = Math.floor(diff / MMG)+1;
		_msg.html("Giorni richiesti: "+ nGiorni)
		_msg.css("margin", 0);
	});

	_btnVisualizzaMappa.on("click",function(){
		_mappa.show();
		let request = inviaRichiesta("GET", URLCONST + "/ombrelloni");
		request.done(function(data){
			console.log(data)
			let id=1;
			for(let i=0;i<18;i++){
				if(i!=9){
					for(let j=0;j<37;j++){
						if(j!=22){
							let div = $("<div>",{
								"addClass": "ombrellone",
								"css": {
									"left": (X_OFFSET+j*16),
									"top": (Y_OFFSET+i*16)
								},
								"appendTo": _mappa,
								"prop": {"id": id}
							})
							if(isOccupato(data[id-1].stato))
							{
								div.addClass("red");
							}
							id++;
						}
					}
					X_OFFSET-=2
				}
			}
		})
		request.fail(errore);

	})

	function isOccupato(statoOmbrellone){
		return true;
	}
	

})