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


function Todo() {
    var load_id = 0;
    let add = function () {
        $(document).on('click', ".info_add", function () {
            if (($(".info_content").val() !== "")) {
                localStorage.setItem(++load_id, escapeHtmlEntities($(".info_content").val()));
                $(".info_content").val("")
                load_localstorage();
            }
        });
    }
    let del = function () {
        $(document).on('click', ".entry_del", function () {
            localStorage.removeItem(
                $(this.parentElement.getElementsByClassName("entry_text")[0])[0].dataset.key);
            load_localstorage();
        });
    }
    let edit = function () {
        $(document).on('click', ".entry_edit_button", function () {
            $(".update").css('display', 'block');
            $('.update_text').val("");
            $(".update_text").val(escapeHtmlEntities(localStorage.getItem(
                $(this.parentElement.getElementsByClassName("entry_text")[0])[0].dataset.key)));
            $(".update_text").attr("data-key",
                escapeHtmlEntities($(this.parentElement.getElementsByClassName("entry_text")[0])[0].dataset.key));
        });
    }
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
    }
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
            let m = localStorage.getItem(key) ;
            if (isNaN(key)) {
                localStorage.removeItem(key);
                break;
            }
            if (key > load_id) {
                load_id = key + 1;
            }
            console.log(re(m))
            console.log(re(escapeHtmlEntities(m)))
            console.log(m)
            if(re(m)===m){
                m = escapeHtmlEntities(m)
            }
            str += "" +
                "<div class='entry w'>" +
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
            .replace(/&amp;/g,"&")
            .replace(/&gt;/g,">")
            .replace(/&lt;/g,"<")
            .replace(/&quot;/g,'"')
            .replace(/&apos;/g,"'");
    }
    this.go = function () {
        load_localstorage();
        add();
        del();
        edit();
        save();
        exit();
        console.log("work")
    }
};