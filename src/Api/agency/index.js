import { postAPI } from "Api"
import { putAPI } from "Api"
import { deleteAPI } from "Api"
import { getAPI } from "Api"
import { GET_ALL_AGENCIES_NAMES_BY_GIE } from "Api/apiurls"
import { GET_SINGLE_AGENCY } from "Api/apiurls"
import { GET_RECENT_AGENCIES } from "Api/apiurls"
import { GET_GIE_AGENCY_LENGTH } from "Api/apiurls"
import { GET_ALL_AGENCIES_NAMES } from "Api/apiurls"
import { Update_Agency } from "Api/apiurls"
import { DELETE_AGENCY } from "Api/apiurls"
import { ADD_AGENCY } from "Api/apiurls"
import { GET_GEI_AGENCIES } from "Api/apiurls"
import { GET_ALL_AGENCIES } from "Api/apiurls"

export const getallAgencies= async(page)=>{
    try {
        const path = GET_ALL_AGENCIES+page
        const response = await getAPI(path,true)
        console.log('response from get all agency',response)
        return response
    } catch (error) {
        console.log('error in the get all agencies',error)
    }
}
export const getGEIAgencies = async(id,page)=>{
    try {
        const path = GET_GEI_AGENCIES+id+`/${page}`
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
export const getAllAgenciesNames = async()=>{
    try {
        const path = GET_ALL_AGENCIES_NAMES
        const response = await getAPI(path,true)
        console.log('response from get all agencies names ',response)
        return response
    } catch (error) {
        console.log('error in get all agencies names',error)
    }
}
export const getAllAgenciesNamesByGie = async(id)=>{
    try {
        const path = GET_ALL_AGENCIES_NAMES_BY_GIE+id
        const response = await getAPI(path,true)
        console.log('response from get all agencies names by gie',response)
        return response
    } catch (error) {
        console.log('error in get all agencies names by', error)
    }
}
export const getAllGieAgenciesLength = async(id)=>{
    try {
        const path = GET_GIE_AGENCY_LENGTH+id
        const response = await getAPI(path,true)
        console.log('response from get all gie agencies length',response)
        return response
    } catch (error) {
        console.log('error in get all gie agencies length',error)
    }
}
export const getSingleAgency = async(id)=>{
    try {
        const path = GET_SINGLE_AGENCY+id
        const response = await getAPI(path,true)
        console.log('response from get single agency',response)
        return response
    } catch (error) {
        console.log('error in get single agency',error)
    }
}
export const getRecentAgencies = async()=>{
    try {
        const response = await getAPI(GET_RECENT_AGENCIES,true)
        console.log('response from get recent agencies',response)
        return response
    } catch (error) {
        console.log('error in get recent agencies',error)
    }
}