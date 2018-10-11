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
        $sql = "SELECT * FROM `Category`";
        $res = mysqli_query($this->db->getConnect(), $sql);
        $arr = [];
        while ($result = mysqli_fetch_assoc($res)) {
            array_push($arr, $result);
        }
        return $arr;
    }

    public function remove($id)
    {
        $sql = "DELETE FROM `Category` WHERE `id` = " . $id . ";";
        mysqli_query($this->db->getConnect(), $sql);
    }

    public function add($json)
    {
        $sql = "INSERT INTO `Category` (name, status) 
                VALUE (" . $json->name . "," . $json->status . ");";
        mysqli_query($this->db->getConnect(), $sql);
    }

    public function get($id)
    {
        $sql = "SELECT * FROM `Category` WHERE `id` = " . $id . ";";
        $res = mysqli_query($this->db->getConnect(), $sql);
        $arr = [];
        while ($result = mysqli_fetch_assoc($res)) {
            array_push($arr, $result);
        }
        return $arr[0];
    }
    public function update($json){
        $sql = "
        UPDATE `Category`  SET 
        `name` = '$json->name',
        `status` = '$json->status'
        WHERE `id` = '$json->id'";
        mysqli_query($this->db->getConnect(), $sql);
    }
}