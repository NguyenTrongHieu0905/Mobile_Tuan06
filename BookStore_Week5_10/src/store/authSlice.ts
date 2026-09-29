import {createSlice,PayloadAction} from '@reduxjs/toolkit'; import {User} from '../types';
type State={user:User|null;token:string|null;isLoggedIn:boolean}; const initialState:State={user:null,token:null,isLoggedIn:false};
const slice=createSlice({name:'auth',initialState,reducers:{setAuth(s,a:PayloadAction<{user:User;token:string}>){s.user=a.payload.user;s.token=a.payload.token;s.isLoggedIn=true},setUser(s,a:PayloadAction<User>){s.user=a.payload},logout(s){s.user=null;s.token=null;s.isLoggedIn=false}}}); export const {setAuth,setUser,logout}=slice.actions; export default slice.reducer;
