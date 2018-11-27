import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KululaService } from 'src/app/kululaServices/kulula.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginError:boolean=false;
  errorMsg:string='fail to connect server';
  btnSubmitClick:boolean=false;
  constructor(private kululaservice:KululaService ,private router:Router) { }

  ngOnInit() {
  }
  OnSubmit(UserName,Password){
    this.btnSubmitClick=true;
    this.kululaservice.userAuthentication(UserName,Password).subscribe(
    (data:any)=>{
      localStorage.setItem('userToken',data.access_token);
      localStorage.setItem('userName',data.userName);
      console.log('Bearer'+localStorage.getItem('userToken'));
      location.reload();
      this.router.navigate(['/home']);
      
    },
    (err : HttpErrorResponse)=>{
       this.isLoginError=true;
       console.log('Error status '+err.statusText);
       console.log('Error msg '+err.message);
       if(err.status==400) this.errorMsg='Incorrect Password'; 
       else if(err.status==500) this.errorMsg='server error! server can not be reached'; 
    })
}

}
