import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product_services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {
  @Input() data: any;
  constructor(private toastr: ToastrService,public modal: NgbActiveModal, private fb: FormBuilder, private productService: ProductService) {}
  id: string;

  editProductForm = this.fb.group({

    productName: ['', Validators.required],
    price:[0,Validators.required],
    productType:['',Validators.required],
    productQty:[0],
    image:['', Validators.required]
  })

  ngOnInit(){
    this.editProductForm.patchValue(this.data);
  }
  get f() {
    return this.editProductForm.controls;
  }

  editProduct(){
    if(this.editProductForm.invalid){
      this.toastr.error('Please fill all the input')
      this.editProductForm.markAllAsTouched()
  
      
      return;
     }
     this.productService.updateProduct(
      this.editProductForm.value
     ,this.data._id).subscribe(value => {
      this.toastr.success('Product updated!');
      this.modal.close('confirm');
     })
    
     
    } 
  
    
  
}
