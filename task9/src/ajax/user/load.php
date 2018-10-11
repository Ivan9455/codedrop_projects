<?php
require_once "../../User.php";
$user = new User();
print_r(json_encode($user->getS()));
