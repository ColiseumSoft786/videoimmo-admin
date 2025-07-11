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
// reactstrap components
import { GetAllAdmins } from "Api/Admins";
import Header from "components/Headers/Header";
import Loader from "Loader/Loader";
import { useEffect, useState } from "react";
import "./Modals/enhancements.css";
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
  Form,
  InputGroup,
  Input,
} from "reactstrap";
import EditAdminModal from "./Modals/EditAdminModal";
import ViewAdminModal from "./Modals/ViewAdminModal";
import { deleteAdmin } from "Api/Admins";
import toastService from "Toaster/toaster";
import AddAdminModal from "./Modals/AddAdminModal";
import { useAsyncError, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddGeiModal from "./Modals/AddGeiModal";
import ViewGeiModal from "./Modals/ViewGeiModal";
import EditGeiModal from "./Modals/EditGeiModal";
import { getAllGEI } from "Api/gei";
import { deleteGEI } from "Api/gei";
import { getallAgencies } from "Api/agency";
import { getGEIAgencies } from "Api/agency";
import { deleteAgency } from "Api/agency";
import ViewAgencyModal from "./Modals/ViewAgencyModal";
import AddAgencyModal from "./Modals/AddAgencyModal";
import EditAgency from "./Modals/EditAgency";
import { getAllTeams } from "Api/teams";
import { getAllGIESNames } from "Api/gei";
import { getAllAgenciesNames } from "Api/agency";
import { getAllAgenciesNamesByGie } from "Api/agency";
import { getAllTeamsByGie } from "Api/teams";
import { getAllTeamsByAgency } from "Api/teams";
import AddTeamModal from "./Modals/AddTeamModal";
import { deleteTeam } from "Api/teams";
// core components

const AllTeams = () => {
  const searchtext = useSelector((state) => state.admin.searchText);
  const location = useLocation()
  const navigate = useNavigate()
  const { gieId, agencyId } = useParams();
  const [isloading, setisloading] = useState(true);
  const [selectedAgency, setSelectedAgency] = useState("");
  const [isfetchingag, setisfetchingag] = useState(false);
  const [selectedGEI, setSelectedGEI] = useState("");
  const [allAgencies, setAllAgencies] = useState([]);
  const [allGEI, setAllGEI] = useState([]);
  const [allteams, setallteams] = useState("");
  const [teamsToList, setTeamsToList] = useState([]);
  const [isediting, setisediting] = useState(false);
  const [isadding, setisadding] = useState(false);
  const handlegetallteams = async () => {
    setisloading(true);
    let teams = [];
    const gei = await getAllGIESNames();
    if (gieId && agencyId === "null") {
      teams = await getAllTeamsByGie(gieId);
    }
    if (agencyId && agencyId !== "null") {
      teams = await getAllTeamsByAgency(agencyId);
    }
    if (!gieId && !agencyId) {
      teams = await getAllTeams();
    }
    if (!gei.error && !teams.error) {
      setAllGEI(gei.data);
      setallteams(teams.data);
      setTeamsToList(teams.data);
      setisloading(false);
    }
  };

  useEffect(() => {
    if (
      window.location.pathname.includes("teams") &&
      !window.location.pathname.includes("users")
    ) {
      handlegetallteams();
    }
  }, [location]);
  const handlefilterbyids = () => {
    if (selectedAgency === "") {
      navigate(`/teams/${selectedGEI}/null`);
    } else {
      navigate(`/teams/${selectedGEI}/${selectedAgency}`);
    }
  };
  const handlegetAgenciesnames = async () => {
    setisfetchingag(true);
    const response = await getAllAgenciesNamesByGie(selectedGEI);
    if (!response.error) {
      setAllAgencies(response.data);
      setisfetchingag(false);
    }
  };
  useEffect(() => {
    if (selectedGEI !== "") {
      handlegetAgenciesnames();
    }
    if (selectedGEI === "") {
      setAllAgencies([]);
    }
  }, [selectedGEI]);
   const handledeleteclick = async (id) => {
    const response = await deleteTeam(id);
    if (!response.error) {
      toastService.success("Team Deleted Successfully");
      handlegetallteams()
    }
  };
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader
                className="border-0"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                <h3 className="mb-0">Teams</h3>
                <Form
                  role="form"
                  style={{
                    display: "flex",
                    maxHeight: "50px",
                    width: "85%",
                    alignItems: "center",
                    gap: "20px",
                  }}
                  onSubmit={(e) => e.preventDefault()}
                >
                  <InputGroup
                    className="input-group-alternative"
                    style={{ width: "25%" }}
                  >
                    <Input
                      type="select"
                      value={selectedGEI}
                      onChange={(e) => setSelectedGEI(e.target.value)}
                    >
                      <option value="">Select GIE</option>
                      {allGEI.map((gei, index) => {
                        return (
                          <option value={gei._id} key={index}>
                            {gei.name}
                          </option>
                        );
                      })}
                    </Input>
                  </InputGroup>
                  <InputGroup
                    className="input-group-alternative"
                    style={{ width: "25%" }}
                  >
                    <Input
                      type="select"
                      value={selectedAgency}
                      onChange={(e) => setSelectedAgency(e.target.value)}
                      disabled={selectedGEI.trim() === "" || isfetchingag}
                    >
                      {selectedGEI.trim() === "" && (
                        <option value="">Select GIE First</option>
                      )}
                      {isfetchingag && <option value="">Fetching...</option>}
                      {selectedGEI.trim() !== "" && !isfetchingag && (
                        <option value="">Select Agency</option>
                      )}
                      {allAgencies.map((agency, index) => {
                        return (
                          <option value={agency._id} key={index}>
                            {agency.name}
                          </option>
                        );
                      })}
                    </Input>
                  </InputGroup>
                  <div className="text-center">
                    <Button
                      onClick={handlefilterbyids}
                      className="my-4"
                      color="danger"
                      disabled={selectedGEI.trim() === ""}
                    >
                      Filter
                    </Button>
                  </div>
                  <div className="text-center">
                    <Button
                      onClick={() => {
                        navigate("/teams");
                        setSelectedAgency("");
                        setSelectedGEI("");
                      }}
                      className="my-4"
                      color="danger"
                      disabled={window.location.pathname==='/teams'}
                    >
                      Clear Filter
                    </Button>
                  </div>
                  <div className="text-center">
                    <Button
                      onClick={() => setisadding(true)}
                      className="my-4"
                      color="danger"
                    >
                      Add Team
                    </Button>
                  </div>
                </Form>
              </CardHeader>
              {isloading ? (
                <div
                  style={{
                    height: "250px",
                    width: "100%",
                    marginTop: "20vh",
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
                      <th scope="col">Name</th>
                      <th scope="col">Manager</th>
                      <th scope="col">GIE</th>
                      <th scope="col">Agency</th>
                      <th scope="col">Status</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamsToList.map((team, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{team.name}</td>
                          <td>
                            {team.managers.map((manager, index) => {
                              return <span>({manager.fname})</span>;
                            })}
                          </td>
                          <td>{team.gie?.name}</td>
                          <td>{team.agency?.name}</td>
                          <td className="text-center">
                            <i
                              style={{ fontSize: "20px" }}
                              className={`${
                                team.status === "1"
                                  ? "ni ni-check-bold text-green"
                                  : "ni ni-fat-remove text-red"
                              }`}
                            />
                          </td>
                          <td className="text-right">
                            <UncontrolledDropdown>
                              <DropdownToggle
                                className="btn-icon-only text-light"
                                role="button"
                                size="sm"
                                color="danger"
                                onClick={(e) => e.preventDefault()}
                              >
                                <i className="fas fa-ellipsis-v" />
                              </DropdownToggle>
                              <DropdownMenu
                                className="dropdown-menu-arrow"
                                right
                              >
                                <DropdownItem onClick={()=>{navigate(`/team/${team._id}`)}}>Edit</DropdownItem>
                                <DropdownItem onClick={()=>handledeleteclick(team._id)}>Delete</DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
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
      {( isediting || isadding) && (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            position: "fixed",
            top: 0,
            left: 0,
            display: "flex",
            justifyContent: "center",
            paddingTop: "5vh",
            zIndex: 20,
          }}
        >
          {isadding&&<AddTeamModal handleclose={()=>setisadding(false)} fetchusers={handlegetallteams}/>}
        </div>
      )}
    </>
  );
};

export default AllTeams;
