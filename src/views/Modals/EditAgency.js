import { updateAdminName } from "Api/Admins";
import { updateAgency } from "Api/agency";
import { addAgency } from "Api/agency";
import { addGei } from "Api/gei";
import { addUser } from "Api/Users";
import { updateUserInfo } from "Api/Users";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch } from "react-redux";
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
import { addGEi } from "ReduxSlices/AdminSlice";
import toastService from "Toaster/toaster";

const EditAgency = ({ handleclose,agencyToedit,fetchagencies ,GEIs}) => {
  const dispatch = useDispatch()
  const [name, setname] = useState(agencyToedit.name);
  const [contact, setcontact] = useState(agencyToedit.countryCode.slice(1)+agencyToedit.phone);
  const [countryCode, setCountryCode] = useState(agencyToedit.countryCode);
  const [selectedGIE,setSelectedGIE] = useState(agencyToedit.gie._id)
  const handleAddAgency = async (e) => {
    e.preventDefault();
    if (
      name.trim() === "" ||
      contact.trim() === "" ||
      selectedGIE.trim()===''
    ) {
      toastService.warn("All fields must be filled");
      return;
    }
    if (
      name===agencyToedit.name &&
      contact.slice(countryCode.length-1)===agencyToedit.phone &&
      selectedGIE===agencyToedit.gie._id
    ) {
      toastService.warn("No Changes To Save");
      return;
    }
    const requestbody = {
    image:"",
      name:name,
      phone:contact.slice(countryCode.length-1),
      countryCode:countryCode,
      gie: selectedGIE
    }
    const response = await updateAgency(requestbody,agencyToedit._id)
    if(!response.error){
      toastService.success(`Agency Updated Successfully`);
      fetchagencies()
      handleclose();
    }
  };
  useEffect(()=>{
    console.log('this country code',countryCode,'and',contact)
  },[countryCode,contact])
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
              <span style={{fontSize:'20px',fontWeight:'bold'}}>Add Agency</span>
            </div>
            <Form role="form" onSubmit={(e) => handleAddAgency(e)}>
              <FormGroup className="mb-3">
                <label>Name</label>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Name"
                    type="text"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <label>GIE</label>
                 <InputGroup className="input-group-alternative">
                      <Input
                        type="select"
                        value={selectedGIE}
                        onChange={(e) => setSelectedGIE(e.target.value)}
                      >
                        <option value="">Select GEI</option>
                        {GEIs.map((gei, index) => {
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
                <label>Phone</label>
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
                  enableLongNumbers={true}
                />
                {/* </InputGroup> */}
              </FormGroup>
              <div className="text-center">
                <Button className="my-4" color="danger" type="submit">
                  Edit
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default EditAgency;
