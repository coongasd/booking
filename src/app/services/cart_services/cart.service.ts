import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subject, map, scan } from 'rxjs';
import { Product } from 'src/app/product';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  items : Product[] = [];
  cartSubject = new BehaviorSubject<Product[]>([]);
  cart$ = this.cartSubject.asObservable();
  
  constructor(private toastr: ToastrService) {
    const storedItems = localStorage.getItem('cart');
    if (storedItems) {
      this.cartSubject.next(JSON.parse(storedItems));
    }
   }
  addProduct(product: Product) {
    const index = this.items.findIndex(item => item._id === product._id)
    console.log(index)
    if(index >= 0){
    this.toastr.error('This product already in your cart')
    } else{
      this.items.push(product);
      console.log(this.items)
      localStorage.setItem('cart', JSON.stringify(this.items));
      this.cartSubject.next(this.items);
      this.toastr.success('Order successfully!');
    }

 
  }
  getProducts(){
    const cart = localStorage.getItem('cart');

    if(cart){
      this.items = JSON.parse(cart);
      this.cartSubject.next(this.items);
    }
    return this.cartSubject.asObservable();
  }
  public clearCart() {
    this.items = [];
    localStorage.removeItem('cart');
    this.cartSubject.next(this.items);
  }

  removeFromCart(product: Product){
    const index = this.items.findIndex(item => item._id === product._id);
    if(index >= 0){
      this.items.splice(index, 1)
      localStorage.setItem('cart', JSON.stringify(this.items));
      this.cartSubject.next(this.items);
    } 
  }


  
 
 
 public totalAmount$: Observable<number> = this.cartSubject.pipe(
  scan((acc, items) => {
    return items.reduce((prev, curr) => prev + curr.price * curr.productQty, 0);
  }, 0)
);
  
}
