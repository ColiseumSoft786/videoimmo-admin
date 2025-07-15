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
import { useAsyncError, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddGeiModal from "./Modals/AddGeiModal";
import ViewGeiModal from "./Modals/ViewGeiModal";
import EditGeiModal from "./Modals/EditGeiModal";
import { getAllGEI } from "Api/gei";
import { deleteGEI } from "Api/gei";
import { getGieslength } from "Api/dashboard";
import { getSingleGie } from "Api/gei";
// core components

const GEI = () => {
  const searchtext = useSelector((state)=>state.admin.searchText)
  const dispatch = useDispatch()
  const location = useLocation()
    const [admins,setadmins]=useState([])
    const {gieId} = useParams()
    const {page} = useParams()
    const [isloading,setisloading] = useState(true)
    const [isediting,setisediting] = useState(false)
    const [isviewing,setisviewing] = useState(false)
    const [isadding,setisadding] = useState(false)
    const [geitoshow,setgeitoshow] = useState(null)
    const [allGEIs,setAllGEIs] = useState([])
     const [currentpage, setcurrentpage] = useState(Number(page));
  const [totalpages, settotalpages] = useState(0);
  const [totalitems,settotalitems] = useState(0)
  const getpages = async () => {
    const pages = await getGieslength()
    if (!pages.error) {
      settotalitems(Number(pages.data))
      settotalpages(Math.ceil(pages.data / 20));
    } else {
      settotalitems(0)
      settotalpages(1);
    }
  };
  const handleprev = () => {
    if (currentpage > 1) {
      const prev = currentpage - 1;
       
          navigate(`/gies/${prev}`);
    }
  };
  const handlenext = () => {
    if (currentpage < totalpages) {
      const next = currentpage + 1;
      
          navigate(`/gies/${next}`);

    }
  };
  useEffect(() => {
    setcurrentpage(Number(page));
  }, [page]);
    const handlegetallGeis= async()=>{
        setisloading(true)
        const issearched = window.location.pathname.includes('searched')
        let response = {}
        if(issearched){
          response = await getSingleGie(gieId)
        }
        if(!issearched){
         response = await getAllGEI(page)
        }
        if(!response.error){
          if(issearched){
            setAllGEIs([response.data])
          }else{
            setAllGEIs(response.data)}
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
    if(window.location.pathname.includes('gies')){
    handlegetallGeis()
    getpages()}
  },[location])
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
            {!isloading && totalpages !== 1 && totalitems>20&&!gieId && (
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
