$(document).ready(function () {
    let imgUser = $("#imgUser");
    let imgContainer = $("#selectImgContainer");
    let positionsImgsX = ["0", "-68px", "-135px", "-203px", "-270px", "-338px"];
    let subTitleNames = ["Hi, My name is", "My email address is", "My birthday is", "My address is", "My phone number is", "My password is"];
    let subTitle = $("#subTitle");
    let mainTitle = $("#mainTitle");
    let indexPage = 0;
    let maxNumberUser = 14;
    let lastSelected;
    let firstIcon;
    let personData;
    let gender = "";
    let ajaxCallOnline = false;

    //Arrows
    let rightArrow = $("#rightArrow");
    let leftArrow = $("#leftArrow");
    //Nat Checkboxes
    let everyNat = $("#everyNat");
    let singleNat = [$("#natAU"), $("#natUS"), $("#natCA"), $("#natDK")]
    let rdBtnAll = $("#rdBtnAll")

    init();
    let slider = $('#sliderResults').slider({
        formatter: function (value) {
            return value;
        }
    });

    ajaxCall(14);


    function setImgUser() {
        imgUser.prop("src", personData.results[indexPage].picture.large)
    }
    function setDataUser(index) {
        mainTitle.prop("innerHTML", setTitle(index))
    }
    function setDataType(index) {
        subTitle.prop("innerHTML", subTitleNames[index])
    }
    function setTitle(id) {
        let person = personData.results[indexPage];
        switch (id) {
            case 0:
                return person.name.first + " " + person.name.last;
            case 1:
                return person.email;
            case 2:
                let date = new Date(person.dob.date)
                let day = date.getDate().toString();
                let month = date.getMonth().toString();
                let year = date.getFullYear().toString();
                let string = day + "/" + month + "/" + year;
                return string;
            case 3:
                return person.location.street.number + " " + person.location.street.name;
            case 4:
                return person.phone;
            case 5:
                return person.login.password;
        }
    }


    function changeData() {
        setImgUser();
        firstIcon.style.backgroundPosition = positionsImgsX[this.index] + " " + "-96px";
        lastSelected.style.backgroundPosition = positionsImgsX[lastSelected.index] + " " + "-48px";
        setDataUser(0);
        setDataType(0);
    }
    resetUsers();
    function resetUsers() {
        leftArrow.css("visibility", "hidden")
        indexPage = 0;
        if (maxNumberUser == 1)
            rightArrow.css("visibility", "hidden")
        else
            rightArrow.css("visibility", "visible")
    }
    function inGoingAjaxCall() {
        ajaxCallOnline = false;
    }
    function ajaxCall(nUsers) {
        $.ajax({
            type: "GET",
            url: ("https://randomuser.me/api/" + composeQuery(nUsers)),
            dataType: "json",

            success: function (msg) {
                personData = msg;
                setImgUser();
                setDataUser(indexPage);
                setDataType(indexPage);
            },

            error: function (msg) {
                console.log(msg);
            }
        })
    }
    function composeQuery(nUsers) {
        let query;
        //nResults
        query = "?results=" + nUsers;
        //typeGender
        query += gender;
        //selectNat
        query += verifyNat();

        console.log(query)
        return query
    }
    function verifyNat() {
        if ($("#everyNat").prop("checked") == true)
            return "";
        else {
            let firstOne = true;
            let nat = "";
            if ($("#natAU").prop("checked") == true) {
                if (firstOne) {
                    nat = "&nat=";
                }
                if (!firstOne) {
                    nat += ",";
                }
                firstOne = false;
                nat += "au";
            }
            if ($("#natUS").prop("checked") == true) {
                if (firstOne) {
                    nat = "&nat=";
                }
                if (!firstOne) {
                    nat += ",";
                }
                firstOne = false;
                nat += "us";
            }
            if ($("#natCA").prop("checked") == true) {
                if (firstOne) {
                    nat = "&nat=";
                }
                if (!firstOne) {
                    nat += ",";
                }
                firstOne = false;
                nat += "ca";
            }
            if ($("#natDK").prop("checked") == true) {
                if (firstOne) {
                    nat = "&nat=";
                }
                if (!firstOne) {
                    nat += ",";
                }
                firstOne = false;
                nat += "dk";
            }
            return nat;
        }

    }

    //--------------------------------------------------//

    /* EVENTLISTENER */


    //->slider
    slider.on("slide", slideMoves)
    //->arrows
    rightArrow.on("click", slideRight);
    leftArrow.on("click", slideLeft);
    //->rdBtnGender
    $("#rdBtnMale").on("click", verifyGender);
    $("#rdBtnFemale").on("click", verifyGender);
    $("#rdBtnAll").on("click", verifyGender);
    //->nats
    $("#natAU").on("click", checkNat);
    $("#natUS").on("click", checkNat);
    $("#natDK").on("click", checkNat);
    $("#natCA").on("click", checkNat);
    $("#everyNat").on("click", checkNat);

    //->chkNats
    // disable singleNat onClick of everyNat
    // disable everyNat onClick of singleNat
    for (const itemNat of singleNat) {
        itemNat.on("click", function () {
            if (itemNat.prop("checked") == true)
                everyNat.prop("checked", false);
        })
    }
    everyNat.on("click", function () {
        for (const itemNat of singleNat) {
            itemNat.prop("checked", false)
        }
    })

    //->imgUserNewAjaxCall
    imgUser.on("mouseenter", newUserSetEnter)
    imgUser.on("mouseleave", newUserSetLeave)
    $("#btnNewUserSet").on("mouseenter", newUserSetEnter)
    $("#btnNewUserSet").on("mouseleave", newUserSetLeave)
    $("#btnNewUserSet").on("click", setNewUser)



    /* EVENTLISTENER */

    //--------------------------------------------------//

    /* EVENT ASSOCIATED FUNCTIONS */

    //->slider
    function slideMoves() {
        maxNumberUser = slider.prop("value");
        resetUsers();
        if (!ajaxCallOnline) {
            ajaxCallOnline = true;
            ajaxCall(slider.prop("value"));
            setTimeout(inGoingAjaxCall, 75);
        }
    }

    //->arrows
    function slideRight() {
        leftArrow.css("visibility", "visible")
        if (indexPage == maxNumberUser - 2)
            rightArrow.css("visibility", "hidden");
        indexPage++;
        changeData()
    }
    function slideLeft() {
        rightArrow.css("visibility", "visible")
        if (indexPage == 0 + 1)
            leftArrow.css("visibility", "hidden");
        indexPage--;
        changeData()
    }

    //->rdBtnGender
    function verifyGender() {
        switch (this.value) {
            case "1":
                gender = "&gender=male"
                break;
            case "2":
                gender = "&gender=female"
                break;
            case "3":
                gender = "";
                break;
        }
        if (!ajaxCallOnline) {
            ajaxCallOnline = true;
            ajaxCall(slider.prop("value"));
            setTimeout(inGoingAjaxCall, 75);
        }
        resetUsers();

    }

    //->nats
    function checkNat() {
        if (!ajaxCallOnline) {
            ajaxCallOnline = true;
            ajaxCall(slider.prop("value"));
            setTimeout(inGoingAjaxCall, 75);
        }
        resetUsers();
    }

    //->imgIconsSlideTop/Down
    function hoverIconsIn() {
        lastSelected.style.backgroundPosition = positionsImgsX[lastSelected.index] + " " + "-48px";
        this.style.backgroundPosition = positionsImgsX[this.index] + " " + "-96px";
        setDataType(this.index);
        setDataUser(this.index)
        lastSelected = this;
    }

    //->imgUserNewAjaxCall
    function newUserSetEnter() {
        $("#btnNewUserSet").css("visibility", "visible");
    }
    function newUserSetLeave() {
        $("#btnNewUserSet").css("visibility", "hidden");
    }
    function setNewUser() {
        ajaxCall(slider.prop("value"));
        resetUsers();
    }
    /* EVENT ASSOCIATED FUNCTIONS */

    //--------------------------------------------------//

    /* INIT FUNCTIONS */

    function init() {
        loadImgContainer();
        leftArrow.css("visibility", "hidden")
        $("#everyNat").prop("checked", true);
        rdBtnAll.prop("checked", true);
    }
    function loadImgContainer() {
        for (let i = 0; i < 6; i++) {
            let singleImg = $("<li>", {
                "appendTo": imgContainer,
                "css": { "background-position": positionsImgsX[i] + " " + "-48px" },
                "on": { "mouseenter": hoverIconsIn }
            })
            singleImg.prop("index", i);
            if (i == 0) {
                firstIcon = singleImg[0];
                lastSelected = singleImg[0];
                singleImg.css("background-position", positionsImgsX[singleImg.prop("index")] + " " + "-96px");
            }
        }
    }

    /* INIT FUNCTIONS */


})