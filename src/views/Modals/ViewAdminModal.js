import { updateAdminName } from "Api/Admins";
import React, { useState } from "react";
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

const ViewAdminModal = ({ handleclose, admintoedit }) => {
  console.log(admintoedit);
  const [firstname, setfirstname] = useState(admintoedit.firstname);
  const [lastname, setlastname] = useState(admintoedit.lastname);
  const handleclosemodal=(e)=>{
    e.preventDefault()
    handleclose()
  }
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <span style={{fontSize:'20px',fontWeight:'bold'}}>Details</span>
            </div>
            <Form role="form" onSubmit={(e) => handleclosemodal(e)}>
              <FormGroup className="mb-3">
                <label>First Name</label>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="First name"
                    type="text"
                    value={firstname}
                    onChange={(e) => setfirstname(e.target.value)}
                    readOnly
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mb-3">
                <label>Last Name</label>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Last name"
                    type="text"
                    value={lastname}
                    onChange={(e) => setlastname(e.target.value)}
                    readOnly
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="my-4" color="danger" type="submit">
                  Close
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default ViewAdminModal;
