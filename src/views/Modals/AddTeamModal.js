import { updateAdminName } from "Api/Admins";
import { getAllAgenciesNamesByGie } from "Api/agency";
import { getAllGIESNames } from "Api/gei";
import { addTeam } from "Api/teams";
import { addUser } from "Api/Users";
import { getAllUserNamesByAgency } from "Api/Users";
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

const AddTeamModal = ({ handleclose, fetchusers }) => {
  const [selectedGEI, setSelectedGEI] = useState("");
  const [selectedAgency, setSelectedAgency] = useState("");
  const [allGEI, setAllGEI] = useState([]);
  const [allAgencies, setAllAgencies] = useState([]);
  const [isfetchingag, setisfetchingag] = useState(false);
  const [allUser, setAllUsers] = useState([]);
  const [isFetchingUser, setIsFetchingUser] = useState(false);
  const [selectedManager, setSelectedManager] = useState("");
  const [name, setName] = useState("");
  const handleGetAllGie = async () => {
    const response = await getAllGIESNames();
    if (!response.error) {
      setAllGEI(response.data);
    }
  };
  const handlegetAgenciesnames = async () => {
    setisfetchingag(true);
    const response = await getAllAgenciesNamesByGie(selectedGEI);
    if (!response.error) {
      setAllAgencies(response.data);
      setisfetchingag(false);
    }
  };
  const handlegetUsersnames = async()=>{
    setIsFetchingUser(true)
    const response = await getAllUserNamesByAgency(selectedAgency);
    if(!response.error){
        setAllUsers(response.data)
        setIsFetchingUser(false)
    }
  }
  useEffect(() => {
    if (selectedGEI !== "") {
      handlegetAgenciesnames();
    }
    if (selectedAgency === "") {
      setAllAgencies([]);
    }
  }, [selectedGEI]);
  useEffect(() => {
    if (selectedAgency !== "") {
      handlegetUsersnames();
    }
    if (selectedAgency=== "") {
      setAllUsers([]);
    }
  }, [selectedAgency]);
  const handleAddUser = async (e) => {
    e.preventDefault();
    if (
      name.trim()===''||
      selectedManager===''||
      selectedGEI === "" ||
      selectedAgency === ""
    ) {
      toastService.warn("All fields must be filled");
      return;
    }
    const requestbody = {
      name: name,
      managerId: selectedManager,
      gie: selectedGEI,
      agency: selectedAgency,
    };
    const response = await addTeam(requestbody);
    if (!response.error) {
      toastService.success(`${name} Added Successfully`);
      handleclose();
      fetchusers();
    }
  };
  useEffect(() => {
    handleGetAllGie();
  }, []);
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
                Add Team
              </span>
            </div>
            <Form role="form" onSubmit={(e) => handleAddUser(e)}>
              <FormGroup className="mb-3">
                <label>Name</label>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Team name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mb-3">
                <label>GIE</label>
                <InputGroup className="input-group-alternative">
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
              </FormGroup>
              <FormGroup className="mb-3">
                <label>Agency</label>
                {/* <InputGroup className="input-group-alternative"> */}
                <InputGroup className="input-group-alternative">
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
                {/* </InputGroup> */}
              </FormGroup>
              <FormGroup className="mb-3">
                <label>Manager</label>
                <InputGroup className="input-group-alternative">
                  <Input
                    type="select"
                    value={selectedManager}
                    onChange={(e) => setSelectedManager(e.target.value)}
                    disabled={selectedAgency.trim() === "" || isFetchingUser}
                  >
                    {selectedAgency.trim() === "" && (
                      <option value="">Select Agency First</option>
                    )}
                    {isFetchingUser && <option value="">Fetching...</option>}
                    {selectedAgency.trim() !== "" && !isFetchingUser && (
                      <option value="">Select Manager</option>
                    )}
                    {allUser.map((user, index) => {
                      return (
                        <option value={user._id} key={index}>
                          {user.fname}
                        </option>
                      );
                    })}
                  </Input>
                </InputGroup>
                {/* </InputGroup> */}
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

export default AddTeamModal;
