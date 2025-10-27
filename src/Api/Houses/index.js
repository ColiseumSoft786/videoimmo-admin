import { deleteAPI } from "Api";
import { getAPI } from "Api";
import { GET_GIE_HOUSES_LENGTH } from "Api/apiurls";
import { GET_USER_HOUSES_LENGTH } from "Api/apiurls";
import { GET_RECENT_HOUSES } from "Api/apiurls";
import { GET_AGENCY_HOUSES_LENGTH } from "Api/apiurls";
import { GET_ALL_HOUSES_BY_GIE } from "Api/apiurls";
import { GET_ALL_HOUSES_BY_AGENCY } from "Api/apiurls";
import { DELETE_HOUSE } from "Api/apiurls";
import { GET_ALL_HOUSES } from "Api/apiurls";

export const getAllHouses = async (page) => {
  try {
    const path = GET_ALL_HOUSES + page;
    const response = await getAPI(path, true);
    console.log("response of get all houses ", response);
    return response;
  } catch (error) {
    console.log("error in get all houses api", error);
  }
};
export const deleteHouseById = async (id) => {
  try {
    const path = DELETE_HOUSE + id;
    const response = deleteAPI(path, {}, true);
    console.log("response from delete house", response);
    return response;
  } catch (error) {
    console.log("error in delete house", error);
  }
};
export const getHouseByAgencies = async (id, page) => {
  try {
    const path = GET_ALL_HOUSES_BY_AGENCY + id + `/${page}`;
    const response = await getAPI(path, true);
    console.log("response from get houses by agencies", response);
    return response;
  } catch (error) {
    console.log("error in get houses by agencies", error);
  }
};
export const getHousesByGie = async (id, page) => {
  try {
    const path = GET_ALL_HOUSES_BY_GIE + id + `/${page}`;
    const response = await getAPI(path, true);
    console.log("response from get houses by gie", response);
    return response;
  } catch (error) {
    console.log("error in get houses by gie ", error);
  }
};
export const getGieHousesLength = async (id) => {
  try {
    const path = GET_GIE_HOUSES_LENGTH + id;
    const response = await getAPI(path, true);
    console.log("response from get gie houses length", response);
    return response;
  } catch (error) {
    console.log("error in get gie houses length", error);
  }
};
export const getAgencyHousesLength = async (id) => {
  try {
    const path = GET_AGENCY_HOUSES_LENGTH + id;
    const response = await getAPI(path, true);
    console.log("response from get agency houses length", response);
    return response;
  } catch (error) {
    console.log("error in get agency houses length", error);
  }
};
export const getUserHousesLength = async (id) => {
  try {
    const path = GET_USER_HOUSES_LENGTH + id;
    const response = await getAPI(path, true);
    console.log("response from get user houses length", response);
    return response;
  } catch (error) {
    console.log("error in get user houses length", error);
  }
};
export const getRecentHouses = async () => {
  try {
    const response = await getAPI(GET_RECENT_HOUSES, true);
    console.log("response from get recent users", response);
    return response;
  } catch (error) {
    console.log("error in get recent user ", error);
  }
};
