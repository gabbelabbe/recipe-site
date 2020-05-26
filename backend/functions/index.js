const functions = require('firebase-functions');
const express = require('express');
const app = express();
const { db } = require('./firebase');

const cors = require('cors')({origin: true});
app.use(cors);

app.use(express.json());

// Add new recipe
app.post('/recipe', async (req, res) => {
  console.log(req);
  try {
    let docRef = await db.collection('recipes').doc();
    let recipe = { id: docRef.id, ...req.body };
    await docRef.set(recipe);
    res.status(200).send({ msg: `New todo Added with id ${recipe.id}.` });
  }
  catch(err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// Fetch all recipes
app.get('/recipes', async (req, res) => {
  try {
    let recipes = [];
    let docs = await db.collection('recipes').get();
  
    docs.forEach(recipe => {
      recipes.push(recipe.data());
    });
  
    res.status(200).send({ recipes: recipes });
  }
  catch(err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// Change the recipe content
app.patch('/recipe/:id', async (req, res) => {
  try {
    await db.collection('recipes').doc(req.params.id).update(req.body);
    res.status(200).send({ msg: `Recipe ${req.params.id} has been Updated.` });
  }
  catch(err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// Delete recipe
app.delete('/recipe/:id', function (req, res) {
  try {
    db.collection('recipes').doc(req.params.id).delete();
    res.status(200).send({ msg: `Recipe ${req.params.id} has been Deleted.` });
  }
  catch(err) {
    console.error(err);
    res.status(500).send(err);
  }
});

exports.api = functions.https.onRequest(app);
