import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/services/product_services/product.service';
import { UserService } from 'src/app/services/user_services/user.service';
import { AddComfirmComponent } from './add-confirm/add-comfirm/add-comfirm.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProductComponent } from './edit-product/edit-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {


  data : any;
  currentUser: any;
  products : Product[] = [];
  constructor(private modalService: NgbModal,private router: Router,private toastr: ToastrService ,private productService: ProductService, private userService: UserService){
  
  }
  ngOnInit(){

    //check if user is not admin, push to the hompage
    this.userService.getSubject().subscribe(value => {
      this.currentUser = value;
      if(!this.currentUser?.isAdmin){
        this.toastr.error("You can't access this site! ");
        this.router.navigate(['/']);

      }
    });

    this.productService.getAllProduct().subscribe(value => {
      this.products = value;
   
    },
    err => console.log(err)
    );
  


  }
  deleteProduct(product: Product){
    this.productService.deleteProduct(product._id).subscribe(value => {
      this.toastr.success('Order deleted!');
      this.productService.getAllProduct().subscribe(data => {
        this.products = data
       
      }
      )
    });
  }


  open() {
    
    const modalRef = this.modalService.open(AddComfirmComponent);
    modalRef.componentInstance.name = 'World';
    modalRef.result.then((result) => {
      if(result === 'confirm'){
        this.productService.getAllProduct().subscribe(value => this.products = value)
      }
   
      }
    ).catch((error) => {
      console.log(`Dismissed with error: ${error}`);
    });
  }
editProduct(product: any){

  console.log(product._id)
  this.productService.getProductDetail(product._id).subscribe(value => {
 
    this.data = value;
    const modalRef = this.modalService.open(EditProductComponent);
    modalRef.componentInstance.data = this.data;
    modalRef.result.then((result) => {
      if(result === 'confirm'){
        this.productService.getAllProduct().subscribe(value => this.products = value)
      }
   
      }
    )
   
  })

 
}


}
