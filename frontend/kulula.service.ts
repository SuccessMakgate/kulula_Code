import { Injectable } from '@angular/core';
import {  FlightSearch, carhire, schedule, addFlight, register, ClientDetails, login, payment, Memberpayment, addCar, seatbook, ChangePassword } from './kulula.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KululaService {
  
  readonly rooturl='http://localhost:4344';
  constructor(private http:HttpClient) { }

  userAuthentication(UserName,Password){
    var data="username="+UserName+"&password="+Password+"&grant_type=password";
    var reqHeader=new HttpHeaders({"Content-Type":"application/x-www-urlencoded"});

    return this.http.post(this.rooturl+'/token',data,{headers:reqHeader});
  }
  searchFlight(FSearch:FlightSearch){
    const data:FlightSearch={
    DestPlace: FSearch.DestPlace,
    DepartPlace:FSearch.DepartPlace,
    DepartDate: FSearch.DepartDate,
    returnDate: FSearch.returnDate,
    IsReturn: FSearch.IsReturn,
    NumPeople: FSearch.NumPeople
  }
  return this.http.post(this.rooturl+'/api/FlightBooks',data,
  {headers : new HttpHeaders({'Authorization':'bearer '+localStorage.getItem('userToken')})});
 }
 hireCar(CHire:carhire){
    const data:carhire={
      pickUp:CHire.pickUp,
      DropOff:CHire.DropOff,
      IsReturn:CHire.IsReturn,
      PickDate:CHire.PickDate,
      CarName:CHire.CarName
  }
  return this.http.post(this.rooturl+'/api/Carhires',data,
  {headers : new HttpHeaders({'Authorization':'bearer '+localStorage.getItem('userToken')})});
 }
 GetSchedule(Sch:schedule)
 {
  return this.http.get(this.rooturl+'/api/FlightBooks')
 }
 AddSchedule(Sch:schedule)
 {
    const data:schedule={
      DepartDate:Sch.DepartDate,
      DepartTime:Sch.DepartTime,
      ReturnDate:Sch.ReturnDate,
      ReturnTime:Sch.ReturnTime
  }
  return this.http.post(this.rooturl+'/api/FlightSchedules',data);
 }
 BookSeat(BSeat:seatbook)
 {
    const data:seatbook={
      SeatNumber:BSeat.SeatNumber,
      SeatPrice:BSeat.SeatPrice,
      SeatName:BSeat.SeatName
  }
  return this.http.post(this.rooturl+'',data);
 }
 AddCar(car:addCar,fileToUpload:File)
 {
  const formData:FormData =new FormData();
    const data:addCar={
      CarName:car.CarName,
      CarColour:car.CarColour,
      YearModel:car.YearModel,
      LeatherSeat:car.LeatherSeat,
      Radio_Cd:car.Radio_Cd,
      AirBag:car.AirBag,
      price:car.price
  
     }
    formData.append('Image',fileToUpload,fileToUpload.name);
    formData.append('CarName',data.CarName);
    formData.append('CarColour',data.CarColour);
    formData.append('YearModel',data.YearModel);
    formData.append('LeatherSeat', data.LeatherSeat);
    formData.append('Radio_Cd', data.Radio_Cd);
    formData.append('AirBag', data.AirBag);
    formData.append('price',data.price.toString());

    return this.http.post(this.rooturl+'/api/CarModels',formData);
 }
 AddFlight(flight:addFlight,fileToUpload:File)
 {
    const formData:FormData =new FormData();
    const data:addFlight={
      AircraftNo:flight.AircraftNo,
      AircraftName:flight.AircraftName,
      MaxSeats:flight.MaxSeats,
      price:flight.price
    }
    formData.append('Image',fileToUpload,fileToUpload.name);
    formData.append('AircraftName',data.AircraftName);
    formData.append('AircraftNo',data.AircraftNo);
    formData.append('MaxSeats',data.MaxSeats.toString());
    formData.append('price',data.price.toString());
    
    return this.http.post(this.rooturl+'/api/Aircraft',formData);
  
 }
 register(reg:register)
 {
    const data:register={
      Password:reg.Password,
      Email:reg.Email,
      ConfirmPassword:reg.ConfirmPassword
  }
  return this.http.post(this.rooturl+'/api/account/register',data);
 }
 clientDetails(CDetails:ClientDetails)
 {
    const data:ClientDetails={
      Email:CDetails.Email,
      IdNumber:CDetails.IdNumber,
      FirstName:CDetails.FirstName,
      LastName:CDetails.LastName,
      Gender:CDetails.Gender,
      Address:CDetails.Address,
      PhoneNo:CDetails.PhoneNo
  }
  return this.http.post(this.rooturl+'/api/Account/Details',data);
 }
 ModifyclientDetails(id:number,CDetails:ClientDetails)
 {
    const data:ClientDetails={
      Email:CDetails.Email,
      IdNumber:CDetails.IdNumber,
      FirstName:CDetails.FirstName,
      LastName:CDetails.LastName,
      Gender:CDetails.Gender,
      Address:CDetails.Address,
      PhoneNo:CDetails.PhoneNo
  }
  return this.http.put(this.rooturl+'/api/Account/Details/modify/'+id,data);
 }
 GetclientDetails(id:number){
  return this.http.get(this.rooturl+'/api/Account/Details/get/'+id,
  {headers : new HttpHeaders({'Authorization':'bearer '+localStorage.getItem('userToken')})});
 }
 login(login:login)
 {
    const data:login={
      Password:login.Password,
      Email:login.Email
  }
  return this.http.post(this.rooturl+'',data);
 }
 payment(pay:payment)
 {
    const data:payment={
      payMethod:pay.payMethod,
      AccHolder:pay.AccHolder,
      AccountNo:pay.AccountNo,
      CardNo:pay.CardNo,
      TransactionDate:pay.TransactionDate,
      IsCarhire:pay.IsCarhire,
      IsSeatBook:pay.IsSeatBook
  }
  return this.http.post(this.rooturl+'/api/Payments',data);
 }
 MPayment()
 {
  return this.http.get(this.rooturl+'/api/MemberDiscounts/5',
  {headers : new HttpHeaders({'Authorization':'bearer '+localStorage.getItem('userToken')})});
 }
 CarReceipt(){
  return this.http.get(this.rooturl+'/api/Carhires/5');
 }
 FlightReceipt(){
  return this.http.get(this.rooturl+'/api/FlightBooks/5');
 }
 SeatReceipt(){
  return this.http.get(this.rooturl+'/api/SeatBooks/5');
 }
 carhireHistory(username:string){
  return this.http.get(this.rooturl+'/api/dashboards/'+username+'/carhire',
  {headers : new HttpHeaders({'Authorization':'bearer '+localStorage.getItem('userToken')})});
 }
 flightbookHistory(username:string){
  return this.http.get(this.rooturl+'/api/dashboards/'+username+'/flightbook',
  {headers : new HttpHeaders({'Authorization':'bearer '+localStorage.getItem('userToken')})});
 }
  discountHistory(username:string){
  return this.http.get(this.rooturl+'/api/dashboards/'+username+'/discount',
  {headers : new HttpHeaders({'Authorization':'bearer '+localStorage.getItem('userToken')})});
 }
 changePassword(changepass:ChangePassword){
  const data:ChangePassword={
    ConfirmPassword:changepass.ConfirmPassword,
    NewPassword:changepass.NewPassword,
    OldPassword:changepass.OldPassword
    }
   return this.http.post(this.rooturl+'/api/Account/ChangePassword',data,
   {headers : new HttpHeaders({'Authorization':'bearer '+localStorage.getItem('userToken')})})
 }
 AccountActivation(username:string){
  return this.http.get(this.rooturl+'/api/Account/VerifyAccount/'+username,
  {headers : new HttpHeaders({'Authorization':'bearer '+localStorage.getItem('userToken')})});
 }
 EmailTicket(email:string,fileToUpload:HTMLElement){
  const formData:FormData =new FormData();
  formData.append('tickedImg',fileToUpload.toString());
  return this.http.post(this.rooturl+'/api/payments/receipt/'+email,formData,
  {headers : new HttpHeaders({'Authorization':'bearer '+localStorage.getItem('userToken')})});
 }
}
