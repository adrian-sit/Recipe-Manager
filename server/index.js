const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db')

app.use(cors());
app.use(express.json());

//ROUTES//

// create a recipe

app.post('/recipes', async(req, res) => {
    try {
        const { Name, Description, Type } = req.body;
        const newRecipe = await pool.query(
            'INSERT INTO Recipes (Name, Description, Type) VALUES($1, $2, $3) RETURNING *',
            [Name, Description, Type]
        );
        res.json(newRecipe.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// get all recipes

app.get('/recipes', async(req, res) => {
    try {
        const allRecipes = await pool.query('SELECT * FROM Recipes');
        res.json(allRecipes.rows)
    } catch (err) {
        console.error(err.message);
    }
});

// get a recipe

app.get('/recipes/:id', async(req, res) => {    
    try {
        const { id } = req.params;
        const recipe = await pool.query('SELECT * FROM Recipes WHERE ID = $1', [id])

        res.json(recipe.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// update a recipe

app.put('/recipes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { Name, Description, Type } = req.body;
        const updateRecipe = await pool.query('UPDATE Recipes SET Name = $1, Description = $2, Type = $3 WHERE ID = $4', [Name, Description, Type, id]);

        res.json('Recipe updated');
    } catch (err) {
        console.error(err.message)
    }
});

// delete a recipe

app.delete('/recipes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteRecipe = await pool.query('DELETE FROM Recipes WHERE ID = $1', [id]);
        res.json('Recipe deleted');
    } catch (err) {
        console.error(err.message);
    }
});

// create a step

app.post('/steps', async(req, res) => {
    try {
        const { Number, Description, Tool, Time, Active_cooking} = req.body;
        const newStep = await pool.query(
            'INSERT INTO Steps (Number, Description, Tool, Time, Active_cooking) VALUES($1, $2, $3, $4, $5) RETURNING *',
            [Number, Description, Tool, Time, Active_cooking]
        );
        res.json(newStep.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// get all steps of a recipe

app.get('/steps/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const allSteps = await pool.query(
            'SELECT * FROM Steps s JOIN Recipes_Steps rs ON s.ID = rs.Steps_ID WHERE rs.Recipes_ID = $1', [id]);
        res.json(allSteps.rows)
    } catch (err) {
        console.error(err.message);
    }
});

// update a step

app.put('/steps/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { Number, Description, Tool, Time, Active_cooking } = req.body;
        const updateStep = await pool.query('UPDATE Steps SET Number = $1, Description = $2, Tool = $3, Time = $4, Active_cooking = $5, WHERE ID = $6', [Number, Description, Tool, Time, Active_cooking, id]);

        res.json('Step updated');
    } catch (err) {
        console.error(err.message)
    }
});

// delete a step

app.delete('/steps/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteStep = await pool.query('DELETE FROM Steps WHERE ID = $1', [id]);
        res.json('Step deleted');
    } catch (err) {
        console.error(err.message);
    }
});

// create ingredient

app.post('/ingredients', async (req, res) => {
    try {
        const { Name } = req.body;
        const newIngredient = await pool.query(
            'INSERT INTO Ingredients (Name) VALUES($1) RETURNING *',
            [Name]
        );
        res.json(newRecipe.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

// get all ingredients of a step

app.get('/ingredients/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const allIngredients = await pool.query(
            'SELECT * FROM Ingredients i JOIN Steps_Ingredients si ON i.ID = si.Ingredient_ID WHERE si.Steps_ID = $1', [id]);
        res.json(allIngredients.rows)
    } catch (err) {
        console.error(err.message);
    }
});


// update ingredient

app.put('/ingredients/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { Name } = req.body;
        const updateStep = await pool.query('UPDATE Ingredients SET Name = $1, WHERE ID = $2', [Name, id]);

        res.json('Step updated');
    } catch (err) {
        console.error(err.message)
    }
});

// delete an ingredient

app.delete('/ingredients/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteIngredient = await pool.query('DELETE FROM Ingredients WHERE ID = $1', [id]);
        res.json('Ingredient deleted');
    } catch (err) {
        console.error(err.message);
    }
});

// add ingredient to inventory

app.post('/inventory', async (req, res) => {
    try {
        const { id } = req.body;
        const newIngredient = await pool.query(
            'INSERT INTO Recipes (id) VALUES($1) RETURNING *',
            [id]
        );
        res.json(newIngredient.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// get recipe by choosing from inventory

app.listen(5000, () => {
    console.log('Server is running on port 5000')
});