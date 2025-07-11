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
import ViewUserModal from "./Modals/ViewUserModal";
import EditUserModal from "./Modals/EditUserModal";
import { deleteUser } from "Api/Users";
import toastService from "Toaster/toaster";
import AddUserModal from "./Modals/AddUserModal";
import { getManagerTeam } from "Api/Users";
import EditTeamNameModal from "./Modals/EditTeamNameModal";
import AddManagerModal from "./Modals/AddManagerModal";
import AddMemberModal from "./Modals/AddMemberModal";
import { updateTeamMembers } from "Api/teams";
import { updateTeamManagers } from "Api/teams";
// core components

const Teams = () => {
  const { managerid } = useParams();
  const [teams, setteams] = useState([]);
  const [iseditingName,setIsEditingName] = useState(false)
  const [isaddingmanager,setisaddingmanager] = useState(false)
  const [isaddingmember,setisaddingmember]= useState(false)
  const [isloading, setisloading] = useState(true);
  console.log('this is teamt id ',managerid)
  const handlegetteam = async () => {
    try {
      setisloading(true);
      const response = await getManagerTeam(managerid);
      if (!response.error) {
       setteams(response.data.data)
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
  const handleRemoveMember = async(memberid)=>{
          const requestbody = teams.members.filter((member)=>member._id!==memberid)
          console.log("this is request body",requestbody)
          const response = await updateTeamMembers(requestbody,teams._id)
          if(!response.error){
              toastService.success('Member Removed Successfully')
              handlegetteam()
          }
    }
  const handleRemoveManager = async(managerid)=>{
    const requestbody = teams.managers.filter((manager)=>manager._id!==managerid)
    const response = await updateTeamManagers(requestbody,teams._id)
    if(!response.error){
        toastService.success('Manager Removed Successfully')
        handlegetteam()
    }
  }

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
                <h3 className="mb-0">Team : {teams.name}</h3>
                    <Button color="danger" onClick={()=>setIsEditingName(true)}>Edit</Button>
              </CardHeader>
              <div style={{display:'flex', width: "100%", padding: " 20px" , justifyContent:'space-between'}}>
                <h3 className="mb-0">Managers</h3>
                <Button color="danger" onClick={()=>setisaddingmanager(true)}>Add manager</Button>
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
                    {teams.managers?.map((manager, index) => {
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
                        <td className="text-right">
                          <Button
                              color="danger"
                              onClick={() => handleRemoveManager(manager._id)}
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
              <div style={{display:'flex', width: "100%", padding: " 20px" ,justifyContent:'space-between'}}>
                <h3>Members</h3>
                <Button color="danger" onClick={()=>setisaddingmember(truet)}>Add Member</Button>
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
                    {teams.members?.map((memeber, index) => {
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
                              onClick={() => handleRemoveMember(memeber._id)}
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
      {(iseditingName||isaddingmanager||isaddingmember)&&(
        <div style={{height:'100vh',width:'100vw',backgroundColor:'rgba(0, 0, 0, 0.3)',position:'fixed',top:0,left:0,display:"flex",justifyContent:"center",paddingTop:'10vh',zIndex:20}}>
          {iseditingName&&<EditTeamNameModal handleclose={()=>setIsEditingName(false)} teamtoEdit={teams} fetchteam={handlegetteam}/>}
          {isaddingmanager&&<AddManagerModal handleclose={()=>setisaddingmanager(false)} fetchteam={handlegetteam} team={teams}/>}
          {isaddingmember&&<AddMemberModal handleclose={()=>setisaddingmember(false)} fetchteam={handlegetteam} team={teams}/>}
        </div>
        )}
    </>
  );
};

export default Teams;
