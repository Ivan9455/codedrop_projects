let Post = {
    add: function (json) {
        $.ajax({
            type: "POST",
            url: "src/ajax/post/add.php",
            data: {json: JSON.stringify(json)}
        }).done(function () {
            Post.loadPost(Post.load);
        })
    },
    remove: function (id) {
        $.ajax({
            type: "POST",
            url: "src/ajax/post/remove.php",
            data: {id: id}
        }).done(function () {
            Post.loadPost(Post.load);
        })
    },
    updateOpen: function (id) {
        $(".overlay").css("display", "block");
        $(".update").css("display", "block");
        $(".update_save").attr("data-id", id);
        $.ajax({
            type: "POST",
            url: "src/ajax/post/get_post.php",//update
            data: {id: id}
        }).done(function (result) {
            let json = JSON.parse(result);
            console.log(json)
            Post.loadUser(".update_user");
            Post.loadCategory(".update_category");
            $(".update_user select").children('[data-id="' + json.user_id + '"]').attr("selected", "selected");
            $(".update_category select").children('[data-id="' + json.category_id + '"]').attr("selected", "selected");
            $(".update_status").val(json.status);
            $(".update_content").val(json.content);
        });

    },
    update: function (id) {
        let json = {}
        json.id = id;
        json.user_id = $(".update_user select :selected").attr("data-id");
        json.category_id = $(".update_category select :selected").attr("data-id");
        json.status = $(".update_status").val();
        json.content = $(".update_content").val();
        json.updated_at = dat_format_input(new Date().getTime());
        console.log(json)
        if (Valid.status(json.status, ".update_status", ".update_status_error"),
            Valid.content(json.content, ".update_content", ".update_content_error")) {
            $.ajax({
                type: "POST",
                url: "src/ajax/post/post_update.php",
                data: {json: JSON.stringify(json)}
            }).done(function () {
                Post.loadPost(Post.load);
            })
        }

    },
    posts: "",
    load: function () {
        let res = JSON.parse(Post.posts)
        let str = "";
        for (let i in res) {
            str += "" +
                "<div class='item'>" +
                "<div class='item_info'>" +
                "<div class='item_user'>User : " + Post.getUser(res[i].user_id,) + "</div>" +
                "<div class='item_category'>Category : " + Post.getCategory(res[i].category_id) + "</div>" +
                "<div class='item_status'>Status : " + res[i].status + "</div>" +
                "<div class='item_time_create'>Time created : " + res[i].created_at + "</div>" +
                "<div class='item_content'>" + res[i].content + "</div> ";
            if (res[i].updated_at !== null) {
                str += "<div class='item_time_update'>Time update : " + res[i].updated_at + "</div>";
            }
            str +=
                "</div>" +
                "<div class='item_setting'>" +
                "<div class='item_edit' data-id='" + res[i].id + "'>Edit</div> " +
                "<div class='item_remove' data-id='" + res[i].id + "'>Remove</div> " +
                "</div>" +
                "</div>"

        }
        $(".post_load").html(str);

    },
    loadPost: function (func) {
        $.ajax({
            type: "POST",
            url: "src/ajax/post/load.php",
            data: {}
        }).done(function (result) {
            Post.posts = result;
            func();
        })
    },
    loadCategory: function (block = ".block_category") {
        let res = JSON.parse(Category.categories);
        let str = "<p>Category</p><select>";
        for (let item in res) {
            str += "" +
                "<option data-id='" + res[item].id + "'>" +
                "" + res[item].name + "" +
                "</option>";
        }
        str += "</select>";
        $(block).html(str);
    },
    loadUser: function (block = ".block_user") {
        let res = JSON.parse(User.users);
        let str = "<p>User</p><select>";
        for (let item in res) {
            str += "" +
                "<option data-id='" + res[item].id + "'>" +
                "" + res[item].name + "" +
                "</option>";
        }
        str += "</select>";
        $(block).html(str);
    },
    event: function () {
        $(".add").click(function () {
            let json = {};
            json.content = $(".content_text").val();
            json.status = $(".status_number").val();
            json.user_id = $(".block_user select :selected").attr('data-id');
            json.category_id = $(".block_category select :selected").attr('data-id');
            json.updated_at = dat_format_input(new Date().getTime());
            if (Valid.content(json.content, ".content_text", ".content_text_error") &
                Valid.status(json.status, ".status_number", ".status_number_error")) {
                Post.add(json);
            }
        });
        $(".post_load").on('click', ".item_remove", function () {
            Post.remove($(this).attr("data-id"));
        });
        $(".post_load").on('click', ".item_edit", function () {
            Post.updateOpen($(this).attr("data-id"));
        })
    },
    eventUpdate: function () {
        $(".update_save").click(function () {
            Post.update($(this).attr("data-id"));
            $(".overlay").css("display", "none");
            $(".update").css("display", "none");
        });
        $(".update").on('click', ".update_exit", function () {
            $(".overlay").css("display", "none");
            $(".update").css("display", "none");
        })
    },
    getUser: function (user_id) {
        let res = JSON.parse(User.users);
        for (let i in res) {
            if (user_id == res[i].id) {
                return res[i].name;
            }
        }
    },
    getCategory: function (category_id) {
        let res = JSON.parse(Category.categories);
        for (let i in res) {
            if (category_id == res[i].id) {
                return res[i].name;
            }
        }
    }
};