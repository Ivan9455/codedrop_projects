<?php
require_once "src/User.php";
$db = new User();
$res = $db->getUsers();
print_r($res);

