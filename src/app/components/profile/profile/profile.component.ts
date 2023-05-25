import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user_services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser:any;

  userForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private us: UserService, private router: Router, private spinner: NgxSpinnerService,private toastr: ToastrService ) { }

  ngOnInit() {  
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(10),Validators.pattern("^[0-9]*$")]],
      address: ['',Validators.required],
     
    });
    

    this.us.getSubject().subscribe((user) => {
      this.currentUser = user;
 

    
      if(!this.currentUser){
        this.router.navigate(['/login']);
      
      }
     
      this.userForm?.patchValue({
        name: user?.name,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        address: user?.address,
      });
     
      
    
    })


   



  }

  get f() { return this.userForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log(this.userForm.value)
    if (this.userForm.invalid) {
      this.toastr.error('Invalid form');
      return;
    }
    this.us.changeProfile(this.userForm.value).subscribe((value)=> {
      this.us.updateUser(value);
      this.toastr.success('Change profile successfully!')
    }
    ,
    err => console.log(err))

  
    // submit form data to server
  }
}
