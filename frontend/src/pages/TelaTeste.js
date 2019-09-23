import React from 'react'
import 'typeface-roboto';
import { Button, TextField, FormGroup, FormControlLabel,  Switch, AppBar, Toolbar, Typography } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';



function TelaTeste({ location: { state } }) {
    const useStyles = makeStyles(theme => ({
        button: {
            marginBottom: theme.spacing(1),
        },
        input: {
            display: 'none',
        },

        textField: {
            marginBottom: theme.spacing(1)
        },
        AppBar: {
            alignItems: 'center'
        },

        title: {
            flexGrow: 1,
        },
        Select:{
            marginBottom: theme.spacing(1)
        }        
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
                <Container maxWidth="sm" >
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
                                <Checkbox value="checkedA" />
                            }
                            label="Li e aceito com os termos propostos"
                        />
                        <Button variant="contained" id='btn-register' className={classes.button} > Confirmar</Button>
                        <Button variant="contained" id='btn-end-register' className={classes.button}  > Cancelar  </Button>
                    </FormGroup>
                    </Container>

            </div>

        </div>
    );
}


export default TelaTeste;