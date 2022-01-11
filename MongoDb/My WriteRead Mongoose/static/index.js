$(function () {
    const _tbody1 = $("#tbody1");

    ajaxCall();

    async function ajaxCall() {
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
})