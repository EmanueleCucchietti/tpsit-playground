$(function () {
    $(document).on("click", "#btnSubmitChangePassword", function (e) {
        submit(e)
    });

    function submit(e) {
        e.preventDefault();
        let dataForm = convertForm2Json();
        dataForm.token = localStorage.getItem('token');
        
        $.ajax({
            type: "POST",
            url: "api/change-password",
            data: JSON.stringify(dataForm),
            contentType: "application/json; charset=utf-8",
            dataType: "json",

            success: function (msg) {
                console.log(msg);
            },

            error: function (msg) {
                console.log(msg);
            }


        });
    }
    function convertForm2Json(){
        var unindexed_array = $("#formChangePassword").serializeArray();
        var indexed_array = {};

        $.map(unindexed_array, function (n, i) {
            indexed_array[n['name']] = n['value'];
        });
        return indexed_array;
    }
})