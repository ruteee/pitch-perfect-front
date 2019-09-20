import React, { useEffect, useState } from 'react'
// import './TelaTeste.css'

import 'typeface-roboto';
import { Button, TextField, FormGroup, FormControlLabel, FormControl, Switch, AppBar, Toolbar, Typography } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import jQuery from 'jquery'
import Checkbox from '@material-ui/core/Checkbox';

import InputLabel from '@material-ui/core/InputLabel';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';



function TelaTeste({ location: { state } }) {
    const useStyles = makeStyles(theme => ({
        button: {
            margin: theme.spacing(1),
        },
        input: {
            display: 'none',
        },

        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        FormControlLabel: {
            // marginLeft: theme.spacing(1),
            // marginRight: theme.spacing(1),
            // marginTop: theme.spacing(2)
        },
        Switch: {

        },
        AppBar: {
            // height: theme.spacing(6),
            alignItems: 'center'
        },

        title: {
            flexGrow: 1,
            // marginBottom: theme.spacing(3),
        },
    }));

    const classes = useStyles();

    return (
        
        <div>
            <div>
                <AppBar position="static" className={classes.AppBar}>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title} >
                            Formulário Teste
                        </Typography>
                    </Toolbar>
                </AppBar>

                <FormControl component="fieldset">
                    <FormGroup >
                        
                        <TextField id="Nome" type='text' label="Nome" variant='outlined' margin="normal" className={classes.textField} />
                        <TextField id="Evento" type='text' label="Evento" variant='outlined' margin="normal" className={classes.textField} />

                        <FormControlLabel className={classes.FormControlLabel}
                            control={
                                <Switch className={classes.Switch}
                                    size="medium"
                                    color="primary" />
                            }
                            label="Receber notificações"
                        />

<FormControlLabel
        control={
          <Checkbox  value="checkedA" />
        }
        label="Li e aceito com os termos propostos"
      />
<InputLabel htmlFor="demo-controlled-open-select">Age</InputLabel>
        
        <Select
          value="age"
          inputProps={{
            name: 'age',
            id: 'demo-controlled-open-select',
          }}
        >          <MenuItem value="">
        <em>None</em>
      </MenuItem>
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>
    </Select>
      
                        <Button variant="contained" id='btn-register' className={classes.button} > Confirmar</Button>
                        <Button variant="contained" id='btn-end-register' className={classes.button}  > Cancelar  </Button>
                    </FormGroup>
                </FormControl>

            </div>
            
        </div>
    );
}


export default TelaTeste;