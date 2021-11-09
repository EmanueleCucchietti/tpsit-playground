'use strict'

let ul = []
let wrapper;

$(document).ready(function () {
   wrapper = $("#wrapper")
   ul.push(wrapper.children("ul").eq(0));
   ul.push(wrapper.children("ul").eq(1));
})

function aggiungi(index) {
   index--;
   let len = $(ul[index]).children("li").length;
   let li = $("<li>");
   li.html("menu " + (index + 1) + " voce " + (len + 1));
   li.appendTo(ul[index]);
}

function sposta(index) {
   let len = ul[index-1].children("li").length;
   if(len>0){
      let li = ul[index-1].children("li").last();
      let dest = (index == 1) ? 2:1;
      li.appendTo(ul[dest-1]);
   }
   else
      alert("Non ci sono elementi da spostare");
}

function aggiungiPrima(index) {
   /*
   let len = ul[index-1].children("li").length;
   if(len > 0)
   {
      let li = ul[index-1].children().first();
      $("<li>").text("-----------").insertBefore(li);
   }
   else
      $("<li>").text("-----------").appendTo(ul[index-1]);
   */
   $("<li>").text("-----------").prependTo(ul[index - 1]);
}

function replica(index) {
   $("<li>").text("-----------").insertAfter(ul[index - 1].children());
}

function creazioneConCostruttore() {
   $("<div>", {
      "css": {
         "background-color": "#ddd",
         "width": "200px"
      },
      "text": "Compila il seguente campo:",
      "appendTo": wrapper,
      "append": [
         $("<br>"),
         $("<label>", { "text": "hobbies :" }),
         $("<input>", { "type": "radio", "name": "hobbies" }),
         $("<span>", { "text": "sport" }),
         $("<input>", { "type": "radio", "name": "hobbies" }),
         $("<span>", { "text": "musica" })
      ],
      "on": { "click": function(){alert("click event")} }
   })
}

function creazioneSenzaCostruttore() {
   $("<div>")
   .css({
      "background-color": "#ddd",
      "width": "200px"
   })
   .text("Compila il seguente campo:")
   .appendTo(wrapper)
   .on("click",function(){
      alert("click event");
   })
}

function aggiungiDopo(index){
   let len = $(ul[index-1]).children("li").length;

   if(len>0){
      let li = ul[index-1].children("li").first();
      $("<li>").text("-----------").insertAfter(li);
   }
   else
      alert("Non ci sono elementi da spostare");
}