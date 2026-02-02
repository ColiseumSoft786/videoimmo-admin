/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Header from "components/Headers/Header";
import Loader from "Loader/Loader";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Table,
  Container,
  Row,
  Button,
} from "reactstrap";
import "./Modals/enhancements.css";
import { getAllNotifications } from "Api/Admins";
import { format } from "date-fns";
import NotificationViewModel from "./Modals/NotificationViewModel";

// core components
const NotificationTable = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [isloading, setisloading] = useState(true);
  const { page } = useParams();
  const [notiToView, setNotiToView] = useState(null);
  const location = useLocation();
  const [currentpage, setcurrentpage] = useState(Number(page));
  const [totalpages, settotalpages] = useState(0);
  const [totalitems, settotalitems] = useState(0);
  const baseUrl = process.env.REACT_APP_ENDPOINT;
  const handleprev = () => {
    if (currentpage > 1) {
      const prev = currentpage - 1;
      navigate(`/notifications/${prev}`);
    }
  };
  const handlenext = () => {
    if (currentpage < totalpages) {
      const next = currentpage + 1;
      navigate(`/notifications/${next}`);
    }
  };
  useEffect(() => {
    setcurrentpage(Number(page));
  }, [page]);
  const handlegetallNotifications = async () => {
    try {
      setisloading(true);
      const response = await getAllNotifications(page);
      if (!response.error) {
        setNotifications(response.data.notifications);
        settotalitems(Number(response.data.total));
        settotalpages(Math.ceil(response.data.total / 20));
        setisloading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setisloading(false);
    }
  };
  useEffect(() => {
    handlegetallNotifications();
  }, [location]);
  useEffect(() => {
    console.log("all notifications", notifications);
  }, [notifications]);
  const handleViewClick = (house) => {
    console.log("going to view ", house);
    sethousetoview(house);
    setisviewing(true);
  };
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader
                className="border-0"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                <h3 className="mb-0">Notifications</h3>
                <div className="text-center">
                  <Button
                    onClick={() => {
                      navigate("/create/notification");
                    }}
                    className="my-4"
                    color="danger"
                  >
                    Create
                  </Button>
                </div>
              </CardHeader>
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
                      <th scope="col">Title</th>
                      <th scope="col">Total user</th>
                      <th scope="col">Notified user</th>
                      <th scope="col">Unnotified user</th>
                      <th scope="col">Creation Date</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notifications?.map((notification, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{notification.title.length>50?`${notification.title.slice(0,50)}....`:notification.title}</td>
                          <td>{notification.total}</td>
                          <td>{notification.successCount}</td>
                          <td>{notification.failureCount}</td>
                          <td>
                            {format(notification.createdAt, "yyyy-MM-dd")}
                          </td>
                          <td className="text-right">
                            <UncontrolledDropdown>
                              <DropdownToggle
                                className="btn-icon-only text-light"
                                href="#pablo"
                                role="button"
                                size="sm"
                                color="danger"
                                onClick={(e) => e.preventDefault()}
                              >
                                <i className="fas fa-ellipsis-v" />
                              </DropdownToggle>
                              <DropdownMenu
                                className="dropdown-menu-arrow "
                                right
                              >
                                <DropdownItem
                                  onClick={() => setNotiToView(notification)}
                                >
                                  View
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              )}
            </Card>
            {!isloading && totalpages !== 1 && totalitems > 20 && (
              <div
                style={{
                  width: "100%",
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <div>
                  <Button
                    color="danger"
                    onClick={handleprev}
                    disabled={currentpage === 1}
                  >
                    Prev
                  </Button>
                  <Button color="danger">{currentpage}</Button>
                  <Button
                    color="danger"
                    onClick={handlenext}
                    disabled={currentpage === totalpages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Row>
      </Container>
      {notiToView && (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            position: "fixed",
            top: 0,
            left: 0,
            display: "flex",
            justifyContent: "center",
            paddingTop: "10vh",
            zIndex: 20,
          }}
        >
          {notiToView && (
            <NotificationViewModel
              handleclose={() => setNotiToView(null)}
              notification={notiToView}
            />
          )}
        </div>
      )}
    </>
  );
};

export default NotificationTable;
