# Water Billing System - XAMPP Setup Instructions

## Prerequisites
- XAMPP installed on your computer
- Basic knowledge of PHP and MySQL

## Setup Steps

### 1. Install XAMPP
Download and install XAMPP from https://www.apachefriends.org/

### 2. Start Services
- Open XAMPP Control Panel
- Start **Apache** and **MySQL** services

### 3. Create Database
1. Open your browser and go to `http://localhost/phpmyadmin`
2. Click "New" to create a new database
3. Name it `water_billing_system`
4. Click "Create"

### 4. Import Database Schema
1. Select the `water_billing_system` database
2. Click on "SQL" tab
3. Copy and paste the contents of `water_billing_database.sql`
4. Click "Go" to execute

### 5. Setup Project Files
1. Copy the `api` folder to your XAMPP `htdocs` directory
   - Path: `C:\xampp\htdocs\` (Windows) or `/Applications/XAMPP/htdocs/` (Mac)
2. Your folder structure should look like:
   ```
   htdocs/
   └── api/
       ├── config/
       │   └── database.php
       ├── models/
       │   ├── Customer.php
       │   ├── Bill.php
       │   ├── Payment.php
       │   └── MeterReading.php
       ├── customers/
       │   ├── read.php
       │   ├── create.php
       │   ├── update.php
       │   └── delete.php
       ├── bills/
       │   └── read.php
       ├── payments/
       │   └── read.php
       └── meter_readings/
           └── read.php
   ```

### 6. Test API Endpoints
Open your browser and test these URLs:

- **Get all customers**: `http://localhost/api/customers/read.php`
- **Get all bills**: `http://localhost/api/bills/read.php`
- **Get all payments**: `http://localhost/api/payments/read.php`
- **Get all meter readings**: `http://localhost/api/meter_readings/read.php`

### 7. Database Configuration
The default database configuration in `config/database.php`:
- Host: `localhost`
- Database: `water_billing_system`
- Username: `root`
- Password: `` (empty)

If your XAMPP MySQL has different credentials, update the `database.php` file accordingly.

## API Usage Examples

### Create a new customer (POST request)
```javascript
fetch('http://localhost/api/customers/create.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        id: 'W2006',
        name: 'New Customer',
        phone: '+254700000000',
        email: 'new@email.com',
        address: 'New Address',
        meter_number: 'TW2006',
        status: 'Active',
        connection_date: '2024-01-01'
    })
})
```

### Update a customer (PUT request)
```javascript
fetch('http://localhost/api/customers/update.php', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        id: 'W2001',
        name: 'Updated Name',
        phone: '+254712345678',
        email: 'updated@email.com',
        address: 'Updated Address',
        meter_number: 'TW2001',
        status: 'Active'
    })
})
```

### Delete a customer (DELETE request)
```javascript
fetch('http://localhost/api/customers/delete.php', {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        id: 'W2001'
    })
})
```

## Database Schema Features

### Automatic Calculations
- **Bills table**: Water charges, sewerage charges, and total amount are automatically calculated
- **Meter readings table**: Consumption is automatically calculated from current - previous reading

### Relationships
- Foreign key constraints ensure data integrity
- Cascading deletes remove related records when a customer is deleted

### Sample Data
The database comes pre-loaded with sample data for testing:
- 5 customers
- 5 meter readings
- 5 bills
- 5 payments

## Security Features
- Input sanitization to prevent SQL injection
- Prepared statements for database queries
- CORS headers for cross-origin requests

## Troubleshooting

### Common Issues

1. **"Connection error"**
   - Make sure MySQL is running in XAMPP
   - Check database credentials in `config/database.php`

2. **"404 Not Found"**
   - Ensure files are in the correct `htdocs` directory
   - Check that Apache is running

3. **"Database doesn't exist"**
   - Create the database in phpMyAdmin
   - Run the SQL schema file

4. **"Access denied"**
   - Check MySQL username/password in database config
   - Default XAMPP MySQL user is `root` with no password

## Next Steps
- Add more CRUD endpoints for bills, payments, and meter readings
- Implement authentication and authorization
- Add input validation and error handling
- Create a web interface to interact with the API