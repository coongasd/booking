import { Component, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/order';
import { OrderService } from 'src/app/services/order_services/order.service';
import { UserService } from 'src/app/services/user_services/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  orders: Order[];
  currentUser: any;
  constructor(private orderService: OrderService, private userService: UserService, private router: Router,private toastr: ToastrService) {}


  ngOnChanges(change: SimpleChanges){
    console.log(change)
    
  }

  ngOnInit() {
    this.orderService.getOrders().subscribe(data => {
      this.orders = data
     
    }
      );
      this.userService.getSubject().subscribe(value => this.currentUser = value)
      

      if(!this.currentUser?.isAdmin){
        this.toastr.error('You are not allow to access this site');
        this.router.navigate(['/'])
      }
  }

  

  deleteOrder(order: Order){
    this.orderService.deleteOrder(order._id).subscribe(value=>{
      this.toastr.success('Order deleted!');
      this.orderService.getOrders().subscribe(data => {
        this.orders = data
       
      }
      )
    }
      )
    }
     
     
  
  editOrder(order: Order) {
    console.log(1);    
  }
  
}
