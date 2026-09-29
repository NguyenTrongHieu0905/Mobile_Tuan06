import {api} from './api'; import {Order} from '../types';
export const orderService={async create(data:Omit<Order,'id'>){const r=await api.post<Order>('/orders',data); return r.data;}, async getByUser(userId:string){const r=await api.get<Order[]>('/orders',{params:{userId}}); return r.data;}};
