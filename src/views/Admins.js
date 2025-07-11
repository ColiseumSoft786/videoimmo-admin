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
import { useSelector } from "react-redux";
// core components

const Admins = () => {
  const searchtext = useSelector((state)=>state.admin.searchText)
    const [admins,setadmins]=useState([])
    const [isloading,setisloading] = useState(true)
    const [isediting,setisediting] = useState(false)
    const [isviewing,setisviewing] = useState(false)
    const [isadding,setisadding] = useState(false)
    const [filteredAdmins,setFilteredAdmins] = useState([])
    const [main,setmain] = useState(null)
    const handleeditclick = (e,id,firstname,lastname)=>{
      e.preventDefault()
      console.log('main id',id)
      const admintoedit = {
        id:id,
        firstname:firstname,
        lastname:lastname
      }
      console.log('in admin ',admintoedit)
      setmain(admintoedit)
      setisediting(true)
    }
    const handleviewclick = (e,id,firstname,lastname)=>{
      e.preventDefault()
      console.log('main id',id)
      const admintoedit = {
        id:id,
        firstname:firstname,
        lastname:lastname
      }
      console.log('in admin ',admintoedit)
      setmain(admintoedit)
      setisviewing(true)
    }
    const handlegetalladmins = async()=>{
      setisloading(true)
        try {
            const response = await GetAllAdmins()
            console.log('admins',response)
            if(response.data.length>0){
                setadmins(response.data)
                setFilteredAdmins(response.data)
                setisloading(false)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleDeleteAdmin=async(e,id)=>{
      e.preventDefault()
      const response = await deleteAdmin(id)
      if(!response.error){
        toastService.success('Admin Deleted Successfully')
        handlegetalladmins()
      }
    }
    useEffect(()=>{
      if(window.location.pathname.includes('admins')){
        handlegetalladmins()}
    },[])
    const handlefilter =()=>{
      if(admins.length>0){
        setFilteredAdmins(admins.filter((admin)=>admin.fname.toLowerCase().includes(searchtext.toLowerCase())))
      }
    }
    useEffect(()=>{
      handlefilter()
    },[searchtext])
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
                <h3 className="mb-0">Admins</h3>
                <Button color="danger" onClick={()=>setisadding(true)}>Add Admin</Button>
              </CardHeader>
              {isloading?(<div style={{height:'250px',width:'100%',marginTop:'20vh',display:'flex',justifyContent:'center'}}><Loader/></div>):(
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Sr.#</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                    {filteredAdmins.map((admin,index)=>{
                        return(
                            <tr>
                    <td>{index+1}</td>
                    <td>{admin.fname}</td>
                    <td>{admin.lname}</td>
                    <td>{admin.email}</td>
                    <td>{admin.status}</td>
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
                            onClick={(e) => handleviewclick(e,admin._id,admin.fname,admin.lname)}
                          >
                            View
                          </DropdownItem>
                          <DropdownItem
                            onClick={(e) => handleeditclick(e,admin._id,admin.fname,admin.lname)}
                          >
                            Edit
                          </DropdownItem>
                          <DropdownItem
                            onClick={(e) => handleDeleteAdmin(e,admin._id)}
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
          {isediting&&<EditAdminModal handleclose={()=>setisediting(false)} fetchusers={handlegetalladmins} admintoedit={main}/>}
          {isviewing&&<ViewAdminModal handleclose={()=>setisviewing(false)} admintoedit={main}/>}
          {isadding&&<AddAdminModal handleclose={()=>setisadding(false)} fetchusers={handlegetalladmins}/>}
        </div>
        )}
    </>
  );
};

export default Admins;
