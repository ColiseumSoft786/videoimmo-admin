import { updateAdminName } from "Api/Admins";
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

const ViewGeiModal = ({ handleclose, Geitoshow }) => {
  const dispatch = useDispatch();
  const [name, setname] = useState(Geitoshow.name);
  const [contact, setcontact] = useState(
    Geitoshow.countryCode + Geitoshow.phone
  );
  const [tokens, setTokens] = useState(Geitoshow.tokens);
  const [countryCode, setCountryCode] = useState(Geitoshow.countryCode);
  const [expiryDate, setExpiryDate] = useState(Geitoshow.expiresOn.slice(0,10));
  useEffect(() => {
    console.log("this country code", countryCode, "and", contact);
  }, [countryCode, contact]);
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
                Details
              </span>
            </div>
            <Form role="form" onSubmit={(e) => handleAddUser(e)}>
              <FormGroup className="mb-3">
                <label>Name</label>
                <InputGroup className="input-group-alternative">
                  <Input placeholder="Name" type="text" value={name} readOnly />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mb-3">
                <label>Tokens</label>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Tokens"
                    type="number"
                    value={tokens}
                    readOnly
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mb-3">
                <label>Phone</label>
                {/* <InputGroup className="input-group-alternative"> */}
                <PhoneInput
                  country={"fr"} // France by default
                  value={contact}
                  inputProps={{
                    readOnly: true,
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
              <FormGroup className="mb-3">
                <label>Expiry Date</label>
                <InputGroup className="input-group-alternative">
                  <Input type="date" value={expiryDate} readOnly />
                </InputGroup>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default ViewGeiModal;
