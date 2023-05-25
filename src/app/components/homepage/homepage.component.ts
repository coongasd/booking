import { AfterContentInit, Component } from '@angular/core';
import { UserService } from 'src/app/services/user_services/user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['../../css/style.css']
})
export class HomepageComponent {

  currentUser: any;
  constructor(private userService: UserService){

  }
  ngOnInit(){
    this.userService.getSubject().subscribe(value => this.currentUser = value);
  }

}
