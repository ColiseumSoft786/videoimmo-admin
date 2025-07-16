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
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";
import { setSearchText } from "ReduxSlices/AdminSlice";
import { setisLoggedIn } from "ReduxSlices/AdminSlice";
import './enhancements.css'
import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getAllUserNames } from "Api/Users";
import { getAllTeamsNames } from "Api/teams";
import { getAllGIESNames } from "Api/gei";
import { getAllAgenciesNames } from "Api/agency";


const AdminNavbar = (props) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const adminName = localStorage.getItem("username")
  const [listitems,setlistitems] = useState([])
  const [listitemstoshow,setlistitemstoshow] = useState([])
  const [searchText,setSearchText] = useState('')
  const navigate = useNavigate()
  const handleLogOut = (e) =>{
    e.preventDefault()
    localStorage.clear()
    dispatch(setisLoggedIn(false))
    navigate("/auth/login",{replace:true})
  }
  const handlegetlistitems = async()=>{
    let items = []
    if(window.location.pathname.includes('users')){
      items = await getAllUserNames()
    }
    if(window.location.pathname.includes('teams')){
      items = await getAllTeamsNames()
    }
    if(window.location.pathname.includes('gies')){
      items = await getAllGIESNames()
    }
    if(window.location.pathname.includes('agencies')){
      items = await getAllAgenciesNames()
    }
    if(!items.error){
      setlistitems(items.data)
      setlistitemstoshow(items.data)
    }
  }
  useEffect(()=>{
    handlegetlistitems()
    setSearchText('')
  },[location])
  useEffect(()=>{
    if(window.location.pathname.includes('users')){
      setlistitemstoshow(listitems.filter((item)=>item.fname.toLowerCase().includes(searchText.toLowerCase())))
    }else{
      setlistitemstoshow(listitems.filter((item)=>item.name.toLowerCase().includes(searchText.toLowerCase())))
    }
  },[searchText])
  const handlesuggestionclick = (id)=>{
    if(window.location.pathname.includes('users')){
      navigate(`/users/searched/${id}`)
    }
    if(window.location.pathname.includes('teams')){
      navigate(`/teams/searched/${id}`)
    }
    if(window.location.pathname.includes('gies')){
      navigate(`/gies/searched/${id}`)
    }
    if(window.location.pathname.includes('agencies')){
      navigate(`/agencies/searched/${id}`)
    }
    setSearchText('')
  }
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            style={{alignContent:"center",alignItems:'center'}}
            to="/"
          >
              <FaArrowLeft/> <span> {props.brandText}</span>
          </Link>
          <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            {(!window.location.pathname.includes('houses')&&!window.location.pathname.includes('admins')&&!window.location.pathname.includes('index'))&&!window.location.pathname.includes('settings')&&<FormGroup className="mb-0" style={{position:'relative'}}>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search" type="text" value={searchText} onChange={(e)=>setSearchText(e.target.value)}/>
              </InputGroup>
              {searchText.trim()!==''&&<div style={{backgroundColor:'white',position:'absolute',top:'50px',left:'0',width:'315px',maxHeight:'40vw',overflowY:'scroll'}}>
                {listitemstoshow.map((item,index)=>{
                  return(
                    <div onClick={()=>handlesuggestionclick(item._id)} style={{padding:'10px',textAlign:'left',cursor:'pointer'}} key={index}>{window.location.pathname.includes('users')?item.fname:item.name}</div>
                  )
                })}
              </div>}
            </FormGroup>}
          </Form>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <i className="ni ni-circle-08" style={{fontSize:'40px'}}/>
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {adminName}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem onClick={(e) => handleLogOut(e)}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
