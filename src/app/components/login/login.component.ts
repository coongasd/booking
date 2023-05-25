import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user_services/user.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth_services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  currentUser:any;
  ngOnInit(): void{
    this.us.getSubject().subscribe((user) => {
      this.currentUser = user;
    })
    if(this.currentUser){
      this.router.navigate(['/']);
    }
   
  }
   
 
  constructor(private us: UserService, private fb: FormBuilder,private toastr: ToastrService, private spinner: NgxSpinnerService, private router: Router, private authService: AuthService){
  
  }
  loginForm = this.fb.group({
    email: ['', {validators:[Validators.required , Validators.email]}],
    password: ['', Validators.required],
  })

  get f() {
    return this.loginForm.controls;
  }

error: string;
  submit() {
   this.spinner.show();
    if(this.loginForm.invalid){
      this.toastr.error('Please fill all the input')
      this.loginForm.markAllAsTouched()
      return;
     }

    this.us.userLogin(this.loginForm.value).subscribe(
      (value) =>{
        this.spinner.hide()
       this.us.updateUser(value);
       this.router.navigate(['/'])
    
      } ,

       error => {
        this.spinner.hide()
        this.error = error.error.message 
        console.log(this.error)
     
       }
        )

    }

}
