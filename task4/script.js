$(document).ready(function () {
    Event.init();
});
let load_id = 0;
let TodoList = {
    add: function (key, obj) {
        localStorage.setItem(key, obj);
        this.render();
    },
    remove: function (key) {
        localStorage.removeItem(key);
        this.render();
    },
    render: function () {
        let str = "";
        $(".load").html(str);
        for (let key in localStorage) {
            let m = Valid.render(key);
            if (m === true) {
                localStorage.removeItem(key)
                continue;
            }
            if (key > load_id) {
                load_id = parseInt(key);
            }
            str += "" +
                "<div class='entry w'>" +
                "<div class='entry_time'>" +
                "<div class='time_create'>Время создание записи  "
                + dat_format(m.time_create) + "</div >" +
                "<div class='time_create'>Время события   "
                + dat_format(m.time) + "</div>" +
                "</div>" +
                "<div class='entry_text' data-key='" + key + "'>"
                + m.text + "</div>" +
                "<div class='entry_edit_button'></div>" +
                "<div class='entry_del'></div>" +
                "</div>";
        }
        $(".load").html(str);
    },

};
let Event = {
    init: function () {
        TodoList.render();
        $(document).on('change', ".time", function () {
            let time_create = new Date().getTime();
            Valid.getTimeBlockError(".time", ".time_error", time_create);
        });
        $(document).on('change', ".update_time_input", function () {
            let time_create = JSON.parse(localStorage.getItem(
                $(".update_text").attr("data-key"))).time_create;
            console.log(time_create)
            Valid.getTimeBlockError(".update_time_input",
                ".update_time_input_error", time_create);
        });
        $(document).on('click', ".info_add", function () {
            let text = Valid.textarea(Escape.screen($(".info_content").val()));
            let time_create = new Date().getTime();
            let time = new Date($(".time").val()).getTime();
            if (Valid.getTextAreaBlockError(".info_content", ".text_error") &
                Valid.getTimeBlockError(".time", ".time_error", time_create)) {
                let json = JSON.stringify(new obj(time, time_create, text))
                TodoList.add(++load_id, json);
                Valid.clearInput(".info_content", ".time")
            }
        });
        $(document).on('click', ".entry_del", function () {
            TodoList.remove(
                $(this.parentElement.getElementsByClassName("entry_text")
                    [0])[0].dataset.key);
        });
        $(document).on('click', ".entry_edit_button", function () {
            $(".update").css('display', 'block');
            let str = JSON.parse(localStorage.getItem(
                $(this.parentElement.getElementsByClassName("entry_text")
                    [0])[0].dataset.key));
            $(".time_create_up").html("Время создание записи  "
                + dat_format(str.time_create));
            $(".update_time_input").attr("value", dat_format_input(str.time));
            $('.update_text')
                .val("")
                .val(str.text)
                .attr("data-key",
                    Escape.screen($(this.parentElement.getElementsByClassName("entry_text")
                        [0])[0].dataset.key));

        });
        $(document).on('click', ".save", function () {
            let key = Escape.screen($('.update_text').attr("data-key"));
            let str = JSON.parse(localStorage.getItem(key));
            if (Valid.getTextAreaBlockError(".update_text", ".update_text_error") &
                Valid.getTimeBlockError(".update_time_input",
                    ".update_time_input_error", str.time_create)) {
                let json = JSON.stringify(new obj(
                    new Date($(".update_time_input").val()).getTime(),
                    new Date(str.time_create).getTime(),
                    Escape.screen($('.update_text').val())
                ));
                TodoList.add(key, json)
                $('.update_text')
                    .removeAttr("data-key")
                    .val("");
                $(".update").css('display', 'none');
            }
        });
        $(document).on('click', ".exit", function () {
            $('.update_time_input').removeClass("error");
            $('.update_text')
                .removeClass("error")
                .removeAttr("data-key")
                .val("");
            Valid.clearDiv(".update_text_error",".update_time_input_error",);
            $(".update").css('display', 'none');
        });
    }
};
let Valid = {
    time: function (time, time_create) {
        let min = new Date("2018-09-01").getTime();
        let max = new Date("2023-09-01").getTime();
        if (!isNaN(time) && !isNaN(time_create) &&
            time < max && time_create < max &&
            min < time && min < time_create &&
            time_create < time) {
            return true
        }
        return false;
    },
    getTimeBlockError: function (block_time,
                                 block_time_error, time_create = null) {
        if (time_create === null) {
            time_create = new Date().getTime();
        }
        if ($(block_time).val() === "") {
            $(block_time_error).html("Заполните поле!");
            $(block_time).addClass("error");
            return false;
        } else if (this.time(new Date($(block_time).val()).getTime(),
            time_create) === false) {
            $(block_time_error).html("Не верный формат даты!");
            $(block_time).addClass("error");
            return false;
        }
        $(block_time_error).empty();
        $(block_time).removeClass("error");
        return true;
    },
    textarea: function (text) {
        if (Escape.screen_conversely(text) === text) {
            return Escape.screen(text);
        }
        return text;
    },
    getTextAreaBlockError: function (block, block_error) {
        if ($(block).val() === "") {
            $(block_error).html("Заполните поле");
            $(block).addClass("error");
            return false;
        } else {
            $(block_error).empty();
            $(block).removeClass("error");
            return true;
        }
    },
    clearInput: function (block_text, block_time) {
        $(block_text).val("");
        $(block_time).val("");
    },
    clearDiv: function (block_text, block_time) {
        $(block_text).html("");
        $(block_time).html("");
    },
    render: function (key) {//проблема тут
        let m = JSON.parse(localStorage.getItem(key));
        if (isNaN(key)) {
            return true;
        } else if (this.time(m.time, m.time_create)) {
            m.text = this.textarea(m.text);
            return m;
        }
        return true;
    }
};
let Escape = {
    screen: function (str) {
        if (typeof jQuery !== 'undefined') {
            return jQuery('<div/>').text(str).html();
        }
        return str
            .replace(/&/g, '&amp;')
            .replace(/>/g, '&gt;')
            .replace(/</g, '&lt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    },
    screen_conversely: function (str) {
        return str
            .replace(/&amp;/g, "&")
            .replace(/&gt;/g, ">")
            .replace(/&lt;/g, "<")
            .replace(/&quot;/g, '"')
            .replace(/&apos;/g, "'");
    }
};
let f_Date = function (str) {
    str += "";
    if (str.length === 1) {
        return "0" + str;
    } else {
        return str;
    }
};
let dat_format_input = function (t) {
    return new Date(t).getFullYear() + "-" +
        f_Date(new Date(t).getMonth() + 1) + "-" +
        f_Date(new Date(t).getDate());
};
let dat_format = function (t) {
    return f_Date(new Date(t).getDate()) + "-" +
        f_Date(new Date(t).getMonth() + 1) + "-" +
        new Date(t).getFullYear();
};
let obj = function (time, time_create, text) {
    this.time = time;
    this.time_create = time_create;
    this.text = text;
};