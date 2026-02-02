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
import React from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";
import Houses from "views/Houses";
import Teams from "views/Teams";
import Users from "views/Users";
import AllTeams from "views/AllTeams";
import Agencies from "views/Agencies";
import GEI from "views/GEI";
import Optins from "views/Optins";
import Notifications from "views/Notifications";

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
  const isloggedin = localStorage.getItem("isLoggedIn");

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/") {
        return <Route path={prop.path} element={prop.component} key={key} />;
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props?.location?.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/",
          imgSrc: require("../assets/img/brand/pokimmo-applogo.png"),
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props?.location?.pathname)}
        />
        <Routes>
          {getRoutes(routes)}
          {isloggedin && (
            <>
              <Route path="/houses/:userid/:username/:page" element={<Houses />} />
              <Route path="/houses/filtered/:gieId/:agencyId/:page" element={<Houses />} />
              <Route path="/teams/:gieId/:agencyId/:page" element={<AllTeams />} />
              <Route path="/gies/searched/:gieId" element={<GEI/>}/>
              <Route path="/teams/searched/:userid/:page" element={<AllTeams />} />
              <Route path="/prospects/:gieId/:agencyId/:page" element={<Optins/>}/>
              <Route path="/prospects/searched/:userid/:page" element={<Optins/>}/>
              <Route path="/users/:gieId/:agencyId/:page" element={<Users/>}/>
              <Route path="/create/notification" element={<Notifications/>}/>
              <Route path="/users/searched/:userId" element={<Users/>}/>
              <Route path="/team/:managerid" element={<Teams/>}/>
              <Route path="/agencies/:gieId/:page" element={<Agencies/>}/>
              <Route path="/agencies/searched/:agencyId" element={<Agencies/>}/>
            </>
          )}
        </Routes>
      </div>
    </>
  );
};

export default Admin;
