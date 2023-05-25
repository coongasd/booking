import { ProductService } from './../../services/product_services/product.service';
import { Product } from './../../product';
import { ToastrService } from 'ngx-toastr';
;
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from 'src/app/services/cart_services/cart.service';
import { UserService } from 'src/app/services/user_services/user.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['../../css/style.css']
})
export class MenuComponent implements OnInit, OnChanges {
 constructor(private route: ActivatedRoute ,private cartService: CartService,private productService : ProductService, private spinner : NgxSpinnerService,private toastr: ToastrService, private userService: UserService, private router: Router ){}

 

  productsSource = new BehaviorSubject<Product[]>([]);
  productsObservable = this.productsSource.asObservable();
  products : Product[] =[];
  category: string;
  currentUser: any;


  ngOnChanges(changes: SimpleChanges) {
    this.route.params.subscribe(params => {
      // Lấy giá trị mới của param từ URL
      this.category = params['category'];
      
      // Tải lại dữ liệu với ID mới
    
    });
  }


  ngOnInit(){
    //check if user has logged in yet
    this.route.queryParams.subscribe(params => {

      this.category = params['category'];
      this.productService.getProduct(this.category).subscribe(data => {
  
        this.products = data;
          if(this.products){
           this.spinner.hide()  ;
          }
        },
      )
    })


    this.userService.getSubject().subscribe((user) => {
      this.currentUser = user;
    })
   


    
    this.spinner.show()
    this.productService.getProduct(this.category).subscribe(data => {
  
    this.products = data;
      if(this.products){
       this.spinner.hide()  ;
      }
    },
    error => {
        setTimeout(() => {
          console.log(error)
          this.toastr.error('Failed to load resource')
          this.spinner.hide()
        },2000)
      
      console.log(error)
    } 
    )

  } 
  addToCart(product: Product){
    if(!this.currentUser){
      this.toastr.error('You need to log in to place an order')
      setTimeout(() => {
        this.router.navigate(['/login']);
      },2000)
      return;
    }

    this.cartService.addProduct(product);

    
  }
 

  
}

