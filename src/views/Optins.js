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
// reactstrap components
import Header from "components/Headers/Header";
import Loader from "Loader/Loader";
import { useEffect, useState } from "react";
import "./Modals/enhancements.css";
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Button,
  Form,
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  FormGroup,
} from "reactstrap";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { getAllGIESNames } from "Api/gei";
import { getAllAgenciesNamesByGie } from "Api/agency";
import AddTeamModal from "./Modals/AddTeamModal";
import ConfirmModal from "./Modals/ConfirmModals";
import { getAllUserNames } from "Api/Users";
import LinkAgencyModal from "./Modals/LinkAgencyModal";
import { getAllFilteredOptins } from "Api/optins";
import { format } from "date-fns";
import moment from "moment";
// core components

const Optins = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { page, gieId, agencyId, userid } = useParams();
  const [isloading, setisloading] = useState(true);
  const [selectedAgency, setSelectedAgency] = useState("");
  const [isfetchingag, setisfetchingag] = useState(false);
  const [selectedGEI, setSelectedGEI] = useState("");
  const [allAgencies, setAllAgencies] = useState([]);
  const [allGEI, setAllGEI] = useState([]);
  const [allOptins, setAllOptins] = useState([]);
  const [currentpage, setcurrentpage] = useState(Number(page));
  const [totalpages, settotalpages] = useState(0);
  const [totalitems, settotalitems] = useState(0);
  const [listitems, setlistitems] = useState([]);
  const [listitemstoshow, setlistitemstoshow] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isfetching, setisfetching] = useState(true);
  
  const handleprev = () => {
    if (currentpage > 1) {
      const prev = currentpage - 1;
      const issearched = window.location.pathname.includes("searched");
      if (issearched && userid) {
        navigate(`/prospects/searched/${userid}/${prev}`);
      } else {
        if (agencyId !== "null") {
          navigate(`/prospects/${gieId}/${agencyId}/${prev}`);
        }
        if (agencyId === "null") {
          navigate(`/prospects/${gieId}/null/${prev}`);
        }
        if (!gieId && !agencyId) {
          navigate(`/prospects/${prev}`);
        }
      }
    }
  };
  const handlenext = () => {
    if (currentpage < totalpages) {
      const next = currentpage + 1;
      const issearched = window.location.pathname.includes("searched");
      if (issearched && userid) {
        navigate(`/prospects/searched/${userid}/${next}`);
      } else {
        if (agencyId !== "null") {
          navigate(`/prospects/${gieId}/${agencyId}/${next}`);
        }
        if (agencyId === "null") {
          navigate(`/prospects/${gieId}/null/${next}`);
        }
        if (!gieId && !agencyId) {
          navigate(`/prospects/${next}`);
        }
      }
    }
  };
  useEffect(() => {
    setcurrentpage(Number(page));
  }, [page]);
  const handlegetalloptins = async () => {
    setisloading(true);
    let optins = [];
    const gei = await getAllGIESNames();
    const issearched = window.location.pathname.includes("searched");
    if (userid && issearched) {
      optins = await getAllFilteredOptins(page, "null", "null", userid);
    }
    if (gieId && agencyId === "null" && !issearched) {
      optins = await getAllFilteredOptins(page, gieId, "null", "null");
    }
    if (agencyId && agencyId !== "null" && !issearched) {
      optins = await getAllFilteredOptins(page, "null", agencyId, "null");
    }
    if (!gieId && !agencyId && !issearched) {
      optins = await getAllFilteredOptins(page, "null", "null", "null");
    }
    if (!gei.error && !optins.error) {
      setAllGEI(gei.data);
      setAllOptins(optins.data.results)
      settotalitems(Number(optins.data.total));
      settotalpages(Math.ceil(optins.data.total / 20));
      setisloading(false);
    }
  };
  const handlegetlistitems = async () => {
    setisfetching(true);
    const items = await getAllUserNames();
    if (!items.error) {
      setlistitems(items.data);
      setlistitemstoshow(items.data);
      setisfetching(false);
    }
  };
  useEffect(() => {
    if (
      window.location.pathname.includes("prospects") &&
      !window.location.pathname.includes("users")
    ) {
      handlegetalloptins();
      handlegetlistitems();
      if (gieId) {
        setSelectedGEI(gieId);
      }
      if (agencyId && agencyId !== "null") {
        setSelectedAgency(agencyId);
      }
    }
  }, [location]);
  const handlefilterbyids = () => {
    if (selectedAgency === "") {
      navigate(`/prospects/${selectedGEI}/null/1`);
    } else {
      navigate(`/prospects/${selectedGEI}/${selectedAgency}/1`);
    }
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
  const handlesuggestionclick = (id) => {
    navigate(`/prospects/searched/${id}/1`);
    setSearchText("");
  };
  useEffect(() => {
    setlistitemstoshow(
      listitems.filter((item) =>
        item.fname.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText]);
  useEffect(() => {
    console.log("these are all optins ", allOptins);
  }, [allOptins]);
  const getHouseTimestamp = (createdAt) => {
    return new Date(createdAt).getTime(); // or .valueOf()
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
              <Form
                style={{
                  display: "flex",
                  justifyContent: "end",
                  margin: "10px",
                  marginBottom: "-20px",
                }}
              >
                <FormGroup className="mb-3" style={{ width: "40%" }}>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fas fa-search" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      disabled={isfetching}
                      placeholder="Search by user"
                      type="text"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                  </InputGroup>
                  {searchText.trim() !== "" && (
                    <div
                      style={{
                        backgroundColor: "white",
                        position: "absolute",
                        top: "60px",
                        right: "0",
                        width: "40%",
                        maxHeight: "40vw",
                        overflowY: "scroll",
                        zIndex: 19,
                      }}
                    >
                      {listitemstoshow.map((item, index) => {
                        return (
                          <div
                            onClick={() => handlesuggestionclick(item._id)}
                            style={{
                              padding: "10px",
                              textAlign: "left",
                              cursor: "pointer",
                            }}
                            key={index}
                          >
                            {item.fname}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </FormGroup>
              </Form>
              <CardHeader
                className="border-0"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                <h3 className="mb-0">Propects</h3>
                <Form
                  role="form"
                  style={{
                    display: "flex",
                    maxHeight: "50px",
                    width: "85%",
                    alignItems: "center",
                    gap: "20px",
                  }}
                  onSubmit={(e) => e.preventDefault()}
                >
                  <InputGroup
                    className="input-group-alternative"
                    style={{ width: "25%" }}
                  >
                    <Input
                      type="select"
                      value={selectedGEI}
                      onChange={(e) => setSelectedGEI(e.target.value)}
                    >
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
                    style={{ width: "25%" }}
                  >
                    <Input
                      type="select"
                      value={selectedAgency}
                      onChange={(e) => setSelectedAgency(e.target.value)}
                      disabled={selectedGEI.trim() === "" || isfetchingag}
                    >
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
                      disabled={selectedGEI.trim() === ""}
                    >
                      Filter
                    </Button>
                  </div>
                  <div className="text-center">
                    <Button
                      onClick={() => {
                        navigate("/prospects/1");
                        setSelectedAgency("");
                        setSelectedGEI("");
                      }}
                      className="my-4"
                      color="danger"
                      disabled={!gieId && !agencyId && !window.location.pathname.includes("searched")}
                    >
                      Clear Filter
                    </Button>
                  </div>
                </Form>
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
                      <th scope="col">Client</th>
                      <th scope="col">User</th>
                      <th scope="col">House</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allOptins.map((optin, index) => {
                        const currentDate = moment(optin.createdAt);
                        const formattedDate = currentDate.format("DD MMM, YYYY");
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>
                            {optin.name} (
                            <a
                              href={`tel:${
                                optin.phone
                              }`}>
                              {optin.phone}
                            </a>
                            )
                            </td>
                          <td>
                            {optin?.user?.fname} (
                            <a
                              href={`tel:${
                                optin?.user?.country_Code +
                                optin?.user?.mobile_no
                              }`}>
                              {optin?.user?.country_Code +
                                optin?.user?.mobile_no}
                            </a>
                            )
                          </td>
                          <td>
                            <Button
                              color="danger"
                              tag="a"
                              href={`https://web.video-immo.com/v/${getHouseTimestamp(
                                optin.house.createdAt
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer">
                              Visit
                            </Button>
                          </td>
                          <td>{formattedDate}</td>
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
    </>
  );
};

export default Optins;
