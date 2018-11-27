import { Component, OnInit } from '@angular/core';
import { ClientProfile } from 'src/app/kululaServices/kulula.model';
import { KululaService } from 'src/app/kululaServices/kulula.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  clientDetails:ClientProfile;
  IsError:boolean=false;
  IsComplete:boolean=false;
  btnSubmitClick:boolean=false;
  errorMsg:string='Unknown Error';
  constructor(private kululaService:KululaService) { }

  ngOnInit() {
    this.resetForm();
    this.clientDetails.Email= localStorage.getItem('userName');
    this.kululaService.GetclientDetails(1)
    .subscribe((data:any)=>{
      this.clientDetails.ClientID=data.ClientID;
      this.clientDetails.IdNumber=data.IdNumber;
      this.clientDetails.Gender=data.Gender;
      this.clientDetails.FirstName=data.FirstName;
      this.clientDetails.LastName=data.LastName;
      this.clientDetails.PhoneNo=data.PhoneNo;
      this.clientDetails.Address=data.Address;
      console.log('Loaded Client Details Succcessfully'+data.ClientID);
    },
    (err:HttpErrorResponse)=>{
      console.log('Failled to get data '+err.statusText);
    });
  }
  resetForm(form?:NgForm)
  {
    if(form !=null)
    form.reset();
    this.clientDetails={
      ClientID:0,
      Email:"",
      IdNumber:"",
      FirstName:"",
      LastName:"",
      Gender:"",
      Address:"",
      PhoneNo:""
    }
  }
  OnSubmit(form:NgForm)
  {
    this.btnSubmitClick=true;
    this.kululaService.ModifyclientDetails(this.clientDetails.ClientID,form.value)
    .subscribe((data:any) => {
      console.log('Details Modified Succcessfully');
      localStorage.removeItem('email');
      this.IsComplete=true;
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
