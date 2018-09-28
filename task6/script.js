// let content = "eyJsaXN0IjpbIntcInRpbWVcIjoxNTM4MjQ3Nj" +
//     "YwMDAwLFwidGltZV9jcmVhdGVcIjoxNTM4MDQ5NDc5NjEzLFwidG" +
//     "V4dFwiOlwiYDEyYDEyYDEyYDEyXCIsXCJzdGF0dXNcIjpcImFjdGl" +
//     "2ZVwifSIsIntcInRpbWVcIjoxNTM4MTY0ODYwMDAwLFwidGltZV9jc" +
//     "mVhdGVcIjoxNTM4MDQ5NDkxODQyLFwidGV4dFwiOlwiJmx0OyEtLVw" +
//     "iLFwic3RhdHVzXCI6XCJhY3RpdmVcIn0iLCJ7XCJ0aW1lXCI6MTUzO" +
//     "DA3ODU4MDAwMCxcInRpbWVfY3JlYXRlXCI6MTUzODA1MDcwMTE5OSxc" +
//     "InRleHRcIjpcIjEyMzEyM1wiLFwic3RhdHVzXCI6XCI0XCJ9Iiwie1wi" +
//     "dGltZVwiOjE1MzgxNjQ5ODAwMDAsXCJ0aW1lX2NyZWF0ZVwiOjE1Mzgw" +
//     "NTA3MDk4OTAsXCJ0ZXh0XCI6XCIxMjMyMTNcIixcInN0YXR1c1wiOlwi" +
//     "NVwifSJdLCJzdGF0dXMiOlsiYWN0aXZlIiwiY29tcGxldGUiLCIzMzMi" +
//     "LCIyIiwiMSIsIjQiLCI1Il19";

function $_GET(key) {
    var p = window.location.search;
    p = p.match(new RegExp(key + '=([^&=]+)'));
    return p ? p[1] : false;
}

$(document).ready(function () {
    LocalInfo.init();
    List.render();
    Status.render();
    Events.init();
});

let obj = function (time, time_create, text, status) {
    this.time = time;
    this.time_create = time_create;
    this.text = text;
    this.status = status;
};
let stobj = function (name, color) {
    this.name = name
    this.color = color
}
let LocalInfo = {
    base_value: [
        JSON.stringify(new stobj("active", "#F2CA2B")),
        JSON.stringify(new stobj("complete", "#74F251"))
    ],
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

        } else if ($_GET("content") !== false) {
            localStorage.clear();
            let str = $_GET("content");
            localStorage.setItem("content", decodeURI(str));
            List.render();
            Status.render();
            Events.init();
            if (localStorage.getItem("reload") !== "true") {
                document.location.search = ""
                localStorage.setItem("reload", true);
            }
        }
        this.list = content.list;
        this.status = content.status;

        //console.log(JSON.parse(localStorage.getItem("content")))


    },
    statusValid: function (status) {
        for (let item in status) {
            status[item] = Valid.textarea(status[item], 32)
        }
        return status
    }
};
let List = {
    add: function (text, time, status, time_create = new Date().getTime()) {
        let set = new Set(LocalInfo.list);
        set.add(JSON.stringify(new obj(time, time_create, text, status)))
        LocalInfo.list = Array.from(set);
        console.log(LocalInfo.list)
        localStorage.setItem("content", JSON.stringify(
            new Content(LocalInfo.list, LocalInfo.status)))
        this.render();
    },
    update: function (key, text, time, status) {
        let json = JSON.parse(LocalInfo.list[key]);
        console.log(json);
        json.text = text;
        json.time = time;
        json.status = status;
        LocalInfo.list[key] = JSON.stringify(json)
        localStorage.setItem("content", JSON.stringify(
            new Content(LocalInfo.list, LocalInfo.status)))
        this.render();
    },
    remove: function (key) {
        let arr = LocalInfo.list;
        let set = new Set(LocalInfo.list);
        if (set.has(arr[key])) {
            set.delete(arr[key])
            LocalInfo.list = Array.from(set)
            localStorage.setItem("content", JSON.stringify(
                new Content(LocalInfo.list, LocalInfo.status)))
            this.render();
        }
    },
    render: function () {
        let str = "";
        $(".todo_list_load").html(str);
        let listArr = LocalInfo.list;
        for (let item in listArr) {
            let json = JSON.parse(listArr[item]);
            str += "" +
                "<div class='item'>" +
                "<div class='item_time_create'>Дата создания события" +
                dat_format(json.time_create) + "</div>" +
                "<div class='item_time_event'>" +
                "Дата события " +
                dat_format(json.time) + "</div>" +
                "<div class='item_status'>" +
                "Статус : " + json.status + "</div>" +
                "<div class='item_text'>" + json.text + "</div>" +
                "<div class='item_setting'>" +
                "<div class='item_edit' data-key='" + item + "'>Edit</div> " +
                "<div class='item_remove' data-key='" + item + "'>Remove</div> " +
                "</div>" +
                "</div>";
        }
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
            if (Valid.getTextAreaBlockError(
                ".status_text", ".status_text_error")) {
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
            if (Valid.getTextAreaBlockError(
                ".todo_list_text", ".todo_list_text_error") &
                Valid.getTimeBlockError(
                    ".todo_list_time", ".todo_list_time_error") &
                Valid.statusCheck(
                    ".status_select", ".status_select_error")) {

                let text = Valid.textarea($(".todo_list_text").val());
                let time = new Date($(".todo_list_time").val()).getTime()
                let status = $(".status_select").val();
                List.add(text, time, status);
                Valid.clearInput(".todo_list_time")
                Valid.clearInput(".todo_list_text")
                $(".status_select").val(LocalInfo.base_value[0])
            }
        });
        $(".todo_list_add").on('change', ".todo_list_time", function () {
            Valid.getTimeBlockError(
                ".todo_list_time", ".todo_list_time_error");
        });
        $(".todo_list_load").on('click', ".item_edit", function () {
            $(".overlay").css("display", "block");
            $(".update").css("display", "block");
            let key = $(this).attr("data-key");
            let arr = LocalInfo.list;
            let set = new Set(LocalInfo.list);
            let json = JSON.parse(arr[key]);
            if (set.has(arr[key])) {
                $(".update_time_create").html(dat_format_input(json.time_create))
                $(".update_time").val(dat_format_input(json.time))
                Status.load_status(".update_status_select");
                $(".update_status_select").val(json.status)
                $(".update_textarea").val(json.text)
                $(".update_save").attr("data-key", key);
            }
        });
        $(".todo_list_load").on('click', ".item_remove", function () {
            List.remove($(this).attr("data-key"));
        });
    }
};
let EventUpdate = {
    init: function () {
        $(".update_exit").click(function () {
            $(".overlay").css("display", "none");
            $(".update").css("display", "none");
        })
        $(".update_save").click(function () {
            let key = $(this).attr("data-key");
            let time_create = new Date($(".update_time_create").html()).getTime()
            if (Valid.getTextAreaBlockError(
                ".update_textarea", ".update_textarea_error") &
                Valid.getTimeBlockError(
                    ".update_time", ".update_time_error", time_create) &
                Valid.statusCheck(
                    ".update_status_select", ".update_status_select_error")) {
                let text = Valid.textarea($(".update_textarea").val());
                let time = new Date($(".update_time").val()).getTime()
                let status = $(".update_status_select").val();
                List.update(key, text, time, status);
                Valid.clearInput(".todo_list_time")
                Valid.clearInput(".todo_list_text")
                $(".overlay").css("display", "none");
                $(".update").css("display", "none");
            }

        })
        $(".update").on('change', ".update_time", function () {
            Valid.getTimeBlockError(
                ".update_time", ".update_time_error");
        });
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
                    return;
                }
            }

        }
    },
    render: function () {
        this.load_status(".status_select");
        let str = "";
        $(".status_load").html(str);
        let statusArr = LocalInfo.status;
        for (let item in statusArr) {
            let json = JSON.parse(statusArr[item])
            console.log(JSON.parse(statusArr[item]))
            str += "" +
                "<div class='status_item' style='background: " +json.color + "'>" +
                "<div class='select_item_text'>" +
                json.name +
                "</div>";
            if (this.renderValid(json)) {

            }
            str += "<div class='status_item_edit' " +
                "data-key='" + statusArr[item] + "'>Edit</div>" +
                "<div class='status_item_remove' " +
                "data-key='" + statusArr[item] + "'>Remove</div>";
            str += "</div>";
        }
        $(".status_load").html(str);
    },
    load_status: function (block) {
        let str = "";
        $(block).html(str);
        let statusArr = LocalInfo.status;
        for (let item in statusArr) {
            if (item == 0) {
                str += "<option selected>" + statusArr[item] + "</option>";
            }
            else {
                str += "<option>" + statusArr[item] + "</option>";
            }
        }
        $(block).html(str);
    },
    renderValid: function (status) {
        if (new Set(LocalInfo.base_value).has(status)) {
            return false;
        }
        return true;
    },

};
let Valid = {
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
    time: function (time, time_create) {
        let min = new Date("2018-09-01T00:00").getTime();
        let max = new Date("2023-09-01T00:00").getTime();

        if (!isNaN(time) && !isNaN(time_create) &&
            time < max && time_create < max &&
            min < time && min < time_create &&
            time_create < time) {
            return true
        }
        return false;
    },
    getTimeBlockError: function (block_time,
                                 block_time_error,
                                 time_create = null) {
        console.log($(block_time).val(), time_create)
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
    textarea: function (text, text_length) {
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
    statusCheck: function (block_status, block_status_error) {
        let set = new Set(LocalInfo.status);
        if (set.has($(block_status).val())) {
            $(block_status_error).html("")
            $(block_status).removeClass("error")
            return true;
        }
        else {
            $(block_status).addClass("error")
            $(block_status_error).html("Таково статуса не существует!")
            return false;
        }

    },
    render: function (json) {
        if (this.time(json.time, json.time_create) &&
            !Status.renderValid(json.status)) {
            json.text = this.textarea(json.text, 200);
            return json;
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
let Content = function (list = [], status = []) {
    this.list = list;
    this.status = status;
};

let Events = {
    init: function () {
        EventStatus.init();
        EventTodoList.init();
        EventUpdate.init();
        $(".url_generate").click(function () {
            let str = window.location.host
                + window.location.pathname
                + "?content=" + encodeURI(localStorage.getItem("content"))
            console.log(str)
            prompt("Скопируйте", str)
        })
        $(".clear_local").click(function () {
            localStorage.clear();
            window.location.search = "";
            window.location.href = "";
        })
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
        f_Date(new Date(t).getDate()) + "T" +
        f_Date(new Date(t).getHours()) + ":" +
        f_Date(new Date(t).getMinutes());
};
let dat_format = function (t) {
    return f_Date(new Date(t).getDate()) + "-" +
        f_Date(new Date(t).getMonth() + 1) + "-" +
        new Date(t).getFullYear() + " " +
        f_Date(new Date(t).getHours()) + ":" +
        f_Date(new Date(t).getMinutes());
};


