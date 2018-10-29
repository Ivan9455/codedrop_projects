<?php

class User
{
    private $db;

    public function __construct()
    {
        $this->db = new DataBase();
    }

    public function getS()
    {
        $sql = "SELECT * FROM `user` ";
        $res = mysqli_query($this->db->getConnect(), $sql);
        $arr = [];
        while ($result = mysqli_fetch_assoc($res)) {
            array_push($arr, $result);
        }
        return $arr;
    }

    public function add($json)
    {
        $sql = "INSERT INTO `user`  (name, email, status) 
                VALUE (" . $json->name . "," . $json->email . "," . $json->status . ");";
        mysqli_query($this->db->getConnect(), $sql);
    }

    public function remove($json)
    {
        $sql = "DELETE FROM `user`  WHERE `id` = " . $json->id . ";";
        mysqli_query($this->db->getConnect(), $sql);
    }

    public function get($json)
    {
        $sql = "SELECT * FROM `user`  WHERE `id` = " . $json->id . ";";
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
        UPDATE `user`  SET 
        `name` = '$json->name',
        `email` = '$json->email',
        `status` = '$json->status'
        WHERE `id` = '$json->id'";
        mysqli_query($this->db->getConnect(), $sql);
    }

    public function getUser($json)
    {
        $sql = "SELECT * FROM `post` WHERE `user_id` = " . $json->id . ";";
        $res = mysqli_query($this->db->getConnect(), $sql);
        $arr = [];
        while ($result = mysqli_fetch_assoc($res)) {
            array_push($arr, $result);
        }
        return count($arr);
    }
}