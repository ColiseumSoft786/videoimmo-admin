import { updateAdminName } from "Api/Admins";
import { getAllAgenciesNamesByGie } from "Api/agency";
import { getAllGIESNames } from "Api/gei";
import { updateTeamMembers } from "Api/teams";
import { updateTeamManagers } from "Api/teams";
import { addUser } from "Api/Users";
import { getotherusernamesforteam } from "Api/Users";
import { getOtherUserNames } from "Api/Users";
import { updateUserInfo } from "Api/Users";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import toastService from "Toaster/toaster";

const AddMemberModal = ({ handleclose,team, fetchteam }) => {
    const [allUsers,setAllUsers]= useState([]);
    const [selectedMembers,setselectedMembers]=useState([]);
    const [inputValue,setInputValue] = useState("");
    const handleGetAllUserNames = async()=>{
    try {
        const response = await getotherusernamesforteam(team._id,team?.agency?._id)
        if(!response.error){
            setAllUsers(response.data.data)
        }
    } catch (error) {
        console.log(error)
    }
  }
  useEffect(()=>{
    handleGetAllUserNames()
  },[])
 const handleAddMember = async(e)=>{
    e.preventDefault()
    try {
        if(selectedMembers.length===0){
            toastService.warn('Please Select Members')
            return
        }
        const requestbody = [...team.members,...selectedMembers]
        console.log('this is r body',requestbody,team._id)
        const response = await updateTeamMembers(requestbody,team._id)
        if(!response.error){
            toastService.success('Members Added Successfully')
            fetchteam()
            handleclose()
        }
    } catch (error) {
        console.log(error)
    }
  }
  const handleSelectMembers = (id) => {
    const isExisting = selectedMembers.find((sm) => sm === id);
    if (isExisting) {
      return;
    } else {
      setselectedMembers((prev) => [...prev, id]);
    }
    setInputValue("")
  };
  const handleRemoveMembers = (id)=>{
    const filteredMembers = selectedMembers.filter((sm)=>sm!==id);
    setselectedMembers(filteredMembers)
  }
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <span
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              fontSize: "30px",
              cursor: "pointer",
            }}
            onClick={handleclose}
          >
            &times;
          </span>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <span style={{fontSize:'20px',fontWeight:'bold'}}>Add Member</span>
            </div>
            <Form role="form" onSubmit={(e) => handleAddMember(e)}>
              <FormGroup className="mb-3">
                <label>Select Member</label>
                <InputGroup
                    className="input-group-alternative"
                  >
                    <Input
                      type="select"
                      value={inputValue}
                      onChange={(e) => handleSelectMembers(e.target.value)}
                    >
                      <option value="">Select Member</option>
                      {allUsers.map((user, index) => {
                        return (
                          <option value={user._id} key={index}>
                            {user.fname}
                          </option>
                        );
                      })}
                    </Input>
                  </InputGroup>
              </FormGroup>
              {selectedMembers.length>0&&<div style={{ backgroundColor: "white", maxHeight:"40vh",overflowY:"scroll" }}>
                {selectedMembers.map((sm) => {
                  return (
                    <div
                      style={{
                        fontSize: "15px",
                        position: "relative",
                        padding: "5px",
                        border: "1px solid #D9D9D9",
                      }}
                    >
                      {allUsers.find((au) => au._id === sm).fname}{" "}
                      <span
                      onClick={()=>handleRemoveMembers(sm)}
                        style={{
                          fontSize: "15px",
                          position: "absolute",
                          top: "0",
                          cursor: "pointer",
                          right: "1%",
                          height: "100%",
                          alignContent: "center",
                          alignItems: "center",
                        }}
                      >
                        &times;
                      </span>
                    </div>
                  );
                })}
              </div>}
              <div className="text-center">
                <Button className="my-4" color="danger" type="submit">
                  ADD
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default AddMemberModal;
