import { updateAdminName } from "Api/Admins";
import { exportGieDataToCsv } from "Api/gei";
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
} from "reactstrap";
import toastService from "Toaster/toaster";

const GieExportModal = ({ handleclose ,gieToExport}) => {
  const [email,setEmail] = useState("");
  const handleExportDataToCsv = async(e)=>{
    try {
      e.preventDefault();
      const response = await exportGieDataToCsv(gieToExport,email);
      if(!response.error){
        toastService.success(`${response.data}`)
      }
    } catch (error) {
      toastService.error(`${error}`)
    } finally {
      handleclose()
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
              <span style={{fontSize:'20px',fontWeight:'bold'}}>Please provide an email address to send the report</span>
            </div>
            <Form role="form" onSubmit={(e) => handleExportDataToCsv(e)}>
              <FormGroup className="mb-3">
                <label>Email</label>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="my-4" color="danger" type="submit">
                  Send
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default GieExportModal;
