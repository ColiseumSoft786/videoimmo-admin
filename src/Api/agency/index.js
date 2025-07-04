import { postAPI } from "Api"
import { putAPI } from "Api"
import { deleteAPI } from "Api"
import { getAPI } from "Api"
import { Update_Agency } from "Api/apiurls"
import { DELETE_AGENCY } from "Api/apiurls"
import { ADD_AGENCY } from "Api/apiurls"
import { GET_GEI_AGENCIES } from "Api/apiurls"
import { GET_ALL_AGENCIES } from "Api/apiurls"

export const getallAgencies= async()=>{
    try {
        const response = await getAPI(GET_ALL_AGENCIES,true)
        console.log('response from get all agency',response)
        return response
    } catch (error) {
        console.log('error in the get all agencies',error)
    }
}
export const getGEIAgencies = async(id)=>{
    try {
        const path = GET_GEI_AGENCIES+id
        const response = await getAPI(path,true)
        console.log('response from get gei agencies',response)
        return response
    } catch (error) {
        console.log('error in get gei agency',error)
    }
}
export const deleteAgency = async(id)=>{
    try {
        const path = DELETE_AGENCY+id
        const response = await deleteAPI(path,{},true)
        console.log('response from delete agency',response)
        return response
    } catch (error) {
        console.log('error in delete agency',error)
    }
}
export const addAgency = async(body)=>{
    try {
        const response = await postAPI(ADD_AGENCY,body,true)
        console.log('this is the reponse from add agency',response)
        return response
    } catch (error) {
        console.log('error in add agency ',error)
    }
}
export const updateAgency = async(body,id)=>{
    try {
        const path = Update_Agency+id
        const response = await putAPI(path,body,true)
        console.log('response from update agency',response)
        return response
    } catch (error) {
        console.log('error in update agency',error)
    }
}