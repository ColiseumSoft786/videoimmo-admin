import { getAPI } from "Api"
import { GET_ALL_TEAMS_NAMES } from "Api/apiurls"
import { GET_ALL_TEAMS } from "Api/apiurls"

export const getAllTeams = async()=>{
    try {
        const response = await getAPI(GET_ALL_TEAMS,true)
        console.log('response from get all teams ',response)
        return response
    } catch (error) {
        console.log('error in the get all teams',error)
    }
}
export const getAllTeamsNames = async ()=>{
    try {
        const response = await getAPI(GET_ALL_TEAMS_NAMES,true)
        console.log('response from get all teams names ',response)
        return response
    } catch (error) {
        console.log('error in get all teams names ',error)
    }
}