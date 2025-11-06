import { updateAdminName } from "Api/Admins";
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

const AddGeiModal = ({ handleclose,fetchGEIS }) => {
  const dispatch = useDispatch()
  const [name, setname] = useState("");
  const [contact, setcontact] = useState("");
  const [tokens, setTokens] = useState(null);
  const [countryCode, setCountryCode] = useState("+33");
  const [expiryDate,setExpiryDate] = useState()
  const handleAddGei = async (e) => {
  e.preventDefault();

  // Basic validation
  if (
    name.trim() === "" ||
    tokens === null ||
    !expiryDate
  ) {
    toastService.warn("All fields must be filled");
    return;
  }

  // ✅ Expiry date check
  const today = new Date();
  const selectedDate = new Date(expiryDate);

  // Clear time part for an accurate date-only comparison
  today.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    toastService.warn("Expiry date cannot be in the past");
    return;
  }

  const requestbody = {
    name: name,
    phone: contact.slice(countryCode.length - 1),
    countryCode: contact.trim()===""?"":countryCode,
    tokens: tokens,
    expiresOn: expiryDate,
  };

  const response = await addGei(requestbody);
  if (!response.error) {
    toastService.success(`GIE Added Successfully`);
    fetchGEIS();
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
              <span style={{fontSize:'20px',fontWeight:'bold'}}>Add GIE</span>
            </div>
            <Form role="form" onSubmit={(e) => handleAddGei(e)}>
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

export default AddGeiModal;
