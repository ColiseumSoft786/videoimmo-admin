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

const ViewUserModal = ({ handleclose, userdetails }) => {
  console.log('in modal',userdetails);
  const handleclosemodal=(e)=>{
    e.preventDefault()
    handleclose()
  }
  return (
    <>
      <Col lg="7" md="7">
        <Card className="bg-secondary shadow border-0">
            <span style={{fontSize:'30px',position:'absolute',top:'10px',right:'10px',cursor:'pointer'}} onClick={handleclose}>&times;</span>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Details</small>
            </div>
            <Form role="form" style={{display:'flex',gap:'5%'}} onSubmit={(e) => handleclosemodal(e)}>
              <div style={{width:'60%'}}>
              <FormGroup className="mb-3">
                <label>Country Code</label>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Last name"
                    type="text"
                    value={userdetails.country_Code}
                    readOnly
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mb-3">
                <label>Mobile #</label>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Last name"
                    type="text"
                    value={userdetails.mobile_no}
                    readOnly
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mb-3">
                <label>Status</label>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Last name"
                    type="text"
                    value={userdetails.status}
                    readOnly
                  />
                </InputGroup>
              </FormGroup>
              </div>
                <div style={{width:"35%",display:'grid',alignContent:'center',alignItems:'center',justifyContent:'center'}}>
                  <div>
                    {userdetails.image === "" ? (
                            <i style={{fontSize:'15vw'}} className="ni ni-circle-08"></i>
                          ) : (
                            <div
                              style={{
                                height: "15vw",
                                width: "15vw",
                                borderRadius: "50%",
                                overflow: "hidden",
                                alignItems:'center',
                                alignContent:"center"
                              }}
                            >
                              <img
                                style={{ height: "100%", width: "100%", }}
                                src={`https://api.videorpi.com/${userdetails.image}`}
                              />
                            </div>
                          )}
                          </div>
                          <div style={{margin:'auto'}}>{userdetails.fname}</div>
                </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default ViewUserModal;
