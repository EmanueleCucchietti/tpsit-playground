"option strict"

const URL = "http://localhost:3000"

let artisti;
let quadri;
let artistaSelezionato;

$(function () {
    let _header = $('.header');
    let _info = $('.info');
    let _img = $('.img');
    let _btnPrev = $('button').eq(0);
    let _btnNext = $('button').eq(1);
    _btnPrev.prop("disabled", true)

    let _wrapperAdd = $('.wrapper').eq(1);

    let request = inviaRichiesta("GET", URL + "/artisti")
    request.fail(errore)
    request.done(function (data) {
        artisti = data;
        for (const item of artisti) {
            let label = $("<label>").appendTo(_header);
            let radio = $("<input>").prop("type", "radio").prop("name", "rdbArtista").on("change", caricaQuadri).prop("artista",item).appendTo(label);
            label.append(item["name"])
        }
        _header.find("input[type=radio]").eq(generaNumero(0, artisti.length-1)).prop("checked", true);
        caricaQuadri()

    })

    function caricaQuadri() {
        let artista = _header.find("input[type=radio]:checked").prop("artista");
        let idArtista = artista.id;
        let request = inviaRichiesta("GET", URL + "/quadri", {"artist": idArtista});
        request.fail(errore);
        request.done(function(data){
            quadri=data;
            _info.html("");
            $("<div>").html("ID = <b>" + quadri[0].id + "</b>").appendTo(_info)
            $("<div>").html("Titolo = <b>" + quadri[0].title + "</b>").appendTo(_info)
            $("<div>").html("Genere = <b>" + quadri[0].id + "</b>").appendTo(_info)
            let img = $("<img>").prop("src", "img/like.jpg");
            img.css({"width": "30px", "vertical-align": "middle", "margin-left": "15px"});
            img.on("click", incrementaLike)

            $("<div>").html("Like = <b>" + quadri[0].nLike + "</b>").append(img).appendTo(_info)
            _img.css("background-image", "url('img/"+ quadri[0].img + "')")
            _img.css("width","200px").css("height","150px").css("background-size","cover")
        })

        /*
        console.log("ciao") 
        let idArtista = _header.find("input[type=radio]:checked").val();
        let request = inviaRichiesta("GET", URL + "/quadri" , {"artist":idArtista})
        request.fail(errore)
        request.done(function (data){
            
        })*/
    }
    function incrementaLike(){
        console.log("aumento")
    }

})
