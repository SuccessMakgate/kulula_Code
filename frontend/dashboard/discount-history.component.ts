import { Component, OnInit } from '@angular/core';
import { KululaService } from 'src/app/kululaServices/kulula.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-discount-history',
  templateUrl: './discount-history.component.html',
  styleUrls: ['./discount-history.component.css']
})
export class DiscountHistoryComponent implements OnInit {
  username:any;
  IsError:boolean=false;
  historyData:any;
  constructor(private kululaService:KululaService) { }

  ngOnInit() {

    this.username=localStorage.getItem('userName');
    this.kululaService.discountHistory(this.username).subscribe(
      (data:any)=>{
     console.log(data);
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
