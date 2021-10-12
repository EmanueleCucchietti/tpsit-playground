"use strict";

let indiceLibroCorrente;
// uso gli STESSI NOMI delle chiavi JSON (ultima colonna = delete)
let intestazioni = ["title", "authors", "category", "price", ""];
let nomiPulsanti = ["Primo", "Indietro", "Avanti", "Ultimo", "Aggiungi", "Eliminapercategoria"];
let firstLoad = true;

window.onload = function () {
	indiceLibroCorrente = 0;
	let json = localStorage.getItem("bookstore_json");
	console.log(json);
	let bookstore = JSON.parse(json);
	console.log(bookstore);

	let body = document.getElementsByTagName("body")[0];
	let _table = document.createElement("table");
	body.appendChild(_table);
	let _thead = document.createElement("thead");
	_table.appendChild(_thead);
	let _tbody = document.createElement("tbody");
	_table.appendChild(_tbody);
	let _tr, _td, _th;
	creaintestazioni();
	caricaTabella();
	caricaDettagli();
	creaPulsanti();


	firstLoad = false;

	function creaintestazioni() {
		//Creazione intestazione
		_tr = document.createElement("tr");
		_thead.appendChild(_tr);
		for (let i = 0; i < intestazioni.length; i++) {
			_th = document.createElement("th");
			_th.innerHTML = intestazioni[i];
			_tr.appendChild(_th);
		}


	}

	function caricaTabella() {
		for (let book of bookstore) {
			_tr = document.createElement("tr");
			_tbody.appendChild(_tr);
			for (let campo of intestazioni) {
				_td = document.createElement("td");

				if (campo != "") {
					if (campo == "authors") {
						_td.innerHTML = book[campo].join(", ");
					}
					else
						_td.innerHTML = book[campo];
				}
				else {

					let _btn = document.createElement("button");
					_btn.innerHTML = "Delete";
					_btn.addEventListener("click", cancella);
					_td.appendChild(_btn);

				}
				_tr.appendChild(_td);


			}
		}
	}

	function caricaDettagli() {
		if(!firstLoad){
			document.getElementById("contenitorePulsantiNavigazione").remove();
			document.getElementById("_dettagli").remove();
		}
		let _dettagli = document.createElement("div");
		_dettagli.id = "_dettagli";
		_dettagli.classList.add("dettagli");
		body.appendChild(_dettagli);
		let book = bookstore[indiceLibroCorrente];//book è un JSON
		console.log(book.authors);

		for (const item in book) {
			let _p = document.createElement("p");
			let _input = document.createElement("input");
			_p.innerHTML = item;
			_input.disabled = true;
			if (item != "authors")
				_input.value = book[item];//contenuto della chiave
			else
				_input.value = book[item].join(", ");

			_dettagli.appendChild(_p);
			_dettagli.appendChild(_input);
			_p.style.textAlign = "right";
		}


		if(!firstLoad)
			creaPulsanti();

	}

	function creaPulsanti() {
		let _contenitorePulsanti = document.createElement("div");
		_contenitorePulsanti.id = "contenitorePulsantiNavigazione";
		_contenitorePulsanti.classList.add("contenitorePulsantiNavigazione");
		body.appendChild(_contenitorePulsanti);
		for (const item of nomiPulsanti) {
			let btn = document.createElement("button");
			btn.classList.add("pulsantiNavigazione");
			btn.id = item.toLowerCase().trim();
			btn.innerHTML = item;
			_contenitorePulsanti.appendChild(btn);
			btn.addEventListener("click",gestisciPulsanti);
			verificaSingoloBtn(btn);
		}
		
	}

	function cancella() {
		bookstore.splice(this.posizione,1);
		localStorage.setItem("bookstore_json",JSON.stringify(bookstore));
		window.location.reload();
	}

	function gestisciPulsanti(){
		switch(this.id)
		{
			case "primo":
				indiceLibroCorrente = 0;
				break;
			case "indietro":	
				if(indiceLibroCorrente>0)
					indiceLibroCorrente --;
				else
					alert("Raggiunto Primo Record");
				break;
			case "avanti":
				if(indiceLibroCorrente<bookstore.length-1)
					indiceLibroCorrente ++;
				else
					alert("Raggiunto Ultimo Record");
				break;
			case "ultimo":
				indiceLibroCorrente = bookstore.length-1;
				break;
			case "aggiungi":
				aggiungiLibro();
				break;
			case "eliminapercategoria":
				break;
								
		}
		
		if(this.id != "aggiungi"){
			caricaDettagli();
			verificaIndiceLibro();
		}
	}

	function verificaIndiceLibro(){
		let btns = [];
		btns[0] =  document.getElementById("primo");
		btns[1] = document.getElementById("ultimo");
		btns[2] = document.getElementById("avanti");
		btns[3] = document.getElementById("indietro");
		for (let btn of btns) {
			verificaSingoloBtn(btn);
		}
	}
	function verificaSingoloBtn(btn){
		btn.disabled = false;	
			switch(btn.id){
				case "primo":
					if(indiceLibroCorrente == 0)
					{
						btn.disabled = true;
					}
				break;
				case "indietro":
					if(indiceLibroCorrente == 0)
					{
						btn.disabled = true;
					}
				break;
				case "avanti":
					if(indiceLibroCorrente == bookstore.length-1)
					{
						btn.disabled = true;
					}
				break;
				case "ultimo":
					if(indiceLibroCorrente == bookstore.length-1)
					{
						btn.disabled = true;
					}
				break;
				case "eliminapercategoria":
					if(bookstore.length == 0)
					{
						btn.disabled = true;
					}
				break;
			}
	}

	function aggiungiLibro(){
		


		if(!firstLoad){
			document.getElementById("contenitorePulsantiNavigazione").remove();
			document.getElementById("_dettagli").remove();
		}
		let _dettagli = document.createElement("div");
		_dettagli.id = "_dettagli";
		_dettagli.classList.add("dettagli");
		body.appendChild(_dettagli);
		let book = bookstore[indiceLibroCorrente];//book è un JSON
		console.log(book.authors);

		
		let intstz =  ["category","title","lang", "authors", "category", "price"];
		let text = ["Inserire Categoria","Inserire Titolo","Inserire Lingua","Inserire Autori","Inserire Anno","Inserire Prezzo"];
		for(let i=0;i<6;i++){
			let _p = document.createElement("p");
			let _input = document.createElement("input");
			_p.innerHTML = intstz[i];
			_input.placeholder = text[i];
			_input.disabled = false;
			_dettagli.appendChild(_p);
			_dettagli.appendChild(_input);
			_p.style.textAlign = "right";
		}

		
		if(!firstLoad)
			creaPulsanti();

		document.getElementById("aggiungi").innerHTML = "Annulla";
		let btns=[];
		btns[0] =  document.getElementById("primo");
		btns[1] = document.getElementById("ultimo");
		btns[2] = document.getElementById("avanti");
		btns[3] = document.getElementById("indietro");
		btns[4] = document.getElementById("eliminapercategoria");	
		for (const btn of btns) {
			btn.disabled = true;	
		}



		
	}
};



