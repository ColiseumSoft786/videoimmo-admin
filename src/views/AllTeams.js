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
import './Modals/enhancements.css'
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
import EditAdminModal from "./Modals/EditAdminModal";
import ViewAdminModal from "./Modals/ViewAdminModal";
import { deleteAdmin } from "Api/Admins";
import toastService from "Toaster/toaster";
import AddAdminModal from "./Modals/AddAdminModal";
import { useAsyncError } from "react-router-dom";
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
// core components

const AllTeams = () => {
  const searchtext = useSelector((state)=>state.admin.searchText)
    const [isloading,setisloading] = useState(true)
    const [isviewing,setisviewing] = useState(false)
    const [agencytoshow,setagencytoshow] = useState(null)
    const [allGEIs,setAllGEIs] = useState([])
    const [allAgencies,setAllAgencies] = useState([])
    const [selectedGEI,setSelectedGEI] = useState('')
    const [isediting,setisediting] = useState(false)
    const [isadding,setisadding]= useState(false)
    const handlegetallagencies= async()=>{
        setisloading(true)
        const gei = await getAllGEI()
        const agencies = await getallAgencies()
        if(!gei.error&&!agencies.error){
            setAllGEIs(gei.data)
            setAllAgencies(agencies.data)
            setisloading(false)
        }
    }
    const handleViewClick = (agency)=>{
        console.log('gei to show',agency)
        setagencytoshow(agency)
        setisviewing(true)
    }
    const handledeleteClick = async(id,name)=>{
        const response = await deleteAgency(id)
        if(!response.error){
            toastService.success(`${name} Deleted Successfully`)
            handlegetallagencies()
        }
    }
    const handlegetGeiAgencies=async()=>{
        setisloading(true)
        const response = await getGEIAgencies(selectedGEI)
        if(!response.error){
            setAllAgencies(response.data)
            setisloading(false)
        }
    }
    const handleeditclick = (agency)=>{
        setagencytoshow(agency)
        setisediting(true)
    }
  useEffect(()=>{
    handlegetallagencies()
  },[])
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
                <h3 className="mb-0">GEIs</h3>
                <Form role="form" style={{display:'flex',gap:'20px',maxHeight:'50px',width:'70%',alignItems:"center"}} onSubmit={(e) => {e.preventDefault()}}>
                    <InputGroup className="input-group-alternative" style={{width:'40%'}}>
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
                    <Button className="my-4" color="danger"  disabled={selectedGEI.trim()===''} onClick={handlegetGeiAgencies}>
                      Filter
                    </Button>
                  </div>
                  <div className="text-center">
                    <Button className="my-4" color="danger" onClick={handlegetallagencies}>
                      Clear Filter
                    </Button>
                  </div>
                  <div className="text-center">
                    <Button className="my-4" color="danger" onClick={()=>setisadding(true)}>
                      Add Agency
                    </Button>
                  </div>
                </Form>
              </CardHeader>
              {isloading?(<div style={{height:'250px',width:'100%',marginTop:'20vh',display:'flex',justifyContent:'center'}}><Loader/></div>):(
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
                    {allAgencies.map((agency,index)=>{
                        return(
                            <tr>
                    <td>{index+1}</td>
                    <td>{agency.image === "" ? (
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
                                  style={{ height: "100%", width: "100%" }}
                                  src={`https://api.videorpi.com/${agency.image}`}
                                />
                              </div>
                            )}</td>
                    <td>{agency.name}</td>
                    <td>{agency.countryCode}-{agency.phone}</td>
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
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            onClick={()=>handleViewClick(agency)}
                          >
                            View
                          </DropdownItem>
                          <DropdownItem
                            onClick={()=>handleeditclick(agency)}
                          >
                            Edit
                          </DropdownItem>
                          <DropdownItem
                           onClick={()=>handledeleteClick(agency._id,agency.name)}
                          >
                            Delete
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                        )
                    })}
                </tbody>
              </Table>
              )}
            </Card>
          </div>
        </Row>
      </Container>
      {(isviewing||isediting||isadding)&&(
        <div style={{height:'100vh',width:'100vw',backgroundColor:'rgba(0, 0, 0, 0.3)',position:'fixed',top:0,left:0,display:"flex",justifyContent:"center",paddingTop:'10vh',zIndex:20}}>
          {isviewing&&<ViewAgencyModal handleclose={()=>setisviewing(false)} agencyDetails={agencytoshow}/>}
          {isadding&&<AddAgencyModal handleclose={()=>setisadding(false)} fetchagencies={handlegetallagencies} GEIs={allGEIs}/>}
          {isediting&&<EditAgency handleclose={()=>setisediting(false)} fetchagencies={handlegetallagencies} GEIs={allGEIs} agencyToedit={agencytoshow}/>}
        </div>
        )}
    </>
  );
};

export default AllTeams;
