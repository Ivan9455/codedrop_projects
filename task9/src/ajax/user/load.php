<?php
require_once "../src/User.php";
$user = new User();
print_r(json_encode($user->getS()));
