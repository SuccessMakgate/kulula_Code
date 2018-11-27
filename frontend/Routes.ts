import { FlightSearchComponent } from "./flight-search/flight-search.component";
import { ClientComponent } from "./client/client.component";
import { FlightScheduleComponent } from "./flight-schedule/flight-schedule.component";
import { CarhireComponent } from "./carhire/carhire.component";
import { SeatBookComponent } from "./seat-book/seat-book.component";
import { PaymentComponent } from "./payment/payment.component";
import { AdminComponent } from "./admin/admin.component";
import { LoginComponent } from "./client/login/login.component";
import { RegisterComponent } from "./client/register/register.component";
import { AddDetailsComponent } from "./client/add-details/add-details.component";
import { CarhireReceiptComponent } from "./payment/carhire-receipt/carhire-receipt.component";
import { FlightbookReceiptComponent } from "./payment/flightbook-receipt/flightbook-receipt.component";
import { MemberPaymentComponent } from "./payment/member-payment/member-payment.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DiscountHistoryComponent } from "./dashboard/discount-history/discount-history.component";
import { CarhireHistoryComponent } from "./dashboard/carhire-history/carhire-history.component";
import { FlightbookHistoryComponent } from "./dashboard/flightbook-history/flightbook-history.component";
import { ChangePasswordComponent } from "./dashboard/change-password/change-password.component";
import { EditProfileComponent } from "./dashboard/edit-profile/edit-profile.component";
import { TravellersComponent } from "./travellers/travellers.component";
import { PopupComponent } from "./popup/popup.component";


export const appRoutes =[
    {path:"homess",component:TravellersComponent},
    {path:'test',component:PopupComponent},
    {path:'dash',component:DashboardComponent,
      children:[
        {path:'discount',component:DiscountHistoryComponent},
        {path:'carhire',component:CarhireHistoryComponent},
        {path:'flightbook',component:FlightbookHistoryComponent},
        {path:'changepassowrd',component:ChangePasswordComponent},
        {path:'editprofile',component:EditProfileComponent}
      ]},
    {path:"home",component:FlightSearchComponent},
    {path:"account",component:ClientComponent,
     children:[
         {path:"login",component:LoginComponent},
         {path:"register",component:RegisterComponent},
         {path:"client_details",component:AddDetailsComponent}
       ]},
    {path:"flightsearch",component:FlightSearchComponent},
    {path:"flightschedule",component:FlightScheduleComponent},
    {path:"carhire",component:CarhireComponent},
    {path:"seatbook",component:SeatBookComponent},
    {path:"payment",component:PaymentComponent,
      children:[
        {path:"carhire_receipt",component:CarhireReceiptComponent},
        {path:"flightbook_receipt",component:FlightbookReceiptComponent}, 
        {path:"member",component:MemberPaymentComponent}
      ]
    },
    {path:"admin",component:AdminComponent},
    {path:'',redirectTo:'/home',pathMatch:'full'},
    {path:"**",component:FlightSearchComponent},
   ];