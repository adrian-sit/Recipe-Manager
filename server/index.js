const express = require('express');
const app = express();
const cors = rquire('cors');
const pool = require('./db')

app.use(cors());
app.use(express.json());

//ROUTES//

// create a recipe

// get all recipes

// update a recipe

// add ingredients to inventory

// get recipe by choosing from inventory

app.listen(5000, () => {
    console.log('Server is running on port 5000')
});