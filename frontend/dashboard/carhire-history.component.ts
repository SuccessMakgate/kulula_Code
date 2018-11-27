import { Component, OnInit } from '@angular/core';
import { KululaService } from 'src/app/kululaServices/kulula.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-carhire-history',
  templateUrl: './carhire-history.component.html',
  styleUrls: ['./carhire-history.component.css']
})
export class CarhireHistoryComponent implements OnInit {
  IsError:boolean=false;
  historyData:any;
  username:any;
  constructor(private kululaService:KululaService) { }

  ngOnInit() {
    this.username=localStorage.getItem('userName');
    this.kululaService.carhireHistory(this.username).subscribe(
      (data:any)=>{
      this.historyData = data;
      //console.log(this.historyData[0].pickUp);
   },
   (err : HttpErrorResponse)=>{
     this.IsError=true;
    console.log('Error status '+err.statusText);
    console.log('Error msg '+err.message);
   } 
   );
  }

}
