<?php
//require_once ("../../User.php");
spl_autoload_register(function ($class) {
    include '../../' . $class . '.php';
});
$user = new User();
$json = json_decode($_POST['json']);
$user->add($json);
