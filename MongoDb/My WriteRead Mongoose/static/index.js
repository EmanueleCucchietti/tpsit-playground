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
            tr.append($("<td>", {
                append: [
                    $("<button>", {
                        html: "Elimina",
                        class: "btn btn-primary",
                        style: "float: right;",

                        on: {
                            "click": (e) => {
                                ajaxCallDelete($(e.target).parent().siblings().eq(0).text());
                            }
                        }
                    })
                ]
            }))
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
    function ajaxCallWrite() {
        $.ajax({
            type: "POST",
            url: "api/writeData",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(convertForm2Json()),
            dataType: "json",
            async: true,

            success: function (data) {
                console.log(data)
                console.log(data.slice(0, 4))
                if (data.slice(0, 4) == "wait")
                    alert("Wait " + (data.slice(4) / 1000) + " seconds pls");
                else {
                    ajaxCallRead();
                }
            },

            error: function (msg) {
                console.log(msg);
            }
        })
    }
    function ajaxCallDelete(idItem) {

        $.ajax({
            type: "DELETE",
            url: "api/deleteData" + "?_id=" + idItem,
            contentType: "application/json; charset=utf-8",
            dataType: "json",

            success: function (data) {
                console.log(data)
                loadTable(data)
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
    _btnUpdate.on("click", function () {
        ajaxCallRead();
    })
    _btnOpenModal.on("click", function () {
        modalOpened = !modalOpened;
        if (modalOpened)
            $("#formAddRecord").show();
        else
            $("#formAddRecord").hide();
    })

})