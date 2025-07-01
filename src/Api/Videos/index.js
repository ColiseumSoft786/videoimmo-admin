import { deleteAPI } from "Api"
import { getAPI } from "Api"
import { DELETE_VIDEO } from "Api/apiurls"
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
export const deleteVideoById = async(id)=>{
    try {
        const path = DELETE_VIDEO+id
        const response = getAPI(path,true)
        console.log('this is the response of delete video by id',response)
        return response
    } catch (error) {
        console.log('error in delete video api',error)
    }
}