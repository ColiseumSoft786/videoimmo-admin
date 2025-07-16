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
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
  FormGroup,
  InputGroup,
  Input,
} from "reactstrap";
import ViewUserModal from "./Modals/ViewUserModal";
import EditUserModal from "./Modals/EditUserModal";
import { deleteUser } from "Api/Users";
import toastService from "Toaster/toaster";
import AddUserModal from "./Modals/AddUserModal";
import { useSelector } from "react-redux";
import { getAllGIESNames } from "Api/gei";
import { getAllAgenciesNames } from "Api/agency";
import { getAllAgenciesNamesByGie } from "Api/agency";
import { getAllAgencyUsers } from "Api/Users";
import { getAllGieUsers } from "Api/Users";
import { getUserLength } from "Api/dashboard";
import { getGieUserLength } from "Api/Users";
import { getAgencyUserLength } from "Api/Users";
import { getSingleUser } from "Api/Users";
// core components

const Users = () => {
  const { page,gieId, agencyId ,userId} = useParams();
  const searchtext = useSelector((state) => state.admin.searchText);
  const [users, setusers] = useState([]);
  const [isloading, setisloading] = useState(true);
  const [isadding, setisadding] = useState(false);
  const [usertoview, setusertoview] = useState(null);
  const [isviewing, setisviewing] = useState(false);
  const [isediting, setisediting] = useState(false);
  const [filteredusers, setfilteredusers] = useState([]);
  const [selectedAgency, setSelectedAgency] = useState("");
  const [selectedGEI, setSelectedGEI] = useState("");
  const [allAgencies, setAllAgencies] = useState([]);
  const [isfetchingag, setisfetchingag] = useState(false);
  const [currentpage,setcurrentpage] = useState(Number(page))
  const [allGEI, setAllGEI] = useState([]);
  const [totalpages,settotalpages] = useState(0)
  const [totalitems,settotalitems] = useState(0)
  const location = useLocation();
  const navigate = useNavigate();
  const getpages = async()=>{
    let pages = null
    if (agencyId !== "null") {
        pages = await getAgencyUserLength(agencyId);
      }
      if (agencyId === "null") {
        pages = await getGieUserLength(gieId);
      }
      if (!gieId && !agencyId) {
        pages = await getUserLength();
      }
    if(!pages.error){
      settotalitems(Number(pages.data))
      settotalpages(Math.ceil(pages.data/20))
    }else{
      settotalitems(0)
      settotalpages(1)
    }
  }
  const handleprev=()=>{
    if(currentpage>1){
      const prev = currentpage-1
      if (agencyId !== "null") {
        navigate(`/users/${gieId}/${agencyId}/${prev}`)
      }
      if (agencyId === "null") {
        navigate(`/users/${gieId}/null/${prev}`)
      }
      if (!gieId && !agencyId) {
        navigate(`/users/${prev}`)
      }
    }
  }
  const handlenext=()=>{
    if(currentpage<totalpages){
      const next = currentpage+1
      if (agencyId !== "null") {
        navigate(`/users/${gieId}/${agencyId}/${next}`)
      }
      if (agencyId === "null") {
        navigate(`/users/${gieId}/null/${next}`)
      }
      if (!gieId && !agencyId) {
        navigate(`/users/${next}`)
      }
    }
  }
  useEffect(()=>{
    setcurrentpage(Number(page))
  },[page])
  const handlegetallUsers = async () => {
    setisloading(true);
    try {
      let gie = {};
      let response = {};
      gie = await getAllGIESNames();
      const issearched = window.location.pathname.includes('searched')
      if(userId){
        response = await getSingleUser(userId)
      }
      if (agencyId !== "null"&&!issearched) {
        response = await getAllAgencyUsers(agencyId,page);
      }
      if (agencyId === "null"&&!issearched) {
        response = await getAllGieUsers(gieId,page);
      }
      if (!gieId && !agencyId && !userId && !issearched) {
        response = await getAllUsers(page);
      }
      console.log("Users", response);
      if (!response.error && !gie.error) {
        setAllGEI(gie.data);
        if(issearched){
          setusers([response.data])
        }else{
        setusers(response.data);}
        setisloading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    
    if (window.location.pathname.includes("users")) {
      getpages()
      handlegetallUsers();
    }
    if (gieId) {
      setSelectedGEI(gieId);
    }
    if (agencyId && agencyId !== "null") {
      setSelectedAgency(agencyId);
    }
  }, [location]);
  useEffect(() => {
    console.log("all Users", users);
  }, [users]);
  const handlelisthousesclick = (id, username) => {
    navigate(`/houses/${id}/${username}`);
  };
  const handleviewClick = (user) => {
    setusertoview(user);
    setisviewing(true);
  };
  const handleEditClick = (user) => {
    setusertoview(user);
    setisediting(true);
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
    if (selectedGEI=== "") {
      setAllAgencies([]);
    }
  }, [selectedGEI]);
  const handleDeleteClick = async (id, name) => {
    const response = await deleteUser(id);
    if (!response.error) {
      toastService.success(`${name} Deleted Successfully`);
      handlegetallUsers();
    } else {
      toastService.warn("Something went wrong");
    }
  };
  const handleFilterUsers = (e) => {
    e.preventDefault();
  };
  const handlefilterbyids = () => {
    if (selectedAgency === "") {
      navigate(`/users/${selectedGEI}/null/1`);
    } else {
      navigate(`/users/${selectedGEI}/${selectedAgency}/1`);
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
                <h3 className="mb-0">Users</h3>
                <Form
                  role="form"
                  style={{
                    display: "flex",
                    gap: "20px",
                    maxHeight: "50px",
                    width: "85%",
                    alignItems: "center",
                  }}
                  onSubmit={(e) => handleFilterUsers(e)}
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
                      type="submit"
                      disabled={selectedGEI.trim() === ""}
                    >
                      Filter
                    </Button>
                  </div>
                  <div className="text-center">
                    <Button
                      onClick={() => {
                        setSelectedAgency("");
                        setSelectedGEI("");
                        navigate("/users/1");
                      }}
                      className="my-4"
                      color="danger"
                      type="submit"
                      disabled={!agencyId&&!gieId}
                    >
                      Clear Filter
                    </Button>
                  </div>
                  <div className="text-center">
                    <Button className="my-4" color="danger" onClick={()=>setisadding(true)}>
                      Add User
                    </Button>
                  </div>
                </Form>
                {/* <Button color="danger" onClick={()=>setisaddingUser(true)}>
                  Add User
                </Button> */}
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
                      <th scope="col">Image</th>
                      <th scope="col">Full Name</th>
                      <th scope="col">Mobile #</th>
                      <th scope="col">House</th>
                      <th scope="col">Agency</th>

                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => {
                      return (
                        <tr>
                          <td>
                            {user.image === "" ? (
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
                                  src={`https://api.videorpi.com/${user.image}`}
                                />
                              </div>
                            )}
                          </td>
                          <td>{user.fname}</td>
                          <td>
                            {user.country_Code}-{user.mobile_no}
                          </td>
                          <td>
                            <Button
                              color="danger"
                              onClick={() =>
                                handlelisthousesclick(user._id, user.fname)
                              }
                            >
                              List Houses
                            </Button>
                          </td>
                          <td>{user?.agency?.name}</td>
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
                                <DropdownItem
                                  onClick={() => handleviewClick(user)}
                                >
                                  View
                                </DropdownItem>
                                <DropdownItem
                                onClick={() => handleEditClick(user)}
                              >
                                Edit
                              </DropdownItem>
                                <DropdownItem
                                  onClick={() =>
                                    handleDeleteClick(user._id, user.fname)
                                  }
                                >
                                  Delete
                                </DropdownItem>
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
            {!isloading && totalpages !== 1&&totalitems>20&&!userId&&<div style={{width:'100%',alignContent:'center',display:'flex',justifyContent:'center',marginTop:'20px'}}> 
              <div>
              <Button
                              color="danger"
                              onClick={handleprev}
                              disabled={currentpage===1}
                            >
                              Prev
                            </Button>
                            <Button
                              color="danger"
                            >
                              {currentpage}
                            </Button>
                            <Button
                              color="danger"
                              onClick={handlenext}
                              disabled={currentpage===totalpages}
                            >
                              Next
                            </Button>
                            </div>
              </div>}
          </div>
        </Row>
      </Container>
      {(isadding || isviewing || isediting) && (
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
            paddingTop: isadding?'':"5vh",
            zIndex: 20,
          }}
        >
          {isviewing && (
            <ViewUserModal
              handleclose={() => setisviewing(false)}
              userdetails={usertoview}
            />
          )}
          {isediting&&<EditUserModal handleclose={()=>setisediting(false)} usertoedit={usertoview} fetchUsers={handlegetallUsers}/>}
          {isadding&&<AddUserModal handleclose={()=>setisadding(false)} fetchusers = {handlegetallUsers}/>}
        </div>
      )}
    </>
  );
};

export default Users;
