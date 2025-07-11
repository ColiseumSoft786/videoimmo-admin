import { deleteAPI } from "Api"
import { getAPI } from "Api"
import { GET_ALL_HOUSES_BY_GIE } from "Api/apiurls"
import { GET_ALL_HOUSES_BY_AGENCY } from "Api/apiurls"
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
export const getHouseByAgencies = async(id)=>{
    try {
        const path = GET_ALL_HOUSES_BY_AGENCY+id
        const response = await getAPI(path,true)
        console.log('response from get houses by agencies',response)
        return response
    } catch (error) {
        console.log('error in get houses by agencies',error)
    }
}
export const getHousesByGie = async(id)=>{
    try {
        const path = GET_ALL_HOUSES_BY_GIE + id
        const response = await getAPI(path,true)
        console.log('response from get houses by gie',response)
        return response
    } catch (error) {
        console.log('error in get houses by gie ',error)
    }
}