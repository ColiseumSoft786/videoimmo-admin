import { getAPI } from "Api"
import { GET_ALL_USERS } from "Api/apiurls"

export const getAllUsers = async()=>{
    try {
        const response = await getAPI(GET_ALL_USERS,true)
        console.log('response from get all users api',response)
        return response
    } catch (error) {
        console.log('error in get all users api',error)
    }
}