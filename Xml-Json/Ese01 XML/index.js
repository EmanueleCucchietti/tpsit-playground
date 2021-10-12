'use strict'

function crea() {
    // bookstore = bookstore.replace(/>\s*/g, '>');
    // bookstore = bookstore.replace(/\s*</g, '<');
    localStorage.setItem("bookstore_xml", bookstore);
    alert("Dati salvati correttamente nel localStorage");
}

function visualizza() {
    // lettura della stringa dal localStorage
    let xml = localStorage.getItem("bookstore_xml");
    let parser = new DOMParser();
    var xmlDom = parser.parseFromString(xml, "text/xml");

    let _tablibri = document.getElementById("tabLibri");

    //accedo al puntatore dell'elemento radice dell'albero XML
    let root = xmlDom.documentElement;

    let _tr, _th;
    let title = "", author = "", year = "", price = "", category = "", lang = "";

    //for(let i=0; i<root.children.length;i++){
    //puntatore al figlio della root in posizione i
    //let book=root.children[i]
    //}

    //il for of restituisce il contenuto di un vettore. al primo giro, il primo contenuto,al secondo quello in posizione 1...
    for (let book of root.children) {

        title = "", author = "", year = "", price = "", category = "", lang = "";



        if (book.hasAttribute("category"))
            category += book.getAttribute("category") + " ";
        for (let item of book.children) {
            if (item.tagName == "title") {
                title += item.textContent + " ";
                if (item.hasAttribute("lang"))
                    lang += item.getAttribute("lang") + " ";
            }
            else if (item.tagName == "author")
                author += item.textContent + " ";
            else if (item.tagName == "year")
                year += item.textContent + " ";
            else if (item.tagName == "price")
                price += item.textContent + " ";





        }
        _tr = document.createElement("tr");
        _tablibri.appendChild(_tr);
        for (let i = 0; i < 6; i++) {
            _th = document.createElement("td");
            switch (i) {
                case 0:
                    _th.innerHTML = title;
                    break;
                case 1:
                    _th.innerHTML = category;
                    break;
                case 2:
                    _th.innerHTML = lang;
                    break;
                case 3:
                    _th.innerHTML = author;

                    break;

                case 4:
                    _th.innerHTML = year;
                    break;
                case 5:
                    _th.innerHTML = price;
                    break;

            }
            _tr.appendChild(_th);
        }
    }
    









}

