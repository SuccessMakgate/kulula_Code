import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as $ from 'jquery';
import { KululaService } from '../kululaServices/kulula.service';
import { FlightSearch } from '../kululaServices/kulula.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { DateInputs } from '../date-inputs.dateConfig';


@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  FSearch:FlightSearch ;
  IsReturnBind:boolean=true;
  IsError:boolean=false;
  HideReturnForm:boolean=true;
  btnSubmitClick:boolean=false;
  errorMsg:string='Unknown Error';
  dateinputs:any;
  constructor(private kululaService:KululaService,private router:Router) {}
  d:DateInputs=new DateInputs();
  
  ngOnInit() {
    this.dateinputs=this.d.getDateConfig();
    this.resetForm();
    console.log('Bearer'+localStorage.getItem('userToken'));
    
    $(document).ready(function(){
      $('select').click(function(){
        const Isreturn = $('select').val();
        
        if(Isreturn === 'true'){
         // $('#returnDate').attr('disabled', false);
          $('#returnDate').removeClass('hide');
          
        }
        else{ 
          $('#returnDate').addClass('hide');
          
        }
      });    
  });

  }
  resetForm(form?:NgForm)
  {
    if(form !=null)
    form.reset();
    this.FSearch={
     DestPlace: "",
     DepartPlace:"",
     DepartDate: "",
     returnDate: "",
     IsReturn: false,
     NumPeople: 1
    }
  }

  OnSubmit(form:NgForm)
  {
    //if(this.FSearch.IsReturn=false) this.FSearch.returnDate=new Date(Date.now()).toDateString();
    this.btnSubmitClick=true;
    this.FSearch.IsReturn=this.IsReturnBind;
    this.kululaService.searchFlight(form.value)
    .subscribe((data:any) => {
      console.log('Flight Search Success');
      this.router.navigate(['/flightschedule']);
      
    },
    (err:HttpErrorResponse)=>{
      console.log('Error :'+err.message);
      console.log('Error :'+err.status);
      if(err.status==400) this.errorMsg='invalid input(s) format ,Please enter correct input(s) format'; 
      else if(err.status==500) this.errorMsg='Internal server error! Try again later'; 
      this.IsError=true;
    }
    );
  }
}
