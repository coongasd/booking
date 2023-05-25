import { Product } from "./product";

export class Order {
    user: any;
    _id: string;
    products: Product[];
    orderTime: Date;
    shippingAddress: string;
    phoneNumber: string;
    totalPrice: number;
    
    constructor(id: string, user: object,
         products: Product[], orderTime: Date, shippingAddress:string,
         phoneNumber: string, totalPrice: number
         ){
        this._id = id;
        this.user = user;
        this.products = products;
        this.orderTime = orderTime;
        this.shippingAddress = shippingAddress;
        this.phoneNumber = phoneNumber;
        this.totalPrice = totalPrice;
    }
  
}
