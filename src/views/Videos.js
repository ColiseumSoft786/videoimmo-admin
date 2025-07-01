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
import { getAllVideos } from "Api/Videos";
import Header from "components/Headers/Header";
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
  Button,
} from "reactstrap";
import Loader from "Loader/Loader";
import { deleteVideoById } from "Api/Videos";
import toastService from "Toaster/toaster";
// core components

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [isloading,setisloading] = useState(true)
  const handlegetallVideos = async () => {
    try {
      setisloading(true)
      const response = await getAllVideos();
      console.log("Users", response);
      if (response.data.length > 0) {
        setVideos(response.data);
        setisloading(false)
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handlegetallVideos();
  }, []);
  useEffect(() => {
    console.log("all videos", videos);
  }, [videos]);
  const handleDeleteVideo = async(id)=>{
    const response = await deleteVideoById(id)
    if(!response.error){
      toastService.success('Video deleted successfully')
      handlegetallVideos()
    }
  }
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
                <h3 className="mb-0">Users</h3>
              </CardHeader>
              {isloading?(<div style={{height:'250px',width:'100%',marginTop:'20vh',display:'flex',justifyContent:'center'}}><Loader/></div>):(
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Sr.#</th>
                    <th scope="col">Thumbnail</th>
                    <th scope="col">Mux Play</th>
                    <th scope="col">Video Length</th>
                    <th scope="col">House</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {videos.map((video, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          <div
                            style={{
                              height: "50px",
                              width: "50px",
                              overflow: "hidden",
                              alignItems: "center",
                              alignContent: "center",
                            }}
                          >
                            <img
                              style={{ height: "100%", width: "100%" }}
                              src={`https://api.videorpi.com/${video.thumbnail}`}
                            />
                          </div>
                        </td>
                        <td>
                          <Button
                            color="info"
                            tag="a"
                            href={`https://dashboard.mux.com/organizations/lbf2kt/environments/aaogkk/video/assets/${video.mux_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="ni ni-button-play" />
                          </Button>
                        </td>

                        <td>{video.video_length}</td>
                        <td>{video.house.type}</td>
                        <td>{video.status}</td>
                        <td className="text-right">
                          <Button color="info" onClick={()=>handleDeleteVideo(video._id)}>Delete</Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>)}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Videos;
