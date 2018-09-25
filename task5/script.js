$(document).ready(function () {
    LocalInfo.init();
    Events.init();
    Status.render();
});
// JSON.stringify(new StatusObj(1, "asdasd")),
// JSON.stringify(new StatusObj(2, "asdasdasda"))
let LocalInfo = {
    list:[],
    list_id:0,
    status:[],
    status_id:0,
    init: function () {
        let content = JSON.parse(localStorage.getItem("content"));
        if (localStorage.getItem("content") === null ||
            content === null ||
            content.list === "undefined" ||
            content.status === "undefined") {
            localStorage.setItem("content", JSON.stringify(new Content([], [])))
            content = JSON.parse(localStorage.getItem("content"));
            //console.log(JSON.parse(localStorage.getItem("content")))
        }
        this.list = content.list;
        this.status = content.status;
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
let EventStatus = {
    init: function () {
        $(".status_exit_button").click(function () {
            $(".overlay").css("display", "none");
            $(".status").css("display", "none");
            $(".status_text").val("");
        });
        $(".status_save").click(function () {
            let text = $(".status_text").val();
            Status.add(LocalInfo.status_id++, text)

        });
        $(".status").on('click',".status_item_remove",function () {
            let key = $(this).attr("data-key");
            //Status.add(LocalInfo.status_id++, text)
            console.log(key)

            Status.remove(key);
        });
    }
};
let EventTodoList = {
    init: function () {
        $(".btn_status").click(function () {
            $(".overlay").css("display", "block");
            $(".status").css("display", "block");
        });
    }
};
let EventUpdate = {
    init: function () {

    }
};
let Status = {
    add: function (key,text) {
        let str = LocalInfo.status;
        str.push(JSON.stringify(new StatusObj(key,text)));
        localStorage.setItem("content",
            JSON.stringify(new Content(LocalInfo.list, str)))
        console.log(str)
        this.render();
    },
    remove: function (key) {//остановился тут
        let str = LocalInfo.status;
        //str.splice(key,1);
        for (let i = 0; i < str.length; i++) {
            console.log(JSON.parse(str[i]).key)
            if(str[i].key===key){
                str.splice(i,1);
                continue;
            }
        }
        // localStorage.setItem("content",
        //     JSON.stringify(new Content(LocalInfo.list, str)))
        this.render();
    },

    render: function () {
        let str = "";
        $(".status_load").html(str);
        let statusArr = LocalInfo.status;
        console.log(statusArr)
        for (let item in statusArr) {
            let json = JSON.parse(statusArr[item])
            if(item > LocalInfo.status_id){
                LocalInfo.status_id = item;
            }
            str += "" +
                "<div class='status_item'>" +
                "<div class='select_item_text'>" +
                json.status_text +
                "</div>" +
                "<div class='status_item_edit' " +
                "data-key='" + json.key + "'>Edit</div>" +
                "<div class='status_item_remove' " +
                "data-key='" + json.key + "'>Remove</div>" +
                "</div>";
        }
        $(".status_load").html(str);
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
let obj = function (time, time_create, text, status) {
    this.time = time;
    this.time_create = time_create;
    this.text = text;
    this.status = status;
};
let StatusObj = function (key, status_text) {
    this.key = key;
    this.status_text = status_text;
};
