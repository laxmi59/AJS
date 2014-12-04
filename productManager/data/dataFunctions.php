<?php
include ("config.php");

switch($_GET['act']){
    case "showAllProducts":
        showAllProducts();
    break;

    case "addProduct":
        addProduct();
    break;

    case "updateProduct":
        updateProduct();
    break;

    case "deleteProduct":
        deleteProduct();
    break;

    case "statusUpdate":
        statusUpdate();
    break;

    case "getSingleProduct":
        getSingleProduct();
    break;
    
}
function showAllProducts(){
    $sql = "SELECT id, sku, name, price, mrp, description, packing, image, category, stock, status FROM products ORDER BY id DESC";
    $query = mysql_query($sql);                
    $rows = array();
    while($r = mysql_fetch_assoc($query)) {
        $rows[] = $r;
    }
    echo json_encode($rows);
}

function addProduct(){
    $query = "insert into products (name, price, description, packing, stock, status) values ('".$_REQUEST['name']."',". $_REQUEST['price'].",'".$_REQUEST['description']."','". $_REQUEST['packing']."',".$_REQUEST['stock'].",'".$_REQUEST['status']. "')";
    if(mysql_query($query)){
        echo "Product Inserted";
    }else{
        echo "Some thing wrong with product insertion";
    }   
}

function updateProduct(){    
    //print_r($_REQUEST);exit;
    $query = "update products  set name= '".$_REQUEST['name']."', price= ". $_REQUEST['price'].", description= '".$_REQUEST['description']."', packing= '". $_REQUEST['packing']."', stock= ".$_REQUEST['stock'].", status= '".$_REQUEST['status']. "' where id = ".$_REQUEST['id'];
    if(mysql_query($query)){
        echo "Product updated";
    }else{
        echo "Some thing wrong with product Updation";
    }
}
function deleteProduct(){
    $sql = "delete from products where id=".$_REQUEST['id'];
    if(mysql_query($sql)){
        echo "Product Deleted";
    }
}

function statusUpdate(){
    $sql = "SELECT `id`, `status` FROM `products` where id = ".$_GET['id'];
    $query = mysql_fetch_array(mysql_query($sql));                
    if($query['status'] == 'Active'){
        $upd = "status = 'Inactive'";
    }else{
        $upd = "status = 'Active'";
    }
    $updSql = "update `products` set ".$upd." where id = ".$_GET['id'];
    $updquery = mysql_query($updSql);
    if($updquery){
        echo 1;
    }else{
        echo 0;
    }
}

function getSingleProduct(){  
    $sql = "SELECT id, name, price, description, packing, stock, status FROM products where id=".$_REQUEST['id'];
    $query = mysql_query($sql);                
    $rowArr = array();
    while($row = mysql_fetch_array($query)){
        $rowArr[] = array(
            'id'  => $row['id'],
            'name' => $row['name'],
            'price' => $row['price'],
            'description' => $row['description'],
            'packing' => $row['packing'],
            'stock' => $row['stock'],
            'status' => $row['status']
        );
    }
    echo json_encode($rowArr);    
}


?>
