import { postAPI } from "Api"
import { getUserHouseAPI } from "Api"
import { getAPI } from "Api"
import { GET_OTHER_TEAMS } from "Api/apiurls"
import { ADD_MEMBERS_IN_TEAM } from "Api/apiurls"
import { GET_USER_HOUSES } from "Api/apiurls"
import { GET_ALL_USERS } from "Api/apiurls"

export const getAllUsers = async()=>{
    try {
        const response = await getAPI(GET_ALL_USERS,true)
        console.log('response from get all users api',response)
        return response
    } catch (error) {
        console.log('error in get all users api',error)
    }
}
export const getUserHouses = async(id)=>{
    try {
        console.log('body for user houses',id)
        const path = GET_USER_HOUSES+id
        const response = await getAPI(path,true)
        console.log('response from getuserhouses api',response)
        return response
    } catch (error) {
        console.log('error in getuser house api',error)
    }
}
export const getTeamsToList = async(id)=>{
    try{
        const path = GET_OTHER_TEAMS+id
        const response = await getAPI(path,true)
        console.log('response from get teams to list',response)
        return response
    }catch(error){
        console.log('errors in get teams to list',error)
    }
}
export const addMembersInTeam = async(teamid,body)=>{
    try {
        const path = ADD_MEMBERS_IN_TEAM+teamid
        const response = postAPI(path,body,true)
        console.log('response from add members in team',response)
        return response
    } catch (error) {
        console.log('errors in add in to team',error)
    }
}