import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import InputIcon from "@material-ui/icons/Input";
import RateReviewIcon from "@material-ui/icons/RateReview";
import AddIcon from "@material-ui/icons/Add";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

const data = [
  {
    type: "navItem",
    icon: <HomeIcon />,
    text: "Home",
    link: "/",
    restricted: false
  },
  {
    type: "navItem",
    icon: <SupervisorAccountIcon />,
    text: "Add Admins",
    link: "/user/register",
    restricted: false
  },

  {
    type: "navItem",
    icon: <RateReviewIcon />,
    text: "My Reviews",
    link: "/user/user-reviews",
    restricted: false
  },
  {
    type: "navItem",
    icon: <AddIcon />,
    text: "Add Reviews",
    link: "/user/add",
    restricted: false
  },
  {
    type: "navItem",
    icon: <AccountBoxIcon />,
    text: "My Profile",
    link: "/user",
    restricted: false
  },
  {
    type: "navItem",
    icon: <InputIcon />,
    text: "Login",
    link: "/login",
    restricted: false
  },
  {
    type: "navItem",
    icon: <VpnKeyIcon />,
    text: "Logout",
    link: "/user/logout",
    restricted: false
  }
];
export default data;
