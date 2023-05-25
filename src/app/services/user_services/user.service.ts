import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<any>(null);
  apiUrl = 'http://localhost:5000/api/user/';

  constructor(private http: HttpClient) {

    const currentUser = JSON.parse(localStorage.getItem('user') || '');
    this.userSubject.next(currentUser);
   
   }

   public getSubject(){
    return this.userSubject.asObservable();
   }
   public updateUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  
  userLogin(user: any) : Observable<any>{
   
    return this.http.post(`${this.apiUrl}login`,user)
  }

  userRegister(user: any) : Observable<any>{
    return this.http.post(`${this.apiUrl}register`, user)
  }

  changeProfile(user: any): Observable<any>{
    const currentUser = JSON.parse(localStorage.getItem('user') || '');
    const config ={
      headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
      },
  };
    return this.http.put(`${this.apiUrl}profile`,user,config);
  }


}
