import {api} from './api'; import {Review} from '../types';
export const reviewService={async getByBook(bookId:string){const r=await api.get<Review[]>('/reviews',{params:{bookId}}); return r.data;}, async add(data:Omit<Review,'id'>){const r=await api.post<Review>('/reviews',data); return r.data;}};
