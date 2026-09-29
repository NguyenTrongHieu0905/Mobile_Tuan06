export type Book={id:string;title:string;author:string;categoryId:string;price:number;image:string;stock:number;description:string};
export type Category={id:string;name:string};
export type User={id:string;name:string;email:string;phone:string;password?:string};
export type Review={id:string;bookId:string;userId:string;userName:string;rating:number;comment:string;createdAt:string};
export type CartItem={bookId:string;quantity:number};
export type OrderItem={bookId:string;title:string;price:number;quantity:number};
export type Order={id:string;userId:string;items:OrderItem[];total:number;status:string;createdAt:string;shipping:{name:string;phone:string;address:string};payment:string};
export type NotificationItem={id:string;title:string;body:string;time:string;read:boolean;target?:string};
