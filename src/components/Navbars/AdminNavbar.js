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
import { Link, useNavigate } from "react-router-dom";
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


const AdminNavbar = (props) => {
  const dispatch = useDispatch()
  const adminName = localStorage.getItem("username")
  const searchtext = useSelector((state)=>state.admin.searchText)
  const navigate = useNavigate()
  const handleLogOut = (e) =>{
    e.preventDefault()
    localStorage.clear()
    dispatch(setisLoggedIn(false))
    navigate("/auth/login",{replace:true})
  }
  const handlesearch = (value)=>{
    dispatch(setSearchText(value))
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
            {(window.location.pathname==='/users'||window.location.pathname==='/admins')&&<FormGroup className="mb-0">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search" type="text" value={searchtext} onChange={(e)=>handlesearch(e.target.value)}/>
              </InputGroup>
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
