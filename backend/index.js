import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'interface'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database');
    }
});

// Sales routes
app.get('/sales', (req, res) => {
    const q = 'SELECT * FROM sales ORDER BY datetime DESC';
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/sales', (req, res) => {
    const { type, datetime, quantity, total } = req.body;
    const formattedDatetime = new Date(datetime).toISOString().slice(0, 19).replace('T', ' ');
    const q = 'INSERT INTO sales (type, datetime, quantity, total) VALUES (?, ?, ?, ?)';
    const values = [type, formattedDatetime, quantity, total];
    db.query(q, values, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error inserting transaction' });
        const insertedSale = { id: result.insertId, type, datetime, quantity, total };
        return res.status(201).json(insertedSale);
    });
});

app.delete('/sales/:id', (req, res) => {
    const salesId = req.params.id;
    const q = 'DELETE FROM sales WHERE id = ?';
    db.query(q, [salesId], (err, data) => {
        if (err) return res.json(err);
        return res.json('Transaction has been deleted');
    });
});

app.put('/sales/:id', (req, res) => {
    const { type, quantity, total, updatetime } = req.body;
    const salesId = req.params.id;
    const formattedUpdDatetime = new Date(updatetime).toISOString().slice(0, 19).replace('T', ' ');
    const q = 'UPDATE sales SET type = ?, quantity = ?, total = ?, updatetime = ? WHERE id = ?';
    const values = [type, quantity, total, formattedUpdDatetime, salesId];
    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json({ error: 'Error updating transaction', details: err });
        return res.json('Transaction has been updated successfully');
    });
});

// Products routes
app.get('/products', (req, res) => {
    const q = 'SELECT * FROM products ORDER BY id';
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/products', (req, res) => {
    const { name, price } = req.body;
    const q = 'INSERT INTO products (name, price) VALUES (?, ?)';
    const values = [name, price];
    db.query(q, values, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error inserting product' });
        const insertedProduct = { id: result.insertId, name, price };
        return res.status(201).json(insertedProduct);
    });
});

app.delete('/products/:id', (req, res) => {
    const productId = req.params.id;
    const q = 'DELETE FROM products WHERE id = ?';
    db.query(q, [productId], (err, data) => {
        if (err) return res.json(err);
        return res.json('Product has been deleted');
    });
});

app.put('/products/:id', (req, res) => {
    const { name, price } = req.body;
    const productId = req.params.id;
    const q = 'UPDATE products SET name = ?, price = ? WHERE id = ?';
    const values = [name, price, productId];
    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json({ error: 'Error updating product', details: err });
        return res.json('Product has been updated successfully');
    });
});


// Accounts routes
app.get('/accounts', (req, res) => {
    const q = 'SELECT * FROM accounts ORDER BY id';
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/accounts', (req, res) => {
    const { first_name, last_name, contactnum, type, password } = req.body;
    const q = 'INSERT INTO accounts (first_name, last_name, contactnum, type, password) VALUES (?, ?, ?, ?, ?)';
    const values = [first_name, last_name, contactnum, type, password];
    db.query(q, values, (err, result) => {
        if (err) {
            console.error('Error inserting account:', err.message); // Log the actual error message
            return res.status(500).json({ error: 'Error inserting account', details: err.message }); // Send the error message in the response
        }
        const insertedAccount = { id: result.insertId, first_name, last_name, contactnum, type, password };
        return res.status(201).json(insertedAccount);
    });
});



app.delete('/accounts/:id', (req, res) => {
    const accountId = req.params.id;
    const q = 'DELETE FROM accounts WHERE id = ?';
    db.query(q, [accountId], (err, data) => {
        if (err) return res.json(err);
        return res.json('Account has been deleted');
    });
});

app.put('/accounts/:id', (req, res) => {
    const { first_name, last_name, contactnum, password, type } = req.body;

    if (!first_name || !last_name || !contactnum || !password || !type) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const accountId = req.params.id;
    const q = 'UPDATE accounts SET first_name = ?, last_name = ?, contactnum = ?, password = ?, type = ? WHERE id = ?';
    const values = [first_name, last_name, contactnum, password, type, accountId];
    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json({ error: 'Error updating account', details: err });
        return res.json('Account has been updated successfully');
    });
});



app.listen(8800, () => {
    console.log('Connected to backend!');
});