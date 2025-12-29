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
import { deleteHouseById } from "Api/Houses";
import { getAllHouses } from "Api/Houses";
import { getUserHouses } from "Api/Users";
import Header from "components/Headers/Header";
import Loader from "Loader/Loader";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Button,
  Form,
  InputGroup,
  Input,
} from "reactstrap";
import toastService from "Toaster/toaster";
import HouseViewModal from "./Modals/HouseViewModal";
import "./Modals/enhancements.css";
import { getAllGIESNames } from "Api/gei";
import { getAllAgenciesNamesByGie } from "Api/agency";
import { getHousesByGie } from "Api/Houses";
import { getHouseByAgencies } from "Api/Houses";
import { getUserHousesLength } from "Api/Houses";
import { getGieHousesLength } from "Api/Houses";
import { getAgencyHousesLength } from "Api/Houses";
import { getHouseslength } from "Api/dashboard";
import ConfirmModal from "./Modals/ConfirmModals";
import moment from "moment";

// core components
const Houses = () => {
  const navigate = useNavigate();
  const [houses, setHouses] = useState([]);
  const [isloading, setisloading] = useState(true);
  const { userid, username, page, gieId, agencyId } = useParams();
  const [isviewing, setisviewing] = useState(false);
  const [housetoview, sethousetoview] = useState(null);
  const location = useLocation();
  const [selectedAgency, setSelectedAgency] = useState("");
  const [isfetchingag, setisfetchingag] = useState(false);
  const [selectedGEI, setSelectedGEI] = useState("");
  const [allAgencies, setAllAgencies] = useState([]);
  const [allGEI, setAllGEI] = useState([]);
  const [currentpage, setcurrentpage] = useState(Number(page));
  const [totalpages, settotalpages] = useState(0);
  const [totalitems, settotalitems] = useState(0);
  const [isconfirm, setisconfirm] = useState(false);
  const [deleteid, setdeleteid] = useState("");
  const baseUrl = process.env.REACT_APP_ENDPOINT;
  const getpages = async () => {
    let pages = null;
    if (userid) {
      pages = await getUserHousesLength(userid);
    } else {
      if (gieId && agencyId === "null") {
        pages = await getGieHousesLength(gieId);
      }
      if (agencyId && agencyId !== "null") {
        pages = await getAgencyHousesLength(agencyId);
      }
      if (!agencyId && !gieId) {
        pages = await getHouseslength();
      }
    }
    if (!pages.error) {
      settotalitems(Number(pages.data));
      settotalpages(Math.ceil(pages.data / 20));
    } else {
      settotalitems(0);
      settotalpages(1);
    }
  };
  const handleprev = () => {
    if (currentpage > 1) {
      const prev = currentpage - 1;
      if (userid) {
        navigate(`/houses/${userid}/${username}/${prev}`);
      } else {
        if (agencyId !== "null") {
          navigate(`/houses/filtered/${gieId}/${agencyId}/${prev}`);
        }
        if (agencyId === "null") {
          navigate(`/houses/filtered/${gieId}/null/${prev}`);
        }
        if (!gieId && !agencyId) {
          navigate(`/houses/${prev}`);
        }
      }
    }
  };
  const handlenext = () => {
    if (currentpage < totalpages) {
      const next = currentpage + 1;
      if (userid) {
        navigate(`/houses/${userid}/${username}/${next}`);
      } else {
        if (agencyId !== "null") {
          navigate(`/houses/filtered/${gieId}/${agencyId}/${next}`);
        }
        if (agencyId === "null") {
          navigate(`/houses/filtered/${gieId}/null/${next}`);
        }
        if (!gieId && !agencyId) {
          navigate(`/houses/${next}`);
        }
      }
    }
  };
  useEffect(() => {
    setcurrentpage(Number(page));
  }, [page]);
  console.log(userid);
  const getHouseTimestamp = (createdAt) => {
    return new Date(createdAt).getTime(); // or .valueOf()
  };
  const handlegetAgenciesnames = async () => {
    setisfetchingag(true);
    const response = await getAllAgenciesNamesByGie(selectedGEI);
    if (!response.error) {
      setAllAgencies(response.data);
      setisfetchingag(false);
    }
  };
  useEffect(() => {
    if (selectedGEI !== "") {
      handlegetAgenciesnames();
    }
    if (selectedGEI === "") {
      setAllAgencies([]);
    }
  }, [selectedGEI]);
  const handlegetallHouses = async () => {
    let response = null;
    const gie = await getAllGIESNames();
    if (!gie.error) {
      setAllGEI(gie.data);
    }
    setisloading(true);
    try {
      if (userid) {
        response = await getUserHouses(userid, page);
      } else {
        if (gieId && agencyId === "null") {
          response = await getHousesByGie(gieId, page);
        }
        if (agencyId && agencyId !== "null") {
          response = await getHouseByAgencies(agencyId, page);
        }
        if (!agencyId && !gieId) {
          response = await getAllHouses(page);
        }
      }
      if (!response.error) {
        setHouses(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setisloading(false); // ✅ move this outside the if block
    }
  };
  useEffect(() => {
    if (window.location.pathname.includes("houses")) {
      handlegetallHouses();
      getpages();
      if (gieId) {
        setSelectedGEI(gieId);
      }
      if (agencyId && agencyId !== "null") {
        setSelectedAgency(agencyId);
      }
    }
  }, [location]);
  useEffect(() => {
    console.log("all houses", houses);
  }, [houses]);
  const handleDeleteHouse = async (id) => {
    const response = await deleteHouseById(id);
    if (!response.error) {
      toastService.success("House Deleted Successfully");
      handlegetallHouses();
      setisconfirm(false);
    } else {
      toastService.warn("Something Went Wrong");
    }
  };
  const handleDeleteClick = (id) => {
    setdeleteid(id);
    setisconfirm(true);
  };
  const handleViewClick = (house) => {
    console.log("going to view ", house);
    sethousetoview(house);
    setisviewing(true);
  };
  const handlefilterbyids = () => {
    if (selectedAgency === "") {
      navigate(`/houses/filtered/${selectedGEI}/null/1`);
    } else {
      navigate(`/houses/filtered/${selectedGEI}/${selectedAgency}/1`);
    }
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
                }}>
                <h3 className="mb-0">
                  {username ? `Houses of ${username}` : "Houses"}
                </h3>
                {!username && (
                  <Form
                    role="form"
                    style={{
                      display: "flex",
                      maxHeight: "50px",
                      width: "73%",
                      alignItems: "center",
                      gap: "20px",
                    }}
                    onSubmit={(e) => e.preventDefault()}>
                    <InputGroup
                      className="input-group-alternative"
                      style={{ width: "31%" }}>
                      <Input
                        type="select"
                        value={selectedGEI}
                        onChange={(e) => setSelectedGEI(e.target.value)}>
                        <option value="">Select GIE</option>
                        {allGEI.map((gei, index) => {
                          return (
                            <option value={gei._id} key={index}>
                              {gei.name}
                            </option>
                          );
                        })}
                      </Input>
                    </InputGroup>
                    <InputGroup
                      className="input-group-alternative"
                      style={{ width: "31%" }}>
                      <Input
                        type="select"
                        value={selectedAgency}
                        onChange={(e) => setSelectedAgency(e.target.value)}
                        disabled={selectedGEI.trim() === "" || isfetchingag}>
                        {selectedGEI.trim() === "" && (
                          <option value="">Select GIE First</option>
                        )}
                        {isfetchingag && <option value="">Fetching...</option>}
                        {selectedGEI.trim() !== "" && !isfetchingag && (
                          <option value="">Select Agency</option>
                        )}
                        {allAgencies.map((agency, index) => {
                          return (
                            <option value={agency._id} key={index}>
                              {agency.name}
                            </option>
                          );
                        })}
                      </Input>
                    </InputGroup>
                    <div className="text-center">
                      <Button
                        onClick={handlefilterbyids}
                        className="my-4"
                        color="danger"
                        disabled={selectedGEI.trim() === ""}>
                        Filter
                      </Button>
                    </div>
                    <div className="text-center">
                      <Button
                        onClick={() => {
                          navigate("/houses/1");
                          setSelectedAgency("");
                          setSelectedGEI("");
                        }}
                        className="my-4"
                        color="danger"
                        disabled={!gieId && !agencyId}>
                        Clear Filter
                      </Button>
                    </div>
                  </Form>
                )}
              </CardHeader>
              {isloading ? (
                <div
                  style={{
                    height: "250px",
                    width: "100%",
                    marginTop: "20vh",
                    display: "flex",
                    justifyContent: "center",
                  }}>
                  <Loader />
                </div>
              ) : (
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Sr.#</th>
                      <th scope="col">Thumbnail</th>
                      <th scope="col">Type</th>
                      <th scope="col">House Type</th>
                      <th scope="col">User</th>
                      <th scope="col">View House</th>
                      <th scope="col">Creation Date</th>
                      <th scope="col">Status</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {houses?.map((house, index) => {
                      const currentDate = moment(house.createdAt);
                      const formattedDate = currentDate.format("DD MMM, YYYY");
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>
                            <div
                              style={{
                                height: "60px",
                                width: "60px",
                                overflow: "hidden",
                                alignItems: "center",
                                alignContent: "center",
                              }}>
                              {house.thumbnail !== "" && (
                                <img
                                  style={{
                                    maxHeight: "100%",
                                    maxWidth: "100%",
                                  }}
                                  src={`${baseUrl}${house.thumbnail}`}
                                />
                              )}
                            </div>
                          </td>
                          <td>{house.type}</td>
                          <td>{house.houseType}</td>
                          <td>
                            {house?.user?.fname} (
                            <a
                              href={`tel:${
                                house?.user?.country_Code +
                                house?.user?.mobile_no
                              }`}>
                              {house?.user?.country_Code +
                                house?.user?.mobile_no}
                            </a>
                            )
                          </td>
                          <td>
                            <Button
                              color="danger"
                              tag="a"
                              href={`https://web.video-immo.com/v/${getHouseTimestamp(
                                house.createdAt
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer">
                              Visit
                            </Button>
                          </td>
                          <td>{formattedDate}</td>
                          <td className="text-center">
                            <i
                              style={{
                                fontSize: house.status === 1 ? "20px" : "",
                              }}
                              className={`${
                                house.status === 1
                                  ? "ni ni-check-bold text-green"
                                  : "ni ni-fat-remove text-red"
                              }`}
                            />
                          </td>
                          <td className="text-right">
                            <UncontrolledDropdown>
                              <DropdownToggle
                                className="btn-icon-only text-light"
                                href="#pablo"
                                role="button"
                                size="sm"
                                color="danger"
                                onClick={(e) => e.preventDefault()}>
                                <i className="fas fa-ellipsis-v" />
                              </DropdownToggle>
                              <DropdownMenu
                                className="dropdown-menu-arrow "
                                right>
                                <DropdownItem
                                  onClick={() => handleViewClick(house)}>
                                  View
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() => handleDeleteClick(house._id)}>
                                  Delete
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
                }}>
                <div>
                  <Button
                    color="danger"
                    onClick={handleprev}
                    disabled={currentpage === 1}>
                    Prev
                  </Button>
                  <Button color="danger">{currentpage}</Button>
                  <Button
                    color="danger"
                    onClick={handlenext}
                    disabled={currentpage === totalpages}>
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Row>
      </Container>
      {(isviewing || isconfirm) && (
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
            paddingTop: isconfirm ? "15%" : "10vh",
            zIndex: 20,
          }}>
          {isviewing && (
            <HouseViewModal
              handleclose={() => setisviewing(false)}
              houseDetails={housetoview}
            />
          )}
          {isconfirm && (
            <ConfirmModal
              handleclose={() => setisconfirm(false)}
              handleaction={() => handleDeleteHouse(deleteid)}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Houses;
