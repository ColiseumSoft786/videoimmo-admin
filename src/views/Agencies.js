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
import { GetAllAdmins } from "Api/Admins";
import Header from "components/Headers/Header";
import Loader from "Loader/Loader";
import { useEffect, useState } from "react";
import "./Modals/enhancements.css";
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
  FormGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import EditAdminModal from "./Modals/EditAdminModal";
import ViewAdminModal from "./Modals/ViewAdminModal";
import { deleteAdmin } from "Api/Admins";
import toastService from "Toaster/toaster";
import AddAdminModal from "./Modals/AddAdminModal";
import {
  useAsyncError,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddGeiModal from "./Modals/AddGeiModal";
import ViewGeiModal from "./Modals/ViewGeiModal";
import EditGeiModal from "./Modals/EditGeiModal";
import { getAllGEI } from "Api/gei";
import { deleteGEI } from "Api/gei";
import { getallAgencies } from "Api/agency";
import { getGEIAgencies } from "Api/agency";
import { deleteAgency } from "Api/agency";
import ViewAgencyModal from "./Modals/ViewAgencyModal";
import AddAgencyModal from "./Modals/AddAgencyModal";
import EditAgency from "./Modals/EditAgency";
import { getAllGieAgenciesLength } from "Api/agency";
import { getAgenciesLength } from "Api/dashboard";
import { getAllGIESNames } from "Api/gei";
import { getSingleAgency } from "Api/agency";
import ConfirmModal from "./Modals/ConfirmModals";
import { getAllAgenciesNames } from "Api/agency";
// core components

const Agencies = () => {
  const searchtext = useSelector((state) => state.admin.searchText);
  const location = useLocation();
  const { gieId, page, agencyId } = useParams();
  const navigate = useNavigate();
  const [isloading, setisloading] = useState(true);
  const [isviewing, setisviewing] = useState(false);
  const [agencytoshow, setagencytoshow] = useState(null);
  const [allGEIs, setAllGEIs] = useState([]);
  const [allAgencies, setAllAgencies] = useState([]);
  const [selectedGEI, setSelectedGEI] = useState("");
  const [isediting, setisediting] = useState(false);
  const [isadding, setisadding] = useState(false);
  const [isconfirm, setisconfirm] = useState(false);
  const [deleteid, setdeleteid] = useState("");
  const [currentpage, setcurrentpage] = useState(Number(page));
  const [totalpages, settotalpages] = useState(0);
  const [totalitems, settotalitems] = useState(0);
  const [listitems, setlistitems] = useState([]);
  const [listitemstoshow, setlistitemstoshow] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isfetching, setisfetching] = useState(true);
  const getpages = async () => {
    let pages = null;
    if (gieId) {
      pages = await getAllGieAgenciesLength(gieId);
    }
    if (!gieId) {
      pages = await getAgenciesLength();
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
      if (gieId) {
        navigate(`/agencies/${gieId}/${prev}`);
      }
      if (!gieId) {
        navigate(`/agencies/${prev}`);
      }
    }
  };
  const handlenext = () => {
    if (currentpage < totalpages) {
      const next = currentpage + 1;
      if (gieId) {
        navigate(`/agencies/${gieId}/${next}`);
      }
      if (!gieId) {
        navigate(`/agencies/${next}`);
      }
    }
  };
  useEffect(() => {
    setcurrentpage(Number(page));
  }, [page]);
  const handlegetallagencies = async () => {
    setisloading(true);
    const gei = await getAllGIESNames();
    const issearched = window.location.pathname.includes("searched");
    let agencies = [];
    if (!gei.error) {
      setAllGEIs(gei.data);
    }
    if (agencyId && issearched) {
      agencies = await getSingleAgency(agencyId);
    }
    if (gieId && !issearched) {
      agencies = await getGEIAgencies(gieId, page);
    }
    if (!gieId && !issearched) {
      agencies = await getallAgencies(page);
    }

    if (!agencies.error) {
      if (issearched) {
        setAllAgencies([agencies.data]);
      } else {
        setAllAgencies(agencies.data);
      }
      setisloading(false);
    }
  };
  const handlegetlistitems = async () => {
    setisfetching(true);
    const items = await getAllAgenciesNames();
    if (!items.error) {
      setlistitems(items.data);
      setlistitemstoshow(items.data);
      setisfetching(false);
    }
  };
  const handleViewClick = (agency) => {
    console.log("gei to show", agency);
    setagencytoshow(agency);
    setisviewing(true);
  };
  const handledeleteAgency = async (id) => {
    const response = await deleteAgency(id);
    if (!response.error) {
      toastService.success(`Agency Deleted Successfully`);
      handlegetallagencies();
      setisconfirm(false);
    }
  };
  const handledeleteClick = async (id) => {
    setdeleteid(id);
    setisconfirm(true);
  };
  const handlegetGeiAgencies = async () => {
    navigate(`/agencies/${selectedGEI}/1`);
  };
  const handleeditclick = (agency) => {
    setagencytoshow(agency);
    setisediting(true);
  };
  useEffect(() => {
    if (window.location.pathname.includes("agencies")) {
      handlegetallagencies();
      handlegetlistitems();
      getpages();
      if (gieId) {
        setSelectedGEI(gieId);
      }
    }
  }, [location]);
  const handlesuggestionclick = (id) => {
    navigate(`/agencies/searched/${id}`);
    setSearchText("");
  };
  useEffect(() => {
    setlistitemstoshow(
      listitems.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText]);
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
                      placeholder="Search GIE"
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
                            {item.name}
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
                <h3 className="mb-0">Agencies</h3>
                <Form
                  role="form"
                  style={{
                    display: "flex",
                    gap: "20px",
                    maxHeight: "50px",
                    width: "70%",
                    alignItems: "center",
                  }}
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <InputGroup
                    className="input-group-alternative"
                    style={{ width: "40%" }}
                  >
                    <Input
                      type="select"
                      value={selectedGEI}
                      onChange={(e) => setSelectedGEI(e.target.value)}
                    >
                      <option value="">Select GEI</option>
                      {allGEIs.map((gei, index) => {
                        return (
                          <option value={gei._id} key={index}>
                            {gei.name}
                          </option>
                        );
                      })}
                    </Input>
                  </InputGroup>
                  <div className="text-center">
                    <Button
                      className="my-4"
                      color="danger"
                      disabled={selectedGEI.trim() === ""}
                      onClick={handlegetGeiAgencies}
                    >
                      Filter
                    </Button>
                  </div>
                  <div className="text-center">
                    <Button
                      className="my-4"
                      color="danger"
                      onClick={() => {
                        navigate("/agencies/1");
                        setSelectedGEI("");
                      }}
                      disabled={!gieId}
                    >
                      Clear Filter
                    </Button>
                  </div>
                  <div className="text-center">
                    <Button
                      className="my-4"
                      color="danger"
                      onClick={() => setisadding(true)}
                    >
                      Add Agency
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
                      <th scope="col">image</th>
                      <th scope="col">name</th>
                      <th scope="col">Phone#</th>
                      <th scope="col">GEI</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allAgencies.map((agency, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>
                            {agency.image === "" ? (
                              <i
                                style={{ fontSize: "25px" }}
                                className="ni ni-circle-08"
                              ></i>
                            ) : (
                              <div
                                style={{
                                  height: "25px",
                                  width: "25px",
                                  borderRadius: "50%",
                                  overflow: "hidden",
                                  alignItems: "center",
                                  alignContent: "center",
                                }}
                              >
                                <img
                                  style={{ height: "100%", width: "100%",objectFit:'cover'}}
                                  src={`https://api.videorpi.com/${agency.image}`}
                                />
                              </div>
                            )}
                          </td>
                          <td>{agency.name}</td>
                          <td>
                            {agency.countryCode}-{agency.phone}
                          </td>
                          <td>{agency.gie.name}</td>
                          <td className="text-right">
                            <UncontrolledDropdown>
                              <DropdownToggle
                                className="btn-icon-only text-light"
                                role="button"
                                size="sm"
                                color="danger"
                                onClick={(e) => e.preventDefault()}
                              >
                                <i className="fas fa-ellipsis-v" />
                              </DropdownToggle>
                              <DropdownMenu
                                className="dropdown-menu-arrow"
                                right
                              >
                                <DropdownItem
                                  onClick={() => handleViewClick(agency)}
                                >
                                  View
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() => handleeditclick(agency)}
                                >
                                  Edit
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() =>
                                    handledeleteClick(agency._id, agency.name)
                                  }
                                >
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
            {!isloading && totalpages !== 1 && totalitems > 20 && !agencyId && (
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
      {(isviewing || isediting || isadding || isconfirm) && (
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
          }}
        >
          {isviewing && (
            <ViewAgencyModal
              handleclose={() => setisviewing(false)}
              agencyDetails={agencytoshow}
            />
          )}
          {isadding && (
            <AddAgencyModal
              handleclose={() => setisadding(false)}
              fetchagencies={handlegetallagencies}
              GEIs={allGEIs}
            />
          )}
          {isediting && (
            <EditAgency
              handleclose={() => setisediting(false)}
              fetchagencies={handlegetallagencies}
              GEIs={allGEIs}
              agencyToedit={agencytoshow}
            />
          )}
          {isconfirm && (
            <ConfirmModal
              handleclose={() => setisconfirm(false)}
              handleaction={() => handledeleteAgency(deleteid)}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Agencies;
