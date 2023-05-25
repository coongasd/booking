import { Component } from '@angular/core';
import { FormBuilder, Validators, FormControl, ValidationErrors, FormGroup } from '@angular/forms';
import {  Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  currentUser: any;
  ngOnInit(){
    this.us.getSubject().subscribe((user) => {
      this.currentUser = user;
    })
    if(this.currentUser){
      this.router.navigate(['/']);
    }
  } 

  constructor(private fb: FormBuilder, private toastr: ToastrService, private us: UserService, private spinner : NgxSpinnerService, private router: Router){}
  registerError: string;

  submit(){
    this.spinner.show();
    if(this.registerForm.invalid){
      this.toastr.error('Please fill all the input')
      this.registerForm.markAllAsTouched()
      this.spinner.hide()
      return;
     }
     this.us.userRegister(this.registerForm.value).subscribe((value) => {
      this.us.updateUser(value);
      
      this.spinner.hide();
      this.router.navigate(['/']);
      
     },
     err => {
      this.registerError = err.error.message;
      this.spinner.hide();
      console.log(err)

    }
     )



     
  }

  registerForm = this.fb.group({
    name: ['',Validators.required],
    email:['',Validators.email],
    password:['',Validators.minLength(6)],
    repeatPassword:['',[Validators.minLength(6)]],

  },
  {validator: this.matchingPasswordsValidator });
  

   matchingPasswordsValidator(form: FormGroup) {
    const password = form?.get('password')?.value;
    const repeatPassword = form.get('repeatPassword')?.value;
  
    if (password !== repeatPassword) {
      return { passwordsNotMatching: true };
    }
  
    return null;
  }

get f(){
  return this.registerForm.controls
}
}
