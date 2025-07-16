import { updateAdminName } from "Api/Admins";
import { updateUserInfo } from "Api/Users";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
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

const EditUserModal = ({ handleclose, usertoedit, fetchUsers }) => {
  console.log(usertoedit);
  const [fullname,setfullname]=useState(usertoedit.fname)
  const [contact,setcontact]=useState(usertoedit.country_Code+usertoedit.mobile_no)
  const [useremail,setuseremail]= useState(usertoedit.email)
  const [countryCode,setCountryCode]=  useState(usertoedit.country_Code)
  const handleUseredit = async(e)=>{
    e.preventDefault()
    if(fullname.trim()===''||contact.trim()==""||useremail.trim()===''){
        toastService.warn('All fields must be filled')
        return
    }
    if(fullname===usertoedit.fname&&contact===usertoedit.mobile_no&&useremail===usertoedit.email){
        toastService.warn("No Changes to save")
        return
    }
    const requestbody = {
        fname: fullname,
          lname: '',
          email: useremail,
          image: usertoedit.image,
          seconds: '',
          type: usertoedit.type,
          mobile_no: contact.slice(countryCode.length-1),
          country_Code: countryCode,
          gie:usertoedit.gie._id,
          agency:usertoedit.agency._id
    }
    const response = await updateUserInfo(usertoedit._id,requestbody)
    if(!response.error){
        toastService.success('User updated successfully')
        fetchUsers()
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
              <span style={{fontSize:'20px',fontWeight:'bold'}}>Edit User</span>
            </div>
            <Form role="form" onSubmit={(e) => handleUseredit(e)}>
              <FormGroup className="mb-3">
                <label>Full Name</label>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Full name"
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
                  <PhoneInput
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

export default EditUserModal;
