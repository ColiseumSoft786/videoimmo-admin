import { getAPI } from "Api"
import { GET_ALL_VIDEOS } from "Api/apiurls"

export const getAllVideos = async()=>{
    try {
        const response = await getAPI(GET_ALL_VIDEOS,true)
        console.log('response of get all videos api',response)
        return response
    } catch (error) {
        console.log('error in get all videos api',error)
    }
}