<?php
require_once("database/DataBase.php");

class Category
{

    private $db;

    public function __construct()
    {
        $this->db = new DataBase();
    }

    public function getS()
    {
        $sql = "SELECT * FROM `category`";
        $res = mysqli_query($this->db->getConnect(), $sql);
        $arr = [];
        while ($result = mysqli_fetch_assoc($res)) {
            array_push($arr, $result);
        }
        return $arr;
    }

    public function remove($json)
    {
        $sql = "DELETE FROM `category` WHERE `id` = " . $json->id . ";";
        mysqli_query($this->db->getConnect(), $sql);
    }

    public function add($json)
    {
        $sql = "INSERT INTO `category` (name, status) 
                VALUE (" . $json->name . "," . $json->status . ");";
        mysqli_query($this->db->getConnect(), $sql);
    }

    public function get($json)
    {
        $sql = "SELECT * FROM `category` WHERE `id` = " . $json->id . ";";
        $res = mysqli_query($this->db->getConnect(), $sql);
        $arr = [];
        while ($result = mysqli_fetch_assoc($res)) {
            array_push($arr, $result);
        }
        return json_encode($arr[0]);
    }

    public function update($json)
    {
        $sql = "
        UPDATE `category`  SET 
        `name` = '$json->name',
        `status` = '$json->status'
        WHERE `id` = '$json->id'";
        mysqli_query($this->db->getConnect(), $sql);
    }

    public function getCategory($json)
    {
        $sql = "SELECT * FROM `post` WHERE `category_id` = " . $json->id . ";";
        $res = mysqli_query($this->db->getConnect(), $sql);
        $arr = [];
        while ($result = mysqli_fetch_assoc($res)) {
            array_push($arr, $result);
        }
        return count($arr);
    }
}