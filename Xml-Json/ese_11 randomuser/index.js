"use strict"

let gender = "male";
const intestazione = ["Nome","City","State","Nat","",""];
let nPages;
let currentPage = 0;

window.onload = function(){
    console.log(json);
    let divDettagli = document.getElementById("dettagli");
    let table = document.getElementById("table");
    let nPagina = document.getElementById("nPagina");
    calcolaPagine();
    nPagina.innerHTML = (currentPage+1) + "/" + (nPages);
    document.getElementById("optMale").addEventListener("change",rdbChanged);
    document.getElementById("optFemale").addEventListener("change",rdbChanged);

    document.getElementById("primoButton").addEventListener("click",btnClicked);
    document.getElementById("indietroButton").addEventListener("click",btnClicked);
    document.getElementById("avantiButton").addEventListener("click",btnClicked);
    document.getElementById("ultimoButton").addEventListener("click",btnClicked);
    generaIntestazione();
    generaPagina();

    function calcolaPagine(){
        nPages = json[gender].length / 6;
        if(!isInt(nPages))
            nPages = Math.floor(nPages)+1;
        if(Math.floor(nPages) != nPages)
            nPages = parseInt(nPages);
    }
    function isInt(n){
        return n % 1 === 0;
    }
    function generaPagina(){
        calcolaPagine();

        for(let i=(0+(currentPage*6));i<(6+(currentPage*6));i++)
        {
            if(json[gender][i]==null)
                return ;
            let singleRowItem = json[gender][i]
            let tr = document.createElement("tr");
            let thNome = document.createElement("th");
            thNome.innerHTML = singleRowItem.name.first + " " + singleRowItem.name.last
            tr.appendChild(thNome);

            let thCity = document.createElement("th");
            thCity.innerHTML = singleRowItem.location.city;
            tr.appendChild(thCity);

            let thState = document.createElement("th");
            thState.innerHTML = singleRowItem.location.state;
            tr.appendChild(thState);

            let thNat = document.createElement("th");
            thNat.innerHTML = singleRowItem.nat;
            tr.appendChild(thNat);

            let thDettagli = document.createElement("th");
            thDettagli.id = i;
            thDettagli.addEventListener("click",viewRow);
            let imgDett = document.createElement("img");
            imgDett.src = "img/lente.jpg";
            imgDett.style.width = "30px";
            thDettagli.appendChild(imgDett);
            tr.appendChild(thDettagli);

            let thDelete = document.createElement("th");
            thDelete.id = i;
            thDelete.addEventListener("click",deleteRow);
            let imgDele = document.createElement("img");
            imgDele.src = "img/delete.png";
            imgDele.style.width = "30px";
            thDelete.appendChild(imgDele);
            tr.appendChild(thDelete);

            table.appendChild(tr);
        }
    }
    function generaIntestazione(){
        let tr = document.createElement("tr");
        for (const intestItem of intestazione) {
            let th = document.createElement("th");
            th.innerHTML = intestItem;
            tr.appendChild(th);
        }
        table.appendChild(tr);
    }
    function rdbChanged(){
        if(this.id == "optMale")
            gender = "male";
        else if(this.id == "optFemale")
            gender = "female"
        
        currentPage = 0;
        generaTutto();
    }
    function btnClicked(){
        calcolaPagine();
        switch(this.id)
        {
            case "primoButton":
                currentPage = 0;
                break;
            case 'ultimoButton':
                currentPage = nPages-1;
                break;
            case 'avantiButton':
                if(currentPage < nPages-1)
                    currentPage++;
                else
                    alert("Si è già posizionati sull'ultima pagina");
                break;
            case 'indietroButton':
                if(currentPage != 0)
                    currentPage--;
                else
                    alert("Si è già posizionati sulla prima pagina");
                break;

        }
        generaTutto();
    }
    function generaTutto(){
        table.innerHTML = "";
        generaIntestazione();
        generaPagina();
        nPagina.innerHTML = (currentPage+1) + "/" + (nPages);
    }

    function viewRow(){
        divDettagli.innerHTML = "";
        let index = this.id;
        let h4 = document.createElement("h4");
        h4.innerHTML = json[gender][index].email;
        divDettagli.appendChild(h4);
        let img = document.createElement("img");
        img.src=json[gender][index].picture.large;
        divDettagli.appendChild(img);
        let h4Number = document.createElement("h4");
        h4Number.innerHTML = json[gender][index].phone;
        divDettagli.appendChild(h4Number);
        
    }
    function deleteRow(){
        let index = this.id;
        json[gender].splice(index,1);
        calcolaPagine();
        if(currentPage >= nPages)
            currentPage--;
        generaTutto();
    }

}