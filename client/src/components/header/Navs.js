import React from "react";
import Typography from "@material-ui/core/Typography";
import data from "./headerData";
import { Link, NavLink } from "react-router-dom";
import "./Navs.scss";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import AccountCircle from "@material-ui/icons/AccountCircle";
function Navs({ user }) {
  const element = (item, i) => (
    <NavLink
      key={i}
      exact
      activeClassName="active"
      className="NavLinks"
      to={item.link}
    >
      <Typography>{item.text}</Typography>
    </NavLink>
  );

  const showItems = () =>
   
    data.map((item, i) => {
     
        return !item.exclude && element(item, i);
     
        
    
    });

  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link className="accountLink" to="/user">
        <MenuItem onClick={handleMenuClose}>My Profile</MenuItem>
      </Link>
      <Link className="accountLink" to="/login">
        <MenuItem onClick={handleMenuClose}>Login</MenuItem>
      </Link>
      <Link className="accountLink" to="/user/logout">
        <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
      </Link>
    </Menu>
  );

  return (
    <>
      {showItems()}
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      {renderMenu}
    </>
  );
}

const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps)(Navs);
