"option strict"

$(document).ready(function () {
    let _page1 = $("#PAGE1");
    let _page1Data = $("#PAGE1_DATA");
    let _page2 = $("#PAGE2");
    let _page2Data = $("#PAGE2_DATA");
    let _page3 = $("#PAGE3");
    let _page3Data = $("#PAGE3_DATA");
    let btnInviaCitta = _page1Data.children("button");
    btnInviaCitta.on("click",inviaCitta);
    let btnChiudi = _page3Data.children("button")
    btnChiudi.on("click",()=>{
        window.close();
    })
    let negoziArray;
    let negozio;
    let regalo;
    _page3.hide();
    _page2.hide();

    let requestCitta = inviaRichiesta("GET", "/citta")
    requestCitta.fail(errore)
    requestCitta.done(function (data) {
        loadCitta(data);
    })



    function loadCitta(data) {
        let formCheck = _page1Data.children("div:first-of-type")
        for (const [i, citta] of data.entries()) {
            let clone = $(formCheck.clone())
            clone.find("input").prop("name", "inputs")
            clone.find("label").prop("innerHTML", citta.nome)
            clone.find("input").prop("idcitta",citta.id)
            clone.insertBefore(formCheck)
        }
        let clone = $(formCheck.clone())
        clone.find("input").prop("name", "inputs")
        clone.find("label").prop("innerHTML", "purtroppo no")
        clone.find("input").prop("idcitta","none")
        clone.find("input").prop("checked",true)
        clone.insertBefore(formCheck)
        formCheck.remove();
    }
    function inviaCitta(){
        let inputSelected = $(_page1Data.find("input:checked"))
        let idSelected = inputSelected.prop("idcitta")
        if(idSelected == "none"){
            //purtroppo no selected
            failedInput()
        }
        else
        {
            //citta selected
        _page1.hide();
        _page2.show();
            successfulInput(idSelected)
        }
    }

    function successfulInput(idSelected){
        let regaliArray=[]
        let nNegozi;
        let requestNegozi = inviaRichiesta("GET", "/negozi/", {"codCitta": idSelected})
        requestNegozi.fail(errore)
        requestNegozi.done(function(data){
            negoziArray = data;
            nNegozi = data.length;
            for (const [i,negozio] of data.entries()) {
                let requestRegaliPerNegozio = inviaRichiesta("GET", "/regali/", {"codNegozio": negozio.id})
                requestRegaliPerNegozio.fail(errore)
                requestRegaliPerNegozio.done(function(regalo){
                    for (const item of regalo) {
                        regaliArray.push(item)
                    }
                    if(i==nNegozi-1)
                    {
                        //lastRequest
                        let regalo = regaliArray[generaNumero(0,regaliArray.length-1)]
                        fillFields(regalo);
                        decrementQtaRegalo(regalo);
                    }
                })
            }
        })
    }
    function fillFields(item){
        let i=0;
        let reqNegozio = inviaRichiesta("GET", "/negozi/"+item.codNegozio)
        reqNegozio.fail(errore)
        reqNegozio.done(function(data){
            negozio = data;
        _page2Data.find("div").children("img").eq(0).prop("src", "img/img"+item.id+".jpg")
        _page2Data.find("p").eq(0).children("span").eq(1).prop("innerHTML", item.nome)
        _page2Data.find("p").eq(1).children("span").eq(1).prop("innerHTML", item.descrizione)
        _page2Data.find("p").eq(2).children("span").eq(1).prop("innerHTML", "")
        _page2Data.find("p").eq(3).children("span").eq(1).prop("innerHTML", data.nome)
        _page2Data.find("p").eq(4).children("span").eq(1).prop("innerHTML", data.indirizzo)
        _page2Data.find("button").on("click", ()=>{
            _page2.hide();
            _page3.show();
            let json = {
                "IDRegalo": regalo.id,
                "descrizione": regalo.descrizione,
                "indirizzo": negozio.indirizzo,
                "negozio": negozio.nome,
                "nome": regalo.nome
            }
            let divQr = _page3Data.children("div").eq(0);
            divQr.qrcode(JSON.stringify(json))
        })
        })
    }
    function decrementQtaRegalo(item){
        let requestDecrement = inviaRichiesta("PATCH", "/regali/"+item.id, {"qta": (item.qta-1)})
        requestDecrement.fail(errore)
        requestDecrement.done(function(){
            alert("quantità aggiornato")
            //printJson
            regalo = item
        })
    }

    function failedInput(){
        let divSpan = _page1.children("div").eq(1).children("div").eq(1)
            let span = divSpan.children("span").eq(0).prop("innerHTML", "Mi dispiace hai perso una buona occasione")
            span.append("<br>")
            span.append("<br>")
            let aBtn = $("<a>", {
                "href": "https://www.google.com",
                "html": "Info",
                "addClass": "btn btn-light",

                "appendTo": divSpan
            });
    }
    function generaNumero(a,b){
        //estremi inlcusi
        return Math.floor((b-a+1)*Math.random())+a;
    }
});
