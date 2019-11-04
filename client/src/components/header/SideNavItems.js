import React from "react";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import { NavLink } from "react-router-dom";
import data from "./headerData";
import './SideNavItems.scss'
function SideNavItems() {
 
  const element = (item, i) => (
    <List key={i} >
      <NavLink exact to={item.link} activeClassName='sideNavItems_active' className='sideNavItems'>
        <ListItem button>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      </NavLink>
    </List>
  );

  const showItems = () =>
    data.map((item, i) => {
      return element(item, i);
    });
  return <>{showItems()}</>;
}

export default SideNavItems;
