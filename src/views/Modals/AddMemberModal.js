import { updateAdminName } from "Api/Admins";
import { getAllAgenciesNamesByGie } from "Api/agency";
import { getAllGIESNames } from "Api/gei";
import { updateTeamMembers } from "Api/teams";
import { updateTeamManagers } from "Api/teams";
import { addUser } from "Api/Users";
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
    const [allUsers,setAllUsers]= useState([])
    const [selectedMember,setselectedMember]=useState('')
    const handleGetAllUserNames = async()=>{
    try {
        const response = await getOtherUserNames(team._id,team.agency._id)
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
        if(selectedMember.trim()===''){
            toastService.warn('Please Select Member')
            return
        }
        const requestbody = [...team.members,selectedMember]
        console.log('this is r body',requestbody,team._id)
        const response = await updateTeamMembers(requestbody,team._id)
        if(!response.error){
            toastService.success('Member Added Successfully')
            fetchteam()
            handleclose()
        }
    } catch (error) {
        console.log(error)
    }
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
                      value={selectedMember}
                      onChange={(e) => setselectedMember(e.target.value)}
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
