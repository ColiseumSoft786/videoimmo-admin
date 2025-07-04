import { putAPI } from "Api"
import { deleteAPI } from "Api"
import { postAPI } from "Api"
import { getAPI } from "Api"
import { UPDATE_GEI } from "Api/apiurls"
import { DELETE_GEI } from "Api/apiurls"
import { ADD_GEI } from "Api/apiurls"
import { GET_ALL_GEIS } from "Api/apiurls"

export const getAllGEI = async()=>{
    try {
        const response = await getAPI(GET_ALL_GEIS,true)
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