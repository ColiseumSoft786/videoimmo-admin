import { updateAdminName } from "Api/Admins";
import { getGieTokenTransactions } from "Api/gei";
import { updateUserInfo } from "Api/Users";
import Loader from "Loader/Loader";
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
  Table,
} from "reactstrap";
import toastService from "Toaster/toaster";

const GieHistoryModal = ({ handleclose, Gie }) => {
  const [allTransactions, setAllTransactions] = useState([]);
  const [isloading, setisloading] = useState(true);
  const handleGetTransactions = async () => {
    setisloading(true);
    const response = await getGieTokenTransactions(Gie._id);
    if (!response.error) {
      setAllTransactions(response.data);
      setisloading(false);
    }
  };
  useEffect(() => {
    handleGetTransactions();
  }, []);
  return (
    <>
      <Col lg="7" md="7">
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
          <CardBody 
          style={{
                  maxHeight: "70vh",
                  overflowy: "auto",
                }}
          className="px-5 py-lg-5"
          >
            <div className="text-center text-muted mb-4">
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                GIE History
              </span>
            </div>
            {isloading ? (
              <div
                style={{
                  height: "250px",
                  width: "100%",
                  marginTop: "20vh",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Loader />
              </div>
            ) : (
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Sr.#</th>
                      <th scope="col">Agency</th>
                      <th scope="col">Created At</th>
                      <th scope="col">Tokens Used</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allTransactions.map((transaction, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{transaction.agency.name}</td>
                          <td>{transaction.createdAt}</td>
                          <td>-1</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
            )}
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default GieHistoryModal;
