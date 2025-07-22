<?php
class Customer {
    private $conn;
    private $table_name = "customers";

    public $id;
    public $name;
    public $phone;
    public $email;
    public $address;
    public $meter_number;
    public $status;
    public $connection_date;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Read all customers
    function read() {
        $query = "SELECT * FROM " . $this->table_name . " ORDER BY name ASC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Read single customer
    function readOne() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = ? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();
        
        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->name = $row['name'];
            $this->phone = $row['phone'];
            $this->email = $row['email'];
            $this->address = $row['address'];
            $this->meter_number = $row['meter_number'];
            $this->status = $row['status'];
            $this->connection_date = $row['connection_date'];
            return true;
        }
        return false;
    }

    // Create customer
    function create() {
        $query = "INSERT INTO " . $this->table_name . " 
                  SET id=:id, name=:name, phone=:phone, email=:email, 
                      address=:address, meter_number=:meter_number, 
                      status=:status, connection_date=:connection_date";

        $stmt = $this->conn->prepare($query);

        // Sanitize
        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->phone = htmlspecialchars(strip_tags($this->phone));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->address = htmlspecialchars(strip_tags($this->address));
        $this->meter_number = htmlspecialchars(strip_tags($this->meter_number));
        $this->status = htmlspecialchars(strip_tags($this->status));
        $this->connection_date = htmlspecialchars(strip_tags($this->connection_date));

        // Bind values
        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":phone", $this->phone);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":address", $this->address);
        $stmt->bindParam(":meter_number", $this->meter_number);
        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":connection_date", $this->connection_date);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    // Update customer
    function update() {
        $query = "UPDATE " . $this->table_name . " 
                  SET name=:name, phone=:phone, email=:email, 
                      address=:address, meter_number=:meter_number, 
                      status=:status 
                  WHERE id=:id";

        $stmt = $this->conn->prepare($query);

        // Sanitize
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->phone = htmlspecialchars(strip_tags($this->phone));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->address = htmlspecialchars(strip_tags($this->address));
        $this->meter_number = htmlspecialchars(strip_tags($this->meter_number));
        $this->status = htmlspecialchars(strip_tags($this->status));
        $this->id = htmlspecialchars(strip_tags($this->id));

        // Bind values
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":phone", $this->phone);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":address", $this->address);
        $stmt->bindParam(":meter_number", $this->meter_number);
        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":id", $this->id);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    // Delete customer
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

    // Search customers
    function search($keywords) {
        $query = "SELECT * FROM " . $this->table_name . " 
                  WHERE name LIKE ? OR phone LIKE ? OR id LIKE ? 
                  ORDER BY name ASC";
        
        $stmt = $this->conn->prepare($query);
        $keywords = htmlspecialchars(strip_tags($keywords));
        $keywords = "%{$keywords}%";
        
        $stmt->bindParam(1, $keywords);
        $stmt->bindParam(2, $keywords);
        $stmt->bindParam(3, $keywords);
        $stmt->execute();
        
        return $stmt;
    }
}
?>