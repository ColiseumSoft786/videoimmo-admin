import { postAPI } from "Api"
import { putAPI } from "Api"
import { deleteAPI } from "Api"
import { getAPI } from "Api"
import { ADD_TEAM_BY_ADMIN } from "Api/apiurls"
import { DELETE_TEAM } from "Api/apiurls"
import { GET_GIE_TEAMS_LENGTH } from "Api/apiurls"
import { GET_RECENT_TEAMS } from "Api/apiurls"
import { GET_AGENCY_TEAMS_LENGTH } from "Api/apiurls"
import { GET_ALL_TEAMS_LENGTH } from "Api/apiurls"
import { UPDATE_TEAM_MEMBERS } from "Api/apiurls"
import { UPDATE_TEAM_MANAGERS } from "Api/apiurls"
import { UPDATE_TEAM_NAME } from "Api/apiurls"
import { GET_ALL_TEAMS_BY_AGENCY } from "Api/apiurls"
import { GET_ALL_GIE_TEAMS } from "Api/apiurls"
import { GET_ALL_TEAMS_NAMES } from "Api/apiurls"
import { GET_ALL_TEAMS } from "Api/apiurls"

export const getAllTeams = async(page)=>{
    try {
        const path = GET_ALL_TEAMS+page
        const response = await getAPI(path,true)
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
export const getAllTeamsByGie = async(id,page)=>{
    try {
        const path = GET_ALL_GIE_TEAMS + id+`/${page}`
        const response = await getAPI(path,true)
        console.log('response from get all teams by gie',response)
        return response
    } catch (error) {
        console.log('error in get all teams by gie',error)
    }
}
export const getAllTeamsByAgency = async(id,page)=>{
    try {
        const path = GET_ALL_TEAMS_BY_AGENCY+id+`/${page}`
        const response = await getAPI(path,true)
        console.log('response from get all teams by agency',response)
        return response
    } catch (error) {
        console.log('error in get all teams by agency',error)
    }
}
export const addTeam = async(body)=>{
    try {
        const response = await postAPI(ADD_TEAM_BY_ADMIN,body,true)
        console.log('response from add team',response)
        return response
    } catch (error) {
        console.log('error in add team',error)
    }
}
export const updateTeamName = async(body,id)=>{
    try {
        const path = UPDATE_TEAM_NAME+id
        const response = await putAPI(path,body,true)
        console.log('response from update team name ',response)
        return response
    } catch (error) {
        console.log('error in update team name ',error)
    }
}
export const updateTeamMembers = async(body,id)=>{
    try {
        const path = UPDATE_TEAM_MEMBERS+id
        console.log('this is the path',path)
        const response = await putAPI(path,body,true)
        console.log('response from update team members',response)
        return response
    } catch (error) {
        console.log("error in update member",error)
    }
}
export const updateTeamManagers = async(body,id)=>{
    try {
        const path = UPDATE_TEAM_MANAGERS+id
        const response = await putAPI(path,body,true)
        console.log('response from update team managers',response)
        return response
    } catch (error) {
        console.log('error in update team managers',error)
    }
}
export const deleteTeam = async(id)=>{
    try {
        const path = DELETE_TEAM+id
        const response = await deleteAPI(path,{},true)
        console.log('response from delete team ',response)
        return response
    } catch (error) {
        console.log('error in delete team ',error)
    }
}
export const getAllTeamsLength = async(id)=>{
    try {
        const path = GET_ALL_TEAMS_LENGTH+id
        const response = await getAPI(path,true)
        console.log('response from get all teams length',response)
        return response
    } catch (error) {
        console.log('error in get all teams length ',error)
    }
}
export const getGieTeamsLength = async(id)=>{
    try {
        const path = GET_GIE_TEAMS_LENGTH+id
        const response = await getAPI(path,true)
        console.log('response from get gie teams length',response)
        return response
    } catch (error) {
        console.log('error in get gie teams length ',error)
    }
}
export const getAgencyTeamsLength = async(id)=>{
    try {
        const path = GET_AGENCY_TEAMS_LENGTH+id
        const response = await getAPI(path,true)
        console.log('response from get agency teams length',response)
        return response
    } catch (error) {
        console.log('error in get agency teams length ',error)
    }
}
export const getRecentTeams = async()=>{
    try {
        const response = await getAPI(GET_RECENT_TEAMS,true)
        console.log('response get recent teams',response)
        return response
    } catch (error) {
        console.log('error in get recent teams',error)
    }
}