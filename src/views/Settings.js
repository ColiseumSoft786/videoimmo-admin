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
import { getAllUsers } from "Api/Users";
import Header from "components/Headers/Header";
import Loader from "Loader/Loader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  FormGroup,
  InputGroup,
  Input,
  CardBody,
} from "reactstrap";
import ViewUserModal from "./Modals/ViewUserModal";
import EditUserModal from "./Modals/EditUserModal";
import { deleteUser } from "Api/Users";
import toastService from "Toaster/toaster";
import AddUserModal from "./Modals/AddUserModal";
import { getSettings } from "Api/settings";
import { updateSettings } from "Api/settings";
// core components

const Settings = () => {
    const [userseconds,setuserseconds]= useState(0)
    const [settingsid,setsettingsid] = useState('')
    const [secretkey,setsecretkey] = useState('')
    const [publishkey,setpublishkey] = useState('')
    const [isloading,setisloading] = useState(true)
    const handlegetsettings = async()=>{
        setisloading(true)
        const response = await getSettings()
        if(!response.error){
            const settings = response.data.settings
            setsettingsid(settings._id)
            setsecretkey(settings.secretkey)
            setpublishkey(settings.publishke)
            setuserseconds(settings.seconds)
            setisloading(false)
        }
    }
    const handleupdateSetting = async(e)=>{
        e.preventDefault()
        if(secretkey.trim()===''&&publishkey.trim()===''&&userseconds===0){
            toastService.warn('No Changes To Save')
            return
        }
        const requestbody = {
            seconds:userseconds,
        secretkey:secretkey,
        publishkey:publishkey,
        _id:settingsid
        }
        const response = await updateSettings(requestbody)
        if(!response.error){
            toastService.success('Settings Updated Successfully')
            handlegetsettings()
        }else(
            toastService.warn('Something Went Wrong')
        )
    }
    useEffect(()=>{
        handlegetsettings()
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
              <CardHeader className="border-0" >
                <h3 className="mb-0">Settings</h3>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                {isloading?(<div style={{height:'250px',width:'100%',marginTop:'20vh',display:'flex',justifyContent:'center'}}><Loader/></div>):(
              <Form role="form" onSubmit={(e) => handleupdateSetting(e)}>
              <FormGroup className="mb-3">
                <label>User Seconds</label>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="First name"
                    type="number"
                    value={userseconds}
                    onChange={(e) => setuserseconds(Number(e.target.value))}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mb-3">
                <label>Secret Key</label>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Secret Key"
                    type="text"
                    value={secretkey}
                    onChange={(e) => setsecretkey(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mb-3">
                <label>Publish Key</label>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Publish Key"
                    type="text"
                    value={publishkey}
                    onChange={(e) => setpublishkey(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="my-4" color="danger" type="submit">
                    Update
                </Button>
              </div>
            </Form>)}
            </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Settings;
