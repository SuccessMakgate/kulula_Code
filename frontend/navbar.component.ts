import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  IsLogin:boolean=false;
  IsAdmin:boolean=false;
  Login:string=null;
  constructor() { }

  ngOnInit() {
    this.Login=localStorage.getItem('userName');
    if(this.Login != null){
      if(this.Login =="admin@kulula.com") this.IsAdmin=true;
      else this.IsLogin=true;
    }
    else {
      this.IsLogin=false;
    }
  }

}
