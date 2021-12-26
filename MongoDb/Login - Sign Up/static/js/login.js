$(function () {
    $(document).on("click", "#btnSubmitLogin", function (e) {
        submit(e)
    });

    function submit(e) {
        e.preventDefault();
        let dataForm = convertForm2Json();
        
        $.ajax({
            type: "POST",
            url: "api/login",
            data: JSON.stringify(dataForm),
            contentType: "application/json; charset=utf-8",
            dataType: "json",

            success: function (msg) {
                if(msg.status === 'ok')
                {
                    console.log('Ricevuto il token: '+msg.data)
                    alert('Success');
                }
                else
                    msg.error
            },

            error: function (msg) {
                console.log(msg);
            }


        });
    }
    function convertForm2Json(){
        var unindexed_array = $("#formLogin").serializeArray();
        var indexed_array = {};

        $.map(unindexed_array, function (n, i) {
            indexed_array[n['name']] = n['value'];
        });
        console.log(indexed_array);
        return indexed_array;
    }
})