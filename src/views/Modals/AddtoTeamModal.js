import { updateAdminName } from "Api/Admins";
import { addMembersInTeam } from "Api/Users";
import { getTeamsToList } from "Api/Users";
import Loader from "Loader/Loader";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import toastService from "Toaster/toaster";

const AddtoTeamModal = ({ handleclose, userid }) => {
  const [allteams, setallteams] = useState([]);
  const [selectedteam, setselectedteam] = useState("");
  const [isloading, setisloading] = useState(true);
  const handlegetteams = async () => {
    const response = await getTeamsToList(userid);
    console.log("response at modal", response);
    if (!response.error) {
      setallteams(response.data.data);
      setisloading(false);
    }
  };
  useEffect(() => {
    handlegetteams();
  }, []);
  useEffect(() => {
    console.log("teams in modal", allteams);
  }, [allteams]);
  const handleaddtoteam = async (e) => {
    e.preventDefault();
    if (selectedteam.trim() === "") {
      toastService.warn("Please select a team first !");
    }
    const requestbody = {
      members: [userid],
    };
    const selectedteamdata = allteams.find(
      (team) => team.name === selectedteam
    );
    const response = await addMembersInTeam(selectedteamdata._id, requestbody);
    if (!response.error) {
      toastService.success(`user successfully added to ${selectedteam}`);
      handleclose()
    }
  };
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <span
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              fontSize: "30px",
              cursor: "pointer",
            }}
            onClick={handleclose}
          >
            &times;
          </span>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Add to Team</small>
            </div>
            {isloading ? (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  height: "200px",
                }}
              >
                <Loader />
              </div>
            ) : (
              <Form role="form" onSubmit={(e) => handleaddtoteam(e)}>
                <FormGroup className="mb-3">
                  <label>Select Team</label>
                  <InputGroup className="input-group-alternative">
                    <Input
                      type="select"
                      value={selectedteam}
                      onChange={(e) => setselectedteam(e.target.value)}
                    >
                      {allteams.map((team, index) => {
                        return (
                          <option value={team.name} key={index}>
                            {team.name}
                          </option>
                        );
                      })}
                    </Input>
                  </InputGroup>
                </FormGroup>
                <div className="text-center">
                  <Button
                    className="my-4"
                    color="primary"
                    onClick={handleclose}
                  >
                    Close
                  </Button>
                  <Button className="my-4" color="primary" type="submit">
                    Add
                  </Button>
                </div>
              </Form>
            )}
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default AddtoTeamModal;
