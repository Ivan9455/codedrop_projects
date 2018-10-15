$(document).ready(function () {
    User.loadUsers(Post.loadUser);
    Category.load(Post.loadCategory);
    Post.loadPost(Post.load)
    Post.event();
});