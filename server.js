const db = require('./database');

const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');



const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const port = 3000; // Or any other port number you prefer

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


// Database to store customers and bills
const database = {
  customers: [],
  bills: [],
};

// Routes for customers
app.post('/customers', (req, res) => {
  // Get customer data from the request body
  const { firstName, lastName, phoneNumber, city, state, gender } = req.body;

  // Add customer to the database with a generated UUID as the ID
  const id = uuid.v4();
  const customer = { id, firstName, lastName, phoneNumber, city, state, gender };
  database.customers.push(customer);

  res.status(201).send(customer);
});

app.get('/customers', (req, res) => {
  // Return all customers in the database
  res.send(database.customers);
});

app.get('/customers/:id', (req, res) => {
  const { id } = req.params;

  // Find the customer with the given ID in the database
  const customer = database.customers.find(c => c.id === id);

  if (!customer) {
    // Customer not found
    res.status(404).send('Customer not found');
  } else {
    // Customer found, return it
    res.send(customer);
  }
});

app.put('/customers/:id', (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, phoneNumber, city, state, gender } = req.body;

  // Find the customer with the given ID in the database
  const customer = database.customers.find(c => c.id === id);

  if (!customer) {
    // Customer not found
    res.status(404).send('Customer not found');
  } else {
    // Update customer information in the database
    customer.firstName = firstName;
    customer.lastName = lastName;
    customer.phoneNumber = phoneNumber;
    customer.city = city;
    customer.state = state;
    customer.gender = gender;

    res.send(customer);
  }
});

app.delete('/customers/:id', (req, res) => {
  const { id } = req.params;

  // Find the customer with the given ID in the database
  const customerIndex = database.customers.findIndex(c => c.id === id);

  if (customerIndex === -1) {
    // Customer not found
    res.status(404).send('Customer not found');
  } else {
    // Remove customer from the database
    database.customers.splice(customerIndex, 1);

    res.send('Customer removed successfully');
  }
});

// Routes for bills
app.post('/bills/:customerId', (req, res) => {
  const { customerId } = req.params;
  const { billingAmount, minutesUsed, textsSent, dataConsumed, outgoingCalls } = req.body;

  // Find the customer with the given ID in the database
  const customer = database.customers.find(c => c.id === customerId);

  if (!customer) {
    // Customer not found
    res.status(404).send('Customer not found');
  } else {
    // Create a new bill for the customer in the database with a generated UUID as the ID
    const id = uuid.v4();
    const bill = { id, customerId, billingAmount, minutesUsed, textsSent, dataConsumed, outgoingCalls };
    database.bills.push(bill);

    res.status(201).send(bill);
  }
});


 app.get('/bills', (req, res) => {
        const { id } = req.params;
      
        // Get customer information from the database
        // Your database code here
      
        res.send(bills);
      });


    app.get('/customers/:id', (req, res) => {
        const { id } = req.params;
      
        // Get customer information from the database
        // Your database code here
      
        res.send(customer);
      });
      
      app.get('/bills/:id', (req, res) => {
        const { id } = req.params;
      
        // Get bill information from the database
        // Your database code here
      
        res.send(bill);
      });

      app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something broke!');
      });