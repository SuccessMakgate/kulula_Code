import { Component, OnInit } from '@angular/core';
import { ClientDetails } from 'src/app/kululaServices/kulula.model';
import { KululaService } from 'src/app/kululaServices/kulula.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-details',
  templateUrl: './add-details.component.html',
  styleUrls: ['./add-details.component.css']
})
export class AddDetailsComponent implements OnInit {
  clientDetails:ClientDetails;
  IsError:boolean=false;
  IsSuccess:boolean=false;
  errorMsg:string='Unknown Error';
  btnSubmitClick:boolean=false;
  constructor(private kululaService:KululaService,private router:Router) { }

  ngOnInit() {
    this.resetForm();
    this.clientDetails.Email=localStorage.getItem('email');
  }
  resetForm(form?:NgForm)
  {
    if(form !=null)
    form.reset();
    this.clientDetails={
      Email:"",
      IdNumber:"",
      FirstName:"",
      LastName:"",
      Gender:"",
      Address:"",
      PhoneNo:""
    }
  }
  btn_regSuccess(){
    this.router.navigate(['account/login']);
  }
  OnSubmit(form:NgForm)
  {
    this.btnSubmitClick=true;
    this.kululaService.clientDetails(form.value)
    .subscribe((data:any) => {
      console.log('Adding Details Succcess');
      localStorage.removeItem('email');
      this.IsSuccess=true;
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
