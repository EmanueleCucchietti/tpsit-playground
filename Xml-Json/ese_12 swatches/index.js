"use strict";
let intestazioni = ["Gender", "Code", "Price", "Color", "Image"]


window.onload=function () {
    let swatchesJson = this.JSON.parse(localStorage.getItem("SwatchesJson"));

    let table = document.getElementById("table");
    table.style.width = "1020px";
    table.style.border = "2px solid black";
    table.style.margin = "15px auto";
    creaIntestazioni();
    caricaTabella();
    

    function creaIntestazioni(){
        let thead = document.createElement("thead");
        table.appendChild(thead);
        let tr = document.createElement("tr");
        thead.appendChild(tr);
        for (const item of intestazioni) {
            let th = document.createElement("th");
            th.innerHTML = item;
            tr.appendChild(th);
        }
        
    }
    function caricaTabella(){
        let tbody = document.createElement("tbody");
        table.appendChild(tbody);
        
        for (const Item of swatchesJson) {
            let tdGender = Item.gender;
            for (const model of Item.models) {
                for (const swatches of model.swatches) {
                    let tr = document.createElement("tr");
                    tbody.appendChild(tr);

                    let td = document.createElement("th");
                    td.innerHTML = tdGender;
                    tr.appendChild(td);

                    td = document.createElement("th");
                    td.innerHTML = model.code;
                    tr.appendChild(td);
                    
                    td = document.createElement("th");
                    td.innerHTML = model.code;
                    tr.appendChild(td);
                    
                    td = document.createElement("th");
                    td.innerHTML = swatches.color;
                    tr.appendChild(td);

                    td = document.createElement("th");
                    let img = document.createElement("img");
                    img.src = "img/"+swatches.image;
                    td.appendChild(img);
                    tr.appendChild(td);
                }
            }
        }
    }
}