import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import SideNavItems from "./SideNavItems";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import { Link } from "react-router-dom";
import Navs from "./Navs";

const useStyles = makeStyles(theme => ({
  menuButton: {
    display: "none",
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      display: "block"
    }
  },
  list: {
    width: 250
  },

  navs: {
    display: "flex",
    alignItems: "center",
    width: "85%",
    marginRight: "auto",
    marginLeft: "auto",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  smallHeader: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      marginRight: "auto",
      marginLeft: "auto",
      width: "85%",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }
}));

export default function Header() {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const toggleDrawer = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenDrawer(open);
  };

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <SideNavItems />
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#00897b" }}>
        <Toolbar>
          <div className={classes.smallHeader}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
              {sideList()}
            </Drawer>
            {/* Navs */}
            {/* <div className={classes.smallHeader}> */}
            <h4>The Book Shelf </h4>
            <Link to="/">
              <MenuBookIcon style={{ color: "white" }} />
            </Link>
          </div>

          <div className={classes.navs}>
            <Link to="/">
              <MenuBookIcon style={{ color: "white" }} />
            </Link>
            <Navs />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
