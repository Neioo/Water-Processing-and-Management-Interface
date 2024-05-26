import express from "express";
import mysql from "mysql2";
import cors from 'cors';

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "interface"
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database');
    }
});

app.get("/", (req, res) => {
    res.json("Hello, this is the backend!");
});

app.get("/sales", (req, res) => {
    const q = "SELECT * FROM sales";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Endpoint to get a sale by ID
app.get("/sales/:id", (req, res) => {
    const saleId = req.params.id;
    const q = "SELECT * FROM sales WHERE id = ?";
    db.query(q, [saleId], (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) return res.status(404).send('Sale not found');
        return res.json(data[0]);
    });
});


app.post("/sales", (req, res) => {
    const { type, datetime, quantity, total } = req.body;

    // Convert datetime to MySQL format (YYYY-MM-DD HH:MM:SS)
    const formattedDatetime = new Date(datetime).toISOString().slice(0, 19).replace('T', ' ');

    const q = "INSERT INTO sales (`type`, `datetime`, `quantity`, `total`) VALUES (?, ?, ?, ?)";
    const values = [type, formattedDatetime, quantity, total];

    db.query(q, values, (err, result) => {
        if (err) {
            console.error('Error inserting transaction:', err);
            return res.status(500).json({ error: 'Error inserting transaction' });
        }
        const insertedId = result.insertId;
        const insertedSale = { id: insertedId, type, datetime, quantity, total };
        return res.status(201).json(insertedSale); // Return newly inserted sale data
    });
});


// DELETE
app.delete("/sales/:id", (req,res)=>{
    const salesId = req.params.id
    const q = "DELETE FROM sales WHERE id = ?"

    db.query(q, [salesId], (err,data)=>{
        if (err) return res.json(err);
        return res.json("Transaction has been deleted");
    })
})


// UPDATE
app.put("/sales/:id", (req, res) => {
    const { type, quantity, total } = req.body;
    const salesId = req.params.id;

    const q = "UPDATE sales SET `type` = ?, `quantity` = ?, `total` = ? WHERE id = ?";
    const values = [type, quantity, total, salesId];

    db.query(q, values, (err, data) => {
        if (err) {
            console.error('Error updating transaction:', err);
            return res.status(500).json({ error: 'Error updating transaction' });
        }
        return res.json("Transaction has been updated successfully");
    });
});



app.listen(8800, () => {
    console.log("Connected to backend!");
});
