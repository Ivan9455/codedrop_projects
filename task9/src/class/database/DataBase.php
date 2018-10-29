<?php

class DataBase
{
    private $host = "localhost";
    private $name = "root";
    private $password = "enot1147";
    private $database = 'data';
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

    public function __destruct()
    {
        mysqli_close($this->connect);
    }
}