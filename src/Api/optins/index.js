import { getAPI } from "Api";
import { GET_FILTERED_OPTINS } from "Api/apiurls";

export const getAllFilteredOptins = async (page, gieId, agencyId, userId) => {
  try {
    const path =
      GET_FILTERED_OPTINS + `${page}/${gieId}/${agencyId}/${userId}`;
    const response = await getAPI(path, true);
    console.log("response from get all filtered optins", response);
    return response;
  } catch (error) {
    console.error("error in get all filtered optins", error);
    throw error;
  }
};
