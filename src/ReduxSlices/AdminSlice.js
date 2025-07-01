import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isloggedin:true,
    searchText:''
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
        }
    }
})
export const {setisLoggedIn,setSearchText} = AdminSlice.actions
export default AdminSlice.reducer