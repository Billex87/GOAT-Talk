import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball';
import './navbar.css';
import Search from './search';
import {
  Link
} from "react-router-dom";
import { getColDef } from '@material-ui/data-grid';

const drawerWidth = 208;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    fontFamily: 'Roboto, sans-serif',
    background: 'black'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'rgb(43, 107, 177)'
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2.5),
  },
  toolbar: {
    display: 'flex',
    alignItems: 'right',
    justifyContent: 'right',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
  home: {
    textDecoration: 'none',
    color: 'white',
    fontFamily: 'Roboto, sans-serif'
  },
  link: {
    color: 'black',
    textDecoration: 'underline'
  },
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        style={{ background: 'rgb(43, 107, 177)' }}
        //nav bar header color
      >
        <Toolbar>
          <a href={"http://localhost:3000/"}><img className="goatPhoto" src={"/images/goat.png"} alt="logo" /></a>
          <h1 style={{color: 'rgb(153, 152, 152)'}}>Goat Talk</h1>
          <a href={"http://localhost:3000/"} className={classes.home}><h2></h2></a>
          <Button variant="outlined" size="small"><Link to='/players' className="navBarLink" style= {{ textDecoration: 'none',  margin: theme.spacing(.5)}}>Players</Link></Button>&emsp;
          <Button variant="outlined" size="small"><Link to='/standings' className="navBarLink" style={{ textDecoration: 'none',  margin: theme.spacing(.5)}}>Standings</Link></Button>&emsp;
          <Button variant="outlined" size="small"><Link to='/leaders' className="navBarLink" style={{ textDecoration: 'none',  margin: theme.spacing(.5)}}>Leaders</Link></Button>
          <Typography variant="h6" noWrap className={classes.title}>
          </Typography>
          <Search />
        </Toolbar>
      </AppBar>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
  
    </div>
  );
}
