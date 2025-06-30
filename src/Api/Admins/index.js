import { getAPI } from "Api"
import { GET_ALL_ADMINS } from "Api/apiurls"

export const GetAllAdmins = async()=>{
    try {
        const response = await getAPI(GET_ALL_ADMINS,true)
        console.log('response from get all admins api',response)
        return response
    } catch (error) {
        console.log('error in get all admins api',error)
    }
}