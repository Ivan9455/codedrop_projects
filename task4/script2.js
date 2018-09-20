$(document).ready(function () {
    new Todo().go();
    /*
    load_localstorage();
    $(document).on('click', ".info_add", function () {
        if (($(".info_content").val() !== "")) {
            localStorage.setItem(++load_id, escapeHtmlEntities($(".info_content").val()));
            $(".info_content").val("")
            load_localstorage();
        }
    });
    $(document).on('click', ".save", function () {
        localStorage.setItem(
            escapeHtmlEntities($('.update_text').attr("data-key")),
            escapeHtmlEntities($('.update_text').val()));
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
        $(".update_text").val(escapeHtmlEntities(localStorage.getItem(
            $(this.parentElement.getElementsByClassName("entry_text")[0])[0].dataset.key)));
        $(".update_text").attr("data-key",
            escapeHtmlEntities($(this.parentElement.getElementsByClassName("entry_text")[0])[0].dataset.key));
    });

*/
});

/*
let load_localstorage = function () {
    let str = "";
    $(".load").html(str)
    for (let key in localStorage) {
        if (key === "length") {
            break;
        }
        if (key > load_id) {
            load_id = key + 1;
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
*/
let obj = function (time, time_create, text) {
    this.time = time;
    this.time_create = time_create;
    this.text = text;
};

function Todo() {
    var load_id = 0;
    let time_add = function () {
        $(document).on('change', ".time", function () {
            check_time(check_time($(".time").val()), ".time_error", ".time")
        })
    };
    let check_time = function (time, block_error, block_time) {
        if (time === "") {
            $(block_error).html("Заполните поле");
            $(block_time).addClass("error");
            return false;
        } else if (new Date().getTime() > new Date(time).getTime()) {
            $(block_error).html("Вы не можете создать событие задним числом");
            $(block_time).addClass("error");
            return false;
        }
        else {
            $(block_error).val("");
            $(block_time).removeClass("error");
            return true;
        }
    };
    let check_textarea = function (text , block , block_error) {
        if (text === "") {
            $(block_error).html("Заполните поле");
            $(block).addClass("error");
            return false;
        } else {
            $(block_error).val("");
            $(block).removeClass("error");
            return true;
        }
    };
    let add = function () {
        $(document).on('click', ".info_add", function () {
            if (check_textarea($(".info_content").val(), ".info_content", ".text_error") &&
                check_time(check_time($(".time").val()), ".time_error", ".time")) {
                localStorage.setItem(++load_id, new obj(
                    new Date($(".time").val()).getTime(),
                    new Date().getTime(),
                    escapeHtmlEntities($(".info_content").val())));
                $(".info_content").val("")
                load_localstorage();
            }
        });
    };
    let del = function () {
        $(document).on('click', ".entry_del", function () {
            localStorage.removeItem(
                $(this.parentElement.getElementsByClassName("entry_text")[0])[0].dataset.key);
            load_localstorage();
        });
    };
    let edit = function () {
        $(document).on('click', ".entry_edit_button", function () {
            $(".update").css('display', 'block');
            $('.update_text').val("");
            $(".update_text").val(escapeHtmlEntities(localStorage.getItem(
                $(this.parentElement.getElementsByClassName("entry_text")[0])[0].dataset.key)));
            $(".update_text").attr("data-key",
                escapeHtmlEntities($(this.parentElement.getElementsByClassName("entry_text")[0])[0].dataset.key));
        });
    };
    let save = function () {
        $(document).on('click', ".save", function () {
            localStorage.setItem(
                escapeHtmlEntities($('.update_text').attr("data-key")),
                escapeHtmlEntities($('.update_text').val()));
            $('.update_text').removeAttr("data-key");
            $('.update_text').val("");
            $(".update").css('display', 'none');
            load_localstorage();
        });
    };
    let exit = function () {
        $(document).on('click', ".exit", function () {
            $('.update_text').removeAttr("data-key");
            $('.update_text').val("");
            $(".update").css('display', 'none');
            load_localstorage();
        });
    };
    let load_localstorage = function () {
        let str = "";
        $(".load").html(str)
        for (let key in localStorage) {
            let m = localStorage.getItem(key);
            let n = "";
            if (isNaN(key)) {
                localStorage.removeItem(key);
                break;
            }
            if (key > load_id) {
                load_id = key + 1;
            }
            if (re(m) === m) {
                n = escapeHtmlEntities(m)
            }
            str += "" +
                "<div class='entry w'>" +
                "<div class='entry_time w'>" +
                "<div class='time_create'>Время создание записи" + + "</div>" +
                "</div>" +
                "<div class='entry_text' data-key='" + key + "'>" + m + "</div>" +
                "<div class='entry_edit_button'></div>" +
                "<div class='entry_del'></div>" +
                "</div>";
        }
        $(".load").html(str);
    };
    let escapeHtmlEntities = function (str) {
        if (typeof jQuery !== 'undefined') {
            // Create an empty div to use as a container,
            // then put the raw text in and get the HTML
            // equivalent out.
            return jQuery('<div/>').text(str).html();
        }
        // No jQuery, so use string replace.
        return str
            .replace(/&/g, '&amp;')
            .replace(/>/g, '&gt;')
            .replace(/</g, '&lt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    };
    let re = function (str) {
        // No jQuery, so use string replace.
        return str
            .replace(/&amp;/g, "&")
            .replace(/&gt;/g, ">")
            .replace(/&lt;/g, "<")
            .replace(/&quot;/g, '"')
            .replace(/&apos;/g, "'");
    };
    this.go = function () {
        load_localstorage();
        time_add();
        add();
        del();
        edit();
        save();
        exit();
        //console.log("work")
    }
};