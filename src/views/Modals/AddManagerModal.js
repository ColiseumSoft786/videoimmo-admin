import { updateAdminName } from "Api/Admins";
import { getAllAgenciesNamesByGie } from "Api/agency";
import { getAllGIESNames } from "Api/gei";
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

const AddManagerModal = ({ handleclose,team, fetchteam }) => {
    const [allUsers,setAllUsers]= useState([])
    const [selectedManager,setselectedManager]=useState('')
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
 const handleAddManager = async(e)=>{
    e.preventDefault()
    try {
        if(selectedManager.trim()===''){
            toastService.warn('Please Select Manager')
            return
        }
        const requestbody = [...team.managers,selectedManager]
        const response = await updateTeamManagers(requestbody,team._id)
        if(!response.error){
            toastService.success('Manager Added Successfully')
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
              <span style={{fontSize:'20px',fontWeight:'bold'}}>Add Manager</span>
            </div>
            <Form role="form" onSubmit={(e) => handleAddManager(e)}>
              <FormGroup className="mb-3">
                <label>Select Manager</label>
                <InputGroup
                    className="input-group-alternative"
                  >
                    <Input
                      type="select"
                      value={selectedManager}
                      onChange={(e) => setselectedManager(e.target.value)}
                    >
                      <option value="">Select Manager</option>
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

export default AddManagerModal;
