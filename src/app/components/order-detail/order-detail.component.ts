import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order_services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/order';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  order: Order;
  ngOnInit(): void {
    this.route.params.subscribe((value) => 
      this.orderService.getOrderById(value['id']).subscribe(value => {this.order = value
      console.log(value)}, err => console.log(err))
    )
    console.log(this.order)
  }
  constructor(private orderService: OrderService, private route: ActivatedRoute){

  }

}
