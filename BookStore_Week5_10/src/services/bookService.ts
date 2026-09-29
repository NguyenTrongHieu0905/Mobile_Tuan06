import {api} from './api'; import {Book,Category} from '../types';
export const bookService={
 async getBooks(params?:Record<string,unknown>){const r=await api.get<Book[]>('/books',{params}); return r.data;},
 async getBookById(id:string){const r=await api.get<Book>(`/books/${id}`); return r.data;},
 async getCategories(){const r=await api.get<Category[]>('/categories'); return r.data;}
};
