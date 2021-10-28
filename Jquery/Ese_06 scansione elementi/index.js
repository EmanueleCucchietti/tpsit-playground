'use strict'
let wrapper;

function evidenzia(selector){
	wrapper.children(selector).css("backgroundColor","yellow");
}


$(document).ready(function(){	
	wrapper = $("#wrapper");

	$("#btn1").on("click",function(){
		alert(wrapper.children().lenght);
	})
	
	$("#btn2").on("click",function(){
		alert("not implemented");
		/*
		let str = "";
		for(let i=0;i<wrapper.children().lenght; i++)
			str += " " + wrapper.children().text();

		*/
	})


})