import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { seatbook } from '../kululaServices/kulula.model';
@Component({
  selector: 'app-seat-book',
  templateUrl: './seat-book.component.html',
  styleUrls: ['./seat-book.component.css']
})
export class SeatBookComponent implements OnInit {
  btnSubmitClick:boolean=false;
  constructor() { }

  ngOnInit() {
    $(document).ready(function () {
      $('#tabs #id_flightSeat').addClass('inactive');
      var aircraftID= sessionStorage.getItem('aircraftID');
      sessionStorage.removeItem('aircraftID');
      var address = 'http://localhost:4344/api/SeatBookings/'+aircraftID;
      $.ajax({
        url: address,
        method: 'get',
        success: function (data) {
          sessionStorage.setItem('FkId', data.AircraftId);
          console.log(data.AircraftId);
          console.log('success :get  SeatBook');
        },
        error: function (jqXHR) {
            console.log('Fail: can not get  SeatBook Web Services');
         }
        });
      //Post Prepaid Seat
      $('#btnPrepaid').on('click', function () {
        var FkID=sessionStorage.getItem('FkId');
        $.ajax({
              url: 'http://localhost:4344/api/SeatBookings',
              method: 'post',
              data: {
               SeatName: $('#seatId').val(),
               AircraftId: FkID,
               PaymentStatus: false,
        
              },
              success: function (seatData) {
                console.log("success", seatData);
                $('.tab-pane.active').slideUp(3, function () {
                    $('#tab_payment').slideDown(300, function () {
                        $(this).addClass('active');   
                    });
                });
                $('#tabs #id_payment').addClass('inactive');
                sessionStorage.removeItem('FkId');
             },
             error: function (jqXHR) {
                console.log("fail" + jqXHR.responseText);
             }
        })
      });
    })
    //Activate Payment Tab --to be removed
    // $('#btnPrepaid').on('click', function () {
    //       $('.tab-pane.active').slideUp(3, function () {
    //           $('#tab_payment').slideDown(300, function () {
    //               $(this).addClass('active');
    //           });
    //       });
    //       $('#tabs #id_payment').addClass('inactive');
    //   })
      //Select Prepaid Seat
      $(function () {
        $('#seatId').on('click', function () {
          
            var selectSeat = $('#seatId').val();
            var SeatImage = "src/kululaicon.jpg";
            if (selectSeat == "Standard Seat") SeatImage = "src/images/standartSeat.jpg";
            else if (selectSeat == "Aisle chair") SeatImage = "src/images/aisleSeat.jpg";
            else if (selectSeat == "window seat") SeatImage = "src/images/windowSeat.jpg";
            else if (selectSeat == "amenities Seat") SeatImage = "src/images/amentiesSeat.jpg";
            else if (selectSeat == "First Class Seat") SeatImage = "src/images/firstclassSeat.jpg";
            $("#prepaidS span").empty().append(selectSeat);
            $("#prepaidS_img").empty().append('<img src="' + SeatImage + '" class="img-rounded" alt="Cinque Terre" width="304" height="236">');
        })
    })
}}
