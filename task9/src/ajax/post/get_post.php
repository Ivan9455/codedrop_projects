<?php
require_once ("../../Post.php");
$post = new Post();
print_r(json_encode($post->get($_POST['id'])));