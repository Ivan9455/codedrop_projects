"use strict";

let promise = new Promise(function (resolve, reject) {
    User.loadUsers(Post.loadUser);
    Category.load(Post.loadCategory);
    resolve();
});
$(document).ready(function () {
    promise.then(function (data) {
        Post.loadPost(Post.load);
    });
    Post.event();
    Post.eventUpdate();
});