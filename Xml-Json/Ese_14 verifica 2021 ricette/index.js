"use strict"

let categoryActual="Breakfast";
let currentPage=0;
let nPages;
let intestazioni = ["idMeal", "strMeal", "img", "", ""];
// Larghezza di ciascuna colonna
let larghezze = ["50px", "310px", "60px", "40px", "40px"];
let rdbWrapper;
let table;
let divDettagli;
window.onload=function()
{
    document.getElementById("first").addEventListener("click",btnClicked);
    document.getElementById("prevPage").addEventListener("click",btnClicked);
    document.getElementById("nextPage").addEventListener("click",btnClicked);
    document.getElementById("last").addEventListener("click",btnClicked);
    calcolaPagine();
    let nPagina = document.getElementById("nPagina")
    nPagina.innerHTML = (currentPage+1) + "/" + (nPages);;


    rdbWrapper =document.getElementById("radioWrapper");
    table = document.getElementById("table");
    divDettagli = document.getElementById("dettagliWrapper");
    generaCategorie();
    printIntestazione();
    printRow();
    
    function generaCategorie(){
        //<input type="radio" name="category" value="Breakfast"> <span> Breakfast </span> <br> 
        for (const category in categoryList) {
            let input = document.createElement("input");
            input.type = "radio";
            input.name = "category";
            input.value = category;
            input.addEventListener("change",rdbtnChanged);
            if(category == "Breakfast")
                input.checked = true;
            rdbWrapper.appendChild(input);
            let span = document.createElement("span");
            span.innerHTML = category;
            rdbWrapper.appendChild(span);
            let br = document.createElement("br");
            rdbWrapper.appendChild(br);

        }
    }

    function rdbtnChanged(){
        categoryActual = this.value;
        currentPage = 0;
        generaTutto();
    }

    function calcolaPagine(){
        nPages = categoryList[categoryActual].length / 7;
        if(!isInt(nPages))
            nPages = Math.floor(nPages)+1;
        if(Math.floor(nPages) != nPages)
            nPages = parseInt(nPages);
    }

    function isInt(n){
        return n % 1 === 0;
    }

    function printRow(){
        calcolaPagine();

        for(let i=(0+(currentPage*7));i<(7+(currentPage*7));i++){
            if(categoryList[categoryActual][i]==null)
                return ;
            let singleRowItem = categoryList[categoryActual][i];
            let tr = document.createElement("tr");
            
            let tdId = document.createElement("td");
            tdId.innerHTML = singleRowItem.idMeal;
            tr.appendChild(tdId);

            let tdMeal = document.createElement("td");
            tdMeal.innerHTML = singleRowItem.strMeal;
            tr.appendChild(tdMeal);

            let tdImg = document.createElement("td");
            tdImg.idMeal = singleRowItem.idMeal;
            tdImg.addEventListener("click",btnImmagine);
            let img = document.createElement("img");
            img.src = singleRowItem.strMealThumb;
            img.style.width = "55px";
            tdImg.appendChild(img);
            tr.appendChild(tdImg);

            let tdDettagli = document.createElement("td");
            tdDettagli.idMeal = singleRowItem.idMeal;  
            tdDettagli.addEventListener("click",btnDettagli);
            img = document.createElement("img");
            img.src = "img/lente.jpg";
            img.style.width = "30px";
            tdDettagli.appendChild(img);
            tr.appendChild(tdDettagli);

            let tdDelete = document.createElement("td");
            tdDelete.idMeal = singleRowItem.idMeal;  
            tdDelete.addEventListener("click",btnDelete);
            img = document.createElement("img");
            img.src = "img/delete.png";
            img.style.width = "30px";
            tdDelete.appendChild(img);
            tr.appendChild(tdDelete);

            table.appendChild(tr)
        }
    }

    function printIntestazione(){
        let tr = document.createElement("tr");
        for (const intestItem of intestazioni) {
            let th = document.createElement("th");
            th.innerHTML = intestItem;
            tr.appendChild(th);
        }
        table.appendChild(tr);
    }
    function btnClicked() {
        calcolaPagine();
        switch(this.id)
        {
            case "first":
                currentPage = 0;
                break;
            case 'prevPage':
                if(currentPage != 0 && currentPage != -1)
                    currentPage--;
                else
                    alert("Si è già posizionati sulla prima pagina");
                break;
            case 'nextPage':
                if(currentPage < nPages-1)
                    currentPage++;
                else
                    alert("Si è già posizionati sull'ultima pagina");
                break;
            case 'last':
                currentPage = nPages-1;
                break;

        }
        generaTutto();
    }

    function generaTutto(){
        table.innerHTML = "";
        printIntestazione();
        printRow();
        nPagina.innerHTML = (currentPage+1) + "/" + (nPages);
    }

    function btnDelete(){
        let i=0;
        while(i<categoryList[categoryActual].length && this.idMeal != categoryList[categoryActual][i].idMeal)
            i++;
        categoryList[categoryActual].splice(i,1);
        calcolaPagine();
        if(currentPage >= nPages)
            currentPage--;
        generaTutto();
    }

    function btnDettagli(){
        divDettagli.innerHTML="";
        let i=0;
        while(i<details["meals"].length && this.idMeal != details.meals[i].meals[0].idMeal)
            i++;
        let singleMeal = details.meals[i].meals[0];
        if(this.idMeal == singleMeal.idMeal)
        {
            let bolded = document.createElement("b");
            bolded.innerHTML = singleMeal.strMeal + ": ";
            divDettagli.appendChild(bolded);
            divDettagli.innerHTML += singleMeal.strInstructions;    

        }
    }
    function btnImmagine(){
        let i=0;
        while(i<details["meals"].length && this.idMeal != details.meals[i].meals[0].idMeal)
            i++;

        let singleMeal = details.meals[i].meals[0];
        window.location.href = singleMeal.strYoutube;
        
    }
}