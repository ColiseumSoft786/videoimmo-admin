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
import { useLocation, useParams } from "react-router-dom";
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
import './Modals/enhancements.css'
// core components

const Houses = () => {
  const [houses, setHouses] = useState([]);
  const [isloading, setisloading] = useState(true);
  const { userid,username } = useParams();
  const [isviewing,setisviewing] = useState(false)
  const [housetoview,sethousetoview] = useState(null)
  const location = useLocation()
   const [selectedAgency, setSelectedAgency] = useState("");
  const [selectedGEI, setSelectedGEI] = useState("");
  const [allAgencies, setAllAgencies] = useState([
    "agency1",
    "agency2",
    "agency3",
    "agency4",
  ]);
  const [allGEI, setAllGEI] = useState(["GEI1", "GEI2", "GEI3"]);
  console.log(userid);
  const getHouseTimestamp = (createdAt) => {
    return new Date(createdAt).getTime(); // or .valueOf()
  };

  const handlegetallHouses = async () => {
    let response = null
    setisloading(true)
    try {
      if(userid){
        response = await getUserHouses(userid)
      }else{
       response = await getAllHouses();
      }
      if (response){
        setHouses(response.data)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setisloading(false); // ✅ move this outside the if block
    }
  };
  useEffect(() => {
    handlegetallHouses();
  }, [userid,username,location.pathname]);
  useEffect(() => {
    console.log("all houses", houses);
  }, [houses]);
  const handleDeleteHouse = async(id)=>{
    const response = await deleteHouseById(id)
    if(!response.error){
      toastService.success('House Deleted Successfully')
      handlegetallHouses()
    }else{
      toastService.warn('Something Went Wrong')
    }
  }
  const handleViewClick = (house)=>{
    sethousetoview(house)
    setisviewing(true)
  }
  const handleFilterHouses = (e)=>{
      e.preventDefault()
  }
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0"
               style={{ display: "flex", justifyContent: "space-between",alignItems:"center",alignContent:'center' }}
              >
                <h3 className="mb-0">{username?`Houses of ${username}`:'Houses'}</h3>
                {!username&&<Form role="form" style={{display:'flex',gap:'20px',maxHeight:'50px',width:'50%',alignItems:"center"}} onSubmit={(e) => handleFilterHouses(e)}>
                    <InputGroup className="input-group-alternative">
                      <Input
                        type="select"
                        value={selectedGEI}
                        onChange={(e) => setSelectedGEI(e.target.value)}
                      >
                        <option value="">Select GEI</option>
                        {allGEI.map((gei, index) => {
                          return (
                              <option value={gei} key={index}>
                                {gei}
                              </option>
                          );
                        })}
                      </Input>
                    </InputGroup>
                    <InputGroup className="input-group-alternative" >
                      <Input
                        type="select"
                        value={selectedAgency}
                        onChange={(e) => setSelectedAgency(e.target.value)}
                        disabled={selectedGEI.trim()===''}
                      >
                        {selectedGEI.trim()===''&&<option value="">Select GEI First</option>}
                              {selectedGEI.trim()!==''&&<option value="">Select Agency</option>}
                        {allAgencies.map((agency, index) => {
                          return (
                              <option value={agency} key={index}>
                                {agency}
                              </option>
                          );
                        })}
                      </Input>
                    </InputGroup>
                  <div className="text-center">
                    <Button className="my-4" color="danger" type="submit" disabled={selectedAgency.trim()===''||selectedGEI.trim()===''}>
                      Filter
                    </Button>
                  </div>
                </Form>}
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
                      <th scope="col">Thumbnail</th>
                      <th scope="col">Type</th>
                      <th scope="col">House Type</th>
                      <th scope="col">User</th>
                      <th scope="col">View House</th>
                      <th scope="col">Status</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {houses?.map((house, index) => {
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
                              }}
                            >
                              {house.thumbnail !== "" && (
                                <img
                                  style={{
                                    maxHeight: "100%",
                                    maxWidth: "100%",
                                  }}
                                  src={`https://api.videorpi.com/${house.thumbnail}`}
                                />
                              )}
                            </div>
                          </td>
                          <td>{house.type}</td>
                          <td>{house.houseType}</td>
                          <td>{house?.user?.fname}</td>
                          <td>
                            <Button
                              color="danger"
                              tag="a"
                              href={`https://web.videorpi.com/v/${getHouseTimestamp(
                                house.createdAt
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Visit
                            </Button>
                          </td>
                          <td className="text-center"><i style={{fontSize:house.status===1?'20px':''}} className={`${house.status===1?'ni ni-check-bold text-green':'ni ni-fat-remove text-red'}`}/></td>
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
                                  onClick={()=>handleViewClick(house)}
                                  
                                >
                                  View
                                </DropdownItem>
                                <DropdownItem
                                  onClick={()=>handleDeleteHouse(house._id)}
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
          </div>
        </Row>
      </Container>
      {(isviewing)&&(
        <div style={{height:'100vh',width:'100vw',backgroundColor:'rgba(0, 0, 0, 0.3)',position:'fixed',top:0,left:0,display:"flex",justifyContent:"center",paddingTop:'10vh',zIndex:20}}>
          {isviewing&&<HouseViewModal handleclose={()=>setisviewing(false)} houseDetails={housetoview} />}
        </div>)}
    </>
  );
};

export default Houses;
