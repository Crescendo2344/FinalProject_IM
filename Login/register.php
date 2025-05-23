<?php 
include 'connect.php';


if (isset($_POST['signUp'])) {
    $firstName = $_POST['fName'];
    $lastName = $_POST['lName'];
    $email = $_POST['email'];
    $password = md5($_POST['password']); 

    
    $checkEmail = "SELECT * FROM users WHERE email='$email'";
    $result = $conn->query($checkEmail);

    if ($result->num_rows > 0) {
        echo "Email Address Already Exists!";
    } else {
        
        $insertQuery = "INSERT INTO users (firstName, lastName, email, password) 
                        VALUES ('$firstName', '$lastName', '$email', '$password')";
        if ($conn->query($insertQuery) === TRUE) {
            header("Location: index.php"); 
            exit();
        } else {
            echo "Error: " . $conn->error;
        }
    }
}


if (isset($_POST['signIn'])) {
    $email = $_POST['email'];
    $password = md5($_POST['password']); 

    $sql = "SELECT * FROM users WHERE email='$email' AND password='$password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        session_start();
        $row = $result->fetch_assoc();
        $_SESSION['email'] = $row['email'];
        header("Location:http://127.0.0.1:5500/HTML/Home.html"); 
        exit();
    } else {
        echo "Not Found, Incorrect Email or Password";
    }
}

if (isset($_POST['adminsignIn'])) {
    $email = $_POST['adminEmail'];
    $password = md5($_POST['adminPassword']); 

    $sql = "SELECT * FROM admin WHERE adminEmail='$email' AND adminPassword='$password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        session_start();
        $row = $result->fetch_assoc();
        $_SESSION['adminEmail'] = $row['adminEmail'];
        header("Location: http://127.0.0.1:5500/elegant-bridal-admin/HTML/index.html");
        exit();
    } else {
        echo "Incorrect Admin Email or Password";
    }
}

if (isset($_POST['adminsignUp'])) {
    $name = $_POST['adminName'];
    $email = $_POST['adminEmail'];
    $password = md5($_POST['adminPassword']); 

    $checkAdmin = "SELECT * FROM admin WHERE adminEmail='$email'";
    $result = $conn->query($checkAdmin);

    if ($result->num_rows > 0) {
        echo "Admin Email Already Exists!";
    } else {
        $insertAdmin = "INSERT INTO admin (adminName, adminEmail, adminPassword) 
                VALUES ('$name', '$email', '$password')";
        if ($conn->query($insertAdmin) === TRUE) {

            session_start();
            $_SESSION['adminEmail'] = $email;
            header("Location: http://127.0.0.1:5500/elegant-bridal-admin/HTML/index.html");
            exit();
        } else {
            echo "Error: " . $conn->error;
        }
    }
}

?>
