import { updateAdminName } from "Api/Admins";
import { getAllAgenciesNamesByGie } from "Api/agency";
import { getAllGIESNames } from "Api/gei";
import { updateTeamName } from "Api/teams";
import { addUser } from "Api/Users";
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

const NotificationModel = ({ handleclose, handleaction , setTitle,title,setMessage,message,recievers }) => {
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
                Notification
              </span>
            </div>
            <Form role="form" onSubmit={(e)=>{
                e.preventDefault()
                }}>
            <FormGroup className="mb-3">
                <label>Title</label>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mb-3">
                <label>Message</label>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Message"
                    type="textarea"
                    style={{minHeight:'150px'}}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              </Form>
              <div className="text-center">
                <Button className="my-4" disabled={message.trim()===""||title.trim()===""||recievers.length===0} color="danger" onClick={handleaction}>
                  Send
                </Button>
                <Button className="my-4" color="danger" onClick={handleclose}>
                  Cancel
                </Button>
              </div>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default NotificationModel;
