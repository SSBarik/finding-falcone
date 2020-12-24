import React from 'react';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    flexGrow: 1
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Selector({ 
  label,
  value, 
  menuItems, 
  itemCountProp = false,
  disabledItem, 
  handleChange 
}) {
  const classes = useStyles();
  
  return (
    <FormControl variant="outlined" className={classes.formControl} fullWidth>
      <InputLabel id="label">{label}</InputLabel>
      <Select
        labelId="label"
        id="select"
        value={value} 
        label={label}
        onChange={e => handleChange(e.target.value, value)}
      >
        <MenuItem disabled>
          <em>None</em>
        </MenuItem>  
        {menuItems.map((item, i) => (
          !(disabledItem(item) && item.name !== value) 
          && (
            <MenuItem 
              key={i} 
              value={item.name} 
            >
              {itemCountProp && item[itemCountProp]} {item.name}
            </MenuItem>
          )
        ))}
      </Select>
    </FormControl>
  );
}