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
import { getAllUsers } from "Api/Users";
import Header from "components/Headers/Header";
import Loader from "Loader/Loader";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Button,
  Input,
} from "reactstrap";
import AddtoTeamModal from "./Modals/AddtoTeamModal";
import ViewUserModal from "./Modals/ViewUserModal";
import EditUserModal from "./Modals/EditUserModal";
import { deleteUser } from "Api/Users";
import toastService from "Toaster/toaster";
import AddUserModal from "./Modals/AddUserModal";
import { getManagerTeam } from "Api/Users";
// core components

const Teams = () => {
  const { managerid } = useParams();
  const [teams, setteams] = useState([]);
  const [selectedteam, setselectedteam] = useState("");
  const [managers, setmanagers] = useState([]);
  const [memebers, setmembers] = useState([]);
  const [isloading, setisloading] = useState(true);
  const handlegetteam = async () => {
    try {
      setisloading(true);
      const response = await getManagerTeam(managerid);
      if (!response.error) {
        const teamsarray = response.data.data;
        if (teamsarray) {
          const selectedteamname = teamsarray[0].name;
          const managersarray = teamsarray[0].managers;
          const membersarray = teamsarray[0].members;
          setteams(teamsarray);
          setmanagers(managersarray);
          setmembers(membersarray);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setisloading(false);
    }
  };
  useEffect(() => {
    if (managerid) {
      handlegetteam();
    }
  }, []);
  useEffect(() => {
    if (teams.length > 0) {
      setselectedteam(teams[0].name);
    }
  }, [teams]);
  const handleUserDeleteClick = async (memberid) => {
    const requestbody = {
        
    }
  };
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" style={{marginBottom:'5vh'}} fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader
                className="border-0"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <h3 className="mb-0">Team</h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "50%",
                    gap: "20px",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ width: "66%", marginRight: "4%" }}>
                      <Input
                        type="select"
                        value={selectedteam}
                        onChange={(e) => setselectedteam(e.target.value)}
                      >
                        {teams?.map((team, index) => {
                          return (
                            <option value={team.name} key={index}>
                              {team.name}
                            </option>
                          );
                        })}
                      </Input>
                    </div>
                    <Button color="danger">Add</Button>
                    <Button color="danger">Edit</Button>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button color="danger">Add Member</Button>
                    <Button color="danger">Add Existing Member</Button>
                    <Button color="danger">Add Manager</Button>
                  </div>
                </div>
              </CardHeader>
              <div style={{ width: "100%", padding: "0 20px" }}>
                <h3 className="mb-0">Managers</h3>
              </div>
              {isloading ? (
                <div
                  style={{
                    height: "100px",
                    width: "100%",
                    marginTop: "2vh",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Loader />
                </div>
              ) : (
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Sr.#</th>
                      <th scope="col">Image</th>
                      <th scope="col">Name</th>
                      <th scope="col">Mobile #</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {managers?.map((manager, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>
                            {manager.image === "" ? (
                              <i
                                style={{ fontSize: "25px" }}
                                className="ni ni-circle-08"
                              ></i>
                            ) : (
                              <div
                                style={{
                                  height: "25px",
                                  width: "25px",
                                  borderRadius: "50%",
                                  overflow: "hidden",
                                  alignItems: "center",
                                  alignContent: "center",
                                }}
                              >
                                <img
                                  style={{ height: "100%", width: "100%" }}
                                  src={`https://api.videorpi.com/${manager.image}`}
                                />
                              </div>
                            )}
                          </td>
                          <td>{manager.fname}</td>
                          <td>
                            {manager.country_Code}-{manager.mobile_no}
                          </td>
                          {/* <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn-icon-only text-light"
                              href="#pablo"
                              role="button"
                              size="sm"
                              color=""
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                onClick={()=>handleviewClick(user)}
                              >
                                View
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => handleEditClick(user)}
                              >
                                Edit
                              </DropdownItem>
                              <DropdownItem
                                onClick={()=>handleDeleteClick(user._id,user.fname)}
                              >
                                Delete
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td> */}
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              )}
              <div style={{ width: "100%", padding: "0 20px" }}>
                <h3>Members</h3>
              </div>
              {isloading ? (
                <div
                  style={{
                    height: "100px",
                    width: "100%",
                    marginTop: "2vh",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Loader />
                </div>
              ) : (
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Sr.#</th>
                      <th scope="col">Image</th>
                      <th scope="col">Name</th>
                      <th scope="col">Mobile #</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {memebers?.map((memeber, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>
                            {memeber.image === "" ? (
                              <i
                                style={{ fontSize: "25px" }}
                                className="ni ni-circle-08"
                              ></i>
                            ) : (
                              <div
                                style={{
                                  height: "25px",
                                  width: "25px",
                                  borderRadius: "50%",
                                  overflow: "hidden",
                                  alignItems: "center",
                                  alignContent: "center",
                                }}
                              >
                                <img
                                  style={{ height: "100%", width: "100%" }}
                                  src={`https://api.videorpi.com/${memeber.image}`}
                                />
                              </div>
                            )}
                          </td>
                          <td>{memeber.fname}</td>
                          <td>
                            {memeber.country_Code}-{memeber.mobile_no}
                          </td>
                          <td className="text-right">
                            <Button
                              color="danger"
                              onClick={() => handleUserDeleteClick()}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              )}
            </Card>
          </div>
        </Row>
      </Container>
      {/* {(isadding||isviewing||isediting||isaddingUser)&&(
        <div style={{height:'100vh',width:'100vw',backgroundColor:'rgba(0, 0, 0, 0.3)',position:'fixed',top:0,left:0,display:"flex",justifyContent:"center",paddingTop:isediting||isaddingUser?'5vh':'10vh',zIndex:20}}>
        </div>
        )} */}
    </>
  );
};

export default Teams;
