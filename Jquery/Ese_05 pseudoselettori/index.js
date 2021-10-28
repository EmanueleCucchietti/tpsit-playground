$(document).ready(function () {

	let _ris = $("#txtRis");

	$("#wrapper div, #wrapper p").on("click", function () {
		_ris.empty();
		// Per ogni click richiamo 7 volte elabora() 
		for (let i = 1; i <= 7; i++)
			elabora($(this), i);
		visualizza("-----------------------")
		if ($(this).is("p"))
			visualizza("Sono un tag p");

		if ($(this).is("#blu, #rosso"))
			visualizza("Sono un elemento blue o rosso");
		if ($(this).prop("id")=="blu")
			visualizza("Sono di nuovo un elemento blue");
		if ($(this).html().includes("my Div"))
			visualizza("contengo my div");
		if ($(this).is(":contains('my Div')"))
			visualizza("contengo il testo mydiv");
		if ($(this).html().includes("<span"))
			visualizza("contengo il tag span");
		if ($(this).is(":last-child"))
			visualizza("Sono l'ultimo elemento");
		let ref = $(this).parent().children().last();
		if($(this).is(ref))
			visualizza("Sono l'ultimo elemento, da variabile");
	});

	function elabora(box, i) {
		// 1 - i-esimo elemento generico  `=ALT+96 	
		if (box.is(`:nth-child(${i})`))
			visualizza(`nth-child(${i})`);
		// 2 - i-esimo elemento generico, ma solo se di tipo DIV		
		if (box.is(`div:nth-child(${i})`))
			visualizza(`div:nth-child(${i})`);
		// 3 - i-esimo elemento generico, ma solo se di tipo P			
		if (box.is(`p:nth-child(${i})`))
			visualizza(`p:nth-child(${i})`);

		// 4 - i-esimo elemento del suo tipo			
		if (box.is(`:nth-of-type(${i})`))
			visualizza(`nth-of-type(${i})`);
		// 5 - i-esimo elemento del suo tipo, ma solo se di tipo DIV
		if (box.is(`div:nth-of-type(${i})`))
			visualizza(`div:nth-of-type(${i})`);
		// 6 - i-esimo elemento del suo tipo, ma solo se di tipo P 
		if (box.is(`p:nth-of-type(${i})`))
			visualizza(`p:nth-of-type(${i})"`);
	}

	function visualizza(msg) {
		_ris.html(_ris.html() + msg + "<br>");
	}

});


