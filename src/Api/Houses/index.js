import { getAPI } from "Api"
import { GET_ALL_HOUSES } from "Api/apiurls"

export const getAllHouses = async()=>{
    try {
        const response = await getAPI(GET_ALL_HOUSES,true)
        console.log("response of get all houses ", response)
        return response
    } catch (error) {
        console.log('error in get all houses api',error)
    }
}