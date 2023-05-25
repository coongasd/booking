import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from 'src/app/product';
import { CartService } from 'src/app/services/cart_services/cart.service';
import { OrderService } from 'src/app/services/order_services/order.service';
import { UserService } from 'src/app/services/user_services/user.service';
import { OrderConfirmComponent } from '../orderConfirm/order-confirm/order-confirm.component';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  
  isValid : boolean ;

  currentUser: any;
  selectedValue: any;
  products: Product[] = [];
  error: string;
  total : number;
  totalPrice: Observable<Number>;
  totalSubject = new BehaviorSubject<number>(0);
  constructor(private router: Router,private cartService: CartService, private orderService: OrderService, private userService: UserService, private toastr : ToastrService, private modalService: NgbModal
    ){

    
    
  }
  ngOnInit(){
 this.userService.getSubject().subscribe(value=> this.currentUser = value, err => console.log(err))
    this.cartService.getProducts().subscribe((value) => {
      this.products = value;
    },
    err => {
      this.error = err;
    });
    

  }

  removeProduct(product: Product){
  this.total = this.total - (product.price * product.productQty);
  this.totalSubject.next(this.total);
   this.cartService.removeFromCart(product)
    
  }

  onSelect(product: Product,event: any){
   product.productQty = event.target.value;
   this.total = this.products.reduce((prev, curr) => prev + curr.price * curr.productQty, 0);
    this.totalSubject.next(this.total);
   
  }
  placeOrder(){
    if(!this.currentUser){
      this.toastr.error('You need to log in to place an order');
      this.router.navigate(['/login']);
      return;
    }
    if(this.products.length === 0) {
      this.toastr.error('You have not picked anything yet!');
      return;
    }
    this.checkQty(this.products);
 
    if(!this.currentUser?.address || !this.currentUser?.phoneNumber){
      this.toastr.error('You need to setting your address and phone number in your profile!')
    this.router.navigate(['/profile'])

      return;
    }
    if(this.isValid){
      const modalRef = this.modalService.open(OrderConfirmComponent);
      modalRef.componentInstance.name = 'World';  
      modalRef.result.then((result) => {
    
        if(result === 'confirm'){
          this.orderService.placeOrder({products: this.products, shippingAddress:this.currentUser?.address,
            totalPrice: this.total, phoneNumber: this.currentUser?.phoneNumber, orderTime:new Date()})
            .subscribe((value) => {
              console.log(value)
            
          },
          err => console.log(err));
          this.toastr.success('Order successfully!');
         this.cartService.clearCart();
         this.router.navigate(['/']);
        }
      
          }
        ).catch((error) => {
        
        });
     
    }
   
    
    
  
  }
 
 
checkQty(products: Product[])  {
  for (let i = 0; i < products.length; i++) {
    if (products[i].productQty === 0) {
      this.toastr.error('Pick a quantity for product');
      this.isValid = false;
      break;
   
    }else{
      this.isValid = true;
    }
  }
 
}
 

}
