<?php 
// Include config
require_once '../includes/db_config.php'; 

//Call script based on action
switch ($_GET['action']) {
    case "addItem":
        addItem();
        break;
    case "deleteItem":
        deleteItem();
        break;
    case "clearItem":
        ClearItem();
        break;
	 case "updateItem":
        updateItem();
        break;
    default:
            getItem();
}

//Add Item
function addItem()
{
	global $mysqli;

if(isset($_GET['item'])){
	$item = $mysqli->real_escape_string($_GET['item']);
	$status = "0";
	$created = date("Y-m-d", strtotime("now"));

	$query="INSERT INTO tbl_todos(tasks, status, created_at)  VALUES ('$item', '$status', '$created')";
	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

	$result = $mysqli->affected_rows;

	echo $json_response = json_encode($result);
	}
}

//Delete Item
function deleteItem()
{
	global $mysqli;
if(isset($_GET['itemID'])){
	$itemID = $mysqli->real_escape_string($_GET['itemID']);

	$query="DELETE FROM tbl_todos WHERE id='$itemID'";
	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

	$result = $mysqli->affected_rows;

	echo $json_response = json_encode($result);
}
}

// Clear Item

function Clearitem()
{
    global $mysqli;
	$query = "DELETE FROM tbl_todos WHERE status = 2";
	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

	$result = $mysqli->affected_rows;

	echo $json_response = json_encode($result);	
}

// Get Item

function getItem()
{
global $mysqli;
$status = '%';
if(isset($_GET['status'])){
	$status = $mysqli->real_escape_string($_GET['status']);
}
$query="Select id, tasks, status, created_at from tbl_todos where status like '$status' order by status,id desc";
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

$arr = array();
if($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
		$arr[] = $row;	
	}
}

# JSON-encode the response
echo $json_response = json_encode($arr);
}

// Update Item

function updateItem()
{
global $mysqli;
if(isset($_GET['itemID'])){
	$status = $mysqli->real_escape_string($_GET['status']);
	$itemID = $mysqli->real_escape_string($_GET['itemID']);

	$query="UPDATE tbl_todos set status='$status' where id='$itemID'";
	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

	$result = $mysqli->affected_rows;

	$json_response = json_encode($result);
}	
	
}

// 
?>