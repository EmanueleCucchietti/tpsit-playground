class animal{
    name;
    nZampe;
    dieta;
    constructor(name,nZampe,dieta){
        this.name = name;
        this.nZampe = nZampe;
        this.dieta = dieta;
    }
    feed(){
        const {name,dieta} = this;
        return "Dai da mangiare " + dieta + " a " + name;
    }
}

window.onload = function(){
    console.log("test")
    let zebra = new animal("zebra",4,"erba");
    console.log(zebra.feed())
}