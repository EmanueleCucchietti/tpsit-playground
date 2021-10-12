"use strict"

window.onload = function(){
    let typeSelect="All"; //alc-not alc--all
    let ingrSelect = "Tutti gli Ingredienti";

    let divDettagli = document.getElementById("dettagli");
    let table = document.getElementsByTagName("table")[0];
    /*let rdbtnAll = */document.getElementById("optTutti").addEventListener("change",verificaRadio);
    /*let rdbtnAlc = */document.getElementById("optAlcoholic").addEventListener("change",verificaRadio);
    /*let rdbtnNonAlc = */document.getElementById("optNonAlcoholic").addEventListener("change",verificaRadio);

    
    
    generaComboIngredienti();
    generaRows();

    function generaIntestazione(){
        let thead = document.createElement("thead");
        table.appendChild(thead);
        let tr = document.createElement("tr");
        thead.appendChild(tr);
        let Width = ["40px", "40px", "60px", "70px", "70px", "40px"];
        let Text = ["","Id","Name","Alcholic","Main ingredient",""];
        for(let i=0;i<6;i++){
            let td = document.createElement("td")
            td.innerHTML = Text[i];
            td.style.width = Width[i];
            tr.appendChild(td);
        }
    }
    function generaComboIngredienti(){
        let lstIngredienti = document.getElementById("lstIngredienti");
        lstIngredienti.addEventListener("change",comboBoxSelezioneCambiata);
        let optBlank = document.createElement("option");
            optBlank.innerHTML = "Tutti gli Ingredienti";
            lstIngredienti.appendChild(optBlank);
        let ingrSorted = ingredients.ingredients.sort((a,b) => (a.strIngredient1 > b.strIngredient1) ? 1 : ((b.strIngredient1 > a.strIngredient1) ? -1 : 0));
        for (const ingr of ingrSorted) {
            let opt = document.createElement("option");
            opt.innerHTML = ingr.strIngredient1;
            lstIngredienti.appendChild(opt);
        }
    }

    function comboBoxSelezioneCambiata(){
        ingrSelect = this.options[this.selectedIndex].value;
        generaRows();
    }
    function verificaRadio(){
        switch(this.id)
        {
            case "optTutti":
                typeSelect = "All";
                break;
            case "optAlcoholic":
                typeSelect = "Alcholic";
                break;
            case "optNonAlcoholic":
                typeSelect = "Non alcoholic";
                break;
        }
        generaRows();
    }

    function generaRows(){
        table.innerHTML = "";
        generaIntestazione();
        let tbody = document.createElement("tbody");
        table.appendChild(tbody);
        let printRow = true;
        let drinksVect = cocktails.drinks;
        for (const singleDrink of drinksVect) {
            if(typeSelect != singleDrink.strAlcoholic && typeSelect != "All")
                printRow = false;
            if(ingrSelect != singleDrink.strIngredient1 && ingrSelect != "Tutti gli Ingredienti")
                printRow = false;
            if(printRow)
            {
                let tr = document.createElement("tr");
                tbody.appendChild(tr);
                for(let i=0;i<6;i++){
                    let td = document.createElement("td");
                    switch(i){
                        case 0: 
                            let img = document.createElement("img");
                            img.src = singleDrink.strDrinkThumb;
                            img.style.width = "40px";
                            td.appendChild(img);
                            break;
                        case 5:
                            let a = document.createElement("a");
                            a.addEventListener("click",apriDettagli);
                            a.href = "#";
                            a.innerHTML = "Dettagli";
                            a.iddrink = singleDrink.idDrink;
                            td.appendChild(a)
                            break;
                        case 1:
                            td.innerHTML = singleDrink.idDrink;
                            break;
                        case 2:
                            td.innerHTML = singleDrink.strDrink;
                            break;
                        case 3:
                            td.innerHTML = singleDrink.strAlcoholic;
                            break;
                        case 4:
                            td.innerHTML = singleDrink.strIngredient1;
                            break;
                    }
                    tr.appendChild(td);
                }
            }
            printRow=true;
        }
    }

    function apriDettagli(){
        
        divDettagli.innerHTML="";
        let i=0;
        while(i<cocktails.drinks.length && this.iddrink != cocktails.drinks[i].idDrink)
            i++;
        if(this.iddrink == cocktails.drinks[i].idDrink)
        {
            let h3 = document.createElement("h2");
            h3.innerHTML = cocktails.drinks[i].strDrink;
            divDettagli.appendChild(h3);
            let p = document.createElement("p");
            let str = "";
            let j=1;
            while(cocktails.drinks[i]["strIngredient"+j]!=null && j<15){
                str += cocktails.drinks[i]["strIngredient"+j] + " - ";
                j++;
            }
            str = str.slice(0,str.length-2);
            p.innerHTML = str;
            divDettagli.appendChild(p)
            let img = document.createElement("img");
            img.src = cocktails.drinks[i].strDrinkThumb;
            img.style.width = "140px";
            divDettagli.appendChild(img);
        }

        
    }
}