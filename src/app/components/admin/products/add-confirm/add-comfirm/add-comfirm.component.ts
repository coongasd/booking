import { ProductService } from 'src/app/services/product_services/product.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-comfirm',
  templateUrl: './add-comfirm.component.html',
  styleUrls: ['./add-comfirm.component.css']
})
export class AddComfirmComponent {
  constructor(private toastr: ToastrService,public modal: NgbActiveModal, private fb: FormBuilder, private productService: ProductService) {}

  createUserForm = this.fb.group({

    productName: ['', Validators.required],
    price:[0,Validators.required],
    productType:['',Validators.required],
    productQty:[0],
    image:['', Validators.required]
  })

  ngOnInit(){
  
  
  }
  get f() {
    return this.createUserForm.controls
  }

  addNewProduct(){
    if(this.createUserForm.invalid){
      this.toastr.error('Please fill all the input')
      this.createUserForm.markAllAsTouched()
  
      
      return;
     }
    this.productService.postProduct(this.createUserForm.value).subscribe(value =>{
      console.log(value)
      this.modal.close('confirm');
    } 
  
    )
  }
  

}
