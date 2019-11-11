import React from "react";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import { NavLink } from "react-router-dom";
import data from "./headerData";
import "./SideNavItems.scss";
import { connect } from "react-redux";
function SideNavItems({ user }) {
  const element = (item, i) => (
    <List key={i}>
      <NavLink
        exact
        to={item.link}
        activeClassName="sideNavItems_active"
        className="sideNavItems"
      >
        <ListItem button>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      </NavLink>
    </List>
  );

  const showItems = () =>
    // only show if user is loged in
    user.login &&
    data.map((item, i) => {
      // check if user is authentcated
      if (user.login.isAuth) {
        return !item.exclude && element(item, i);
      } else {
        return !item.restricted && element(item, i);
      }
    });
  return <>{showItems()}</>;
}
const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps)(SideNavItems);
