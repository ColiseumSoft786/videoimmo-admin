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
import { useNavigate } from "react-router-dom";
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
} from "reactstrap";
import AddtoTeamModal from "./Modals/AddtoTeamModal";
import ViewUserModal from "./Modals/ViewUserModal";
// core components

const Users = () => {
  const [users, setusers] = useState([]);
  const [isloading,setisloading] = useState(true)
  const [usertoaddteam,setusertoaddteam]=useState(null)
  const [isadding,setisadding] = useState(false)
  const [usertoview,setusertoview] = useState(null)
  const [isviewing,setisviewing] = useState(false)
  const navigate = useNavigate()
  const handlegetallUsers = async () => {
    try {
      const response = await getAllUsers();
      console.log("Users", response);
      if (response.data.length > 0) {
        setusers(response.data);
        setisloading(false)
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handlegetallUsers();
  }, []);
  useEffect(() => {
    console.log("all Users", users);
  }, [users]);
  const handlelisthousesclick = (id,username)=>{
    navigate(`/houses/${id}/${username}`)
  }
  const handleaddtoteamclick = (id)=>{
    setusertoaddteam(id)
    setisadding(true)
  }
  const handleviewClick = (user)=>{
    setusertoview(user)
    setisviewing(true)
  }
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Users</h3>
              </CardHeader>
              {isloading?(<div style={{height:'250px',width:'100%',marginTop:'20vh',display:'flex',justifyContent:'center'}}><Loader/></div>):(
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Sr.#</th>
                    <th scope="col">Image</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Mobile #</th>
                    <th scope="col">House</th>
                    <th scope="col">Members</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          {user.user.image === "" ? (
                            <i style={{fontSize:'25px'}} className="ni ni-circle-08"></i>
                          ) : (
                            <div
                              style={{
                                height: "25px",
                                width: "25px",
                                borderRadius: "50%",
                                overflow: "hidden",
                                alignItems:'center',
                                alignContent:"center"
                              }}
                            >
                              <img
                                style={{ height: "100%", width: "100%", }}
                                src={`https://api.videorpi.com/${user.user.image}`}
                              />
                            </div>
                          )}
                        </td>
                        <td>{user.user.fname}</td>
                        <td>
                          {user.user.country_Code}-{user.user.mobile_no}
                        </td>
                        <td>
                          <Button
                            color="info"
                            onClick={()=>handlelisthousesclick(user.user._id,user.user.fname)}
                          >
                            List Houses
                          </Button>
                        </td>
                        <td>
                          <Button
                            color="info"
                            onClick={()=>handleaddtoteamclick(user.user._id)}
                          >
                            +
                          </Button>
                          {user.user.team && (
                            <Button
                              color="info"
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Teams
                            </Button>
                          )}
                        </td>
                        <td className="text-right">
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
                                href="#pablo"
                                onClick={()=>handleviewClick(user.user)}
                              >
                                View
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Edit
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
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
              </Table>)}
            </Card>
          </div>
        </Row>
      </Container>
      {(isadding||isviewing)&&(
        <div style={{height:'100vh',width:'100vw',backgroundColor:'rgba(0, 0, 0, 0.3)',position:'fixed',top:0,left:0,display:"flex",justifyContent:"center",paddingTop:isviewing?'5vh':'10vh',zIndex:20}}>
          {isadding&&<AddtoTeamModal handleclose={()=>setisadding(false)} userid={usertoaddteam}/>}
          {isviewing&&<ViewUserModal handleclose={()=>setisviewing(false)} userdetails={usertoview}/>}
        </div>
        )}
    </>
  );
};

export default Users;
