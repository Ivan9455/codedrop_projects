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
        $arr = [];
        foreach ($this->db->getConnect()->query($sql) as $row) {
            array_push($arr, $row);
        }
        return $arr;
    }

    public function add($json)
    {
        $sql = "INSERT INTO `user`  (name, email, status) 
                VALUE (:name, :email, :status)";
        $res = $this->db->getConnect()->prepare($sql);
        $res->execute(array(
            ':name' => $json->name,
            ':email' => $json->email,
            ':status' => $json->status));
    }

    public function remove($json)
    {
        $sql = "DELETE FROM `user`  WHERE `id` =  :id";
        $res = $this->db->getConnect()->prepare($sql);
        $res->execute(array('id' => $json->id));
    }

    public function get($json)
    {
        $sql = "SELECT * FROM `user` WHERE `id` = :id ";
        $res = $this->db->getConnect()->prepare($sql);
        $res->execute(array(':id' => $json->id));
        $arr = [];
        foreach ($res as $row) {
            array_push($arr, $row);
        }
        return json_encode($arr[0]);
    }

    public function update($json)
    {
        $sql = "UPDATE `user` SET 
        `name` = :name , 
        `email` = :email ,
        `status` = :status 
        WHERE `id` = :id ";
        $res = $this->db->getConnect()->prepare($sql);
        $res->execute(array(
            ':name' => $json->name,
            ':email' => $json->email,
            ':status' => $json->status,
            ':id' => $json->id));
    }

    public function getUser($json)
    {
        $sql = "SELECT * FROM `post` WHERE `user_id` = :id";
        $res = $this->db->getConnect()->prepare($sql);
        $res->execute(array(':id' => $json->id));
        $arr = [];
        foreach ($res as $row) {
            array_push($arr, $row);
        }
        return count($arr);
    }
}