import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookingServiceService } from 'src/app/services/booking_services/booking-service.service';

@Component({
  selector: 'app-booking-management',
  templateUrl: './booking-management.component.html',
  styleUrls: ['./booking-management.component.css']
})
export class BookingManagementComponent {
  booking: any;
  constructor(private bookingService: BookingServiceService, private toastr: ToastrService){

  }
  ngOnInit(){
    this.bookingService.getBooking().subscribe(value => {
      this.booking = value;
      console.log(value)
    })
  }
  deleteBooking(booking: any){
    this.bookingService.deleteBooking(booking._id).subscribe(value => {
      this.toastr.success('Order deleted!');
      this.bookingService.getBooking().subscribe(data => {
        this.booking = data
       
      }
      )
    }
      )
  }

}
