import { format } from "date-fns";
import React from "react";
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
} from "reactstrap";

const NotificationViewModel = ({ handleclose, notification }) => {
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
                    value={notification.title}
                    readOnly={true}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mb-3">
                <label>Created At</label>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Date"
                    type="date"
                    value={format(notification.createdAt,"yyyy-MM-dd")}
                    readOnly={true}
                  />
                </InputGroup>
              </FormGroup>
              <div style={{display:"grid", gridTemplateColumns:"repeat(3, minmax(0, 1fr))",gap:"10px"}}>
              <FormGroup className="mb-3">
                <label>Total Users</label>
                <InputGroup className="input-group-alternative">
                  <Input
                    type="number"
                    value={notification.total}
                    readOnly={true}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mb-3">
                <label>Notified</label>
                <InputGroup className="input-group-alternative">
                  <Input
                    type="number"
                    value={notification.successCount}
                    readOnly={true}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mb-3">
                <label>Unnotified</label>
                <InputGroup className="input-group-alternative">
                  <Input
                    type="number"
                    value={notification.failureCount}
                    readOnly={true}
                  />
                </InputGroup>
              </FormGroup>
              </div>
              <FormGroup className="mb-3">
                <label>Message</label>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Message"
                    type="textarea"
                    style={{minHeight:'150px'}}
                    value={notification.body}
                    readOnly={true}
                  />
                </InputGroup>
              </FormGroup>
              </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default NotificationViewModel;
