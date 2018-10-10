<?php
require_once("database/DataBase.php");

class User
{
    private $db;

    public function __construct()
    {
        $this->db = new DataBase();
    }

    public function getUsers()
    {
        $sql = "SELECT * FROM `User`";
        $res = mysqli_query($this->db->getConnect(), $sql);
        $arr = [];
        while ($result = mysqli_fetch_assoc($res)) {
            array_push($arr, $result);
        }
        return $arr;
    }

    public function addUser($json)
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

    public function getUser($id)
    {
        $sql = "SELECT * FROM `User` WHERE `id` = " . $id . ";";
        $res = mysqli_query($this->db->getConnect(), $sql);
        $arr = [];
        while ($result = mysqli_fetch_assoc($res)) {
            array_push($arr, $result);
        }
        return $arr[0];
    }

    public function updateUser($json){
        $sql = "
        UPDATE `User` SET  
        `name` = " . $json->name . ", 
        `email` = " . $json->email . ", 
        `status` = " . $json->status . ", 
        WHERE `User`.`id` = '" . $json->id . "';
        ";
        mysqli_query($this->db->getConnect(), $sql);
        return $json->id;
    }
}