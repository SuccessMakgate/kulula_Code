import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  Login:any;
  constructor(private router:Router) { }

  ngOnInit() {
    this.Login=localStorage.getItem('userName');
    if(this.Login != null && this.Login =="admin@kulula.com" ){
      $(document).ready(function(){
        $('#tabs li a').on('click', function () {
           $('#tabs li').removeClass('inactive');
           $('#tabs li').addClass('active');
          $('#tabs li').on('click', function () {
              $(this).removeClass('active');
              $(this).addClass('inactive');
          })
        var panel = $(this).attr('rel');
        $('.tab-pane.active').slideUp(300, function () {
          $('#' + panel).slideDown(300, function () {
              $(this).addClass('active');
          });
        })   
      })
    });
   }
    else {
      this.router.navigate(['/home']);
    }
    
  }

}
