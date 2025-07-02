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
import EditUserModal from "./Modals/EditUserModal";
import { deleteUser } from "Api/Users";
import toastService from "Toaster/toaster";
import AddUserModal from "./Modals/AddUserModal";
import { useSelector } from "react-redux";
// core components

const Users = () => {
  const searchtext = useSelector((state)=>state.admin.searchText)
  const [users, setusers] = useState([]);
  const [isloading,setisloading] = useState(true)
  const [usertoaddteam,setusertoaddteam]=useState(null)
  const [isadding,setisadding] = useState(false)
  const [isaddingUser,setisaddingUser] = useState(false)
  const [usertoview,setusertoview] = useState(null)
  const [isviewing,setisviewing] = useState(false)
  const [isediting,setisediting] = useState(false)
  const [filteredusers,setfilteredusers]= useState([])
  const navigate = useNavigate()
  const handlegetallUsers = async () => {
    setisloading(true)
    try {
      const response = await getAllUsers();
      console.log("Users", response);
      if (response.data.length > 0) {
        setusers(response.data);
        setfilteredusers(response.data)
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
  const handleEditClick = (user)=>{
    setusertoview(user)
    setisediting(true)
  }
  const handleDeleteClick = async(id,name)=>{
    const response = await deleteUser(id)
    if(!response.error){
      toastService.success(`${name} Deleted Successfully`)
      handlegetallUsers()
    }else{
      toastService.warn('Something went wrong')
    }
  }
  const handlefilter=()=>{
    if(users?.length>0){
      setfilteredusers(users?.filter((user)=>user.user.fname.toLowerCase().includes(searchtext.toLowerCase())))
    }
  }
  useEffect(()=>{
    handlefilter()
  },[searchtext])
  const handleTeamsClick = async(id)=>{
    navigate(`/users/team/${id}`)
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
              <CardHeader className="border-0" style={{display:'flex',justifyContent:'space-between'}}>
                <h3 className="mb-0">Users</h3>
                <Button color="info" onClick={()=>setisaddingUser(true)}>
                  Add User
                </Button>
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
                  {filteredusers.map((user, index) => {
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
                              onClick={()=>handleTeamsClick(user.user._id)}
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
                                onClick={()=>handleviewClick(user.user)}
                              >
                                View
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => handleEditClick(user.user)}
                              >
                                Edit
                              </DropdownItem>
                              <DropdownItem
                                onClick={()=>handleDeleteClick(user.user._id,user.user.fname)}
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
      {(isadding||isviewing||isediting||isaddingUser)&&(
        <div style={{height:'100vh',width:'100vw',backgroundColor:'rgba(0, 0, 0, 0.3)',position:'fixed',top:0,left:0,display:"flex",justifyContent:"center",paddingTop:isediting||isaddingUser?'5vh':'10vh',zIndex:20}}>
          {isadding&&<AddtoTeamModal handleclose={()=>setisadding(false)} userid={usertoaddteam}/>}
          {isviewing&&<ViewUserModal handleclose={()=>setisviewing(false)} userdetails={usertoview}/>}
          {isediting&&<EditUserModal handleclose={()=>setisediting(false)} usertoedit={usertoview} fetchUsers={handlegetallUsers}/>}
          {isaddingUser&&<AddUserModal handleclose={()=>setisaddingUser(false)} fetchusers = {handlegetallUsers}/>}
        </div>
        )}
    </>
  );
};

export default Users;
