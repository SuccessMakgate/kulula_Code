import { Component, OnInit } from '@angular/core';
import { carhire } from '../kululaServices/kulula.model';
import { NgForm } from '@angular/forms';
import { KululaService } from '../kululaServices/kulula.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { DateInputs } from '../date-inputs.dateConfig';

@Component({
  selector: 'app-carhire',
  templateUrl: './carhire.component.html',
  styleUrls: ['./carhire.component.css']
})
export class CarhireComponent implements OnInit {
  Carhire:carhire;
  dateinputs:any;
  IsError:boolean=false;
  errorMsg:string='Unknown Error';
  btnSubmitClick :boolean=false;
  d:DateInputs=new DateInputs();
  constructor(private kululaService:KululaService,private router:Router) { }

  ngOnInit() {
    this.dateinputs=this.d.getDateConfig();
    this.resetForm();
    $(document).ready(function () {
   
      $('#showId').click(function () {
       $('#carsId').removeClass('hide');
       $('#detailsId').removeClass('hide');
       $(this).addClass('hide');
       $.ajax({
        url: 'http://localhost:4344/api/CarModels',
        method: 'get',
        success: function (data) {
          data.forEach(function (data) {
            $('#carsId').append('<option>'+ data.CarName + '</option>');
        }) },
        error: function (jqXHR) {
            $('#carsId').append('<option class="red"> server connection fails </option>');
            console.log('fail to get car name'+jqXHR.error);
        }
     });
       
     });
   });
   $(function () {
    $('#carsId').on('click', function () {
        var selectCar = $(this).val();
        $.ajax({
          url: 'http://localhost:4344/api/CarModels/'+selectCar,
          method: 'get',
          success: function (data) {
            var imageUrl='http://localhost:4344/image/'+data.carImage;
            $('#img').empty().append('<img src="'+imageUrl+'" style="width:100px;height:100px;" class="circle">');
            $('#price').empty().append('Price: R'+data.price);
            $('#year').empty().append('Year Model: '+data.YearModel);;
            $('#color').empty().append('Colour: '+data.CarColour);
            console.log('selected is '+imageUrl)
          },
          error: function (jqXHR) {
            console.log('fail');
          }
        })
        var picNameurl='http://localhost:4344/api/CarModels/'+selectCar+'/pic';
        var SeatImage = "flightSeat.jpg";
        
        
        $("#prepaidS_img").empty().append('<img src="' + SeatImage + '" class="img-rounded" alt="Cinque Terre" width="304" height="236">');
    })
})
  }
  resetForm(form?:NgForm)
  {
    if(form !=null)
    form.reset();
    this.Carhire={
      pickUp:"",
      DropOff:"",
      IsReturn:false,
      PickDate:"",
      CarName:""
    }
  }

  OnSubmit(form:NgForm)
  {
    this.btnSubmitClick=true;
    this.kululaService.hireCar(form.value)
    .subscribe((data:any) => {
      console.log('Carhire Success');
      this.router.navigate(['/payment']);
    },
    (err:HttpErrorResponse)=>{
      console.log('Error :'+err.message);
      if(err.status==400) this.errorMsg='invalid input(s) format ,Please enter correct input(s) format'; 
      else if(err.status==500) this.errorMsg='server error! server can not be reached'; 
      this.IsError=true;
    }
    );
  }
}
