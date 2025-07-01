import { postAPI } from "Api"
import { getAPI } from "Api"
import { UPDATE_SETTINGS } from "Api/apiurls"
import { GET_SETTINGS } from "Api/apiurls"

export const getSettings = async()=>{
    try {
        const response = await getAPI(GET_SETTINGS,true)
        console.log('response from get settings',response)
        return response
    } catch (error) {
        console.log('this is the error in get settings',error)
    }
}
export const updateSettings = async(body)=>{
    try {
        const response = await postAPI(UPDATE_SETTINGS,body,true)
        console.log('this is the response of update settings',response)
        return response
    } catch (error) {
        console.log('this is the error in the update settings',error)
    }
}