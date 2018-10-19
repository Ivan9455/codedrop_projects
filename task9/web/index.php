<?php
$uri = $_SERVER['REQUEST_URI'];
switch ($uri) {
    case $uri == '/user':
        require_once "../view/user.php";
        break;
    case preg_match('/user.post/', $uri) ? true : false:
        require_once "../src/User.php";
        $func_name = str_replace("/user/post/", '', $uri);
        print_r(json_encode(call_user_func(array(new User(), $func_name))));
        break;
    case preg_match('/user.get?/', $uri) ? true : false:
        require_once "../src/User.php";
        echo "<br>";
        $get_name = strstr(substr(strstr($uri,'?'),1),"=",true);
        print_r($_GET[$get_name]);
        echo "<br>";
        print_r($_GET) ;
//        $func_name = str_replace("/user/get?", "", $uri);
//        call_user_method($func_name, new User);

        break;
    case $uri == '/post':
        require_once "../view/post.php";
        break;
    case $uri == '/category':
        require_once "../view/category.php";
        break;
    default:
        require_once "../view/index.php";
        break;
}
?>
