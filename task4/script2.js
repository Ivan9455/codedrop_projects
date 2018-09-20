var load_id = 0;
$(document).ready(function () {
    load_localstorage();
    $(document).on('click', ".info_add", function () {
        if (($(".info_content").val() !== "")) {
            localStorage.setItem(++load_id, $(".info_content").val());
            $(".info_content").val("")
            load_localstorage();
        }
    });
    $(document).on('click', ".save", function () {
        localStorage.setItem(
            $('.update_text').attr("data-key"),
            $('.update_text').val());
        $('.update_text').removeAttr("data-key");
        $('.update_text').val("");
        $(".update").css('display', 'none');
        load_localstorage();
    });
    $(document).on('click', ".exit", function () {
        $('.update_text').removeAttr("data-key");
        $('.update_text').val("");
        $(".update").css('display', 'none');
        load_localstorage();
    });
    $(document).on('click', ".entry_del", function () {
        localStorage.removeItem(
            $(this.parentElement.getElementsByClassName("entry_text")[0])[0].dataset.key);
        load_localstorage();
    });
    $(document).on('click', ".entry_edit_button", function () {
        $(".update").css('display', 'block');
        $('.update_text').val("");
        $(".update_text").val(localStorage.getItem(
            $(this.parentElement.getElementsByClassName("entry_text")[0])[0].dataset.key));
        $(".update_text").attr("data-key",
            $(this.parentElement.getElementsByClassName("entry_text")[0])[0].dataset.key);
    });

});
let load_localstorage = function () {
    let str = "";
    $(".load").html(str)
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
    $(".load").html(str);
};