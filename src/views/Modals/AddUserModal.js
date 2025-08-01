import { updateAdminName } from "Api/Admins";
import { getAllAgenciesNamesByGie } from "Api/agency";
import { getAllGIESNames } from "Api/gei";
import { addUser } from "Api/Users";
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

const AddUserModal = ({ handleclose, fetchusers }) => {
  const [fullname, setfullname] = useState("");
  const [contact, setcontact] = useState("");
  const [useremail, setuseremail] = useState("");
  const [countryCode, setCountryCode] = useState("+33");
  const [selectedGEI,setSelectedGEI] = useState('')
  const [selectedAgency,setSelectedAgency] = useState('')
  const [allGEI,setAllGEI] = useState([])
  const [allAgencies,setAllAgencies] = useState([])
  const [isfetchingag,setisfetchingag] = useState(false)
  const handleGetAllGie = async()=>{
    const response = await getAllGIESNames();
    if(!response.error){
      setAllGEI(response.data)
    }
  }
  const handlegetAgenciesnames = async () => {
    setisfetchingag(true);
    const response = await getAllAgenciesNamesByGie(selectedGEI);
    if (!response.error) {
      setAllAgencies(response.data);
      setisfetchingag(false);
    }
  };
  useEffect(() => {
    if (selectedGEI !== "") {
      handlegetAgenciesnames();
    }
    if (selectedAgency === "") {
      setAllAgencies([]);
    }
  }, [selectedGEI]);
  const handleAddUser = async (e) => {
    e.preventDefault();
    if (
      fullname.trim() === "" ||
      contact.trim() === "" ||
      useremail.trim() === ""
    ) {
      toastService.warn("All fields must be filled");
      return;
    }
    if(selectedGEI!==''){
      if(selectedAgency.trim()===''){
        toastService.warn('Please Select Agency')
        return
      }
    }
    const requestbody = {
      image: "",
      fname: fullname,
      lname: "",
      country_Code: countryCode,
      email: useremail,
      mobile_no: contact.slice(countryCode.length-1),
      type: "user",
      gie: selectedGEI=== "" ? null : selectedGEI,
      agency: selectedAgency === "" ? null : selectedAgency,
    };
    const response = await addUser(requestbody);
    if (!response.error) {
      toastService.success(`${fullname} Added Successfully`);
      handleclose();
      fetchusers();
    }
  };
  useEffect(()=>{
    console.log('this country code',countryCode,'and',contact)
  },[countryCode,contact])
  useEffect(()=>{
    handleGetAllGie()
  },[])
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
              <span style={{fontSize:'20px',fontWeight:'bold'}}>Add User</span>
            </div>
            <Form role="form" onSubmit={(e) => handleAddUser(e)}>
              <FormGroup className="mb-3">
                <label>Full Name</label>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Full name"
                    type="text"
                    value={fullname}
                    onChange={(e) => setfullname(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mb-3">
                <label>User Email</label>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="User Email"
                    type="email"
                    value={useremail}
                    onChange={(e) => setuseremail(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mb-3">
                <label>User Contact</label>
                {/* <InputGroup className="input-group-alternative"> */}
                <PhoneInput
                  country={"fr"} // France by default
                  value={contact}
                  onChange={(value, data) => {
                    setcontact(value);
                    setCountryCode("+" + data.dialCode); // Sets +33
                  }}
                  inputStyle={{
                    width: "100%",
                    height: "45px",
                  }}
                  countryCodeEditable={false}
                />
                {/* </InputGroup> */}
              </FormGroup>
              <FormGroup className="mb-3">
                <label>GIE (Optional)</label>
                <InputGroup
                    className="input-group-alternative"
                  >
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
                <label>Agency (Optional)</label>
                {/* <InputGroup className="input-group-alternative"> */}
                <InputGroup
                    className="input-group-alternative"
                  >
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

export default AddUserModal;
