"use strict";

let promise = new Promise(function (resolve, reject) {
    //Category.load(Post.loadCategory);
    let res = User.loadUsers(Post.loadUser) & Category.load(Post.loadCategory);
    resolve(res);
    reject(User.loadUsers(Post.loadUser) ,promise());
    reject(Category.load(Post.loadCategory),promise())
});
$(document).ready(function () {
    promise.then(function (data) {
        console.log(data);
        if(data){
            Post.loadPost(Post.load)
        }
    });
    //User.loadUsers(Post.loadUser);
    // Category.load(Post.loadCategory);
    // Post.loadPost(Post.load);
    Post.event();
    Post.eventUpdate();
});