import { updateAdminName } from "Api/Admins";
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

const EditUserModal = ({ handleclose, usertoedit }) => {
  console.log(usertoedit);
  const [fullname,setfullname]=useState(usertoedit.fname)
  const [contact,setcontact]=useState(usertoedit.mobile_no)
  const [useremail,setuseremail]= useState(usertoedit.email)
  const [usertype,setusertype] = useState(usertoedit.type)
  const handleUseredit = async(e)=>{
    e.preventDefault()
    if(fullname.trim()===''||contact.trim()==""||useremail.trim()===''){
        toastService.warn('All fields must be filled')
        return
    }
    if(fullname===usertoedit.fname&&contact===usertoedit.mobile_no&&useremail===usertoedit.email&&usertype===usertoedit.type){
        toastService.warn("No Changes to save")
        return
    }
    const requestbody = {
        fname: fullname,
          lname: '',
          email: useremail,
          image: usertoedit.image,
          seconds: '',
          type: usertype,
          mobile_no: contact,
          country_Code: usertoedit.country_Code
    }
    const response = await updateUserInfo(usertoedit._id,requestbody)
    if(!response.error){
        toastService.success('User updated successfully')
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
              <small>Edit User</small>
            </div>
            <Form role="form" onSubmit={(e) => handleUseredit(e)}>
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
                    <option value='user'>User</option>
                    <option value='manager'>Manager</option>
                  </Input>
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
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

export default EditUserModal;
