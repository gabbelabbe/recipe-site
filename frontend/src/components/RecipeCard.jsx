import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import ReceiptIcon from '@material-ui/icons/Receipt';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FoodItemForm from './FoodItemForm';
import RestClient from './../api/RestClient';

const restClient = new RestClient();

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 275,
    maxWidth: 1000,
    margin: '5px auto',
    backgroundColor: '#333',
    color: '#fff'
  },
  actions: {
    display: 'flex',
  },
  expand: {
    marginLeft: 'auto',
  },
  date: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 1
  },
  title: {
    marginTop: 1,
    marginBottom: 10,
    fontSize: 25,
    color: '#fff'
  },
}));

export default function RecipeCard({ recipeInfo, setRecipes, recipes }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleEditOpen = () => {
    setOpen(true);
  }

  const handleDelete = async () => {
    const response = await restClient.deleteRecipe(recipeInfo.id);
    if(response.status === 200) {
      const keptRecipes = [];
      for(let i = 0; i < recipes.length; i++) {
        if(recipes[i].id !== recipeInfo.id) {
          keptRecipes.push(recipes[i]);
        }
      }
      setRecipes(keptRecipes);
    }
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.date} gutterBottom>
          {`${recipeInfo.date.date()} / ${recipeInfo.date.month() + 1} / ${recipeInfo.date.year()}`}
        </Typography>
        <Typography className={classes.title}>
          {recipeInfo.foodItem} <FastfoodIcon />
        </Typography>
        <Link target='_blank' href={recipeInfo.recipeLink} style={{color: '#00FFFF'}}>
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <p>Recept</p>
            </Grid>
            <Grid item>
              <ReceiptIcon />
            </Grid>
          </Grid>
        </Link>
      </CardContent>
      <CardActions disableSpacing>
        <span className={classes.expand}>
          <Button
            size="small"
            style={{color: '#fff'}}
            onClick={handleEditOpen}
          >
            <EditIcon />
          </Button>
          <FoodItemForm 
            open={open}
            setOpen={setOpen}
            recipes={recipes}
            setRecipes={setRecipes}
            recipeInfo={recipeInfo}
          />
        </span>
        <span>
            <Button
              size="small"
              style={{color: '#fff'}}
              onClick={handleDelete}
            >
              <DeleteIcon />
            </Button>
        </span>
      </CardActions>
    </Card>
  )
}
