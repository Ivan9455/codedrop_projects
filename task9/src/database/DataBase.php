<?php

class DataBase
{
    private $host = 'localhost';
    private $name = 'root';
    private $password = 'enot1147';
    private $database = 'CodeDrop';
    private $connect;

    public function __construct()
    {
        $this->connect = mysqli_connect(
            $this->host,
            $this->name,
            $this->password,
            $this->database);
    }

    public function getConnect()
    {
        return $this->connect;
    }

}