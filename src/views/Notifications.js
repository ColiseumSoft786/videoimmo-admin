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
  Form,
  FormGroup,
  InputGroup,
  Input,
  CardBody,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import ViewUserModal from "./Modals/ViewUserModal";
import EditUserModal from "./Modals/EditUserModal";
import { deleteUser } from "Api/Users";
import toastService from "Toaster/toaster";
import AddUserModal from "./Modals/AddUserModal";
import { getSettings } from "Api/settings";
import { updateSettings } from "Api/settings";
import { getAllUserNames } from "Api/Users";
import { sendMultipleNotifications } from "Api/Admins";
import ConfirmModal from "./Modals/ConfirmModals";
import NotificationModel from "./Modals/NotificationModel";
// core components

const Notifications = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [recievers, setRecievers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirm, setIsConfirm] = useState(false);
  const [sortType,setSortType] = useState('none')
  const handleGetAllUsersNames = async () => {
    const response = await getAllUserNames();
    if (!response.error) {
      setAllUsers(response.data);
      setFilteredUsers(response.data);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    handleGetAllUsersNames();
  }, []);
  useEffect(() => {
    if (allUsers.length > 0) {
      const usersToShow = allUsers.filter((user) =>
        user.fname.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredUsers(usersToShow);
    }
  }, [searchText]);
  const handleSendNotification = async () => {
    try {
      const requestbody = {
        userIds: recievers,
        title: title,
        message: message,
      };
      const response = await sendMultipleNotifications(requestbody);
      if (!response.error) {
        toastService.success("Notification sent successfully");
        setRecievers([]);
        setTitle("");
        setMessage("");
        setSearchText("");
      } else {
        toastService.error("Something went wrong please try again later");
      }
    } catch (error) {
      toastService.error("Something went wrong please try again later");
    } finally {
      setIsConfirm(false);
    }
  };
  const handlehighestHousesSort = () => {
    const highestFirst = [...filteredUsers].sort(
      (a, b) => b.houseCount - a.houseCount
    );
    console.log("highest", highestFirst);
    setFilteredUsers(highestFirst);
  };
  const handlelowestHousesSort = () => {
    const lowestFirst = [...filteredUsers].sort(
      (a, b) => a.houseCount - b.houseCount
    );
    console.log("lowest", lowestFirst);
    setFilteredUsers(lowestFirst);
  };
  useEffect(()=>{
    if(sortType==='highest'){
        handlehighestHousesSort()
    } else if(sortType==='lowest'){
        handlelowestHousesSort()
    } else if (sortType==='none'){
      setSearchText('')
      setFilteredUsers(allUsers)
    }
  },[sortType])
  const handleSingleCheckboxChange = (id, checked) => {
    if (checked) {
      // push id
      setRecievers((prev) => [...prev, id]);
    } else {
      // pull (remove) id
      setRecievers((prev) => prev.filter((item) => item !== id));
    }
  };
  const handleAllCheckboxChange = (checked) => {
    if (checked) {
      // push id
      const allids = filteredUsers.map((user) => user._id);
      setRecievers(allids);
    } else {
      // pull (remove) id
      setRecievers([]);
    }
  };
  useEffect(() => {
    console.log("recievers", recievers);
  }, [recievers]);
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
                >
                  <InputGroup
                    className="input-group-alternative"
                    style={{ width: "45%" }}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fas fa-search" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Search User"
                      type="text"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                  </InputGroup>
                  <div className="text-center" style={{display:'flex',alignItems:'center',gap:'10px',width:'38%'}}>
                    <label style={{marginRight:'10px',marginTop:'7px'}}>Sort By Houses:</label>
                   <InputGroup
                    className="input-group-alternative"
                    style={{ width: "55%" }}
                  >
                    <Input
                      type="select"
                      value={sortType}
                      onChange={(e) => setSortType(e.target.value)}
                    >
                        <option value="highest">Highest</option>
                        <option value="lowest">Lowest</option>
                        <option value="none">None</option>
                    </Input>
                  </InputGroup>
                  </div>
                  <div className="text-center">
                    <Button
                      className="my-4"
                      color="danger"
                      onClick={()=>{setIsConfirm(true)}}
                      disabled={recievers.length===0}
                    >
                      Send
                    </Button>
                  </div>
                </Form>
                {/* <Button color="danger" onClick={()=>setisaddingUser(true)}>
                  Add User
                </Button> */}
              </CardHeader>
              {isLoading ? (
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
                      <th scope="col" style={{ width: "5px" }}>
                        <div className="custom-control custom-control-alternative custom-checkbox">
                          <input
                            className="custom-control-input"
                            id="select-all-checkbox"
                            type="checkbox"
                            checked={recievers.length === filteredUsers.length}
                            onChange={(e) =>
                              handleAllCheckboxChange(e.target.checked)
                            }
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="select-all-checkbox"
                          ></label>
                        </div>
                      </th>
                      <th scope="col">Full Name</th>
                      <th scope="col">Houses</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user, index) => {
                      const checkboxId = `user-checkbox-${user._id}`;
                      return (
                        <tr>
                          <th scope="col" style={{ width: "5px" }}>
                            <div className="custom-control custom-control-alternative custom-checkbox">
                              <input
                                className="custom-control-input"
                                id={checkboxId}
                                type="checkbox"
                                checked={recievers.includes(user._id)}
                                onChange={(e) =>
                                  handleSingleCheckboxChange(
                                    user._id,
                                    e.target.checked
                                  )
                                }
                              />
                              <label
                                className="custom-control-label"
                                htmlFor={checkboxId}
                              ></label>
                            </div>
                          </th>
                          <td>{user.fname}</td>
                          <td>{user.houseCount}</td>
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
      {(isConfirm) && (
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
            paddingTop: "5%",
            zIndex: 20,
          }}
        >
          {isConfirm && (
            <NotificationModel
            handleclose={()=>setIsConfirm(false)}
            handleaction={handleSendNotification}
            setTitle={setTitle}
            title={title}
            setMessage={setMessage}
            message={message}
            recievers={recievers}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Notifications;
