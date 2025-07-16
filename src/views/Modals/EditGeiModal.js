import { updateAdminName } from "Api/Admins";
import { updateGEI } from "Api/gei";
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
import { editGEI } from "ReduxSlices/AdminSlice";
import { addGEi } from "ReduxSlices/AdminSlice";
import toastService from "Toaster/toaster";

const EditGeiModal = ({ handleclose ,GeitoEdit,fetchGeis}) => {
  const dispatch = useDispatch()
  const [name, setname] = useState(GeitoEdit.name);
  const [contact, setcontact] = useState(GeitoEdit.countryCode.slice(1)+GeitoEdit.phone);
  const [tokens, setTokens] = useState(GeitoEdit.tokens);
  const [countryCode, setCountryCode] = useState(GeitoEdit.countryCode);
  const [expiryDate,setExpiryDate] = useState(GeitoEdit.expiresOn.slice(0, 10))
  const handleEditGIE = async (e) => {
  e.preventDefault();

  if (
    name.trim() === "" ||
    contact.trim() === "" ||
    tokens === null ||
    !expiryDate
  ) {
    toastService.warn("All fields must be filled");
    return;
  }

  // ✅ Check if expiry date is not in the past
  const today = new Date();
  const selectedDate = new Date(expiryDate);
  today.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    toastService.warn("Expiry date cannot be in the past");
    return;
  }

  // ✅ Prevent update if no changes are made
  if (
    name === GeitoEdit.name &&
    tokens === GeitoEdit.tokens &&
    contact.slice(countryCode.length - 1) === GeitoEdit.phone &&
    expiryDate === GeitoEdit.expiresOn &&
    countryCode === GeitoEdit.countryCode
  ) {
    toastService.warn("No Changes To Save");
    return;
  }

  const requestbody = {
    name: name,
    phone: contact.slice(countryCode.length - 1),
    countryCode: countryCode,
    tokens: tokens,
    expiresOn: expiryDate,
    completeNumber:`${countryCode}${contact.slice(countryCode.length-1)}`
  };

  const response = await updateGEI(requestbody, GeitoEdit._id);
  if (!response.error) {
    toastService.success("Update Successfully");
    fetchGeis();
    handleclose();
  }
};

  useEffect(()=>{
    console.log('this country code',countryCode,'and',contact,'and',expiryDate)
  },[countryCode,contact,expiryDate])
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
              <span style={{fontSize:'20px',fontWeight:'bold'}}>Edit GIE</span>
            </div>
            <Form role="form" onSubmit={(e) => handleEditGIE(e)}>
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
              <FormGroup className="mb-3">
                <label>Tokens</label>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Tokens"
                    type="number"
                    value={tokens}
                    onChange={(e) => setTokens(Number(e.target.value))}
                  />
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
                />
                {/* </InputGroup> */}
              </FormGroup>
              <FormGroup className="mb-3">
                <label>Expiry Date</label>
                <InputGroup className="input-group-alternative">
                  <Input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                  />
                </InputGroup>
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

export default EditGeiModal;
