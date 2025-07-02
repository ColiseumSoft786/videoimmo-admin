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

const EditAdminModal = ({ handleclose, admintoedit , fetchusers }) => {
  console.log(admintoedit);
  const [firstname, setfirstname] = useState(admintoedit.firstname);
  const [lastname, setlastname] = useState(admintoedit.lastname);
  const handleadminedit = async (e) => {
    e.preventDefault();
    if(firstname===admintoedit.firstname&&lastname===admintoedit.lastname){
        toastService.warn("You haven't made any changes")
        return
    }
    const body = {
      fname: firstname,
      lname: lastname,
    };

    await updateAdminName(body, admintoedit.id); // No need to store in `response` if unused
    toastService.success("Updated success");
    handleclose();
    fetchusers()
  };

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
              <span style={{fontSize:'20px',fontWeight:'bold'}}>Edit Admin</span>
            </div>
            <Form role="form" onSubmit={(e) => handleadminedit(e)}>
              <FormGroup className="mb-3">
                <label>First Name</label>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="First name"
                    type="text"
                    value={firstname}
                    onChange={(e) => setfirstname(e.target.value)}
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

export default EditAdminModal;
