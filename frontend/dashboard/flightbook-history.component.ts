import { Component, OnInit } from '@angular/core';
import { KululaService } from 'src/app/kululaServices/kulula.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-flightbook-history',
  templateUrl: './flightbook-history.component.html',
  styleUrls: ['./flightbook-history.component.css']
})
export class FlightbookHistoryComponent implements OnInit {

  IsError:boolean=false;
  historyData:any;
  username:any;
  constructor(private kululaService:KululaService) { }

  ngOnInit() {
    this.username=localStorage.getItem('userName');
    this.kululaService.flightbookHistory(this.username).subscribe(
      (data:any)=>{
      this.historyData = data;
   },
   (err : HttpErrorResponse)=>{
     this.IsError=true;
    console.log('Error status '+err.statusText);
    console.log('Error msg '+err.message);
   } 
   );
  }
}
