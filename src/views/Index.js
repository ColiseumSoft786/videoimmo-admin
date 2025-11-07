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
import { useEffect, useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import Loader from "Loader/Loader";
import { getRecentUsers } from "Api/Users";
import { getRecentGies } from "Api/gei";
import { getRecentAgencies } from "Api/agency";
import { getRecentTeams } from "Api/teams";
import { getRecentHouses } from "Api/Houses";

const Dashboard = (props) => {
  const [recentAgencies, setRecentAgencies] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentTeams, setRecentTeams] = useState([]);
  const [recentGies, setRecentGies] = useState([]);
  const [isloading, setislaoding] = useState(["gie", "agency", "user", "team"]);
  const baseUrl = process.env.REACT_APP_ENDPOINT;
  const getrecentitems = async () => {
    setislaoding(["gie", "agency", "user", "team"]);

    const gies = await getRecentGies();
    const agencies = await getRecentAgencies();
    const teams = await getRecentTeams();
    const users = await getRecentHouses();

    if (!gies.error) {
      setRecentGies(gies.data);
      setislaoding((prev) => prev.filter((item) => item !== "gie"));
    }
    if (!agencies.error) {
      setRecentAgencies(agencies.data);
      setislaoding((prev) => prev.filter((item) => item !== "agency"));
    }
    if (!teams.error) {
      setRecentTeams(teams.data);
      setislaoding((prev) => prev.filter((item) => item !== "team"));
    }
    if (!users.error) {
      setRecentUsers(users.data);
      setislaoding((prev) => prev.filter((item) => item !== "user"));
    }
  };

  useEffect(() => {
    getrecentitems();
  }, []);
  return (
    <>
      <Header />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "50% 50%",
          gap: "2%",
          padding: "5%",
        }}>
        <Card className="shadow">
          <CardHeader
            className="border-0"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              alignContent: "center",
            }}>
            <h3 className="mb-0">Recent GIES</h3>
          </CardHeader>
          {isloading.includes("gie") ? (
            <div
              style={{
                height: "250px",
                width: "100%",
                marginTop: "20vh",
                display: "flex",
                justifyContent: "center",
              }}>
              <Loader />
            </div>
          ) : (
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">Sr.#</th>
                  <th scope="col">name</th>
                  <th scope="col">Phone#</th>
                  <th scope="col">Expiry Date</th>
                </tr>
              </thead>
              <tbody>
                {recentGies.map((gies, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{gies.name}</td>
                      <td>
                        {gies.countryCode}-{gies.phone}
                      </td>
                      <td>{gies.expiresOn}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </Card>
        <Card className="shadow">
          <CardHeader
            className="border-0"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              alignContent: "center",
            }}>
            <h3 className="mb-0">Recent Agencies</h3>
          </CardHeader>
          {isloading.includes("agency") ? (
            <div
              style={{
                height: "250px",
                width: "100%",
                marginTop: "20vh",
                display: "flex",
                justifyContent: "center",
              }}>
              <Loader />
            </div>
          ) : (
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">Sr.#</th>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Mobile no.</th>
                  <th scope="col">Gie</th>
                </tr>
              </thead>
              <tbody>
                {recentAgencies.map((agency, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>
                        {agency.image === "" ? (
                          <i
                            style={{ fontSize: "25px" }}
                            className="ni ni-circle-08"></i>
                        ) : (
                          <div
                            style={{
                              height: "25px",
                              width: "25px",
                              borderRadius: "50%",
                              overflow: "hidden",
                              alignItems: "center",
                              alignContent: "center",
                            }}>
                            <img
                              style={{ height: "100%", width: "100%" }}
                              src={`${baseUrl}${agency.image}`}
                            />
                          </div>
                        )}
                      </td>
                      <td>{agency.name}</td>
                      <td>
                        {agency.countryCode}-{agency.phone}
                      </td>
                      <td>{agency.gie.name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </Card>
        <Card className="shadow">
          <CardHeader
            className="border-0"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              alignContent: "center",
            }}>
            <h3 className="mb-0">Recent Teams</h3>
          </CardHeader>
          {isloading.includes("team") ? (
            <div
              style={{
                height: "250px",
                width: "100%",
                marginTop: "20vh",
                display: "flex",
                justifyContent: "center",
              }}>
              <Loader />
            </div>
          ) : (
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">Sr.#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Managers</th>
                  <th scope="col">Agency</th>
                  <th scope="col">Gie</th>
                </tr>
              </thead>
              <tbody>
                {recentTeams.map((team, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>

                      <td>{team.name}</td>
                      <td>
                        {team.managers.map((manager, index) => {
                          return <span>({manager.fname})</span>;
                        })}
                      </td>
                      <td>{team.agency?.name}</td>
                      <td>{team.gie?.name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </Card>
        <Card className="shadow">
          <CardHeader
            className="border-0"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              alignContent: "center",
            }}>
            <h3 className="mb-0">Recent Houses</h3>
          </CardHeader>
          {isloading.includes("user") ? (
            <div
              style={{
                height: "250px",
                width: "100%",
                marginTop: "20vh",
                display: "flex",
                justifyContent: "center",
              }}>
              <Loader />
            </div>
          ) : (
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">Sr.#</th>
                  <th scope="col">Image</th>
                  <th scope="col">Full Name</th>
                  <th scope="col">Mobile no.</th>
                  <th scope="col">User Name</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>
                        {user.image === "" ? (
                          <i
                            style={{ fontSize: "25px" }}
                            className="ni ni-circle-08"></i>
                        ) : (
                          <div
                            style={{
                              height: "25px",
                              width: "25px",
                              borderRadius: "50%",
                              overflow: "hidden",
                              alignItems: "center",
                              alignContent: "center",
                            }}>
                            {user.thumbnail === "" ? (
                              "NA"
                            ) : (
                              <img
                                style={{ height: "100%", width: "100%" }}
                                src={`${baseUrl}${user.thumbnail}`}
                              />
                            )}
                          </div>
                        )}
                      </td>
                      <td>{user.name}</td>
                      <td>
                        {user.user.country_Code}-{user.user.mobile_no}
                      </td>
                      <td>{user.user.fname}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
