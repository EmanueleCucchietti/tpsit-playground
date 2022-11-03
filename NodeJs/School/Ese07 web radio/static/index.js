$(function(){
    let regionList = $("#lstRegioni");
    regionList.on("click", function(){
        let region = $(this).val();
        $.post("/api/elenco", {regione: region}, function(data){
            /* data is the response from the server */
            console.log(data);
        });
    });
    updateRegionList(regionList);

    /* execute ajax post call and request /api/elenco */
    /* passes "Marche" as parameter */
    
})

function updateRegionList(regionList){  
    $.get("/api/elenco", function(data){
        regionList.empty();
        regionList.append("<option value=''>tutti</option>");
        for (const region of data) {
            let option = $("<option>");
            option.val(region.name);
            option.text(`${region.name} [${region.stationcount}]`);   
            option.appendTo(regionList);
        }
        console.log(data)
    });
}