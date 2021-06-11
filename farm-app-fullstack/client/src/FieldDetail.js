/**
 * @file FieldDetail
 * A popover component to display additional information about a farm's fields
 */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function FieldDetail(props) {
  const classes = useStyles();

  const handleClose = () => {
  	props.onClose();
  };

  const open = Boolean(props.anchor);
  const id = open ? 'simple-popover' : undefined;

  var fields = [];
  for(var field in props.data) {
	fields.push(<Typography key={field} className={classes.typography}>The {field} field has {props.data[field]["size (acres)"]} acres of {props.data[field].crop}.</Typography>)
  }

  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={props.anchor}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
      { fields }
      </Popover>
    </div>
  );
}
