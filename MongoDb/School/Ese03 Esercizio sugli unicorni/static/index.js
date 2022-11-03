"use strict"

let headers = ["name", "gender", "hair", "weight", "loves"]


$(document).ready(function() {
    let _wrapper = $("#wrapper");
    let _table = $("table");
	let _tbody;
	let _radioGender = $(".radioGender");
	
	createHeaders();

	getUnicorns("m");

	_radioGender.on("change", function() {
		getUnicorns($(this).val());
	});


/***************************FUNCTIONS ************************/
	function createHeaders(){
		let thead = $("<thead>").appendTo(_table)
		let tr = $("<tr>").appendTo(thead)
		for (let header of headers){
			$("<th>").appendTo(tr).text(header)
		}
		_tbody = $("<tbody>").appendTo(_table)
	}

	function getUnicorns(gender){
		_tbody.empty();
		let request = inviaRichiesta("POST", "/api/unicorns", {gender});
		request.fail(errore);
		request.done((data) => {
			console.log(data);
			for (let unicorn of data){
				let tr = $("<tr>").appendTo(_tbody);
				for (let header of headers){
					$("<td>").appendTo(tr).text(unicorn[header]);
				}
			}
		});
	};
})