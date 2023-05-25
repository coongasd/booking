import { Component } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-booking-comfirm',
  templateUrl: './booking-comfirm.component.html',
  styleUrls: ['./booking-comfirm.component.css']
})
export class BookingComfirmComponent {


  constructor(public modal: NgbActiveModal) {}

  
}
