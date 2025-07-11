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

const EditTeamNameModal = ({ handleclose, teamtoEdit, fetchteam }) => {
  const [fullname, setfullname] = useState(teamtoEdit.name);
  const handleUpdateTeamName = async (e) => {
    e.preventDefault();
    const requestbody = {
      name: fullname,
      managerId: teamtoEdit.managerId,
      status: teamtoEdit.status,
    };
    const response = await updateTeamName(requestbody, teamtoEdit._id);
    if (!response.error) {
      toastService.success("Name Updated Successfully");
      handleclose();
      fetchteam();
    }
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
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                Edit Name
              </span>
            </div>
            <Form role="form" onSubmit={(e) => handleUpdateTeamName(e)}>
              <FormGroup className="mb-3">
                <label>Name</label>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Team name"
                    type="text"
                    value={fullname}
                    onChange={(e) => setfullname(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="my-4" color="danger" type="submit">
                  Update
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default EditTeamNameModal;
