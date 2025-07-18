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

const ConfirmModal = ({ handleclose, handleaction }) => {
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
                Are You Sure
              </span>
            </div>
              <div className="text-center">
                <Button className="my-4" color="danger" onClick={handleaction}>
                  Yes
                </Button>
                <Button className="my-4" color="danger" onClick={handleclose}>
                  No
                </Button>
              </div>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default ConfirmModal;
