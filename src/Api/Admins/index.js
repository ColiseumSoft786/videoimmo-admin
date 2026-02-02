import { deleteAPI } from "Api";
import { putAPI } from "Api";
import { postAPI } from "Api";
import { getAPI } from "Api";
import { GET_ALL_NOTIFICATIONS } from "Api/apiurls";
import { DELETE_ADMIN } from "Api/apiurls";
import { SEND_MULTIPLE_NOTIFICATIONS } from "Api/apiurls";
import { ADD_ADMIN } from "Api/apiurls";
import { UPDATE_ADMIN_NAME } from "Api/apiurls";
import { GET_ALL_ADMINS } from "Api/apiurls";

export const GetAllAdmins = async () => {
  try {
    const response = await getAPI(GET_ALL_ADMINS, true);
    console.log("response from get all admins api", response);
    return response;
  } catch (error) {
    console.log("error in get all admins api", error);
  }
};
export const updateAdminName = async (body, id) => {
  try {
    const path = UPDATE_ADMIN_NAME + id;
    const response = await putAPI(path, body, true);
    console.log("this is the response of update admin name", response);
    return response;
  } catch (error) {
    console.log("this is the error in update admin name ", error);
  }
};
export const deleteAdmin = async (id) => {
  try {
    const path = DELETE_ADMIN + id;
    const response = await deleteAPI(path, {}, true);
    console.log("response from delete admin api", response);
    return response;
  } catch (error) {
    console.log("error in delete admin api", error);
  }
};
export const addAdmin = async (body) => {
  try {
    const response = await postAPI(ADD_ADMIN, body, true);
    console.log("response from add admin", response);
    return response;
  } catch (error) {
    console.log("errors in the add admin ", error);
  }
};
export const sendMultipleNotifications = async (body) => {
  try {
    const response = await postAPI(SEND_MULTIPLE_NOTIFICATIONS, body, true);
    console.log("response from send multiple notifications", response);
    return response;
  } catch (error) {
    console.log("error in send multiple notifications", error);
    throw error;
  }
};
export const getAllNotifications = async (page) => {
  try {
    const path = GET_ALL_NOTIFICATIONS + page;
    const response = await getAPI(path, true);
    console.log("response from get all notifications", response);
    return response;
  } catch (error) {
    console.error("error in get all notifications", error);
    throw error;
  }
};
