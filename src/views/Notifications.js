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
// core components

const Notifications = () => {
    const [title,setTitle] = useState('')
    const [message,setMessage] = useState('')
    const [searchText,setSearchText] = useState('')
    const [filteredUsers,setFilteredUsers] = useState([])
    const [allUsers,setAllUsers] = useState([])
    const [recievers,setRecievers] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const [isConfirm,setIsConfirm] = useState(false)
    const handleGetAllUsersNames = async()=>{
            const response = await getAllUserNames()
            if(!response.error){
                setAllUsers(response.data)
                setIsLoading(false)
            }
    }
    const handlesuggestionclick = (item)=>{
        const isExistingUser = recievers.find((r)=>r._id===item._id)
        if(isExistingUser){
            toastService.warn('User already selected')
        }else{
        setRecievers((prev)=>[...prev,item])}
    }
    const handleRemoveReceiver = (id)=>{
        const newReceivers = recievers.filter((r)=>r._id!==id)
        setRecievers(newReceivers)
    }
    useEffect(()=>{
        handleGetAllUsersNames()
    },[])
    useEffect(()=>{
        if(allUsers.length>0){
            const usersToShow = allUsers.filter((user)=>user.fname.toLowerCase().includes(searchText.toLowerCase()))
            setFilteredUsers(usersToShow)
        }
    },[searchText])
    const handleSendNotification = async()=>{
        try {
            const requestbody={
                userIds:recievers.map((r)=>r._id),
                title:title,
                message:message
            }
            const response = await sendMultipleNotifications(requestbody)
            if(!response.error){
                toastService.success('Notification sent successfully')
                setRecievers([])
                setTitle('')
                setMessage('')
                setSearchText('')
            }else{
                toastService.error("Something went wrong please try again later")
            }
        } catch (error) {
            toastService.error("Something went wrong please try again later")
        } finally{
            setIsConfirm(false)
        }
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
              <CardHeader className="border-0" >
                <h3 className="mb-0">Notifications</h3>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                {isLoading?(<div style={{height:'250px',width:'100%',marginTop:'20vh',display:'flex',justifyContent:'center'}}><Loader/></div>):(
              <Form role="form" onSubmit={(e)=>{
                e.preventDefault()
                setIsConfirm(true)
                }}>
              <FormGroup className="mb-3">
                <label>Title</label>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mb-3">
                <label>Message</label>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Message"
                    type="textarea"
                    style={{minHeight:'150px'}}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mb-3" style={{position:'relative'}}>
                <label>Receivers</label>
                {recievers.length>0&&(<div style={{display:'flex',marginBottom:'10px',flexWrap:'wrap',width:'100%',gap:'10px'}}>{recievers.map((r,index)=>{
                    return(
                        <div key={index} style={{padding:'3px 8px',borderRadius:"20px",border:"1px solid grey",display:'flex',gap:'5px'}}>{r.fname} <span style={{fontSize:'18px',cursor:'pointer'}} onClick={()=>handleRemoveReceiver(r._id)}>&times;</span></div>
                    )
                })}</div>)}
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Enter User Name"
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </InputGroup>
                {searchText.trim() !== "" && (
                    <div
                      style={{
                        backgroundColor: "white",
                        position: "absolute",
                        left: "0",
                        width: "40%",
                        maxHeight: "20vw",
                        overflowY: "scroll",
                        zIndex: 19,
                      }}
                    >
                      {filteredUsers.map((item, index) => {
                        return (
                          <div
                            onClick={() => handlesuggestionclick(item)}
                            style={{
                              padding: "10px",
                              textAlign: "left",
                              cursor: "pointer",
                            }}
                            key={index}
                          >
                            {item.fname}
                          </div>
                        );
                      })}
                    </div>
                  )}
              </FormGroup>
              <div className="text-center">
                <Button className="my-4" color="danger" type="submit" disabled={title.trim()===''||message.trim()===''||recievers.length===0}>
                    Send
                </Button>
              </div>
            </Form>)}
            </CardBody>
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
            paddingTop: isConfirm ? "15%" : "5vh",
            zIndex: 20,
          }}
        > 
          {isConfirm && (
            <ConfirmModal
              handleclose={() => setIsConfirm(false)}
              handleaction={handleSendNotification}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Notifications;
