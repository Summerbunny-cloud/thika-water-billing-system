<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../models/Customer.php';

$database = new Database();
$db = $database->getConnection();

$customer = new Customer($db);

$data = json_decode(file_get_contents("php://input"));

$customer->id = $data->id;
$customer->name = $data->name;
$customer->phone = $data->phone;
$customer->email = $data->email;
$customer->address = $data->address;
$customer->meter_number = $data->meter_number;
$customer->status = $data->status;

if($customer->update()) {
    http_response_code(200);
    echo json_encode(array("message" => "Customer was updated."));
} else {
    http_response_code(503);
    echo json_encode(array("message" => "Unable to update customer."));
}
?>