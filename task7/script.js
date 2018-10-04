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
    this.name = name;
    this.color = color;
};
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
            console.log("www")
        } else if ($_GET("content") !== false) {
            console.log("www")
            localStorage.clear();
            let str = $_GET("content");
            localStorage.setItem("content", Escape.screen_sharp_re(decodeURI(str)));
            List.render();
            Status.render();
            Events.init();
            if (localStorage.getItem("reload") !== "true") {
                document.location.search = "";
                localStorage.setItem("reload", true);
            }
        }
        this.list = content.list;
        this.status = content.status;
    },
    statusValid: function (status) {
        for (let item in status) {
            status[item] = Valid.textarea(status[item], 32);
        }
        return status;
    }
};
let List = {
    add: function (text, time, status, time_create = new Date().getTime()) {
        let set = new Set(LocalInfo.list);
        set.add(JSON.stringify(new obj(time, time_create, text, status)));
        LocalInfo.list = Array.from(set);
        localStorage.setItem("content", JSON.stringify(
            new Content(LocalInfo.list, LocalInfo.status)));
        this.render();
    },
    update: function (key, text, time, status) {
        let json = JSON.parse(LocalInfo.list[key]);
        json.text = text;
        json.time = time;
        json.status = JSON.stringify(status);
        LocalInfo.list[key] = JSON.stringify(json);
        localStorage.setItem("content", JSON.stringify(
            new Content(LocalInfo.list, LocalInfo.status)));
        this.render();
    },
    remove: function (key) {
        let arr = LocalInfo.list;
        let set = new Set(LocalInfo.list);
        if (set.has(arr[key])) {
            set.delete(arr[key]);
            LocalInfo.list = Array.from(set);
            localStorage.setItem("content", JSON.stringify(
                new Content(LocalInfo.list, LocalInfo.status)));
            this.render();
        }
    },
    render: function () {
        let str = "";
        $(".todo_list_load").html(str);
        let listArr = LocalInfo.list;
        let statusArr = LocalInfo.status;
        for (let i in statusArr) {
            let st = JSON.parse(statusArr[i]);
            str += "" +
                "<div class='title' style='border:8px solid " + st.color + "'> " +
                "<div class='tile__name'>Статус:" + st.name + "</div>" +
                "<ul class='st " + st.name + "' ></ul>" +
                "</div>";
        }
        $(".todo_list_load").html(str);
        for (let n in listArr) {
            let json = JSON.parse(listArr[n])
            let status = JSON.parse(String(json.status));
            let r = "" +
                "<li class='item'  data-key='" + n + "' >" +
                "<div class='item_time_create'>Дата создания события " +
                dat_format(json.time_create) + "</div>" +
                "<div class='item_time_event'>" +
                "Дата события " +
                dat_format(json.time) + "</div>" +
                "<div class='item_text'>" + json.text + "</div>" +
                "<div class='item_setting'>" +
                "<div class='item_edit' data-key='" + n + "'>Edit</div> " +
                "<div class='item_remove' data-key='" + n + "'>Remove</div> " +
                "</div>" +
                "</li>";
            $("." + status.name).html(r + $("." + status.name).html())
        }
        var adjustment;
        var pos;
        $("ul.st").sortable({
            group: 'st',
            handle: 'li.item',
            pullPlaceholder: false,
            onDrop: function ($item, container, _super) {
                if (!container.options.drop)
                    $item.clone().insertAfter($item);
                _super($item, container);
                let new_class = container.target.context.classList[1];
                let arr = $("." + new_class).children();

                let listArr = LocalInfo.list;
                let color = JSON.parse(LocalInfo.status.filter(function (item) {
                    let json = JSON.parse(item);
                    return json.name === new_class ? json.color : "";
                })).color;
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].dataset.key !== undefined) {
                        let key = arr[i].dataset.key;
                        let json = JSON.parse(listArr[key]);
                        let status = JSON.parse(json.status);
                        if (status.name !== new_class) {
                            status.name = new_class;
                            status.color = color
                            listArr[key] = JSON.stringify(new obj(
                                json.time, json.time_create,
                                json.text, JSON.stringify(status)))
                        }
                    }
                }
                LocalInfo.list = listArr;
                localStorage.setItem("content", JSON.stringify(
                    new Content(LocalInfo.list, LocalInfo.status)));

            },
            onDragStart: function ($item, container, _super) {
                if (!container.options.drop)
                    $item.clone().insertAfter($item);
                var offset = $item.offset(),
                    pointer = container.rootGroup.pointer;

                adjustment = {
                    left: (pointer.left - offset.left) / offset.left,
                    top: pointer.top - offset.top
                };
                pos = {
                    top: pointer.top
                };
                console.log(offset.top)
                console.log(pointer.top)
                _super($item, container);
            },
            onDrag: function ($item, position) {
                $item.css({
                    left: adjustment.left,
                    top: (position.top - pos.top) + 200
                });
            },
            tolerance: 6,
            distance: 10
        });
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
            let color = $(".status_color").val();
            if (Valid.getTextAreaBlockError(
                ".status_text", ".status_text_error") &
                Valid.colorCheck(".status_color",
                    ".status_color_error", $(".status_text").val())) {
                Status.add(text, color)
            }
        });
        $(".status").on('click', ".status_item_remove", function () {
            let key = $(this).attr("data-key");
            if (Status.statusCheckText(key)) {
                Status.remove(key);
            }
        });
        $(".status").on('click', ".status_item_edit", function () {
            $(".status_up").css("display", "block");
            $(".status").css("z-index", "49");
            let json = JSON.parse(LocalInfo.status[$(this).attr("data-key")]);
            $(".status_up_text").val(json.name);
            $(".status_up_color").val(json.color);
            $(".status_up_save").attr("data-key", $(this).attr("data-key"))
        });
        $(".status_up").on('click', ".status_up_exit", function () {
            $(".status_up").css("display", "none");
            $(".status").css("z-index", "100");
            $(".status_up_text").val("");
            $(".status_up_color").val("");
        });
        $(".status_up").on('click', ".status_up_save", function () {
            let text = $(".status_up_text").val();
            let color = $(".status_up_color").val();
            let key = $(".status_up_save").attr("data-key");
            if (/^#[0-9A-F]{6}$/i.test(color) & Status.statusCheckText(key)) {
                Status.update(key, text, color)
            }
            $(".status_up").css("display", "none");
            $(".status").css("z-index", "100");
            $(".status_up_text").val("");
            $(".status_up_color").val("");
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
                let time = new Date($(".todo_list_time").val()).getTime();
                let status_val = $(".status_select").val();
                let res = [];
                for (let item in LocalInfo.status) {
                    if (status_val === JSON.parse(LocalInfo.status[item]).name) {
                        res = LocalInfo.status[item];
                    }
                }
                List.add(text, time, res);
                Valid.clearInput(".todo_list_time");
                Valid.clearInput(".todo_list_text");
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
                let status = JSON.parse(json.status);
                $(".update_time_create").html(dat_format_input(json.time_create));
                $(".update_time").val(dat_format_input(json.time));
                Status.load_status(".update_status_select");
                $(".update_status_select").val(status.name);
                $(".update_color").val(status.color);
                if (!new Set(LocalInfo.base_value).has(status.color)) {
                    $(".update_color").attr("disabled", "disabled");
                }
                $(".update_textarea").val(json.text);
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
            let time_create = new Date($(".update_time_create").html()).getTime();
            if (Valid.getTextAreaBlockError(
                ".update_textarea", ".update_textarea_error") &
                Valid.getTimeBlockError(
                    ".update_time", ".update_time_error", time_create) &
                Valid.statusCheck(
                    ".update_status_select", ".update_status_select_error")) {
                let text = Valid.textarea($(".update_textarea").val());
                let time = new Date($(".update_time").val()).getTime();
                let status = $(".update_status_select").val();

                for (let item in LocalInfo.status) {
                    let str = JSON.parse(LocalInfo.status[item]);
                    if (status === str.name) {
                        status = str;
                        break;
                    }
                }
                List.update(key, text, time, status);
                Valid.clearInput(".todo_list_time");
                Valid.clearInput(".todo_list_text");
                $(".overlay").css("display", "none");
                $(".update").css("display", "none");
            }
        });
        $(".update").on('change', ".update_time", function () {
            Valid.getTimeBlockError(
                ".update_time", ".update_time_error");
        });
        $(".update").on('change', ".update_status_select", function () {
            let text = $(".update_status_select").val();
            let json = LocalInfo.status;
            for (let item in json) {
                let str = JSON.parse(json[item]);
                if (text === str.name) {
                    $(".update_color").val(str.color);
                    return;
                }
            }
        });
    }
};
let Status = {
    colors: function () {
        let str = LocalInfo.status;
        let color = new Set();
        for (let item in str) {
            color.add(JSON.parse(str[item]).color);
        }
        return color;
    },
    text: function () {
        let str = LocalInfo.status;
        let name = new Set();
        for (let item in str) {
            name.add(JSON.parse(str[item]).name);
        }
        return name;
    },
    add: function (text, color) {
        let str = new Set(LocalInfo.status);
        Valid.clearInput(".status_text");
        Valid.clearDiv(".status_text_error");
        Valid.clearInput(".status_color");
        Valid.clearDiv(".status_color_error");
        str.add(JSON.stringify(new stobj(text, color)));
        LocalInfo.status = Array.from(str);
        localStorage.setItem("content", JSON.stringify(
            new Content(LocalInfo.list, LocalInfo.status)));
        this.render();
        List.render();
    },
    remove: function (key) {
        let obj = new Set(LocalInfo.status);
        let objdel = LocalInfo.status[key];
        obj.delete(objdel);
        LocalInfo.status = Array.from(obj);
        localStorage.setItem("content", JSON.stringify(
            new Content(LocalInfo.list, LocalInfo.status)));
        this.render();
        List.render();
    },
    update: function (key, text, color) {
        let str = JSON.parse(LocalInfo.status[key]);
        str.name = text;
        str.color = color;
        LocalInfo.status[key] = JSON.stringify(str);
        localStorage.setItem("content", JSON.stringify(
            new Content(LocalInfo.list, LocalInfo.status)));
        this.render();
        List.render();
    },
    render: function () {
        this.load_status(".status_select");
        let str = "";
        $(".status_load").html(str);
        let statusArr = LocalInfo.status;
        for (let item in statusArr) {
            let json = JSON.parse(statusArr[item]);
            str += "" +
                "<div class='status_item' style='border: 8px solid " + json.color + "'>" +
                "<div class='select_item_text'>" +
                json.name +
                "</div>";
            if (this.renderValid(json)) {
                str += "<div class='status_item_edit' " +
                    "data-key='" + item + "'>Edit</div>" +
                    "<div class='status_item_remove' " +
                    "data-key='" + item + "'>Remove</div>";
            }
            str += "</div>";
        }
        $(".status_load").html(str);
    },
    load_status: function (block) {
        let str = "";
        $(block).html(str);
        let statusArr = LocalInfo.status;
        for (let item in statusArr) {
            let json = JSON.parse(statusArr[item]);
            if (item == 0) {
                str += "<option selected >" + json.name + "</option>";
            }
            else {
                str += "<option >" + json.name + "</option>";
            }
        }
        $(block).html(str);
    },
    renderValid: function (status) {
        if (new Set(LocalInfo.base_value).has(JSON.stringify(status))) {
            return false;
        }
        return true;
    },
    statusCheckText(key) {
        for (let item in LocalInfo.list) {
            let str = JSON.parse(LocalInfo.list[item]);
            if (JSON.parse(str.status).name === JSON.parse(LocalInfo.status[key]).name) {
                alert("Не возможно изменить/удалить статус \nпока есть хотябы одна запись!");
                return false;
            }
        }
        return true;
    }
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
        if (Status.text().has($(block_status).val())) {
            $(block_status_error).html("");
            $(block_status).removeClass("error");
            return true;
        }
        else {
            $(block_status).addClass("error");
            $(block_status_error).html("Таково статуса не существует!");
            return false;
        }

    },
    colorCheck: function (color, color_error, text) {
        if ($(color).val() === "#000000") {
            $(color_error).html("Не выбран цвет!");
            $(color).addClass("error");
            return false;
        } else if (Status.text().has(text)) {
            $(".status_text_error").html("Такой статус уже есть!");
            $(".status_text").addClass("error");
        } else if (Status.colors().has(color)) {
            $(".status_color_error").html("Такой цвет уже есть!");
            $(".status_color").addClass("error");
        }
        else {
            this.clearDiv(color_error);
            this.clearInput(color);
            return true;
        }
    },
    render: function (json) {
        if (this.time(json.time, json.time_create) &&
            !Status.renderValid(json.status)) {
            json.text = this.textarea(json.text, 200);
            return json;
        }
        return true;
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
    },
    screen_sharp: function (str) {
        return str
            .replace(/#/g, 'sharp');
    },
    screen_sharp_re: function (str) {
        return str
            .replace(/sharp/g, "#");
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
                + "?content=" + encodeURI(Escape.screen_sharp(
                    localStorage.getItem("content")));
            prompt("Скопируйте", str);
        });
        $(".clear_local").click(function () {
            localStorage.clear();
            window.location.search = "";
            window.location.href = "";
        });
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


