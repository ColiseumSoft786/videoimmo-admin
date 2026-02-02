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
import Admins from "views/Admins";
import Users from "views/Users";
import Houses from "views/Houses";
import Settings from "views/Settings";
import GEI from "views/GEI";
import Agencies from "views/Agencies";
import AllTeams from "views/AllTeams";
import Optins from "views/Optins";
import NotificationTable from "views/NotificationTable";

var routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/",
  },
  {
    path: "/admins/:page",
    name: "Admins",
    icon: "ni ni-single-02 text-orange",
    component: <Admins/>,
    layout: "/",
  },
  {
    path: "/users/:page",
    name: "Users",
    icon: "ni ni-circle-08 text-yellow",
    component: <Users/>,
    layout: "/",
  },
  {
    path: "/houses/:page",
    name: "Houses",
    icon: "ni ni-building text-pink",
    component: <Houses/>,
    layout: "/",
  },
  {
    path: "/teams/:page",
    name: "Teams",
    icon: "ni ni-planet text-blue",
    component: <AllTeams />,
    layout: "/",
  },
  {
    path: "/gies/:page",
    name: "GIEs",
    icon: "ni ni-shop text-green",
    component: <GEI/>,
    layout: "/",
  },
  {
    path: "/agencies/:page",
    name: "Agencies",
    icon: "ni ni-paper-diploma text-orange",
    component: <Agencies/>,
    layout: "/",
  },
  {
    path: "/prospects/:page",
    name: "Prospects",
    icon: "ni ni-single-02 text-green",
    component: <Optins/>,
    layout: "/",
  },
  {
    path: "/notifications/:page",
    name: "Notifications",
    icon: "ni ni-send text-green",
    component: <NotificationTable />,
    layout: "/",
  },
  {
    path: "/settings",
    name: "Settings",
    icon: "ni ni-settings text-blue",
    component: <Settings />,
    layout: "/",
  },
];
export default routes;
