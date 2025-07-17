import { putAPI } from "Api"
import { deleteAPI } from "Api"
import { postAPI } from "Api"
import { getAPI } from "Api"
import { GET_GIE_TOKENS_TRANSACTION } from "Api/apiurls"
import { GET_SINGLE_GIE } from "Api/apiurls"
import { UPDATE_GEI } from "Api/apiurls"
import { GET_ALL_GIES_NAMES } from "Api/apiurls"
import { DELETE_GEI } from "Api/apiurls"
import { ADD_GEI } from "Api/apiurls"
import { GET_ALL_GEIS } from "Api/apiurls"

export const getAllGEI = async(page)=>{
    try {
        const path = GET_ALL_GEIS+page
        const response = await getAPI(path,true)
        console.log('response from get all geis',response)
        return response
    } catch (error) {
        console.log('error in get all geis',error)
    }
}
export const addGei = async(body)=>{
    try {
        const response = await postAPI(ADD_GEI,body,true)
        console.log("response from add gei",response)
        return response
    } catch (error) {
        console.log('error in the add gei ',error)
    }
}
export const updateGEI = async(body,id)=>{
    try {
        const path = UPDATE_GEI+id
        const response = await putAPI(path,body,true)
        console.log('response of update gei',response)
        return response
    } catch (error) {
        console.log('error in update gei',error)
    }
}
export const deleteGEI = async(id)=>{
    try {
        const path = DELETE_GEI+id
        const response = await deleteAPI(path,{},true)
        console.log('response from delete gei',response)
        return response
    } catch (error) {
        console.log('error in delete gei',error)
    }
}
export const getAllGIESNames = async()=>{
    try {
        const response = await getAPI(GET_ALL_GIES_NAMES,true)
        console.log('response from get all gie names',response)
        return response
    } catch (error) {
        console.log('error in get all gies names',error)
    }
}
export const getSingleGie = async(id)=>{
    try {
        const path = GET_SINGLE_GIE+id
        const response = await getAPI(path,true)
        console.log('response from get singe gie',response)
        return response
    } catch (error) {
        console.log('error in get single gie ',error)
    }
}
export const getGieTokenTransactions = async(id)=>{
    try {
        const path = GET_GIE_TOKENS_TRANSACTION+id
        const response = await getAPI(path,true)
        console.log('response from get gie token transactions',response)
        return response
    } catch (error) {
        console.log('error in get gie token transactions',error)
    }
}