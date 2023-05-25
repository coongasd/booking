import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../user_services/user.service';
import { Order } from 'src/app/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  currentUser: any;


  constructor(private http: HttpClient, private userService: UserService) {
    this.userService.getSubject().subscribe(value => this.currentUser = value, error => console.log(error))
   
   }

  
  url = 'http://localhost:5000/api/order/'
  
  placeOrder(order: any): Observable<any>{
    const config = {
      
      headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.currentUser.token}`,
   
  }
}
   return this.http.post(this.url,order,config);
  }

  getOrders(): Observable<any>{
    return this.http.get(`${this.url}all`);
  }
  getOrderById(id: number): Observable<Order> {
    const url = `${this.url}/${id}`;
    return this.http.get<Order>(url);
  }

  updateOrder(order: Order): Observable<any> {
    const url = `${this.url}/${order._id}`;
    return this.http.put(url, order);
  }
  deleteOrder(id: string): Observable<any>{
    return this.http.delete(`${this.url}/${id}`)
  }
}
