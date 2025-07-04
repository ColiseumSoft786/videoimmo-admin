import { getAPI } from "Api"
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