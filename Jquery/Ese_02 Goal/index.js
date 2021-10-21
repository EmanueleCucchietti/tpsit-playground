"use strict"

$(function()
{	
	let _calciatore = $("#calciatore");
	let _palla = $("#palla");
	
	let btnEntra=$("#btnEntra")
	let btnEsci = $("#btnEsci")
	let btnVisualizzaPalla = $("#btnVisualizzaPalla")
	let btnNascondiPalla = $("#btnNascondiPalla")
	let btnTira = $("#btnTira")
	let btnRosso = $("#btnRosso");
	let btnBianco = $("#btnBianco");
	
	_calciatore.hide();
	_palla.hide();

	btnEsci.css("visibility", "hidden")
	btnNascondiPalla.css("visibility", "hidden");
	btnTira.css("visibility", "hidden");

	btnEntra.on("click",visualizzaCalciatore_OnClick);
	btnEsci.on("click",nascondiCalciatore_OnClick);
	btnVisualizzaPalla.on("click",visualizzaPalla_OnClick);
	btnNascondiPalla.on("click",nascondiPalla_OnClick);
	btnRosso.on("click",visualizzaPallaRossa_OnClick);
	btnBianco.on("click",visualizzaPallaBianca_OnClick);
	btnTira.on("click",eseguiTiro);

	function verificaPossibileTiro(){
		if(_calciatore.css("display")!="none" && _palla.css("display")!="none")
			btnTira.css("visibility", "visible");
		else
			btnTira.css("visibility", "hidden");
	}




	

	/* Reference Fucntion to Btns*/
	function visualizzaCalciatore_OnClick(){
		$(this).css("visibility", "hidden");

		_calciatore.fadeIn(1000, function(){
			btnEsci.css("visibility", "visible");
			verificaPossibileTiro();
		});
	}
	function nascondiCalciatore_OnClick(){
		$(this).css("visibility", "hidden");

		_calciatore.fadeOut(1000, function(){
			btnEntra.css("visibility", "visible");
			verificaPossibileTiro();
		});
	}
	function visualizzaPalla_OnClick(){
		$(this).css("visibility", "hidden");
		_palla.fadeIn(2000,function(){
			btnNascondiPalla.css("visibility","visible");
			verificaPossibileTiro();
		})
	}
	function nascondiPalla_OnClick(){
		$(this).css("visibility", "hidden");
		_palla.fadeOut(2000,function(){
			btnVisualizzaPalla.css("visibility","visible");
			verificaPossibileTiro();
		})
	}
	function visualizzaPallaBianca_OnClick(){
		_palla[0].src = "img/palla.jpg";
	}
	function visualizzaPallaRossa_OnClick(){
		_palla[0].src = "img/pallaRossa.jpg";
	}
	function eseguiTiro(){
		$(this).css("visibility","hidden");
		let posPalla = {
			"left": "1025px",
			"top": "300px",
			"width": "50px",
			"height": "50px"
		}
		_palla.animate(posPalla, 1500);
	}
});