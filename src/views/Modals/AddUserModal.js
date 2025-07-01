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

const AddUserModal = ({ handleclose,fetchusers}) => {
  const [fullname,setfullname]=useState("")
  const [contact,setcontact]=useState("")
  const [useremail,setuseremail]= useState("")
  const [usertype,setusertype] = useState("")
  const handleAddUser = async(e)=>{
    e.preventDefault()
    if(fullname.trim()===''||contact.trim()===''||useremail.trim()===''||usertype.trim()===''){
        toastService.warn('All fields must be filled')
        return
    }
    const requestbody = {
         image: '',
        fname: fullname,
        lname:'',
        country_Code: '+33',
        email: useremail,
        mobile_no: contact,
        type: usertype,
    }
    const response = await addUser(requestbody)
    if(!response.error){
        toastService.success(`${fullname} Added Successfully`)
        handleclose()
        fetchusers()
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
              <small>Add User</small>
            </div>
            <Form role="form" onSubmit={(e) => handleAddUser(e)}>
              <FormGroup className="mb-3">
                <label>Full Name</label>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="First name"
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
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="User Contact"
                    type="text"
                    value={contact}
                    onChange={(e) => setcontact(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mb-3">
                <label>User Type</label>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="First name"
                    type="select"
                    value={usertype}
                    onChange={(e) => setusertype(e.target.value)}
                  >
                    <option value=''>Select</option>
                    <option value='user'>User</option>
                    <option value='manager'>Manager</option>
                  </Input>
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

export default AddUserModal;
