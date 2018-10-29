<?php
$uri = $_SERVER['REQUEST_URI'];


spl_autoload_register(function ($class) {
    require_once  '../src/class/' . $class . '.php';
    require_once  '../src/class/database/' . $class . '.php';
});
switch ($uri) {
    case $uri == '/user':
        require_once "../view/user.php";
        break;
    case preg_match('/user.post/', $uri) ? true : false:
        $func_name = str_replace("/user/post/", '', $uri);
        print_r(json_encode(call_user_func(array(new User(), $func_name))));
        break;
    case preg_match('/user.get/', $uri) ? true : false:
        $func_name = strstr(str_replace("/user/get/", '', $uri), '?', true);
        $get_name = strstr(substr(strstr($uri, '?'), 1), "=", true);
        print_r(call_user_func_array(array(new User, $func_name), array(json_decode($_GET[$get_name]))));
        break;
    case $uri == '/post':
        require_once "../view/post.php";
        break;
    case preg_match('/post.post/', $uri) ? true : false:
        $func_name = str_replace("/post/post/", '', $uri);
        print_r(json_encode(call_user_func(array(new Post(), $func_name))));
        break;
    case preg_match('/post.gett/', $uri) ? true : false:
        $func_name = strstr(str_replace("/post/gett/", '', $uri), '?', true);
        $get_name = strstr(substr(strstr($uri, '?'), 1), "=", true);
        print_r(call_user_func_array(array(new Post, $func_name), array(json_decode($_GET[$get_name]))));
        break;
    case $uri == '/category':
        require_once "../view/category.php";
        break;
    case preg_match('/category.post/', $uri) ? true : false:
        $func_name = str_replace("/category/post/", '', $uri);
        print_r(json_encode(call_user_func(array(new Category(), $func_name))));
        break;
    case preg_match('/category.get/', $uri) ? true : false:
        $func_name = strstr(str_replace("/category/get/", '', $uri), '?', true);
        $get_name = strstr(substr(strstr($uri, '?'), 1), "=", true);
        print_r(call_user_func_array(array(new Category, $func_name), array(json_decode($_GET[$get_name]))));
        break;
    default:
        require_once "../view/index.php";
        break;
}
?>
