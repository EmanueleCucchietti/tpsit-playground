$(function(){
    $("#btnGetApiData").on("click",_=>{
        let req = $.ajax($("#txtUrl").val());
        req.done((data)=>{
            $("#txtUrl").val("");
            console.log(data)
            alert(data)
        })
    })
});