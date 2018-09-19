let area = document.getElementsByClassName("info_content")[0];
let div = document.getElementsByClassName("info_content2")[0];
window.onload = function () {
    load_event();
    load_localstorage();
    localStorage.setItem("1","asssss")
    localStorage.setItem("1","dddddd")
    console.log(localStorage.getItem("1"));
};
let load_event = function () {
    let info_add = document.getElementsByClassName("info_add")[0];
    let info_content = document.getElementsByClassName("info_content")[0];

    info_add.addEventListener('click', function () {
        if(info_content.value!==""){
            console.log(localStorage.length + "  - " + info_content.value);
            localStorage.setItem(localStorage.length, info_content.value);
            info_content.value = "";
            load_localstorage();
        }
    });
};
let load_localstorage = function () {
    let str = "";
    for (let key in localStorage) {
        if(key ==="length"){
            break;
        }
        str += "" +
            "<div class='entry w'>" +
            "<div class='entry_text'>" + localStorage.getItem(key) + "</div>" +
            "<div class='entry_edit_button'>&#10000;</div>" +
            "<div class='entry_del'>&#x267b;</div>" +
            "</div>";
    }
    document.getElementsByClassName("load")[0].innerHTML = str;
};