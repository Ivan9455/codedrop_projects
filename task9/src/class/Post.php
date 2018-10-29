<?php

class Post
{
    private $db;

    public function __construct()
    {
        $this->db = new DataBase();
    }

    public function add($json)
    {
        $sql = "INSERT INTO `post` (user_id, content, status, created_at, category_id)  
                VALUE (
                " . $json->user_id . ",
                " . $json->content . ",
                " . $json->status . ",
                '" . $json->created_at . "',
                " . $json->category_id . ");";
        mysqli_query($this->db->getConnect(), $sql);
    }

    public function getS()
    {
        $sql = "SELECT * FROM `post`";
        $res = mysqli_query($this->db->getConnect(), $sql);
        $arr = [];
        while ($result = mysqli_fetch_assoc($res)) {
            array_push($arr, $result);
        }
        return $arr;
    }

    public function update($json)
    {
        $sql = "
        UPDATE `post`  SET 
        `user_id` = '$json->user_id',
        `category_id` = '$json->category_id',
        `status` = '$json->status',
        `content` = '$json->content',
        `updated_at` = '". $json->updated_at ."'
        WHERE `id` = '$json->id'";
        mysqli_query($this->db->getConnect(), $sql);
    }

    public function remove($json)
    {
        $sql = "DELETE FROM `post` WHERE `id` = " . $json->id . ";";
        mysqli_query($this->db->getConnect(), $sql);
    }

    public function get($json)
    {
        $sql = "SELECT * FROM `post` WHERE `id` = " . $json->id . ";";
        $res = mysqli_query($this->db->getConnect(), $sql);
        $arr = [];
        while ($result = mysqli_fetch_assoc($res)) {
            array_push($arr, $result);
        }
        return json_encode($arr[0]);
    }

}