import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { payment } from '../kululaServices/kulula.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  payment:payment
  constructor() { }

  ngOnInit() {
    
    $(document).ready(function () {

      $('#PaymentTabs li a').on('click', function () {
        var selectList = $(this).attr('rel');

        $('#PayContent .tab-pane.active').slideUp(300, function () {
            $('#' + selectList).slideDown(300, function () {
                $(this).addClass('active');

            });
        });
    });
    // ===========================Post Payment==================================================
    $('#btnPayment').click(function () {
        var isFlightBook=true;
        if(($('#IsCarhire').val())=='true')  isFlightBook=false;
      $.ajax({
          url: 'http://localhost:4344/api/payments',
          method: 'post',
          headers :{'Authorization':'bearer '+localStorage.getItem('userToken')},
          data: {
              PayMethod: 'CreditCard',
              AccHolder: $('#txtCardholder').val(),
              AccountNo: $('#txtCardNum').val(),
              CardNo: $('#txtCardNum').val(),
              IsCarhire: $('#IsCarhire').val(),
              IsSeatBook:isFlightBook,
          },
          success: function (Data) {
              console.log("Payment success"); 
              $('#payForm').hide(1000); 
              if($('#IsCarhire').val()=='true') window.location.href = "/payment/carhire_receipt";
              else window.location.href = "/payment/flightbook_receipt";
          },
          error: function (jqXHR) {
              console.log("fail" + jqXHR.responseText);     
          }
      })
  })
  })
  
}


}