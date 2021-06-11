/**
 * @file RevenueSlider.component 
 * A slider element used for filtering by farm revenue
 */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

const marks = [
  {
    value: 0,
    label: '$0',
  },
  
  {
    value: 5000000,
    label: '$5,000,000+',
  }
];

// Convert the hover text to something more readable
function numFormatter(num) {
    if(num > 999 && num < 1000000){
        return (num/1000).toFixed(0) + 'K'; 
    }
    else if(num > 1000000){
        return (num/1000000).toFixed(0) + 'M';  
    }
    else if(num < 900){
        return num; 
    }
}


function valuetext(value) {
  return `${value}`;
}

export default function RevenueSlider(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState([0, 100000]);

  const filterByRevenue = (event, newValue) => {
    setValue(newValue);
    // Where [0] is the minimum, and [1] is the max
    props.onChange(newValue[0], newValue[1]);
  };

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        Revenue range
      </Typography>
      <Slider
        value={value}
        max= {5000000}
        step= {1000}
        marks={marks}
        onChange={filterByRevenue}
        valueLabelDisplay="auto"
        valueLabelFormat={value => <div>{numFormatter(value)}</div>}
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
}
