$(document).ready(function () {
    Events.init();
    Status.render();

    // let str = localStorage.getItem("status").replace(/},{/g,"};{").split(";");
    // for (let item in str){
    //     console.log(JSON.parse(str[item]).status_text)
    // }
    // let statusSet = [];
    // statusSet[0] = JSON.stringify(new StatusObj(0, "status1"));
    // statusSet[1] = JSON.stringify(new StatusObj(1, "status2"));
    // statusSet[2] = JSON.stringify(new StatusObj(2, "status3"));
    // statusSet[3] = JSON.stringify(new StatusObj(3, "status4"));
    // localStorage.setItem("status", statusSet);
    //console.log(localStorage.getItem("status").replace(/},{/g,"};{").split(";"))
    // let str = localStorage.getItem("status").replace(/},{/g,"};{").split(";");
    // str.forEach(function (item ,i , arr) {
    //     console.log(JSON.parse(arr[i]).key + " " + JSON.parse(arr[i]).status_text)
    // })
    //console.log(str)
    //$(".update").css("display", "none");
});
let status_id = 0;
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
    add: function () {

        this.render();
    },
    remove: function () {

        this.render();
    },
    statusArray: function () {
        let str = localStorage.getItem("status").replace(/},{/g, "};{").split(";");
        let array = [];
        for (let item in str) {
            let obj = JSON.parse(str[item]);
            if (this.keyValid(obj.key)) {
                continue;
            }
            if (status_id < obj.key) {
                status_id = obj.key;
            }
            obj.status_text = this.statusTextValid(obj.status_text);
            array[item] = obj
        }
        return array;
    },
    statusTextValid: function (text) {
        if (text > 32) {
            text = text.substr(0, 32);
        }
        if (Escape.screen_conversely(text) === text) {
            return Escape.screen(text);
        }
        return text;
    },
    keyValid: function (obj) {
        if (isNaN(obj)) {
            return true;
        }
        return false;
    },
    render: function () {
        let str = "";
        $(".status_load").html(str);
        let status = this.statusArray();
        console.log(status)
        for (let i = 0; i < status.length; i++) {
            //console.log(status)
            str += "" +
                "<div class='status_item'>" +
                "<div class='select_item_text'>" +
                status[i].status_text +
                "</div>" +
                "<div class='status_item_edit' " +
                "data-key='" + status[i].key + "'>Edit</div>" +
                "<div class='status_item_remove' " +
                "data-key='" + status[i].key + "'>Remove</div>" +
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
