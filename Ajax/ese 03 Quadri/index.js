"option strict"

const URL = "http://localhost:3000"

let artisti;
let quadri;
let artistaSelezionato;
let index = 0;


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
            let radio = $("<input>").prop("type", "radio").prop("name", "rdbArtista").on("change", caricaQuadri).prop("artista", item).appendTo(label);
            label.append(item["name"])
        }
        _header.find("input[type=radio]").eq(generaNumero(0, artisti.length - 1)).prop("checked", true);
        caricaQuadri()

    })

    function caricaQuadri() {
        let artista = _header.find("input[type=radio]:checked").prop("artista");
        let idArtista = artista.id;
        let request = inviaRichiesta("GET", URL + "/quadri", { "artist": idArtista });
        request.fail(errore);
        request.done(function (data) {
            index = 0;
            _btnNext.prop("disabled", false)
            _btnPrev.prop("disabled", false)
            quadri = data;
            console.log(index)
            visualizzaQuadro();
        })

        /*
        console.log("ciao") 
        let idArtista = _header.find("input[type=radio]:checked").val();
        let request = inviaRichiesta("GET", URL + "/quadri" , {"artist":idArtista})
        request.fail(errore)
        request.done(function (data){
            
        })*/
    }
    function incrementaLike() {
        let like = $(this).prop("nLike");
        let thisOne = this
        $(this).hide();
        like++;
        let request = inviaRichiesta("PATCH", URL + "/quadri/" + quadri[index].id, { "nLike": like })
        request.fail(errore)
        request.done((data) => {
            $(thisOne).prop("nLike", like);
            $(thisOne).parent().html("Like = <b> " + like + "</b>");
        })
    }
    function next() {
        console.log(index)
        index++;
        visualizzaQuadro()
    }
    function prev() {
        console.log(index)
        index--;
        visualizzaQuadro()
    }
    function visualizzaQuadro() {
        let artista = _header.find("input[type=radio]:checked").prop("artista");
        if (index == 0)
            _btnPrev.prop("disabled", true);
        else
            _btnPrev.prop("disabled", false);

        if (index == quadri.length - 1)
            _btnNext.prop("disabled", true);
        else
            _btnNext.prop("disabled", false)

        _info.empty();

        $("<div>").html("ID = <b>" + quadri[index].id + "</b>").appendTo(_info)
        $("<div>").html("Titolo = <b>" + quadri[index].title + "</b>").appendTo(_info)
        $("<div>").html("Genere = <b>" + quadri[index].id + "</b>").appendTo(_info)
        let img = $("<img>").prop("src", "img/like.jpg");
        img.prop("nLike", quadri[index].nLike)
        img.css({ "width": "30px", "vertical-align": "middle", "margin-left": "15px" });
        img.on("click", incrementaLike)

        $("<div>").html("Like = <b>" + quadri[index].nLike + "</b>").append(img).appendTo(_info)
        if (!quadri[index].img.startsWith("data:image/"))
            _img.css("background-image", "url('img/" + quadri[index].img + "')")
        else
            _img.css("background-image", "url('" + quadri[index].img + "')")
        _img.css("width", "200px").css("height", "150px").css("background-size", "cover")
    }

    _btnNext.on("click", next)
    _btnPrev.on("click", prev)
    $("#btnSalva").on("click", function () {
        let file = $("#immagine").prop("files")[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            let quadro = {
                "artist":  _header.find("input[type=radio]:checked").prop("artista").id,
                "title": $("#titolo").val(),
                "img": reader.result,
                "nLike": 0
            }
            let request = inviaRichiesta("POST", URL + '/quadri', quadro);
            request.fail(errore);
            request.done(function(){
                console.log("Quadro salvato correttamente");
                caricaQuadri()
            })
        }
    })
})
