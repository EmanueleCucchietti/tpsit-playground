"use strict"

let bookstore;//vettore enumerativo contenente JSON

function converti() {
    bookstore = [];
    var xml = localStorage.getItem("bookstore_xml");
    if (xml == null)
        alert("File mancante");
    else {
        let parser = new DOMParser();
        let xmlDom = parser.parseFromString(xml, "text/xml");

        //accedo alla radice dell'albero xml
        let root = xmlDom.documentElement;
        for (const book of root.children) {
            let json = {};
            if (book.hasAttribute("category"))
                json["category"] = book.getAttribute("category");
            for (let campi of book.children) {
                if (campi.tagName == "author") {
                    if (!("authors" in json))//se esiste già il vettore degli autori
                        json["authors"] = [];

                    json["authors"].push(campi.textContent);


                }

                else
                    json[campi.tagName] = campi.textContent;
                if (campi.tagName == "title" && campi.hasAttribute("lang"))
                    json["lang"] = campi.getAttribute("lang");


            }

            bookstore.push(json);//serializza il JSON

            console.log(JSON.stringify(json, null, 3));//console.log() serializza in automatico perciò non serve JSON.stringify()
        }

        
        localStorage.setItem("bookstore_json", JSON.stringify(bookstore));

    }






}
