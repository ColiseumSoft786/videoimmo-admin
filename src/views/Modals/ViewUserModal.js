import { updateAdminName } from "Api/Admins";
import { getUserSubscription } from "Api/Users";
import { getUserCards } from "Api/Users";
import { getUserInvoices } from "Api/Users";
import Loader from "Loader/Loader";
import React, { useEffect, useState } from "react";
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
  Table,
} from "reactstrap";
import toastService from "Toaster/toaster";

const ViewUserModal = ({ handleclose, userdetails }) => {
  const [invoices, setInvoices] = useState([]);
  const [cards, setCards] = useState([]);
  const [isGetting, setIsGetting] = useState(true);
  const handleGetStripeData = async () => {
    try {
      setIsGetting(true);
      if (!userdetails.customerId || userdetails.customerId === "") {
        setIsGetting(false);
        return;
      }
      const [invoiceData, cardsData] = await Promise.all([
        getUserInvoices(userdetails.customerId),
        getUserCards(userdetails.customerId),
      ]);
      if(!invoiceData.error){
        setInvoices(invoiceData.data.invoices);
      }
      if(!cardsData.error){
        setCards(cardsData.data.data);
      }
    } catch (error) {
      console.error("error in get get stripe data", error);
    } finally {
      setIsGetting(false);
    }
  };
  console.log("in modal", userdetails);
  const handleclosemodal = (e) => {
    e.preventDefault();
    handleclose();
  };
  const baseUrl = process.env.REACT_APP_ENDPOINT;
  useEffect(()=>{
    if(userdetails){
      handleGetStripeData()
    }
  },[userdetails, ])
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
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                Details
              </span>
            </div>
            <Form
              role="form"
              style={{ display: "flex", gap: "5%" }}
              onSubmit={(e) => handleclosemodal(e)}
            >
              <div style={{ width: "60%" }}>
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
                  <label>GIE</label>
                  <InputGroup className="input-group-alternative">
                    <Input
                      placeholder="GIE name"
                      type="text"
                      value={userdetails.gie?.name}
                      readOnly
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-3">
                  <label>Agency</label>
                  <InputGroup className="input-group-alternative">
                    <Input
                      placeholder="Agency name"
                      type="text"
                      value={userdetails.agency?.name}
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
                }}
              >
                <div>
                  {userdetails.image === "" ? (
                    <i
                      style={{ fontSize: "15vw" }}
                      className="ni ni-circle-08"
                    ></i>
                  ) : (
                    <div
                      style={{
                        height: "15vw",
                        width: "15vw",
                        borderRadius: "50%",
                        overflow: "hidden",
                        alignItems: "center",
                        alignContent: "center",
                      }}
                    >
                      <img
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                        }}
                        src={`${baseUrl}${userdetails.image}`}
                      />
                    </div>
                  )}
                </div>
                <div style={{ margin: "auto" }}>{userdetails.fname}</div>
              </div>
            </Form>
            <FormGroup className="mb-3" style={{width:"100%",overflowX:"scroll"}}>
                <label>Invoices</label>
                <Table className="align-items-center table-flush" responsive>
                {isGetting ? (
                      <div
                      style={{
                        height: "100px",
                        width: "100%",
                        marginTop: "2vh",
                        display: "flex",
                        justifyContent: "center",
                        position:"relative"
                      }}
                    >
                      <Loader />
                    </div>
                    ):<>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Account country</th>
                      <th scope="col">Currency</th>
                      <th scope="col">Account name</th>
                      <th scope="col">Amount due</th>
                      <th scope="col">Amount paid</th>
                      <th scope="col">Due date</th>
                      <th scope="col">Subtotal</th>
                      <th scope="col"> Subtotal (excluding tax)</th>
                      <th scope="col">Total</th>
                      <th scope="col">Total (excluding tax)</th>
                    </tr>
                  </thead>
                  {invoices.length>0&&<tbody style={{position:"relative"}}>
                        {invoices.map((inv, index) => {
                          return (
                            <tr key={index}>
                              <td>{inv.account_country}</td>
                              <td>{inv.currency}</td>
                              <td>{inv.account_name}</td>
                              <td>{inv.amount_due}</td>
                              <td>{inv.amount_paid}</td>
                              <td>{inv.due_date}</td>
                              <td>{inv.subtotal}</td>
                              <td>{inv.subtotal_excluding_tax}</td>
                              <td>{inv.total}</td>
                              <td>{inv.total_excluding_tax}</td>
                            </tr>
                          );
                        })}
                  </tbody>}
                  </>}
                </Table>
                {invoices.length===0&&!isGetting&&(
                    <div style={{width:"100%",display:"flex",justifyContent:"center"}}>No data to show</div>
                  )}
              </FormGroup>
              <FormGroup className="mb-3" style={{width:"100%",overflowX:"scroll"}}>
                <label>Cards</label>
                <Table className="align-items-center table-flush" responsive>
                {isGetting ? (
                      <div
                      style={{
                        height: "100px",
                        width: "100%",
                        marginTop: "2vh",
                        display: "flex",
                        justifyContent: "center",
                        position:"relative"
                      }}
                    >
                      <Loader />
                    </div>
                    ):<>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Brand</th>
                      <th scope="col">Country</th>
                      <th scope="col">Exp month</th>
                      <th scope="col">Exp year</th>
                      <th scope="col">Funding</th>
                      <th scope="col">Card no.</th>
                    </tr>
                  </thead>
                  {cards.length>0&&<tbody style={{position:"relative"}}>
                        {cards.map((c, index) => {
                          return (
                            <tr key={index}>
                              <td>{c.card.brand}</td>
                              <td>{c.card.country}</td>
                              <td>{c.card.exp_month}</td>
                              <td>{c.card.exp_yea}</td>
                              <td>{c.card.last4}</td>
                            </tr>
                          );
                        })}
                  </tbody>}
                  </>}
                </Table>
                {invoices.length===0&&!isGetting&&(
                    <div style={{width:"100%",display:"flex",justifyContent:"center"}}>No data to show</div>
                  )}
              </FormGroup>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default ViewUserModal;
