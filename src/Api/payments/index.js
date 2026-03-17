import { getAPI } from "Api";
import { GET_ALL_STRIPE_INVOICES } from "Api/apiurls";

export const getAllStripeInvoices = async (refId,dir) => {
  try {
    const path = GET_ALL_STRIPE_INVOICES + `${refId}/${dir}`;
    const response = await getAPI(path, true);
    console.log("response from get all stripe invoices", response);
  } catch (error) {
    console.error("error in get get all stripe invoices", error);
    throw error;
  }
};
