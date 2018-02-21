import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user:User[]=[]
  constructor(private authService:AuthService,
  private router:Router) { }

  ngOnInit() {


    if(this.authService.loggedIn()==true)
    {
      this.getProfile()
  
    }
  }
  getProfile(){

    this.authService.getProfile().subscribe(profile => {
    this.user = profile.user;
   
  
    })
  }
  onLogoutClick(){
    console.log('asda');
    this.authService.logout();
    this.router.navigate(['/login']);
    return false;
  }
}
