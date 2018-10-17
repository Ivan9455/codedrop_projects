<?php
require_once("../../Post.php");
$post = new Post();
$json = json_decode($_POST['json']);
$post->update($json);