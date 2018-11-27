import { Component, OnInit } from '@angular/core';
import { register } from 'src/app/kululaServices/kulula.model';
import { KululaService } from 'src/app/kululaServices/kulula.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errorMsg:string='fail to connect server';
  registration:register;
  IsError:boolean=false;
  btnSubmitClick:boolean=false;
  
  constructor(private kululaService:KululaService,private router:Router) {
    
   }
   
  ngOnInit() {
    this.resetForm();
    
  }
  
  resetForm(form?:NgForm)
  {
    if(form !=null)
    form.reset();
    this.registration={
      Password:"",
      Email:"",
      ConfirmPassword:""
    }
  }
  
  OnSubmit(form:NgForm)
  {
    this.btnSubmitClick=true;
    console.log('Email '+this.registration.Email);
    localStorage.setItem('email',this.registration.Email);
    this.kululaService.register(form.value)
    .subscribe((data:any) => {
      console.log('Registration Succcess')
      this.resetForm(form); 
      this.router.navigate(['account/client_details']);
    },
    (err : HttpErrorResponse)=>{
      console.log('Error status '+err.statusText);
      this.IsError=true;
      if(err.status==400) this.errorMsg='invalid input(s) format ,Please enter correct input(s) format'; 
      else if(err.status==500) this.errorMsg='server error! server can not be reached'; 
    }
    );
  }
}
