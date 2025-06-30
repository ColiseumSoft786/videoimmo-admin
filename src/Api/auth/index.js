import { postAPI } from "Api"
import { LOGIN_URL } from "Api/apiurls"

export const loginadmin= async(body)=>{
    try {
        const response = postAPI(LOGIN_URL,body,false)
        console.log('response from admin login api',response)
        console.log('and its path',LOGIN_URL)
        return response
    } catch (error) {
        console.log('error in admin login',error)
    }
}