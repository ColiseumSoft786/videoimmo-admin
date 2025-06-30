import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isloggedin:false
}
const AdminSlice = createSlice({
    name:'admin',
    initialState,
    reducers:{
        setisLoggedIn:(state,action)=>{
            state.isloggedin = action.payload
        }
    }
})
export const {setisLoggedIn} = AdminSlice.actions
export default AdminSlice.reducer