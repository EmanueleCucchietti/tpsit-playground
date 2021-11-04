'use strict'

let ul = []
let wrapper;

$(document).ready(function(){	
   wrapper = $("#wrapper") 
   ul.push(wrapper.children("ul").eq(0));
   ul.push(wrapper.children("ul").eq(1));
})

function aggiungi(index){
   index--;
   let len = ul[index].children("li").lenght;
   let div = $("<div>");
   div.html("menu " + (index+1) + "voce " + (len+1));
   div.appendTo(ul[index]);
}

