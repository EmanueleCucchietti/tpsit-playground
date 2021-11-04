'use strict'

let _form1;
$(document).ready(function () {
	_form1 = $("#form1")
})

function visualizza(index) {
	let msg = "";
	let _chk;
	switch (index) {
		case 1:
			msg = _form1.find("input[type=text]:first-of-type").val();
			break;
		case 2:
			msg = _form1.find("select").first().val();
			msg = _form1.find("select:first-of-type").val();
			msg = _form1.children("label").eq(1).children("select");
			msg = _form1.children("label").eq(1).children().filter("select").val();
			break;
		case 3:
			let _chk1 = _form1.children("fieldset:nth-of-type(1)").find("input[type=checkbox]");
			_chk1.toArray().forEach((element, i) => {
				msg += element.name + " " + element.value + "\n";
			});
			break;
		case 4:
			let _chk2 = _form1.children("fieldset:nth-of-type(1)").find("input[type=checkbox]:checked");
			_chk2.toArray().forEach((element, i) => {
				msg += element.value + "\n";
			});
			break;
		case 5:
			_chk = _form1.find("fieldset:nth-of-type(1) input[type=checkbox]").not(":checked");
			_chk.each(function (i, ref) {
				msg += $(ref).val() + "\n";
			});
			break;
		case 6:
			_chk = _form1.children("fieldset").eq(1).find("input[type=radio]:checked");
			msg = _chk.val();
			break;
		case 7:
			_chk = _form1.children("fieldset").eq(1).find("input[type=radio]").not(":checked");
			_chk.each(function (i, ref) {
				msg += $(ref).val() + "\n";
			});
			break;
		case 8:
			let chk = _form1.children("select").last();
			msg = chk.val().toString();
	}
	alert(msg)
}

function imposta(index) {
	switch (index) {
		case 1:
			_form1.find("input[type=text]").first().val("Nuovo Valore");
			break;
		case 2:
			//_form1.find("select").first().eq(0).val("1");
			_form1.find("select").first().children("option").eq(getRandomInt(0, 3))[0].selected = true;
			break;
		case 3:
			_form1.find("input[type=checkbox]").eq(1)[0].checked = true;
			_form1.find("input[type=checkbox]").val(["opzione "])[0].checked = true; //deselziona gli altri
			break;
		case 4:
			_form1.find("input[type=radio][value=si]")[0].checked = true;
			break;
		case 5: 
		_form1.find("select").last().children("option:nth-of-type(even)")[0].selected = true;
		_form1.find("select").last().val(["1","3"]);
			break;
	}
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

