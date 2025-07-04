import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isloggedin:true,
    searchText:'',
    GEIs:[
        {
        name: 'GEI1',
        Phone: '10239402394',
        country_Code: '+33',
        Tokens: 20,
        expiryDate: '2026-04-20'
    },
    {
        name: 'GEI2',
        Phone: '10239402395',
        country_Code: '+33',
        Tokens: 25,
        expiryDate: '2026-04-21'
    },
    {
        name: 'GEI3',
        Phone: '10239402396',
        country_Code: '+33',
        Tokens: 15,
        expiryDate: '2026-04-22'
    },
    {
        name: 'GEI4',
        Phone: '10239402397',
        country_Code: '+33',
        Tokens: 30,
        expiryDate: '2026-04-23'
    },
    {
        name: 'GEI5',
        Phone: '10239402398',
        country_Code: '+33',
        Tokens: 18,
        expiryDate: '2026-04-24'
    },
    {
        name: 'GEI6',
        Phone: '10239402399',
        country_Code: '+33',
        Tokens: 22,
        expiryDate: '2026-04-25'
    },
    {
        name: 'GEI7',
        Phone: '10239402400',
        country_Code: '+33',
        Tokens: 19,
        expiryDate: '2026-04-26'
    },
    {
        name: 'GEI8',
        Phone: '10239402401',
        country_Code: '+33',
        Tokens: 27,
        expiryDate: '2026-04-27'
    }
    ]
}
const AdminSlice = createSlice({
    name:'admin',
    initialState,
    reducers:{
        setisLoggedIn:(state,action)=>{
            state.isloggedin = action.payload
        },
        setSearchText:(state,action)=>{
            state.searchText=action.payload
        },
        addGEi:(state,action)=>{
            state.GEIs.unshift(action.payload)
        },
        deleteGEI:(state,action)=>{
            state.GEIs=state.GEIs.filter((gei)=>gei.name!==action.payload)
        },
        editGEI:(state,action)=>{
            const geitoedit = state.GEIs[action.payload.index]
            geitoedit.Phone=action.payload.Phone
            geitoedit.name= action.payload.name
            geitoedit.Tokens = action.payload.Tokens
            geitoedit.country_Code = action.payload.country_Code
            geitoedit.expiryDate = action.payload.expiryDate
        }
    }
})
export const {setisLoggedIn,setSearchText,addGEi,deleteGEI,editGEI} = AdminSlice.actions
export default AdminSlice.reducer