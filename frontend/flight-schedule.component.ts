import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'app-flight-schedule',
  templateUrl: './flight-schedule.component.html',
  styleUrls: ['./flight-schedule.component.css']
})
export class FlightScheduleComponent implements OnInit {
  vall:boolean=false;
  constructor() {}
  
  ngOnInit() {
    $(document).on('click', '#trTable div #btnBook', function (event) {
      var value = $(this).attr('rel');
      console.log(value);
      sessionStorage.setItem('aircraftID', value);
      window.location.href = "/seatbook";
  });
 
  $(document).ready(function () {
    $.ajax({
      url: 'http://localhost:4344/api/FlightBooks',
      method: 'get',
      success: function (data) {
       if(data != null){
        const dad = data.DepartDate;
        console.log(data[0].DepartDate)
        console.log(data)
        var btn='';
        var clss='';
        var Isdisabled='';
        
        for (var i = 0; i < data.length; i++) {
          if (data[i].aircrafts.length >= 1) {
            
            for (var j = 0; j < data[i].aircrafts.length; j++) {
              var full=data[i].aircrafts[j].MaxSeats - data[i].aircrafts[j].NumSeatBooked;
              if (data.IsFlightFull === true || full <= 0) {
                  btn = 'Flight Full';
                  clss = 'style="background-color: red;"';
                  Isdisabled='disabled';
               } else {
                  btn = 'Book Now';
                  clss = 'style="background-color: green;"';
                  Isdisabled='';
                }
              console.log(data[i]);
              var time=new Date(data[i].DepartTime);
              var date=new Date(data[i].DepartDate);
      
              
              $('#trTable').append('<div class="row">'
                  + '<div class="col s8" id="FlightName"><span class="label label-info "><img src="http://localhost:4344/image/'+data[i].aircrafts[j].AircraftLogo+
                  '" class="img-rounded" alt="Cinque Terre" width="50" height="70">' + data[i].aircrafts[j].AircraftName 
                  +' '+ data[i].aircrafts[j].AircraftNo+ '</span></div>'
                  + '<div class="col s8" id="DepartDate"><span class="label label-info">' +(date).toLocaleDateString()+'-@'+(time).toLocaleTimeString()+'</span></div>'
                  + '<div class="col s8" id="ArriveDate"><span class="label label-info">' + (data[i].aircrafts[j].MaxSeats - data[i].aircrafts[j].NumSeatBooked)  + '</span></div>'
                  + '<div class="col s8" id="ArriveDate"><span class="label label-info">R' + data[i].aircrafts[j].price  + '</span></div>'
                  + '<div class="clo s8" id="FlightStatus"><span class="label label-info"><input type="button" href="/home" id="btnBook"rel="'+data[i].aircrafts[j].AircraftId+'"  '+clss+' '+Isdisabled+' value="'+btn+'"/></span></div></div>');
              }
       }
      } 
    }
       else{
         $('#trTable').append('<div class="col-lg-12 center"><h4>No Matching Schedule Was Found!</h4></div>')
         $('#trTable').append('<div class="col-lg-12 center"><h6 class="btn-small" href="/home">Click to search again</h6></div>')
       }
      },
      Error: function (jqXHR) {
          console.log('Failled To Load Schedule');
      },
  });
});
}
callbtn()
{
  console.log('call btn click');
}
}
