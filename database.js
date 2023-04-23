const sqlite3 = require('sqlite3').verbose();

// Open database connection
const db = new sqlite3.Database('./database.db');

// Create tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT,
      lastName TEXT,
      phoneNumber TEXT,
      city TEXT,
      state TEXT,
      gender TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS bills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customerId INTEGER,
      billingAmount REAL,
      minutesUsed INTEGER,
      textsSent INTEGER,
      dataConsumed REAL,
      outgoingCalls INTEGER,
      FOREIGN KEY(customerId) REFERENCES customers(id)
    )
  `);
});

module.exports = db;
