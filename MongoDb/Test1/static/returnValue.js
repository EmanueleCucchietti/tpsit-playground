$(document).ready(function () {
    $.ajax({
        url: '/api/requestJson',
        dataType: 'json',
        success: function (data) {
            console.log(data);
        }
    });
});
