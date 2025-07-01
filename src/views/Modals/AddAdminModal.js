import { addAdmin } from "Api/Admins";
import { updateAdminName } from "Api/Admins";
import { addUser } from "Api/Users";
import { updateUserInfo } from "Api/Users";
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

const AddAdminModal = ({ handleclose, fetchusers }) => {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [adminemail, setadminemail] = useState("");
  const [password, setpassword] = useState("");
  const handleAddAdmin = async (e) => {
    e.preventDefault();
    if(firstname.trim()===''||lastname.trim()===''||adminemail.trim()===''||password.trim()===''){
        toastService.error('All fields must be filled')
        return
    }
    const requestbody = {
      fname: firstname,
      lname: lastname,
      email: adminemail,
      password: password,
    };
    const response = await addAdmin(requestbody);
    if(!response.error){
        toastService.success(`${firstname} Added Successfully`)
        fetchusers()
        handleclose()
    }else(
        toastService.warn('Something went Wrong')
    )
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
              <small>Add Admin</small>
            </div>
            <Form role="form" onSubmit={(e) => handleAddAdmin(e)}>
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
              <FormGroup className="mb-3">
                <label>Admin Email</label>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Admin Email"
                    type="email"
                    value={adminemail}
                    onChange={(e) => setadminemail(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mb-3">
                <label>Password</label>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
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

export default AddAdminModal;
