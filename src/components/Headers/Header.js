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
import { getVideosLength } from "Api/dashboard";
import { getHouseslength } from "Api/dashboard";
import { getAgenciesLength } from "Api/dashboard";
import { getGieslength } from "Api/dashboard";
import { getUserLength } from "Api/dashboard";
import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const Header = () => {
  const [totalusers, settotalusers] = useState(0);
  const [totalvideos, settotalvideos] = useState(0);
  // const [totalhouses, settotalhouses] = useState(0);
  const [totalAgencies, settotalagencies] = useState(0);
  const [totalGEI, settotalGEI] = useState(0);
  const getallstats = async () => {
    const resusers = await getUserLength();
    const resvideos = await getVideosLength();
    // const reshouses = await getHouseslength();
    const resgies = await getGieslength();
    const resagencies = await getAgenciesLength();
    if (!resusers.error) {
      settotalusers(resusers.data);
    }
    // if (!reshouses.error) {
    //   settotalhouses(reshouses.data);
    // }
    if (!resvideos.error) {
      settotalvideos(resvideos.data);
    }
    if (!resgies.error) {
      settotalGEI(resgies.data);
    }
    if (!resagencies.error) {
      settotalagencies(resagencies.data);
    }
  };
  useEffect(() => {
    if (window.location.pathname === "/") {
      getallstats();
    }
  }, []);
  useEffect(() => {
    console.log("total videos", totalvideos);
  }, [totalvideos]);
  return (
    <>
      <div className="header bg-gradient-danger pb-8 pt-5 pt-md-8">
        {window.location.pathname === "/" && (
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row style={{ rowGap: "30px" }}>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Total Users
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {totalusers}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Total Videos
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {totalvideos}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="ni ni-button-play" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                {/* <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Total Houses
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {totalhouses}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                            <i className="ni ni-building" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col> */}
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Total Agencies
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {totalAgencies}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-blue text-white rounded-circle shadow">
                            <i className="ni ni-paper-diploma " />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Total GIEs
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {totalGEI}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-green text-white rounded-circle shadow">
                            <i className="ni ni-shop" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        )}
      </div>
    </>
  );
};

export default Header;
