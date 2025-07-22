<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../models/MeterReading.php';

$database = new Database();
$db = $database->getConnection();

$reading = new MeterReading($db);

$stmt = $reading->read();
$num = $stmt->rowCount();

if($num > 0) {
    $readings_arr = array();
    $readings_arr["records"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $reading_item = array(
            "id" => $id,
            "customer_id" => $customer_id,
            "customer_name" => $customer_name,
            "meter_number" => $meter_number,
            "previous_reading" => $previous_reading,
            "current_reading" => $current_reading,
            "consumption" => $consumption,
            "reading_date" => $reading_date,
            "status" => $status,
            "reader" => $reader
        );

        array_push($readings_arr["records"], $reading_item);
    }

    http_response_code(200);
    echo json_encode($readings_arr);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "No meter readings found."));
}
?>