$(document).ready(function () {
    new Todo().go();

    /*
function f1() {
    alert("f1")
    return true;
}
function f2() {
    alert("f2")
    return false;
}
if(f2()&f1()){

}

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
            check_time(".time_error", ".time")
        })
    };
    let check_time = function (block_error, block_time) {
        if ($(block_time).val() === "") {
            $(block_error).html("Заполните поле");
            $(block_time).addClass("error");
            return false;
        } else if (new Date().getTime() > new Date($(block_time).val()).getTime()) {
            console.log(new Date().getTime() + " > " + new Date($(block_time).val()).getTime())
            $(block_error).html("Вы не можете создать событие задним числом");
            $(block_time).addClass("error");
            return false;
        }
        else {
            $(block_error).html("");
            $(block_time).removeClass("error");
            return true;
        }
    };
    let check_textarea = function (block, block_error) {
        if ($(block).val() === "") {
            $(block_error).html("Заполните поле");
            $(block).addClass("error");
            return false;
        } else {
            $(block_error).html("");
            $(block).removeClass("error");
            return true;
        }
    };
    let add = function () {
        $(document).on('click', ".info_add", function () {
            if (check_textarea(".info_content", ".text_error") &
                check_time(".time_error", ".time")) {
                console.log(new Date($(".time").val()).getTime())
                console.log(new Date().getTime())
                console.log(escapeHtmlEntities($(".info_content").val()))
                let json = new obj(
                    new Date($(".time").val()).getTime(),
                    new Date().getTime(),
                    escapeHtmlEntities($(".info_content").val()));
                console.log(JSON.stringify(json))
                localStorage.setItem(++load_id, JSON.stringify(json));
                $(".info_content").html("")
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
            let str = JSON.parse(localStorage.getItem(
                $(this.parentElement.getElementsByClassName("entry_text")[0])[0].dataset.key))
            $(".update_text").val(str.text);
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
            let m = JSON.parse(localStorage.getItem(key));//.replace(/"/g,'').replace(/\\/g,'');
            //console.log(JSON.parse(m))
            console.log(m)
            if (isNaN(key)) {
                localStorage.removeItem(key);
                break;
            }
            if (key > load_id) {
                load_id = key + 1;
            }
            if (re(m.text) === m.text) {
                m.text = escapeHtmlEntities(m.text)
            }
            let dat = new Date(m.time_create).getFullYear() + "-" +
                f_Date(new Date(m.time_create).getMonth() + 1) + "-" +
                f_Date(new Date(m.time_create).getDate());
            let dat2 = f_Date(new Date(m.time).getDate()) + "-" +
                f_Date(new Date(m.time).getMonth() + 1) + "-" +
                new Date(m.time).getFullYear();
            str += "" +
                "<div class='entry w'>" +
                "<div class='entry_time w'>" +
                "<div class='time_create'>Время создание записи  " + dat2 +
                "</div>" +
                "<input type='date' class='time_update' value='" + dat + "'>" +
                "</div>" +
                "<div class='entry_text' data-key='" + key + "'>" + m.text + "</div>" +
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
    let f_Date = function (str) {
        str += "";
        if (str.length === 1) {
            return "0" + str;
        } else {
            return str;
        }
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