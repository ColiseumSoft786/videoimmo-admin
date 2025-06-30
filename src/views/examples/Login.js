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
import { loginadmin } from "Api/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { setisLoggedIn } from "ReduxSlices/AdminSlice";
import toastService from "Toaster/toaster";

const Login = () => {
  const [adminEmail,setAdminEmail] = useState('')
  const [adminPassword,setAdminPassword] = useState('')
  const [isinvalid,setisinvalid] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleAdminLogin = async(e) =>{
    e.preventDefault()
    const requestbody = {
      email:adminEmail,
      password:adminPassword
    }
    const response = await loginadmin(requestbody)
    console.log(response)
    if(response.data.message==='Wrong'){
      localStorage.clear()
      toastService.warn('Wrong Credentials Please Try Again')
      setisinvalid(true)
      return
    }
    if(response.data.message==='Success'){
      localStorage.setItem("username", response.data.user);
      localStorage.setItem("access_token", response.data.token);
      dispatch(setisLoggedIn(true))
      localStorage.setItem("isLoggedIn", true);
      toastService.success('LoggedIn Successfuly')
      setTimeout(() => {
        navigate('/admin/*',{replace:true})
      }, 1000);
    }
  }
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign in with credentials</small>
            </div>
            <Form role="form" onSubmit={(e)=>handleAdminLogin(e)}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative" style={{border:isinvalid?'1px solid red':undefined}}>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    value={adminEmail}
                    onChange={(e)=>setAdminEmail(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative" style={{border:isinvalid?'1px solid red':undefined}}>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    value={adminPassword}
                    onChange={(e)=>setAdminPassword(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              {/* <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div> */}
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;
