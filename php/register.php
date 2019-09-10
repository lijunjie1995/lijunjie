<?php  
	
    include "conn.php";

    if(isset($_GET['checkname'])){
        $username=$_GET['checkname'];
        
        //通过查询方式来测试是否存在用户名。
        $result=mysql_query("select * from loginlist where username='$username'");
    
        if(mysql_fetch_assoc($result)){//存在
            echo true;//1
        }else{//不存在
            echo false;//空隙
        }
    
    }

    if(isset($_POST['submit'])){
        $name=$_POST['username'];
        $pass=sha1($_POST['password']);
        mysql_query("insert loginlist values(null,'$name','$pass')");
        header('location:http://10.31.157.27/html5-1907-js/meilele/dist/login.html');
    }