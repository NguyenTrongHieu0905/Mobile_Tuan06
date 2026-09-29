import {createSlice,PayloadAction} from '@reduxjs/toolkit'; import {CartItem} from '../types';
type State={items:CartItem[]}; const initialState:State={items:[]};
const slice=createSlice({name:'cart',initialState,reducers:{
 hydrateCart(s,a:PayloadAction<CartItem[]>){s.items=a.payload},
 addToCart(s,a:PayloadAction<string>){const x=s.items.find(i=>i.bookId===a.payload); if(x)x.quantity++; else s.items.push({bookId:a.payload,quantity:1})},
 removeFromCart(s,a:PayloadAction<string>){s.items=s.items.filter(i=>i.bookId!==a.payload)},
 updateQuantity(s,a:PayloadAction<{bookId:string;quantity:number}>){const x=s.items.find(i=>i.bookId===a.payload.bookId); if(x)x.quantity=Math.max(1,a.payload.quantity)},
 clearCart(s){s.items=[]}
}}); export const {hydrateCart,addToCart,removeFromCart,updateQuantity,clearCart}=slice.actions; export default slice.reducer;
