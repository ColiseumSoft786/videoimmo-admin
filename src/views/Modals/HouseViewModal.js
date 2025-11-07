import { updateAdminName } from "Api/Admins";
import { QRCodeSVG } from "qrcode.react";
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

const HouseViewModal = ({ handleclose, houseDetails }) => {
  console.log("in modal", houseDetails);
  const handleclosemodal = (e) => {
    e.preventDefault();
    handleclose();
  };
  const getHouseTimestamp = (createdAt) => {
    return new Date(createdAt).getTime(); // or .valueOf()
  };
  return (
    <>
      <Col lg="7" md="7">
        <Card className="bg-secondary shadow border-0">
          <span
            style={{
              fontSize: "30px",
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",
            }}
            onClick={handleclose}
          >
            &times;
          </span>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <span style={{fontSize:'20px',fontWeight:'bold'}}>Details</span>
            </div>
            <Form
              role="form"
              style={{ display: "flex", gap: "5%" }}
              onSubmit={(e) => handleclosemodal(e)}
            >
              <div style={{ width: "30%" }}>
                <FormGroup className="mb-3">
                  <label>User Mobile no.</label>
                  <InputGroup className="input-group-alternative">
                    <Input
                      type="text"
                      value={houseDetails.user.country_Code+'-'+houseDetails.user.mobile_no}
                      readOnly
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-3">
                  <label>Type</label>
                  <InputGroup className="input-group-alternative">
                    <Input type="text" value={houseDetails.type} readOnly />
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-3">
                  <label>House Type</label>
                  <InputGroup className="input-group-alternative">
                    <Input
                      type="text"
                      value={houseDetails.houseType}
                      readOnly
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-3">
                  <label>Status</label>
                  <InputGroup className="input-group-alternative">
                    <Input type="text" value={houseDetails.status} readOnly />
                  </InputGroup>
                </FormGroup>
              </div>
              <div style={{ width: "30%" }}>
                <FormGroup className="mb-3">
                  <label>Views</label>
                  <InputGroup className="input-group-alternative">
                    <Input type="text" value={houseDetails.views} readOnly />
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-3">
                  <label>Size</label>
                  <InputGroup className="input-group-alternative">
                    <Input
                      placeholder="Last name"
                      type="text"
                      value={houseDetails.size}
                      readOnly
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-3">
                  <label>Second Size</label>
                  <InputGroup className="input-group-alternative">
                    <Input
                      type="text"
                      value={houseDetails.sizeSecond}
                      readOnly
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-3">
                  <label>Rooms</label>
                  <InputGroup className="input-group-alternative">
                    <Input
                      type="text"
                      value={parseInt(houseDetails.rooms)}
                      readOnly
                    />
                  </InputGroup>
                </FormGroup>
              </div>
              <div
                style={{
                  width: "35%",
                  display: "grid",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  gap:'10px'
                }}
              >
                <QRCodeSVG
                  value={`https://web.video-immo.com/v/${getHouseTimestamp(
                    houseDetails.createdAt
                  )}`}
                  size={200}
                />
                <div style={{ margin: "auto" }}>Scan To View House</div>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default HouseViewModal;
