<?php
class MeterReading {
    private $conn;
    private $table_name = "meter_readings";

    public $id;
    public $customer_id;
    public $meter_number;
    public $previous_reading;
    public $current_reading;
    public $consumption;
    public $reading_date;
    public $status;
    public $reader;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Read all meter readings with customer information
    function read() {
        $query = "SELECT mr.*, c.name as customer_name 
                  FROM " . $this->table_name . " mr
                  LEFT JOIN customers c ON mr.customer_id = c.id
                  ORDER BY mr.reading_date DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Read single meter reading
    function readOne() {
        $query = "SELECT mr.*, c.name as customer_name 
                  FROM " . $this->table_name . " mr
                  LEFT JOIN customers c ON mr.customer_id = c.id
                  WHERE mr.id = ? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();
        
        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->customer_id = $row['customer_id'];
            $this->meter_number = $row['meter_number'];
            $this->previous_reading = $row['previous_reading'];
            $this->current_reading = $row['current_reading'];
            $this->consumption = $row['consumption'];
            $this->reading_date = $row['reading_date'];
            $this->status = $row['status'];
            $this->reader = $row['reader'];
            return true;
        }
        return false;
    }

    // Create meter reading
    function create() {
        $query = "INSERT INTO " . $this->table_name . " 
                  SET id=:id, customer_id=:customer_id, meter_number=:meter_number, 
                      previous_reading=:previous_reading, current_reading=:current_reading, 
                      reading_date=:reading_date, status=:status, reader=:reader";

        $stmt = $this->conn->prepare($query);

        // Sanitize
        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->customer_id = htmlspecialchars(strip_tags($this->customer_id));
        $this->meter_number = htmlspecialchars(strip_tags($this->meter_number));
        $this->previous_reading = htmlspecialchars(strip_tags($this->previous_reading));
        $this->current_reading = htmlspecialchars(strip_tags($this->current_reading));
        $this->reading_date = htmlspecialchars(strip_tags($this->reading_date));
        $this->status = htmlspecialchars(strip_tags($this->status));
        $this->reader = htmlspecialchars(strip_tags($this->reader));

        // Bind values
        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":customer_id", $this->customer_id);
        $stmt->bindParam(":meter_number", $this->meter_number);
        $stmt->bindParam(":previous_reading", $this->previous_reading);
        $stmt->bindParam(":current_reading", $this->current_reading);
        $stmt->bindParam(":reading_date", $this->reading_date);
        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":reader", $this->reader);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    // Update meter reading
    function update() {
        $query = "UPDATE " . $this->table_name . " 
                  SET customer_id=:customer_id, meter_number=:meter_number, 
                      previous_reading=:previous_reading, current_reading=:current_reading, 
                      reading_date=:reading_date, status=:status, reader=:reader 
                  WHERE id=:id";

        $stmt = $this->conn->prepare($query);

        // Sanitize and bind values
        $this->customer_id = htmlspecialchars(strip_tags($this->customer_id));
        $this->meter_number = htmlspecialchars(strip_tags($this->meter_number));
        $this->previous_reading = htmlspecialchars(strip_tags($this->previous_reading));
        $this->current_reading = htmlspecialchars(strip_tags($this->current_reading));
        $this->reading_date = htmlspecialchars(strip_tags($this->reading_date));
        $this->status = htmlspecialchars(strip_tags($this->status));
        $this->reader = htmlspecialchars(strip_tags($this->reader));
        $this->id = htmlspecialchars(strip_tags($this->id));

        $stmt->bindParam(":customer_id", $this->customer_id);
        $stmt->bindParam(":meter_number", $this->meter_number);
        $stmt->bindParam(":previous_reading", $this->previous_reading);
        $stmt->bindParam(":current_reading", $this->current_reading);
        $stmt->bindParam(":reading_date", $this->reading_date);
        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":reader", $this->reader);
        $stmt->bindParam(":id", $this->id);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    // Delete meter reading
    function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $this->id = htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(1, $this->id);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    // Get customer meter readings
    function getCustomerReadings($customer_id) {
        $query = "SELECT * FROM " . $this->table_name . " 
                  WHERE customer_id = ? 
                  ORDER BY reading_date DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $customer_id);
        $stmt->execute();
        return $stmt;
    }

    // Get latest reading for a meter
    function getLatestReading($meter_number) {
        $query = "SELECT * FROM " . $this->table_name . " 
                  WHERE meter_number = ? 
                  ORDER BY reading_date DESC 
                  LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $meter_number);
        $stmt->execute();
        return $stmt;
    }
}
?>