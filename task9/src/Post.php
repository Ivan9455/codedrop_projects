<?php
require_once("database/DataBase.php");

class Post
{
    private $db;

    public function __construct()
    {
        $this->db = new DataBase();
    }

    public function add($json)
    {
        $sql = "INSERT INTO `Post` (user_id, content, status, created_at, category_id)  
                VALUE (
                " . $json->user_id . ",
                " . $json->content . ",
                " . $json->status . ",
                '" . $json->created_at . "',
                " . $json->category_id . ");";
        mysqli_query($this->db->getConnect(), $sql);
    }

    public function getUser($id)
    {
        $sql = "SELECT * FROM `Post` WHERE `user_id` = " . $id . ";";
        $res = mysqli_query($this->db->getConnect(), $sql);
        $arr = [];
        while ($result = mysqli_fetch_assoc($res)) {
            array_push($arr, $result);
        }
        return $arr;
    }
    public function getCategory($id)
    {
        $sql = "SELECT * FROM `Post` WHERE `category_id` = " . $id . ";";
        $res = mysqli_query($this->db->getConnect(), $sql);
        $arr = [];
        while ($result = mysqli_fetch_assoc($res)) {
            array_push($arr, $result);
        }
        return $arr;
    }
    public function getS()
    {
        $sql = "SELECT * FROM `Post`";
        $res = mysqli_query($this->db->getConnect(), $sql);
        $arr = [];
        while ($result = mysqli_fetch_assoc($res)) {
            array_push($arr, $result);
        }
        return $arr;
    }

    public function update()
    {
        // TODO: Implement update() method.
    }

    public function remove($id)
    {
        $sql = "DELETE FROM `Post` WHERE `id` = " . $id . ";";
        mysqli_query($this->db->getConnect(), $sql);
    }
    public function get($id){
        $sql = "SELECT * FROM `Post` WHERE `id` = " . $id . ";";
        $res = mysqli_query($this->db->getConnect(), $sql);
        $arr = [];
        while ($result = mysqli_fetch_assoc($res)) {
            array_push($arr, $result);
        }
        return $arr[0];
    }

}