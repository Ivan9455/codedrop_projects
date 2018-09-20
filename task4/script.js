let load_id = 0;
let div_up = document.getElementsByClassName("update")[0];
let save = document.getElementsByClassName("save")[0];
let exit = document.getElementsByClassName("exit")[0];
let info_add = document.getElementsByClassName("info_add")[0];
let info_content = document.getElementsByClassName("info_content")[0];
window.onload = function () {
    load_localstorage();
    load_event();
    $("body").on('click', ".entry_del", function () {
        localStorage.removeItem($(this.parentElement.getElementsByClassName("entry_text")[0])[0].dataset.key);
        load_localstorage();
    }).on('click', ".entry_edit_button", function () {
        $(".update").css('display', 'block');
        $('.update_text').html("");
        $(".update_text").html(
            localStorage.getItem($(this.parentElement.getElementsByClassName("entry_text")[0])[0].dataset.key));
        $(".update_text").attr("data-key",
            $(this.parentElement.getElementsByClassName("entry_text")[0])[0].dataset.key);
        load_localstorage();
    });

};
// let load_events = function () {
//     let entry_edit_button = document.getElementsByClassName("entry_edit_button");
//     let entry_del = document.getElementsByClassName("entry_del");
//     for (let i = 0; i < entry_edit_button.length; i++) {
//         entry_edit_button[i].addEventListener('click', function () {
//             div_up.style.display = "block";
//             div_up.getElementsByClassName("update_text")[0].innerText =
//                 localStorage.getItem(
//                     this.parentElement.getElementsByClassName("entry_text")[0].getAttribute("data-key"));
//             div_up.getElementsByClassName("update_text")[0].setAttribute("data-key",
//                 this.parentElement.getElementsByClassName("entry_text")[0].getAttribute("data-key"))
//             console.log(this.parentElement.getElementsByClassName("entry_text")[0].getAttribute("data-key"))
//             //load_localstorage();
//         });
//     }
//     for (let i = 0; i < entry_del.length; i++) {
//         entry_del[i].addEventListener('click', function () {
//             console.log(this.parentElement.getElementsByClassName("entry_text")[0])
//             localStorage.removeItem(this.parentElement.getElementsByClassName("entry_text")[0].getAttribute("data-key"));
//             //document.getElementsByClassName("load")[0].innerHTML = "";
//             load_localstorage();
//         });
//     }
//
// };
let load_event = function () {
    $("body").on('click', ".info_add", function () {
        if (info_content.value !== "") {
            console.log(localStorage.length + "  - " + info_content.value);
            localStorage.setItem(++load_id, info_content.value);
            info_content.value = "";
            load_localstorage();
        }
    });
    info_add.addEventListener('click', function () {
        if (info_content.value !== "") {
            console.log(localStorage.length + "  - " + info_content.value);
            localStorage.setItem(++load_id, info_content.value);
            info_content.value = "";
            load_localstorage();
        }
    });
    save.addEventListener('click', function () {
            localStorage.setItem(
            document.getElementsByClassName("update_text")[0].getAttribute("data-key"),
            document.getElementsByClassName("update_text")[0].value);
        document.getElementsByClassName("update_text")[0].value =
            console.log(document.getElementsByClassName("update_text")[0].getAttribute("data-key"))
        console.log(document.getElementsByClassName("update_text")[0].value);
        $('.update_text').removeAttr("data-key");
        $('.update_text').html("");
        $(".update").css('display', 'none');
        load_localstorage();
    });
    exit.addEventListener('click', function () {
        $('.update_text').removeAttr("data-key");
        $('.update_text').html("");
        $(".update").css('display', 'none');
        load_localstorage();
    })

};
let load_localstorage = function () {
    let str = "";

    for (let key in localStorage) {
        if (key === "length") {
            break;
        }
        if (key > load_id) {
            load_id = key;
        }
        str += "" +
            "<div class='entry w'>" +
            "<div class='entry_text' data-key='" + key + "'>" + localStorage.getItem(key) + "</div>" +
            "<div class='entry_edit_button'></div>" +
            "<div class='entry_del'></div>" +
            "</div>";
    }
    document.getElementsByClassName("load")[0].innerHTML = str;

};
