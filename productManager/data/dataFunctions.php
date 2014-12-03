<?php
include ("config.php");
if($_GET['act'] == 'all'){
    $sql = "SELECT `id` , `sku` , `name` , `price` , `mrp` , `description` , `packing` , `image` , `category` , `stock` , `status` FROM `products` ORDER BY id ASC";
    $query = mysql_query($sql);                
    $rows = array();
    while($r = mysql_fetch_assoc($query)) {
        $rows[] = $r;
    }
    echo json_encode($rows);
}

if($_GET['act'] == 'statusUpdate'){
    $sql = "SELECT `id`, `status` FROM `products` where id = ".$_GET['pid'];
    $query = mysql_fetch_array(mysql_query($sql));                
    if($query['status'] == 'Active'){
        $upd = "status = 'Inactive'";
    }else{
        $upd = "status = 'Active'";
    }
    $updSql = "update `products` set ".$upd." where id = ".$_GET['pid'];
    $updquery = mysql_query($updSql);
    if($updquery){
        echo 1;
    }else{
        echo 0;
    }
}

if($_GET['act'] == 'insertProduct'){
    $errorsArr = array();
    if($_REQUEST['name'] == "undefined")
        $errorsArr[] = "Name Required";    
    
    if($_REQUEST['name'] == "undefined")
        $errorsArr[] = "Price Required"; 
    
    if($errorsArr)
        print_r($errorsArr);
    else{
        $query = "insert into products (`name`, `price`, `description`, `packing`, `stock`, `status`) values ('".$_REQUEST['name']."',". $_REQUEST['price'].",'".$_REQUEST['description']."','". $_REQUEST['packing']."',".$_REQUEST['stock'].",'".$_REQUEST['status']. "')";
        mysql_query($query);
        echo "Product Inserted";
    }
}
if($_GET['act'] == 'getSingleRecord'){    
    $sql = "SELECT `id` , `name` , `price` , `description` , `packing` , `stock` , `status` FROM `products` where id=".$_REQUEST['pid'];
    $query = mysql_query($sql);                
    //$row = array();
    $row = mysql_fetch_assoc($query);
       // $row[] = $r;    
    echo json_encode($row);    
}

if($_GET['act'] == 'updateProduct'){
    //print_r($_POST);
    $errorsArr = array();
    if($_REQUEST['name'] == "undefined")
        $errorsArr[] = "Name Required";    
    
    if($_REQUEST['name'] == "undefined")
        $errorsArr[] = "Price Required"; 
    
    if($errorsArr)
        print_r($errorsArr);
    else{
        $query = "update products  set `name` = '".$_REQUEST['name']."', `price` = ". $_REQUEST['price'].", `description` = '".$_REQUEST['description']."', `packing` = '". $_REQUEST['packing']."', `stock` = ".$_REQUEST['stock'].", `status` = '".$_REQUEST['status']. "' where id = ".$_REQUEST['pid'];
        mysql_query($query);
        echo "Product updated";
    }
}
?>
