import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#333',
    alignItems: 'center'
  }
}))

export default function Header({ selectedDate, setSelectedDate }) {
  const classes = useStyles();
  const [weekIndex, setWeekIndex] = useState(0);
  const initialDate = moment();

  useEffect(() => {
    const tempDate = initialDate.clone();
    tempDate.subtract(weekIndex, 'weeks');
    setSelectedDate(tempDate);
  }, [weekIndex])

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Tooltip title='Gå tillbaka en vecka'>
          <IconButton
            aria-label='back' 
            style={{color: '#fff'}}
            onClick={() => {
              setWeekIndex(weekIndex + 1);
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
        <Typography variant="h6" className={classes.title}>
          Recept för vecka {selectedDate.week()}
        </Typography>
        <Tooltip title='Gå framåt en vecka'>
          <IconButton 
            aria-label='forward' 
            style={{color: '#fff'}}
            onClick={() => {
              setWeekIndex(weekIndex - 1);
            }}
          >
            <ArrowForwardIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  )
}