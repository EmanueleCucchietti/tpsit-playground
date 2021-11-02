'use strict'

let _form1;
$(document).ready(function(){	
	_form1=$("#form1")
})

function visualizza(index){
	let msg = "";
	switch(index){
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
			_chk1.toArray().forEach((element,i) => {
				msg += element.name + " " + element.value + "\n";
			});
			break;
		case 4:
			let _chk2 = _form1.children("fieldset:nth-of-type(1)").find("input[type=checkbox]:checked");
			_chk2.toArray().forEach((element,i) => {
				msg += element.value + "\n";
			});
			break;
	}
	alert(msg)
}


