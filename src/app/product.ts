export class Product {
    _id : string;
    productName : string;
    price: number;
    productQty: number;
    image:string;
    productType:string;
    
    constructor(id: string, name: string, price: number, productQty: number, image:string,productType: string){
        this._id = id;
        this.productName = name;
       this.price = price;
       this.productQty = productQty;
       this.image = image
       this.productType = productType;
    }
  
}
