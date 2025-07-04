import { getAPI } from "Api"
import { GET_ALL_TEAMS } from "Api/apiurls"

export const getAllTeams = async()=>{
    try {
        const response = getAPI(GET_ALL_TEAMS,true)
        console.log('response from get all teams ',response)
        return response
    } catch (error) {
        console.log('error in the get all teams',error)
    }
}