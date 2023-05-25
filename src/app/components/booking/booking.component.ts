import { BookingServiceService } from './../../services/booking_services/booking-service.service';

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, ValidationErrors } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'; 
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { BookingComfirmComponent } from './bookingConfirm/booking-comfirm/booking-comfirm.component';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user_services/user.service';


@Component({
  selector: 'app-menu',
  templateUrl: './booking.component.html',
  styleUrls: ['../../css/style.css']
})

export class BookingComponent {
  currentUser: any;
  constructor(private fb: FormBuilder, private bs : BookingServiceService,private modalService: NgbModal,private toastr: ToastrService, private router: Router, private userService: UserService){}
  
  bookingForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', {validators:[Validators.required , Validators.email]}],
    phoneNumber: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(10),Validators.pattern("^[0-9]*$")]],
    qty : [2,Validators.required],
    date: ['',[Validators.required, this.validateDate]]

  })
ngOnInit(){
  this.userService.getSubject().subscribe(value => this.currentUser = value,
    err => console.log(err) );
    this.bookingForm.patchValue({name: this.currentUser?.name, email: this.currentUser?.email, phoneNumber: this.currentUser.phoneNumber});
    console.log(this.currentUser)
}

  validateDate(control: FormControl): ValidationErrors | null {
    const date = new Date(control.value);
    const today = new Date();
    return date < today ? { invalidDate: true } : null;
  }

  onSubmit(){
   
   
  }
  today = new Date()
  //get form control
  get f() {
    return this.bookingForm.controls
  }
  
  //open popup to confirm booking
  open() {
    if(this.bookingForm.invalid){
      this.toastr.error('Please fill all the input')
      this.bookingForm.markAllAsTouched()
  
      
      return;
     }
    const modalRef = this.modalService.open(BookingComfirmComponent);
    modalRef.componentInstance.name = 'World';
    modalRef.result.then((result) => {
      if(result === 'confirm'){
        this.bs.postBooking(this.bookingForm.value).subscribe(
          response => {
               this.toastr.success('Booking success');
              this.router.navigateByUrl('/');
          }, error => {
            console.log(error)
            this.toastr.error('Booking fail')
          }
        )
      }
   
      }
    ).catch((error) => {
      console.log(`Dismissed with error: ${error}`);
    });
  }

}



