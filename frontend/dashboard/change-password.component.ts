import { Component, OnInit } from '@angular/core';
import { ChangePassword } from 'src/app/kululaServices/kulula.model';
import { NgForm } from '@angular/forms';
import { KululaService } from 'src/app/kululaServices/kulula.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  btnSubmitClick:boolean=false;
  modelRef:BsModalRef;
  ChangePasswords:ChangePassword;
  success:boolean=false;
 
  constructor(private kululaService:KululaService,private modalservice:BsModalService) {}

  ngOnInit() {
    this.resetForm();
  }
  
  resetForm(form?:NgForm)
  {
    if(form !=null)
    form.reset();
    this.ChangePasswords={
      OldPassword:"",
      NewPassword:"",
      ConfirmPassword:""
    }
  }
  OnSubmit(form:NgForm){
    this.kululaService.changePassword(form.value)
    .subscribe((data:any) => {
      console.log('Password CHanged Successfully'); 
    },
    (err:HttpErrorResponse)=>{
      console.log('Error :'+err.message);
    }
    );
  }
  openModal(template){ 
    this.modelRef=this.modalservice.show(template); 
    
  }
  confirm(){
    this.modalservice.hide(1); 
    this.success=true;
  }
  decline(){
    this.modalservice.hide(1); 
  }
}
