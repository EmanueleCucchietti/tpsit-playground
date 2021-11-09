'use strict'
const URL = "https://randomuser.me/api"

$(document).ready(function () {

	let tbody = $("#wrapper").children("table").find("tbody");
	let url = URL + "?results=100";

	let request = $.ajax({
		"url": url,
		"dataType": "json"
	})
	request.fail(errore)
	request.done(function (data) {
		console.log(data)
		for (const person of data.results) {
			let tr = $("<tr>").appendTo(tbody);
			$("<td>").text(person.name.first + " " + person.name.last).appendTo(tr);
			$("<td>").text(person.nat).appendTo(tr);
			$("<td>").text(person.location.country).appendTo(tr);
			$("<td>").text(person.location.state).appendTo(tr);
			$("<td>").text(person.cell).appendTo(tr);
			let td = $("<td>").appendTo(tr);
			$("<img>").prop("src",person.picture.thumbnail).appendTo(td);
		}

		$("table").dataTable();


	});
})






function errore(jqXHR, text_status, string_error) {
	if (jqXHR.status == 0)
		alert("Connection Refused or Server timeout");
	else if (jqXHR.status == 200)
		alert("Formato JSON non corretto : " + jqXHR.responseText);
	else
		alert("Server Error: " + jqXHR.status + " - " + jqXHR.responseText);
}