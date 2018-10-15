<?php
require_once("database/DataBase.php");

class Post
{
    private $db;

    public function __construct()
    {
        $this->db = new DataBase();
    }

    public function add()
    {
        // TODO: Implement add() method.
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
        // TODO: Implement getS() method.
    }

    public function update()
    {
        // TODO: Implement update() method.
    }

    public function remove()
    {
        // TODO: Implement remove() method.
    }

}