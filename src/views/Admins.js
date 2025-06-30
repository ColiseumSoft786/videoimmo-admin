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
} from "reactstrap";
// core components

const Admins = () => {
    const [admins,setadmins]=useState([])
    const [isloading,setisloading] = useState(true)
    const handlegetalladmins = async()=>{
        try {
            const response = await GetAllAdmins()
            console.log('admins',response)
            if(response.data.length>0){
                setadmins(response.data)
                setisloading(false)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        handlegetalladmins()
    },[])
    useEffect(()=>{
        console.log('all admins',admins)
    },[admins])
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
                <h3 className="mb-0">Admins</h3>
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
                    {admins.map((admin,index)=>{
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
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            View
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Edit
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
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
    </>
  );
};

export default Admins;
