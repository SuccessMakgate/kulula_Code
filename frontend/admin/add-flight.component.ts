import { Component, OnInit } from '@angular/core';
import { addFlight } from 'src/app/kululaServices/kulula.model';
import { KululaService } from 'src/app/kululaServices/kulula.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css']
})
export class AddFlightComponent implements OnInit {
  fileToUpload:File=null;
  addFlight:addFlight;
  imageUrl:string ='src/kululaicon.jpg';
  constructor(private kulula_service:KululaService) { }

  ngOnInit() {
    this.resetForm();
  }
  
  resetForm(form?:NgForm)
  {
    if(form !=null)
    form.reset();
    this.addFlight={
      AircraftName:"",
	    AircraftNo:"",
	    MaxSeats:0,
	    price:0
    }
  }
  handleFileInput(file :FileList){
    this.fileToUpload=file.item(0);
    var reader= new FileReader();
    reader.onload=(event:any)=>{
     this.imageUrl=event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }
 
  OnSubmit(form:NgForm)
  {
    this.kulula_service.AddFlight(form.value,this.fileToUpload)
    .subscribe(
     (data:any) => {
      this.resetForm(form);
      console.log('Adding Flight Success');
    },
     (err : HttpErrorResponse)=>{
      console.log('Error status '+err.statusText);
      console.log('Error msg '+err.message);
     } 
    );
  }

}
