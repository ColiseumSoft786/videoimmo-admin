/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import Admins from "views/Admins";
import Users from "views/Users";
import Videos from "views/Videos";
import Houses from "views/Houses";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/",
  },
  {
    path: "/admins",
    name: "Admins",
    icon: "ni ni-single-02 text-orange",
    component: <Admins/>,
    layout: "/",
  },
  {
    path: "/users",
    name: "Users",
    icon: "ni ni-circle-08 text-yellow",
    component: <Users/>,
    layout: "/",
  },
  {
    path: "/videos",
    name: "Videos List",
    icon: "ni ni-button-play text-info",
    component: <Videos/>,
    layout: "/",
  },
  {
    path: "/houses",
    name: "Houses",
    icon: "ni ni-building text-pink",
    component: <Houses/>,
    layout: "/",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: <Icons />,
    layout: "/",
  },
];
export default routes;
