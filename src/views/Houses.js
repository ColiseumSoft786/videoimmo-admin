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
} from "reactstrap";
import toastService from "Toaster/toaster";
// core components

const Houses = () => {
  const [houses, setHouses] = useState([]);
  const [isloading, setisloading] = useState(true);
  const { userid,username } = useParams();
  const location = useLocation()
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
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">{username?`Houses of ${username}`:'Houses'}</h3>
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
                              color="info"
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
                          <td>{house.status}</td>
                          <td className="text-right">
                            <UncontrolledDropdown>
                              <DropdownToggle
                                className="btn-icon-only text-light"
                                href="#pablo"
                                role="button"
                                size="sm"
                                color=""
                                onClick={(e) => e.preventDefault()}
                              >
                                <i className="fas fa-ellipsis-v" />
                              </DropdownToggle>
                              <DropdownMenu
                                className="dropdown-menu-arrow"
                                right
                              >
                                <DropdownItem
                                  href="#pablo"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  View
                                </DropdownItem>
                                <DropdownItem
                                  href="#pablo"
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
    </>
  );
};

export default Houses;
