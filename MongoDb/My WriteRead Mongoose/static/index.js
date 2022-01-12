$(function () {
    const _tbody1 = $("#tbody1");
    const _btnSend = $("#submit1");
    const _btnUpdate = $("#update1");
    const _btnOpenModal = $("#openModal");

    let modalOpened = false;
    $("#formAddRecord").hide();

    ajaxCallRead();

    async function ajaxCallRead() {
        await $.ajax({
            type: "GET",
            url: "api/readData",
            contentType: "application/json; charset=utf-8",
            dataType: "json",

            success: function (data) {
                console.log(data)
                loadTable(data);
            },

            error: function (msg) {
                console.log(msg);
            }
        })
    }

    function loadTable(data) {
        _tbody1[0].innerHTML = "";
        for (const user of data) {
            let tr = $("<tr>", {
                appendTo: _tbody1
            })
            for (const key in user) {
                if (Object.hasOwnProperty.call(user, key)) {
                    const element = user[key];

                    if (key == "_id")
                        tr.append($("<th>", {
                            html: element,
                            scope: "col"
                        }))
                    else
                        tr.append($("<td>", {
                            html: element,
                            scope: "col"
                        }))
                }
            }
        }
    }
    function convertForm2Json() {
        var unindexed_array = $("#formAddRecord").serializeArray();
        var indexed_array = {};

        $.map(unindexed_array, function (n, i) {
            indexed_array[n['name']] = n['value'];
        });
        return indexed_array;
    }
    function ajaxCallWrite(){
        $.ajax({
            type: "POST",
            url: "api/writeData",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(convertForm2Json()),
            dataType: "json",
            async: true,

            success: function (data) {
                console.log(data)
            },

            error: function (msg) {
                console.log(msg);
            }
        })
    }
    

    _btnSend.on("click", function (e) {
        e.preventDefault();
        ajaxCallWrite();
    })
    _btnUpdate.on("click",function(){
        ajaxCallRead();
    })
    _btnOpenModal.on("click",function(){
        modalOpened = !modalOpened;
        if(modalOpened)
            $("#formAddRecord").show();
        else
            $("#formAddRecord").hide();
    })
})