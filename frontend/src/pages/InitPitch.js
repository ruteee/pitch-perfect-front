import React, { useState, useEffect } from 'react'
import './InitPitch.css'
import api from '../services/api';

import {Button, TextField, FormGroup,AppBar,Toolbar, Drawer, Typography, IconButton, Divider, List, ListItemText, ListItem } from '@material-ui/core/'
import MenuIcon from '@material-ui/icons/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DesktopMacIcon from '@material-ui/icons/DesktopMac';


import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';

/*bas stuff*/
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },

  button: {
    margin: theme.spacing(1),
  },
  textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  formGroup: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(),
    paddingBottom: theme.spacing(30),
    paddingTop: theme.spacing(10)
  }
}));


function InitPitch({ history }){        
    const classes = useStyles();
    const theme = useTheme();

    const [open, setOpen] = React.useState(false);
    const [webpage, setWebPage] = useState('');
    const [ pitches, setPitchList ] = useState( [] );

    useEffect(() => {
        async function loadPitches() {
            const response = await api.get('/pitches');
            setPitchList(response.data);
        }

        loadPitches();
    }, []);

    function handleDrawerOpen() {
        setOpen(true);
      }
    
      function handleDrawerClose() {
        setOpen(false);
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log("here")
        console.log(webpage)
        history.push(`main`, { url_content: webpage });
    }
    return (
    <div id= "main_class" className={classes.root}>
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
            })}>
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
            >
                <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                    Pitch Perfect
                </Typography>
                </Toolbar>
        </AppBar>
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
            paper: classes.drawerPaper,
            }}>
            <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            </div>
            <Divider />
                { pitches.length > 0 ? (
                    <div className="pitch-list">
                       <List>
                            { pitches.map((pitch, i) => (
                                <ListItem button key={i}>
                                    <ListItemIcon> 
                                        <DesktopMacIcon/>
                                    </ListItemIcon>
                                    <ListItemText key={ pitch._id } onClick={ () => history.push(`present/${pitch._id}`) }>
                                        <p> Name:  { pitch.name } </p>
                                        <p> URL: { pitch.url }</p>
                                    
                                    </ListItemText>
                                </ListItem>
                                
                                
                            )) }
                        </List>
                    </div>
                ) : (
                    <div className="empty">There are no pitches :(</div>
                    )}
            <Divider />
        </Drawer>

        <main
            className={clsx(classes.content, {
            [classes.contentShift]: open,
            })}
        >
            <div className="init-settings">
                <FormGroup  className={classes.formGroup} id='form_main'>
                    <TextField id= "text_url" type='text' 
                        label = 'Application URL'//'Digite a url da sua aplicação' 
                        value = { webpage }  
                        onChange={ e => setWebPage(e.target.value)} 
                        variant='outlined'  
                        margin="normal"  
                        className={classes.textField}/>
                    <Button variant ="contained"  className={classes.Button} id="btn_send_url" onClick={handleSubmit}>Set application</Button>
                </FormGroup>
            </div>
            
        </main>
    </div>
    )};

export default InitPitch;