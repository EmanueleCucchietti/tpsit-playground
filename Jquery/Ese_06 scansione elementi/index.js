'use strict'
let wrapper;

function evidenzia(selector){
	wrapper.children(selector).css("backgroundColor","yellow");
}


$(document).ready(function(){	
	wrapper = $("#wrapper");

	$("#btn1").on("click",function(){
		alert(wrapper.children().length);
	})
	
	$("#btn2").on("click",function(){
		let str = "";
		/*
		for(let i=0;i<wrapper.children().length; i++)
			str += " " + wrapper.children().eq(i).text() + "\n";
			*/
		for (const [i,item] of wrapper.children().toArray().entries())
			str += " " + $(item).text() + "\n";
		alert(str);

	})

	$("#btn3").on("click",function(){
		wrapper.children().css("backgroundColor","");
		wrapper.children(":nth-of-type(even)").css("backgroundColor","yellow");
	})

	$("#btn4").on("click",function(){
		wrapper.children(":nth-of-type(odd)").toArray().forEach((e,i) => {
			console.log(e)
			let color = "rgb(0,"+50*(i+1)+", 0";
			$(e).css("color",color);
		})
		wrapper.children(":nth-of-type(odd)").each(function(i,ref){
			let color = "rgb(0,"+50*(i+1)+", 0";
			//$(ref).css("color",color);
		})
	})
})