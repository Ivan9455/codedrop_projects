/*
по умолчанию должно быть 2 статуса активно выполнено
 */
$(document).ready(function () {
    LocalInfo.init();
    List.render();
    Status.render();
    Events.init();

});
let LocalInfo = {
    base_value: ["active", "complete"],
    list: [],
    list_id: 0,
    status: [],
    init: function () {
        let content = JSON.parse(localStorage.getItem("content"));
        if (localStorage.getItem("content") === null ||
            content === null ||
            content.list === "undefined" ||
            content.status === "undefined") {
            localStorage.setItem("content", JSON.stringify(new Content([], this.base_value)))
            content = JSON.parse(localStorage.getItem("content"));
        }
        this.list = content.list;
        this.status = this.statusValid(content.status);
        console.log(JSON.parse(localStorage.getItem("content")))
    },
    /*
    listValid:function (list) {
        for(let item in list){
            list[item] = Valid.textValid(list[item],32)
        }
        return list
    },
    */
    statusValid: function (status) {
        for (let item in status) {
            status[item] = Valid.textValid(status[item], 32)
        }
        return status
    }
};
let List = {
    add: function () {

    },
    update: function () {

    },
    remove: function () {

    },
    render: function () {
        let str = "";
        $(".todo_list_load").html(str);
        $(".todo_list_load").html(str);
    },

};

let EventStatus = {
    init: function () {
        $(".status_exit_button").click(function () {
            $(".overlay").css("display", "none");
            $(".status").css("display", "none");
            Valid.clearInput(".status_text");
            Valid.clearDiv(".status_text_error");

        });
        $(".status_save").click(function () {
            let text = $(".status_text").val();
            if (Valid.getTextAreaBlockError(".status_text", ".status_text_error")) {
                Status.add(text)
            }
        });
        $(".status").on('click', ".status_item_remove", function () {
            let key = $(this).attr("data-key");
            Status.remove(key);
        });
        $(".status").on('click', ".status_item_edit", function () {
            let old_text = $(this).attr("data-key");
            let new_text = prompt('Ведите новое заначение.');
            console.log(new_text)
            Status.update(old_text, new_text);
        });
    }
};
let EventTodoList = {
    init: function () {
        $(".btn_status").click(function () {
            $(".overlay").css("display", "block");
            $(".status").css("display", "block");
        });
        $(".todo_list_add_btn").click(function () {
            let time = new Date($(".todo_list_time").val()).getTime();
            console.log($(".todo_list_time").val() === "")
            if (time) {
                console.log("bitch!")
            }
        });
        $(".todo_list_add").on('click', ".todo_list_time", function () {
            let time = new Date($(".todo_list_time").val()).getTime();
            List.selectTimeValid(time)
        });
    }
};
let EventUpdate = {
    init: function () {

    }
};
let Status = {
    add: function (text) {
        let str = new Set(LocalInfo.status);
        if (str.has(text)) {
            $(".status_text_error").html("Такой статус уже есть!");
            $(".status_text").addClass("error");
        }
        else {
            Valid.clearInput(".status_text");
            Valid.clearDiv(".status_text_error");
            str.add(Escape.screen(text))
            LocalInfo.status = Array.from(str);
            localStorage.setItem("content", JSON.stringify(
                new Content(LocalInfo.list, LocalInfo.status)))
            this.render();
        }
    },
    remove: function (text) {
        let str = new Set(LocalInfo.status);
        str.delete(text)
        LocalInfo.status = Array.from(str);
        localStorage.setItem("content", JSON.stringify(
            new Content(LocalInfo.list, LocalInfo.status)))
        this.render();
    },
    update: function (old_text, new_text) {
        let str = new Set(LocalInfo.status);
        if (!str.has(new_text) && new_text !== null) {
            let arr = LocalInfo.status;
            for (let item in arr) {
                if (arr[item] === old_text) {
                    arr[item] = new_text;
                    LocalInfo.status = arr;
                    localStorage.setItem("content", JSON.stringify(
                        new Content(LocalInfo.list, LocalInfo.status)))
                    this.render();
                    break;
                }
            }
        }
    },
    render: function () {
        this.load_status();
        let str = "";
        $(".status_load").html(str);
        let statusArr = LocalInfo.status;
        for (let item in statusArr) {
            str += "" +
                "<div class='status_item'>" +
                "<div class='select_item_text'>" +
                statusArr[item] +
                "</div>";
            if (this.renderValid(statusArr[item])) {
                str += "<div class='status_item_edit' " +
                    "data-key='" + statusArr[item] + "'>Edit</div>" +
                    "<div class='status_item_remove' " +
                    "data-key='" + statusArr[item] + "'>Remove</div>";
            }
            str += "</div>";
        }
        $(".status_load").html(str);
    },
    load_status: function () {
        let str = "";
        $(".status_select").html(str);
        let statusArr = LocalInfo.status;
        for (let item in statusArr) {
            if (item == 0) {
                str += "<option selected>" + statusArr[item] + "</option>";
            }
            else {
                str += "<option>" + statusArr[item] + "</option>";
            }
        }
        $(".status_select").html(str);
    },
    renderValid: function (status) {
        if (new Set(LocalInfo.base_value).has(status)) {
            return false;
        }
        return true;
    },

};
let Valid = {
    textValid: function (text, text_length) {
        if (text.length > text_length) {
            text = text.substr(0, text_length);
        }
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
    ///////////////////////
/*
использовать методы для валидации
 */
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
    textarea: function (text,text_length) {
        if (text.length > text_length) {
            text = text.substr(0, text_length);
        }
        if (Escape.screen_conversely(text) === text) {
            return Escape.screen(text);
        }
        return text;
    },
    ////////////
    clearInput: function (block) {
        $(block).val("");
        $(block).removeClass("error");
    },
    clearDiv: function (block) {
        $(block).html("");
    },
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
let Content = function (list = [], status = []) {
    this.list = list;
    this.status = status;
};

let Events = {
    init: function () {
        EventStatus.init();
        EventTodoList.init();
        EventUpdate.init();
    }
};
let obj = function (time, time_create, text, status) {
    this.time = time;
    this.time_create = time_create;
    this.text = text;
    this.status = status;
};
