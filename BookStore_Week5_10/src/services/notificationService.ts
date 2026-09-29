import {api} from './api'; import {NotificationItem} from '../types';
export const notificationService={async all(){const r=await api.get<NotificationItem[]>('/notifications');return r.data;},async markRead(id:string){await api.patch(`/notifications/${id}`,{read:true});}};
