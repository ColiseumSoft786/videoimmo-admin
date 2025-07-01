import { deleteAPI } from "Api"
import { getAPI } from "Api"
import { DELETE_HOUSE } from "Api/apiurls"
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
export const deleteHouseById = async(id)=>{
    try {
        const path = DELETE_HOUSE+id
        const response = deleteAPI(path,{},true)
        console.log('response from delete house',response)
        return response
    } catch (error) {
        console.log('error in delete house',error)
    }
}