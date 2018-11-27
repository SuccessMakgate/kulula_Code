import { Component, OnInit } from '@angular/core';
import { KululaService } from 'src/app/kululaServices/kulula.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { schedule } from 'src/app/kululaServices/kulula.model';

@Component({
  selector: 'app-add-flightschedule',
  templateUrl: './add-flightschedule.component.html',
  styleUrls: ['./add-flightschedule.component.css']
})
export class AddFlightscheduleComponent implements OnInit {
  addSch:schedule ;
  constructor(private kulula_service:KululaService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?:NgForm)
  {
    if(form !=null)
    form.reset();
    this.addSch={
    DepartDate: "",
    DepartTime:"",
    ReturnDate:"",
    ReturnTime:""
    }
  }

  OnSubmit(form:NgForm)
  {
    this.kulula_service.AddSchedule(form.value)
    .subscribe((data:any) => {
      console.log('Adding Schedule Success');
    },
    (err:HttpErrorResponse)=>{
      console.log('Error :'+err.message);
    }
    );
  }

}
