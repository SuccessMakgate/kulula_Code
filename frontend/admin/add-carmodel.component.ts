import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { addCar } from 'src/app/kululaServices/kulula.model';
import { KululaService } from 'src/app/kululaServices/kulula.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-carmodel',
  templateUrl: './add-carmodel.component.html',
  styleUrls: ['./add-carmodel.component.css']
})
export class AddCarmodelComponent implements OnInit {
  fileToUpload:File=null;
  addCars:addCar;
  imageUrl:string ='src/kululaicon.jpg';
  
  constructor(private kulula_service:KululaService) {
    
   }

   
  ngOnInit() {
    this.resetForm();
    // this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    // this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
    //      console.log('ImageUpload:uploaded:', item, status, response);
    //      alert('File uploaded successfully');
    //  };
  }
  


  resetForm(form?:NgForm)
  {
    if(form !=null)
    form.reset();
    this.addCars={
      CarName:"",
	    CarColour:"",
	    YearModel:"",
	    LeatherSeat:"",
	    Radio_Cd:"",
	    AirBag:"",
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
    this.kulula_service.AddCar(form.value,this.fileToUpload)
    .subscribe(
     (data:any) => {
      this.resetForm(form);
      console.log('Adding Carmodel Success');
    },
     (err : HttpErrorResponse)=>{
      console.log('Error status '+err.statusText);
      console.log('Error msg '+err.message);
     } 
    );
  }
}
