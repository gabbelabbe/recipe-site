import React, { useState } from 'react';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import MomentUtils from '@date-io/moment';
import { 
  MuiPickersUtilsProvider, 
  KeyboardDatePicker 
} from '@material-ui/pickers';

export default function FoodItemForm({
  open, setOpen,
  recipes, setRecipes,
  recipeInfo = null
}) {
  const [newFoodItem, setNewFoodItem] = useState("");
  const [newRecipeLink, setNewRecipeLink] = useState("");
  const [selectedDate, setSelectedDate] = useState(!!recipeInfo ? (recipeInfo.date) : (moment()));

  const handleClose= () => {
    if(!!recipeInfo) {
      const tempArr = [...recipes];
      for(let i = 0; i < tempArr.length; i++) {
        if(tempArr[i] === recipeInfo) {
          tempArr[i] = {
            date: selectedDate,
            foodItem: !!newFoodItem ? (newFoodItem) : (recipeInfo.foodItem),
            recipeLink: !!newRecipeLink ? (newRecipeLink) : (recipeInfo.recipeLink),
            id: recipeInfo.id,
            week: selectedDate.week()
          }
        }
      }
      setRecipes(tempArr);
    } else if(!!newFoodItem) {
      setRecipes(
        [
          ...recipes,
          {
            date: selectedDate,
            foodItem: newFoodItem,
            recipeLink: newRecipeLink,
            id: recipes.length,
            week: selectedDate.week()
          }
        ]
      )
    }
    setOpen(false);
  };

  return (
    <div>
      <Dialog 
        open={open} 
        onClose={handleClose} 
        aria-labelledby="form-dialog-title"
        PaperProps={{
          style: {
            backgroundColor: '#333',
            color: '#fff'
          }
        }}
      >
        <DialogContent>
          <TextField
            margin="dense"
            id="foodItem"
            placeholder={!!recipeInfo ? (recipeInfo.foodItem) : ('Maträtt')}
            type="text"
            fullWidth
            InputProps={{
              style: {
                color: '#fff'
              }
            }}
            onChange={(e) => {
              setNewFoodItem(e.target.value);
            }}
          />
          <TextField
            margin="dense"
            id="recipeLink"
            placeholder={!!recipeInfo ? (recipeInfo.recipeLink) : ('Länk till recept')}
            type="text"
            fullWidth
            InputProps={{
              style: {
                color: '#fff'
              }
            }}
            onChange={(e) => {
              setNewRecipeLink(e.target.value);
            }}
          />
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              InputProps={{
                style: {
                  color: '#fff'
                }
              }}
              disableToolbar
              variant="inline"
              format="DD/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              value={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
              }}
              KeyboardButtonProps={{
                'aria-label': 'change date',
                style: {
                  color: '#fff',
                }
              }}
            />
          </MuiPickersUtilsProvider>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => {
              setOpen(false);
            }}
            style={{color: '#fff'}}
          >
            Avbryt
          </Button>
          <Button onClick={handleClose} style={{color: '#fff'}}>
            {!!recipeInfo ? ('Uppdatera Recept') : ('Skapa Recept')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}