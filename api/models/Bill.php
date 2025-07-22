<?php
class Bill {
    private $conn;
    private $table_name = "bills";

    public $id;
    public $customer_id;
    public $meter_number;
    public $billing_period;
    public $consumption;
    public $rate;
    public $water_charges;
    public $sewerage_charges;
    public $service_charge;
    public $total_amount;
    public $due_date;
    public $status;
    public $issue_date;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Read all bills with customer information
    function read() {
        $query = "SELECT b.*, c.name as customer_name 
                  FROM " . $this->table_name . " b
                  LEFT JOIN customers c ON b.customer_id = c.id
                  ORDER BY b.issue_date DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Read single bill
    function readOne() {
        $query = "SELECT b.*, c.name as customer_name 
                  FROM " . $this->table_name . " b
                  LEFT JOIN customers c ON b.customer_id = c.id
                  WHERE b.id = ? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();
        
        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->customer_id = $row['customer_id'];
            $this->meter_number = $row['meter_number'];
            $this->billing_period = $row['billing_period'];
            $this->consumption = $row['consumption'];
            $this->rate = $row['rate'];
            $this->water_charges = $row['water_charges'];
            $this->sewerage_charges = $row['sewerage_charges'];
            $this->service_charge = $row['service_charge'];
            $this->total_amount = $row['total_amount'];
            $this->due_date = $row['due_date'];
            $this->status = $row['status'];
            $this->issue_date = $row['issue_date'];
            return true;
        }
        return false;
    }

    // Create bill
    function create() {
        $query = "INSERT INTO " . $this->table_name . " 
                  SET id=:id, customer_id=:customer_id, meter_number=:meter_number, 
                      billing_period=:billing_period, consumption=:consumption, 
                      rate=:rate, service_charge=:service_charge, due_date=:due_date, 
                      status=:status";

        $stmt = $this->conn->prepare($query);

        // Sanitize
        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->customer_id = htmlspecialchars(strip_tags($this->customer_id));
        $this->meter_number = htmlspecialchars(strip_tags($this->meter_number));
        $this->billing_period = htmlspecialchars(strip_tags($this->billing_period));
        $this->consumption = htmlspecialchars(strip_tags($this->consumption));
        $this->rate = htmlspecialchars(strip_tags($this->rate));
        $this->service_charge = htmlspecialchars(strip_tags($this->service_charge));
        $this->due_date = htmlspecialchars(strip_tags($this->due_date));
        $this->status = htmlspecialchars(strip_tags($this->status));

        // Bind values
        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":customer_id", $this->customer_id);
        $stmt->bindParam(":meter_number", $this->meter_number);
        $stmt->bindParam(":billing_period", $this->billing_period);
        $stmt->bindParam(":consumption", $this->consumption);
        $stmt->bindParam(":rate", $this->rate);
        $stmt->bindParam(":service_charge", $this->service_charge);
        $stmt->bindParam(":due_date", $this->due_date);
        $stmt->bindParam(":status", $this->status);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    // Update bill
    function update() {
        $query = "UPDATE " . $this->table_name . " 
                  SET customer_id=:customer_id, meter_number=:meter_number, 
                      billing_period=:billing_period, consumption=:consumption, 
                      rate=:rate, service_charge=:service_charge, 
                      due_date=:due_date, status=:status 
                  WHERE id=:id";

        $stmt = $this->conn->prepare($query);

        // Sanitize and bind values
        $this->customer_id = htmlspecialchars(strip_tags($this->customer_id));
        $this->meter_number = htmlspecialchars(strip_tags($this->meter_number));
        $this->billing_period = htmlspecialchars(strip_tags($this->billing_period));
        $this->consumption = htmlspecialchars(strip_tags($this->consumption));
        $this->rate = htmlspecialchars(strip_tags($this->rate));
        $this->service_charge = htmlspecialchars(strip_tags($this->service_charge));
        $this->due_date = htmlspecialchars(strip_tags($this->due_date));
        $this->status = htmlspecialchars(strip_tags($this->status));
        $this->id = htmlspecialchars(strip_tags($this->id));

        $stmt->bindParam(":customer_id", $this->customer_id);
        $stmt->bindParam(":meter_number", $this->meter_number);
        $stmt->bindParam(":billing_period", $this->billing_period);
        $stmt->bindParam(":consumption", $this->consumption);
        $stmt->bindParam(":rate", $this->rate);
        $stmt->bindParam(":service_charge", $this->service_charge);
        $stmt->bindParam(":due_date", $this->due_date);
        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":id", $this->id);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    // Delete bill
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

    // Get customer bills
    function getCustomerBills($customer_id) {
        $query = "SELECT * FROM " . $this->table_name . " 
                  WHERE customer_id = ? 
                  ORDER BY issue_date DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $customer_id);
        $stmt->execute();
        return $stmt;
    }
}
?>