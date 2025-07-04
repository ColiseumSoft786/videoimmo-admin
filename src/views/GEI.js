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
// core components

const GEI = () => {
  const searchtext = useSelector((state)=>state.admin.searchText)
  const dispatch = useDispatch()
    const [admins,setadmins]=useState([])
    const [isloading,setisloading] = useState(true)
    const [isediting,setisediting] = useState(false)
    const [isviewing,setisviewing] = useState(false)
    const [isadding,setisadding] = useState(false)
    const [geitoshow,setgeitoshow] = useState(null)
    const [allGEIs,setAllGEIs] = useState([])
    const handlegetallGeis= async()=>{
        setisloading(true)
        const response = await getAllGEI()
        if(!response.error){
            setAllGEIs(response.data)
            setisloading(false)
        }
    }
    const handleViewClick = (gei)=>{
        console.log('gei to show',gei)
        setgeitoshow(gei)
        setisviewing(true)
    }
    const handledeleteClick = async(id,name)=>{
        const response = await deleteGEI(id)
        if(!response.error){
            toastService.success(`${name} Deleted Successfully`)
            handlegetallGeis()
        }
    }
  const handleEditClick = (gei)=>{
    setgeitoshow(gei)
    setisediting(true)
  }
  useEffect(()=>{
    handlegetallGeis()
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
              <CardHeader className="border-0" style={{display:'flex',justifyContent:'space-between'}}>
                <h3 className="mb-0">GIEs</h3>
                <Button color="danger" onClick={()=>setisadding(true)}>Add GIE</Button>
              </CardHeader>
              {isloading?(<div style={{height:'250px',width:'100%',marginTop:'20vh',display:'flex',justifyContent:'center'}}><Loader/></div>):(
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Sr.#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Phone#</th>
                    <th scope="col">No. of Tokens</th>
                    <th scope="col">Expiry Date</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                    {allGEIs.map((gei,index)=>{
                        return(
                            <tr>
                    <td>{index+1}</td>
                    <td>{gei.name}</td>
                    <td>{gei.countryCode}-{gei.phone}</td>
                    <td>{gei.tokens}</td>
                    <td>{gei.expiresOn.slice(0,10)}</td>
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
                            onClick={()=>handleViewClick(gei)}
                          >
                            View
                          </DropdownItem>
                          <DropdownItem
                           onClick={()=>handleEditClick(gei)}
                          >
                            Edit
                          </DropdownItem>
                          <DropdownItem
                           onClick={()=>handledeleteClick(gei._id,gei.name)}
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
      {(isediting||isviewing||isadding)&&(
        <div style={{height:'100vh',width:'100vw',backgroundColor:'rgba(0, 0, 0, 0.3)',position:'fixed',top:0,left:0,display:"flex",justifyContent:"center",paddingTop:isadding?'5vh':'10vh',zIndex:20}}>
          {isediting&&<EditGeiModal handleclose={()=>setisediting(false)} GeitoEdit={geitoshow} fetchGeis={handlegetallGeis}/>}
          {isviewing&&<ViewGeiModal handleclose={()=>setisviewing(false)} Geitoshow={geitoshow}/>}
          {isadding&&<AddGeiModal handleclose={()=>setisadding(false)} fetchGEIS={handlegetallGeis}/>}
        </div>
        )}
    </>
  );
};

export default GEI;
