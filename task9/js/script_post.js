"use strict";

$(document).ready(function () {
    $.when(User.loadUsers(Post.loadUser), Category.load(Post.loadCategory)).done(function () {
        Post.loadPost(Post.load);
    });
    Post.event();
    Post.eventUpdate();
});