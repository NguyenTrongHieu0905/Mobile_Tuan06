import {api} from './api'; import {User} from '../types';
export const authService={
 async login(email:string,password:string){const r=await api.get<User[]>('/users',{params:{email,password}}); if(!r.data[0]) throw new Error('Email hoặc mật khẩu không đúng'); const user=r.data[0]; return {user,token:`demo-token-${user.id}`};},
 async register(data:{name:string;email:string;password:string;phone?:string}){const exists=await api.get<User[]>('/users',{params:{email:data.email}}); if(exists.data.length) throw new Error('Email đã tồn tại'); const r=await api.post<User>('/users',{...data,phone:data.phone||''}); return {user:r.data,token:`demo-token-${r.data.id}`};},
 async updateUser(id:string,data:Partial<User>){const r=await api.patch<User>(`/users/${id}`,data); return r.data;}
};
