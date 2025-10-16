import { updateAdminName } from "Api/Admins";
import { getAllAgenciesNamesByGie } from "Api/agency";
import { addAgency } from "Api/agency";
import { getAllGIESNames } from "Api/gei";
import { addGei } from "Api/gei";
import { linkTeamToAgency } from "Api/teams";
import { addUser } from "Api/Users";
import { updateUserInfo } from "Api/Users";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch } from "react-redux";
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
import { addGEi } from "ReduxSlices/AdminSlice";
import toastService from "Toaster/toaster";

const LinkAgencyModal = ({ handleclose, teamId ,FetchTeams }) => {
  const dispatch = useDispatch();
  const [selectedGIE, setSelectedGIE] = useState("");
  const [selectedAgency, setSelectedAgency] = useState("");
  const [gieAgencies, setGieAgencies] = useState([]);
  const [allGies, setAllGies] = useState([]);
  const [isLinking,setIsLinking] = useState(false)
  const [isFetchingAg, setIsFetchingAge] = useState(false);
  const handleGetAllGie = async () => {
    const response = await getAllGIESNames();
    if (!response.error) {
      setAllGies(response.data);
    }
  };
  const handlegetAgenciesnames = async () => {
    setIsFetchingAge(true);
    const response = await getAllAgenciesNamesByGie(selectedGIE);
    if (!response.error) {
      setGieAgencies(response.data);
      setIsFetchingAge(false);
    }
  };
  useEffect(() => {
    handleGetAllGie();
  }, []);
  useEffect(() => {
    if (selectedGIE.trim() !== "") {
      handlegetAgenciesnames();
    }
  }, [selectedGIE]);
  const handleLinkAgency = async(e) => {
    e.preventDefault();
    setIsLinking(true)
    if(selectedAgency.trim()===""){
        toastService.warn("Please select an agency first");
        return
    }
    const response = await linkTeamToAgency(selectedAgency,teamId)
    if(!response.error){
        toastService.success("Team linked successfully");
        handleclose();
        FetchTeams()
    }else{
        toastService.warn("Something went wrong please try again")
    }
    setIsLinking(false)
    console.log("selected agency",selectedAgency)
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
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                Select Agency to link
              </span>
            </div>
            <Form role="form" onSubmit={(e) => handleLinkAgency(e)}>
              <FormGroup>
                <label>GIE</label>
                <InputGroup className="input-group-alternative">
                  <Input
                    type="select"
                    value={selectedGIE}
                    disabled={allGies.length === 0}
                    onChange={(e) => setSelectedGIE(e.target.value)}
                  >
                    <option value="">Select GIE</option>
                    {allGies.map((gei, index) => {
                      return (
                        <option value={gei._id} key={index}>
                          {gei.name}
                        </option>
                      );
                    })}
                  </Input>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <label>Agencies</label>
                <InputGroup className="input-group-alternative">
                  <Input
                    type="select"
                    value={selectedAgency}
                    disabled={gieAgencies.length === 0}
                    onChange={(e) => setSelectedAgency(e.target.value)}
                  >
                    <option value="">
                      {selectedGIE.trim()===""?"Select Gie":isFetchingAg?"Fetching agencies":gieAgencies.length===0?"No agencies":"Select Agency"}
                    </option>
                    {gieAgencies.map((ag, index) => {
                      return (
                        <option value={ag._id} key={index}>
                          {ag.name}
                        </option>
                      );
                    })}
                  </Input>
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="my-4" disabled={isLinking} color="danger" type="submit">
                  Link
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default LinkAgencyModal;
