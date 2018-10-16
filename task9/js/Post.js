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
    remove:function(id){
        $.ajax({
            type: "POST",
            url: "src/ajax/post/remove.php",
            data: {id: id}
        }).done(function () {
            Post.loadPost(Post.load);
        })
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
                "<div class='item_content'>" + res[i].content + "</div> " +
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
    loadCategory: function () {
        let res = JSON.parse(Category.categories);
        let str = "<p>Category</p><select>";
        for (let item in res) {
            str += "" +
                "<option data-id='" + res[item].id + "'>" +
                "" + res[item].name + "" +
                "</option>";
        }
        str += "</select>";
        $(".block_category").html(str);
    },
    loadUser: function () {
        let res = JSON.parse(User.users);
        let str = "<p>User</p><select>";
        for (let item in res) {
            str += "" +
                "<option data-id='" + res[item].id + "'>" +
                "" + res[item].name + "" +
                "</option>";
        }
        str += "</select>";
        $(".block_user").html(str);
    },
    event: function () {
        $(".add").click(function () {
            let json = {};
            json.content = $(".content_text").val();
            json.status = $(".status_number").val();
            json.user_id = $(".block_user select :selected").attr('data-id');
            json.category_id = $(".block_category select :selected").attr('data-id');
            json.created_at = dat_format_input(new Date().getTime());
            if (Valid.content(json.content, ".content_text", ".content_text_error") &
                Valid.status(json.status, ".status_number", ".status_number_error")) {
                Post.add(json);
            }
        });
        $(".post_load").on('click',".item_remove",function () {
            Post.remove($(this).attr("data-id")) ;
        });

        $(".post_load").on('click', ".item_edit", function () {
            //User.updateOpen($(this).attr("data-id"));
            $(".overlay").css("display", "block");
            $(".update").css("display", "block");
        })
    },
    eventUpdate: function () {
        $(".update_save").click(function () {
            // let json = {};
            // json.id = $(this).attr("data-id");
            // json.name = $(".update_name").val();
            // json.email = $(".update_email").val();
            // json.status = $(".update_status").val();
            // User.update(json);
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