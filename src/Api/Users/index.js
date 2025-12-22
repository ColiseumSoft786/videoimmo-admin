import { postAPI } from "Api";
import { deleteAPI } from "Api";
import { putAPI } from "Api";
import { getUserHouseAPI } from "Api";
import { getAPI } from "Api";
import { GET_MANAGER_TEAM } from "Api/apiurls";
import { GET_ALL_AGENCY_USERS } from "Api/apiurls";
import { GET_ALL_USERS_NAMES_BY_AGENCY } from "Api/apiurls";
import { GET_GIE_USER_LENGTH } from "Api/apiurls";
import { GET_ALL_USER_NAMES } from "Api/apiurls";
import { GET_OTHER_USER_NAMES_FORTEAM } from "Api/apiurls";
import { GET_RECENT_USERS } from "Api/apiurls";
import { GET_SINGLE_USER } from "Api/apiurls";
import { GET_AGENCY_USER_LENGTH } from "Api/apiurls";
import { GET_OTHER_USERS_NAMES } from "Api/apiurls";
import { GET_ALL_GIE_USERS } from "Api/apiurls";
import { UPDATE_MEMBERS_OF_TEAM } from "Api/apiurls";
import { ADD_USER } from "Api/apiurls";
import { DELETE_USER } from "Api/apiurls";
import { UPDATE_USER_INFO } from "Api/apiurls";
import { GET_OTHER_TEAMS } from "Api/apiurls";
import { ADD_MEMBERS_IN_TEAM } from "Api/apiurls";
import { GET_USER_HOUSES } from "Api/apiurls";
import { GET_ALL_USERS } from "Api/apiurls";

export const getAllUsers = async (page, sorting) => {
  try {
    const path = GET_ALL_USERS + `${page}/${sorting}`;
    const response = await getAPI(path, true);
    console.log("response from get all users api", response);
    return response;
  } catch (error) {
    console.log("error in get all users api", error);
  }
};
export const getUserHouses = async (id, page) => {
  try {
    console.log("body for user houses", id);
    const path = GET_USER_HOUSES + id + `/${page}`;
    const response = await getAPI(path, true);
    console.log("response from getuserhouses api", response);
    return response;
  } catch (error) {
    console.log("error in getuser house api", error);
  }
};
export const getTeamsToList = async (id) => {
  try {
    const path = GET_OTHER_TEAMS + id;
    const response = await getAPI(path, true);
    console.log("response from get teams to list", response);
    return response;
  } catch (error) {
    console.log("errors in get teams to list", error);
  }
};
export const addMembersInTeam = async (teamid, body) => {
  try {
    const path = ADD_MEMBERS_IN_TEAM + teamid;
    const response = await postAPI(path, body, true);
    console.log("response from add members in team", response);
    return response;
  } catch (error) {
    console.log("errors in add in to team", error);
  }
};
export const updateUserInfo = async (id, body) => {
  try {
    const path = UPDATE_USER_INFO + id;
    const response = await putAPI(path, body, true);
    console.log("response from update user info", response);
    return response;
  } catch (error) {
    console.log("error in the update user info", error);
  }
};
export const deleteUser = async (id) => {
  try {
    const path = DELETE_USER + id;
    const response = await deleteAPI(path, {}, true);
    console.log("response from delete user", response);
    return response;
  } catch (error) {
    console.log("Error in delete user", error);
  }
};
export const addUser = async (body) => {
  try {
    const response = await postAPI(ADD_USER, body, true);
    console.log("response from add user", response);
    return response;
  } catch (error) {
    console.log("error in add user", error);
  }
};
export const getManagerTeam = async (id) => {
  try {
    const path = GET_MANAGER_TEAM + id;
    const response = await getAPI(path, true);
    console.log("response from get manager team", response);
    return response;
  } catch (error) {
    console.log("error in get manager team", error);
  }
};
export const getAllAgencyUsers = async (id, page, sorting) => {
  try {
    const path = GET_ALL_AGENCY_USERS + id + `/${page}/${sorting}`;
    const response = await getAPI(path, true);
    console.log("response from get all user of agency", response);
    return response;
  } catch (error) {
    console.log("error in get all agency users", error);
  }
};
export const getAllGieUsers = async (id, page, sorting) => {
  try {
    const path = GET_ALL_GIE_USERS + id + `/${page}/${sorting}`;
    const response = await getAPI(path, true);
    console.log("response from get all gie users", response);
    return response;
  } catch (error) {
    console.log("error in get all gie users", error);
  }
};
export const getAllUserNamesByAgency = async (id) => {
  try {
    const path = GET_ALL_USERS_NAMES_BY_AGENCY + id;
    const response = await getAPI(path, true);
    console.log("response from get all user names by agency", response);
    return response;
  } catch (error) {
    console.log("error in get all user names by agency", error);
  }
};
export const getOtherUserNames = async (id, agency) => {
  try {
    const path = GET_OTHER_USERS_NAMES + id + `/${agency}`;
    const response = await getAPIa(path, true);
    console.log("response from get other user names ", response);
    return response;
  } catch (error) {
    console.log("error in get other user name ", error);
  }
};
export const getGieUserLength = async (id) => {
  try {
    const path = GET_GIE_USER_LENGTH + id;
    const response = await getAPI(path, true);
    console.log("response from get gie user length", response);
    return response;
  } catch (error) {
    console.log("error in gie user length", error);
  }
};
export const getAgencyUserLength = async (id) => {
  try {
    const path = GET_AGENCY_USER_LENGTH + id;
    const response = await getAPI(path, true);
    console.log("response from get agency user length", response);
    return response;
  } catch (error) {
    console.log("error in agency user length", error);
  }
};
export const getAllUserNames = async () => {
  try {
    const response = await getAPI(GET_ALL_USER_NAMES, true);
    console.log("response from get all usernames", response);
    return response;
  } catch (error) {
    console.log("error in get all user names", error);
  }
};
export const getSingleUser = async (id) => {
  try {
    const path = GET_SINGLE_USER + id;
    const response = await getAPI(path, true);
    console.log("response from get single user", response);
    return response;
  } catch (error) {
    console.log("error in get single user", error);
  }
};
export const getotherusernamesforteam = async (id, agencyid) => {
  try {
    const path = GET_OTHER_USER_NAMES_FORTEAM + id + `/${agencyid}`;
    const response = await getAPI(path, true);
    return response;
  } catch (error) {
    console.log("error in get other usernames for team", error);
  }
};
export const getRecentUsers = async () => {
  try {
    const response = await getAPI(GET_RECENT_USERS, true);
    console.log("response from get recent users", response);
    return response;
  } catch (error) {
    console.log("error in get recent user ", error);
  }
};
