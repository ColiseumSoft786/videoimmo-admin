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

const AddManagerModal = ({ handleclose, team, fetchteam }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [selectedManagers, setSelectedManagers] = useState([]);
  const [inputValue,setInputValue] = useState("")
  const handleGetAllUserNames = async () => {
    try {
      const response = await getotherusernamesforteam(
        team._id,
        team?.agency?._id
      );
      if (!response.error) {
        setAllUsers(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetAllUserNames();
  }, []);
  const handleAddManager = async (e) => {
    e.preventDefault();
    try {
      if (selectedManagers.length === 0) {
        toastService.warn("Please Select Managers");
        return;
      }
      const requestbody = [...team.managers, ...selectedManagers];
      const response = await updateTeamManagers(requestbody, team._id);
      if (!response.error) {
        toastService.success("Managers Added Successfully");
        fetchteam();
        handleclose();
      }
    } catch (error) {
      console.log(error);
      toastService.error("Something went wrong please try again");
    }
  };
  const handleSelectManagers = (id) => {
    const isExisting = selectedManagers.find((sm) => sm === id);
    if (isExisting) {
      return;
    } else {
      setSelectedManagers((prev) => [...prev, id]);
    }
    setInputValue("")
  };
  const handleRemoveManagers = (id)=>{
    const filteredManagers = selectedManagers.filter((sm)=>sm!==id);
    setSelectedManagers(filteredManagers)
  }
  useEffect(() => {
    console.log("these are the selected manages", selectedManagers);
  }, [selectedManagers]);
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
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                Add Manager
              </span>
            </div>
            <Form role="form" onSubmit={(e) => handleAddManager(e)}>
              <FormGroup className="mb-3">
                <label>Select Manager</label>
                <InputGroup className="input-group-alternative">
                  <Input
                    type="select"
                    value={inputValue}
                    onChange={(e) => handleSelectManagers(e.target.value)}
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
              {selectedManagers.length>0&&<div style={{ backgroundColor: "white", maxHeight:"40vh",overflowY:"scroll" }}>
                {selectedManagers.map((sm) => {
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
                      onClick={()=>handleRemoveManagers(sm)}
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

export default AddManagerModal;
