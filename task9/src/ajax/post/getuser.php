<?php
require_once ("../../Post.php");
$post = new Post();
print_r(count($post->getUser($_POST['id'])));