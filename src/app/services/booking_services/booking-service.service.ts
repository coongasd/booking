import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {

  constructor(private http: HttpClient ) { }
  apiUrl = 'http://localhost:5000/api/booking/'
  postBooking(booking: any): Observable<any>{
    return this.http.post(this.apiUrl,booking);
  }

  getBooking(): Observable<any>{
    return this.http.get(this.apiUrl);
  }
  deleteBooking(id: string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
}
