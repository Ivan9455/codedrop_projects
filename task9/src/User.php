<?php
require_once("database/DataBase.php");
require_once("abstract/CRUD.php");

class User extends CRUD
{
    private $db;

    public function __construct()
    {
        $this->db = new DataBase();
    }

    public function getS()
    {
        $sql = "SELECT * FROM `User`";
        $res = mysqli_query($this->db->getConnect(), $sql);
        $arr = [];
        while ($result = mysqli_fetch_assoc($res)) {
            array_push($arr, $result);
        }
        return $arr;
    }

    public function add($json)
    {
        $sql = "INSERT INTO `User` (name, email, status) 
                VALUE (" . $json->name . "," . $json->email . "," . $json->status . ");";
        mysqli_query($this->db->getConnect(), $sql);
    }

    public function remove($id)
    {
        $sql = "DELETE FROM `User` WHERE `id` = " . $id . ";";
        mysqli_query($this->db->getConnect(), $sql);
    }

    public function get($id)
    {
        $sql = "SELECT * FROM `User` WHERE `id` = " . $id . ";";
        $res = mysqli_query($this->db->getConnect(), $sql);
        $arr = [];
        while ($result = mysqli_fetch_assoc($res)) {
            array_push($arr, $result);
        }
        return $arr[0];
    }

    public function update($json)
    {
        $sql = "
        UPDATE `User`  SET 
        `name` = '$json->name',
        `email` = '$json->email',
        `status` = '$json->status'
        WHERE `id` = '$json->id'";
        mysqli_query($this->db->getConnect(), $sql);
    }
}