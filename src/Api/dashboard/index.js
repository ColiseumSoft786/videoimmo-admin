import { getAPI } from "Api"
import { GET_TOTAL_AGENCIES_LENGTH } from "Api/apiurls"
import { GET_OPTIN_LENGTH } from "Api/apiurls"
import { GET_TOTAL_GIE_LENGTH } from "Api/apiurls"
import { HOUSES_GET_LENGTH } from "Api/apiurls"
import { VIDEOES_GET_LENGTH } from "Api/apiurls"
import { USER_GET_LENGTH } from "Api/apiurls"

export const getUserLength = async()=>{
    try {
        const response = await getAPI(USER_GET_LENGTH,true)
        console.log('this is the response from user get length api ', response)
        return response
    } catch (error) {
        console.log('error in user get length api ', error)
    }
}
export const getOptinLength = async()=>{
    try {
        const response = await getAPI(GET_OPTIN_LENGTH,true)
        console.log('this is the response from user get length api ', response)
        return response
    } catch (error) {
        console.log('error in user get length api ', error)
    }
}
export const getVideosLength = async()=>{
    try {
        const response = await getAPI(VIDEOES_GET_LENGTH,true)
        console.log('this is the response from videos get length api',response)
        return response
    } catch (error) {
        console.log('error in videos getlength api',error)
    }
}
export const getHouseslength = async()=>{
    try {
        const response = await getAPI(HOUSES_GET_LENGTH,true)
        console.log('response from get house length',response)
        return response
    } catch (error) {
        console.log('error in get houses length',error)
    }
}
export const getAgenciesLength = async()=>{
    try {
        const response = await getAPI(GET_TOTAL_AGENCIES_LENGTH,true)
        console.log('response from get agencies length',response)
        return response
    } catch (error) {
        console.log('error in get agencies length',error)
    }
}
export const getGieslength = async()=>{
    try {
        const response = await getAPI(GET_TOTAL_GIE_LENGTH,true)
        console.log('response from get gies length',response)
        return response
    } catch (error) {
        console.log('error in get gies length',error)
    }
}